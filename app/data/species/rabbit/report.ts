import type { InteractionCompletionContent, SpeciesReportConfig } from "../../shared/species-config-types";

/** 兔子照護指南與網頁回顧共用資料。 */
export const rabbitReport: SpeciesReportConfig = {
  checklistGroups: [
    { title: "每日照顧", items: ["持續補充新鮮牧草", "更換乾淨飲水", "清潔便盆與觀察糞便", "安排安全放風與陪伴", "留意食慾、精神與排便變化", "依換毛狀況梳毛"] },
    { title: "家中環境", items: ["牧草架與較重的飲水碗", "便盆與吸附墊料", "躲藏箱、防滑墊與安全活動區", "涼感墊與合適降溫安排", "收好電線、塑膠製品與有毒植物", "避免無保護的高處與可啃咬泡棉"] },
    { title: "外出與接回", items: ["安全外出籠／提袋", "籠內防滑墊與少量牧草", "夏季保冷措施", "身分證與領養／購買文件"] },
  ],
  handlingRows: [
    ["忙碌或離家", "安排可信任的人每日補草、換水、清便盆並觀察糞便。"],
    ["食慾下降或糞便量驟減", "記錄時間與狀況，立刻聯繫兔科獸醫。"],
    ["換毛期大量脫毛", "規律梳毛並觀察食慾與排便，不以洗澡處理。"],
    ["夏季高溫（28℃ 以上）", "維持涼爽環境並提供陶板涼感墊；出現警訊應立即處置。"],
    ["居家安全", "收好電線、塑膠與有毒植物，提供防滑地面與安全躲藏處。"],
    ["高齡階段（6 歲以上）", "提高健檢頻率，降低出入高度並增加軟質墊料。"],
  ],
  dailyCareTime: "每日約需安排 1～2 小時",
  dailyCareTimeNote: "時間會分散在牧草補充、飲水更換、便盆清潔、蔬菜備製、放風陪伴、梳毛與糞便觀察；依兔子年齡、健康狀況與換毛期而有所變動。",
  dailyCareBreakdown: [
    { title: "牧草補充與飲水更換", detail: "約 5～10 分鐘" },
    { title: "便盆清潔與環境巡視", detail: "約 10～20 分鐘" },
    { title: "蔬菜備製與餵食", detail: "約 10 分鐘" },
    { title: "觀察精神、食量與行為", detail: "約 5～10 分鐘" },
    { title: "放風陪伴與互動", detail: "約 30～60 分鐘" },
    { title: "梳毛（依毛長與換毛期）", detail: "約 5～15 分鐘" },
  ],
};

/** 兔子美容互動完成頁；由共用 DailyCareCompletion 呈現。 */
export const rabbitGroomingCompletion: InteractionCompletionContent = {
  title: "{petName} 的美容時間到了！",
  subtitle: "你完成了今天的保養——梳毛、足底確認、門齒與指甲檢查。",
  description: "定期梳毛，尤其注意**後肢及尾根周圍**，能預防皮膚感染、降低**腸阻塞**風險。**門齒及指甲至少一週確認一次**——若過長請交由兔科獸醫處理，不可自行修剪。",
  reflectionTitle: "兔子需要的照護時間，比許多人想的還要長",
  reflectionContent: [
    "兔子的日常照護不只是補飼料、換水而已。牧草補充、便盆清潔、新鮮蔬菜備製、健康觀察，加上**每天至少 30–60 分鐘的放風與陪伴**——每一項都需要固定時間投入，無法用假日一次補回。請想一想：在接下來每一天的生活裡，你能為 {petName} 穩定留出這段時間嗎？",
  ],
  careTimeTitle: "每天留給牠的照護時間",
  careTimeItems: rabbitReport.dailyCareBreakdown,
  careTimeSupplement: {
    title: "每週保養建議頻率",
    items: [
      { title: "梳毛（短毛兔）", detail: "每週 2–3 次；換毛期每日", description: "清除脫落毛髮，防止皮膚感染與腸阻塞" },
      { title: "梳毛（長毛兔）", detail: "每日", description: "換毛期尤其重要，每日梳毛" },
      { title: "門齒觀察", detail: "至少每週一次", description: "確認長度正常；若過長需諮詢兔科獸醫" },
      { title: "指甲觀察", detail: "至少每週一次", description: "確認長度正常；修剪需由獸醫或專業人員協助" },
      { title: "足底檢查", detail: "每次梳毛時", description: "確認足底毛髮與皮膚無紅腫或脫毛" },
    ],
  },
  continueLabel: "繼續生活旅程",
};
