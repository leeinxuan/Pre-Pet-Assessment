import type { InteractionCompletionContent, SpeciesReportConfig } from "../../speciesGameConfig";

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
  description: "定期梳毛，尤其注意後肢及尾根周圍，能預防皮膚感染、降低腸阻塞風險。門齒及指甲至少一週確認一次——若過長請交由兔科獸醫處理，不可自行修剪。",
  reflectionTitle: "保養的同時，也是觀察健康的機會",
  reflectionContent: [
    "梳毛時若發現皮膚異常、脫毛區塊或足底紅腫，都是需要留意的訊號。",
    "門齒與指甲的定期確認，能讓你在問題還小的時候就發現——這些保養動作，是你和 {petName} 之間最踏實的日常。",
  ],
  careTimeTitle: "每天留給牠的照護時間",
  careTimeItems: rabbitReport.dailyCareBreakdown,
  continueLabel: "繼續生活旅程",
};
