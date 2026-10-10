import type { SpeciesReportConfig } from "../../shared/species-config-types";
export const geckoReport: SpeciesReportConfig = { checklistGroups: [
  { title: "每日照顧", items: ["確認暖側與涼側溫度", "更換淺水碟的新鮮飲水", "觀察排泄、眼睛、尾巴、皮膚與趾端"] },
  { title: "環境維護", items: ["確認缸蓋緊固、無逃脫縫隙", "確認底材安全，沒有細沙或鬆散顆粒", "維持暖側、涼側與濕躲避屋"] },
  { title: "餵食與健康", items: ["餵食活體昆蟲並沾裹鈣粉", "記錄食量、體重與異常變化", "異常時諮詢熟悉爬蟲的獸醫"] },
], handlingRows: [["忙碌或不在家", "交接溫度確認、飲水、餵食與排泄觀察。"], ["食慾或活動力下降", "記錄症狀與時間，盡快諮詢爬蟲獸醫。"], ["脫皮殘留", "提高濕躲避屋濕度；必要時溫水軟化後協助。"], ["高齡階段", "提高體重與食量觀察頻率，依獸醫建議調整環境。"]], dailyCareTime: "每日約需 10～20 分鐘", dailyCareTimeNote: "時間分散在溫度確認、飲水更換、排泄清理與外觀觀察；餵食日另需準備昆蟲與補鈣。", dailyCareBreakdown: [{ title: "溫度確認", detail: "約 1～2 分鐘" }, { title: "飲水更換", detail: "約 2～3 分鐘" }, { title: "排泄與外觀觀察", detail: "約 5～10 分鐘" }, { title: "餵食（每 2～3 天）", detail: "約 10～15 分鐘（餵食日）" }] };
