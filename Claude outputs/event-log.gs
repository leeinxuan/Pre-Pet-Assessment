/**
 * 「伴日子新手村」行為事件記錄：接收網站傳來的事件，一列一列寫進 Google 試算表
 *
 * 可以和前測、後測、招募表單的腳本放在同一個 Apps Script 專案，名稱都不會衝突。
 *
 * 使用方式：
 * 1. 把這整份程式貼進專案（新增一個檔案，例如「事件記錄.gs」）
 * 2. 函式選單選 setupEventLog，按「執行」，第一次要授權。執行記錄會印出試算表連結
 * 3. （選用）函式選單選 testEventLog，按「執行」，試算表應該會多一列測試資料
 * 4. 右上角「部署」→「新增部署作業」→ 類型選「網頁應用程式」
 *      執行身分：我；誰可以存取：所有人 → 部署
 *    複製「網頁應用程式網址」（/exec 結尾）給 Claude
 * 5. 之後如果修改這份程式，要「部署 → 管理部署作業 → 編輯 → 新版本」，網址才會維持不變
 */

// 網站送事件時要帶的密鑰。這只能擋一般的亂送，不是真正的安全機制，請不要把它當密碼用。
const EVENT_SECRET = 'eXTYp_m7_6DXF2IiT3hd2OaC';

const EVENT_SHEET_NAME = '事件';
const EVENT_COLUMNS = [
  '收到時間', '受測者編號', '物種', '裝置', '工作階段', '事件', '階段', '頁面', '客戶端時間', '內容'
];

function setupEventLog() {
  const props = PropertiesService.getScriptProperties();
  let ss = null;
  const existing = props.getProperty('EVENT_LOG_SHEET_ID');
  if (existing) {
    try { ss = SpreadsheetApp.openById(existing); } catch (e) { ss = null; }
  }
  if (!ss) {
    ss = SpreadsheetApp.create('伴日子新手村｜事件記錄');
    props.setProperty('EVENT_LOG_SHEET_ID', ss.getId());
  }
  let sheet = ss.getSheetByName(EVENT_SHEET_NAME);
  if (!sheet) {
    sheet = ss.getSheets()[0];
    sheet.setName(EVENT_SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, EVENT_COLUMNS.length).setValues([EVENT_COLUMNS]).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  // 時間欄位顯示到毫秒，才能計算停留秒數（只改顯示格式，不影響資料）
  sheet.getRange('A:A').setNumberFormat('yyyy/mm/dd hh:mm:ss.000');
  sheet.getRange('I:I').setNumberFormat('yyyy/mm/dd hh:mm:ss.000');
  sheet.setColumnWidth(1, 190);
  sheet.setColumnWidth(9, 190);
  Logger.log('事件記錄試算表：' + ss.getUrl());
}

function eventSheet_() {
  const id = PropertiesService.getScriptProperties().getProperty('EVENT_LOG_SHEET_ID');
  if (!id) throw new Error('尚未執行 setupEventLog');
  return SpreadsheetApp.openById(id).getSheetByName(EVENT_SHEET_NAME);
}

// 工作表名稱：不能有 : \\ / ? * [ ]，也不能和總表同名
function pidSheetName_(pid) {
  let name = String(pid || '').replace(/[:\\\/?*\[\]]/g, '_').trim().slice(0, 50);
  if (!name || name === EVENT_SHEET_NAME) return '';
  return name;
}

function appendEvents_(events) {
  const now = new Date();
  const rows = events.map(function (e) {
    return [
      now,
      String(e.pid || '').slice(0, 40),
      String(e.species || '').slice(0, 40),
      String(e.device || '').slice(0, 20),
      String(e.session || '').slice(0, 60),
      String(e.event || '').slice(0, 80),
      String(e.stage || '').slice(0, 80),
      String(e.page || '').slice(0, 200),
      e.ts ? new Date(Number(e.ts)) : '',
      e.props ? JSON.stringify(e.props).slice(0, 2000) : ''
    ];
  });
  if (!rows.length) return 0;
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sheet = eventSheet_();
    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, EVENT_COLUMNS.length).setValues(rows);
    // 同時依受測者編號，寫進各自的工作表（沒有就自動建立）
    const ss = sheet.getParent();
    const byPid = {};
    rows.forEach(function (r) {
      const name = pidSheetName_(r[1]);
      if (!name) return;
      (byPid[name] = byPid[name] || []).push(r);
    });
    Object.keys(byPid).forEach(function (name) {
      let ps = ss.getSheetByName(name);
      if (!ps) {
        ps = ss.insertSheet(name);
        ps.getRange(1, 1, 1, EVENT_COLUMNS.length).setValues([EVENT_COLUMNS]).setFontWeight('bold');
        ps.setFrozenRows(1);
        ps.getRange('A:A').setNumberFormat('yyyy/mm/dd hh:mm:ss.000');
        ps.getRange('I:I').setNumberFormat('yyyy/mm/dd hh:mm:ss.000');
        ps.setColumnWidth(1, 190);
        ps.setColumnWidth(9, 190);
      }
      ps.getRange(ps.getLastRow() + 1, 1, byPid[name].length, EVENT_COLUMNS.length).setValues(byPid[name]);
    });
  } finally {
    lock.releaseLock();
  }
  return rows.length;
}

// 網站用 POST 傳來 JSON：{ secret, events: [ {pid, species, device, session, event, stage, page, ts, props} ] }
// 網站端用 Content-Type: text/plain 送出，避免瀏覽器的跨網域預檢請求。
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    if (body.secret !== EVENT_SECRET) {
      return json_({ ok: false, error: 'unauthorized' });
    }
    const events = Array.isArray(body.events) ? body.events.slice(0, 200) : [];
    return json_({ ok: true, saved: appendEvents_(events) });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

// 用瀏覽器直接打開網址，看到 ok 表示部署成功
function doGet() {
  return json_({ ok: true, service: 'pre-pet event log' });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function testEventLog() {
  const n = appendEvents_([{
    pid: 'TEST00', species: '狗', device: 'desktop', session: 'test-session',
    event: 'test_event', stage: 'test', page: '/test', ts: Date.now(), props: { note: 'hello' }
  }]);
  Logger.log('已寫入 ' + n + ' 列');
}
