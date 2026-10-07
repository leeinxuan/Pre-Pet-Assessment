/** 既有共用情境影片路徑；各物種 journey 設定決定是否使用，不由 UI 推斷。 */
export const scenarioMedia = {
  correctPrimary: "/assets/dog/pet-journey/shiba/correct-answer.mp4",
  correctSecondary: "/assets/dog/pet-journey/shiba/correct-answer2.mp4",
  dog: {
    arrival: "/assets/dog/pet-journey/shiba/first-day.mp4",
    barking: "/assets/dog/pet-journey/shiba/barking.mp4",
    chewing: "/assets/dog/pet-journey/shiba/chewing-on-things.mp4",
    toileting: "/assets/dog/pet-journey/shiba/urinate-and-defecate.mp4",
    illness: "/assets/dog/pet-journey/shiba/sick.mp4",
    senior: "/assets/dog/pet-journey/shiba/senior-life.mp4",
    busyCare: "/assets/dog/pet-journey/shiba/busy-daily-care.mp4",
    busyCareCharacter: "/assets/dog/pet-journey/shiba/shiba-hungry.png",
    room: "/assets/dog/room/empty-room.png",
    shedding: "/assets/dog/pet-journey/shiba/shedding.mp4",
    rainyWalk: "/assets/dog/pet-journey/shiba/rainy-day-walk.mp4",
  },
} as const;
