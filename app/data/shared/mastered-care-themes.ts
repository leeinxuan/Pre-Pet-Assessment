import type { MasteredCareTheme } from "./mastered-care-types";
import { dogMasteredCareThemes } from "../species/dog/mastered-care-themes";
import { catMasteredCareThemes } from "../species/cat/mastered-care-themes";
import { rabbitMasteredCareThemes } from "../species/rabbit/mastered-care-themes";
import { birdMasteredCareThemes } from "../species/bird/mastered-care-themes";
import { hamsterMasteredCareThemes } from "../species/hamster/mastered-care-themes";

export type { MasteredCareSource, MasteredCareTheme } from "./mastered-care-types";

/** Compatibility registry; canonical themes are maintained by each species directory. */
export const masteredCareThemesBySpecies: Record<string, readonly MasteredCareTheme[]> = {
  dog: dogMasteredCareThemes,
  cat: catMasteredCareThemes,
  rabbit: rabbitMasteredCareThemes,
  bird: birdMasteredCareThemes,
  hamster: hamsterMasteredCareThemes,
};

export function getMasteredCareThemes(species: string): readonly MasteredCareTheme[] {
  return masteredCareThemesBySpecies[species] ?? dogMasteredCareThemes;
}
