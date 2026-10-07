import type { SpeciesId } from "./types";
import type { CareReviewAdditionalNote } from "./care-review-note-types";
import { dogCareReviewAdditionalNotes } from "../species/dog/care-review-notes";
import { catCareReviewAdditionalNotes } from "../species/cat/care-review-notes";
import { rabbitCareReviewAdditionalNotes } from "../species/rabbit/care-review-notes";
import { birdCareReviewAdditionalNotes } from "../species/bird/care-review-notes";
import { hamsterCareReviewAdditionalNotes } from "../species/hamster/care-review-notes";

export type { CareReviewAdditionalNote } from "./care-review-note-types";

/** Compatibility registry; canonical notes are maintained by each species directory. */
export const careReviewAdditionalNotes: Record<SpeciesId, CareReviewAdditionalNote[]> = {
  dog: dogCareReviewAdditionalNotes,
  cat: catCareReviewAdditionalNotes,
  rabbit: rabbitCareReviewAdditionalNotes,
  bird: birdCareReviewAdditionalNotes,
  hamster: hamsterCareReviewAdditionalNotes,
};

export function getCareReviewAdditionalNotes(species: string): CareReviewAdditionalNote[] {
  if (species === "cat") return careReviewAdditionalNotes.cat;
  if (species === "rabbit") return careReviewAdditionalNotes.rabbit;
  if (species === "bird") return careReviewAdditionalNotes.bird;
  if (species === "hamster") return careReviewAdditionalNotes.hamster;
  return careReviewAdditionalNotes.dog;
}
