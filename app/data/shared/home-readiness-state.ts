export type HomeReadinessState = {
  housing: "owner" | "renter" | null;
  housingReminderAcknowledged: boolean;
  acknowledgedCardIds: string[];
  openCardId: string | null;
};

export const initialHomeReadinessState: HomeReadinessState = {
  housing: null,
  housingReminderAcknowledged: false,
  acknowledgedCardIds: [],
  openCardId: null,
};
