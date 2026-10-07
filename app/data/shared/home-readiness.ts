import type { SpeciesId } from "./types";
import type { HomeReadinessConfig } from "./home-readiness-types";
import { dogHomeReadiness } from "../species/dog/home-readiness";
import { catHomeReadiness } from "../species/cat/home-readiness";
import { rabbitHomeReadiness } from "../species/rabbit/home-readiness";
import { birdHomeReadiness } from "../species/bird/home-readiness";
import { hamsterHomeReadiness } from "../species/hamster/home-readiness";

export type { HomeReadinessCard, HomeReadinessConfig, HomeReadinessHousingChoice, HomeReadinessTextBlock, HomeReadinessTextSegment } from "./home-readiness-types";

/** Compatibility registry; canonical content is maintained by each species directory. */
export const homeReadinessBySpecies: Record<SpeciesId, HomeReadinessConfig> = {
  dog: dogHomeReadiness,
  cat: catHomeReadiness,
  rabbit: rabbitHomeReadiness,
  bird: birdHomeReadiness,
  hamster: hamsterHomeReadiness,
};

export function getHomeReadinessConfig(species: string): HomeReadinessConfig {
  if (species === "cat") return homeReadinessBySpecies.cat;
  if (species === "rabbit") return homeReadinessBySpecies.rabbit;
  if (species === "bird") return homeReadinessBySpecies.bird;
  if (species === "hamster") return homeReadinessBySpecies.hamster;
  return homeReadinessBySpecies.dog;
}
