import { hamsterAssets } from "./assets";
import { hamsterArrivalMealSceneLayout, hamsterArrivalMealSupplyImageSizes } from "./feeding";
import { hamsterPreparation } from "./preparation";
import { hamsterJourney } from "./journey";
import { hamsterLifeScenarios } from "./scenarios";
import { hamsterReport } from "./report";

export const hamsterSelection = {
  skipBreedPage: true,
  breeds: [{ id: "hamster", species: "hamster", label: "倉鼠", icon: "🐹", image: hamsterAssets.selection.hamster, size: "small", shortDescription: "倉鼠兼具夜行性的作息特性、齧齒類持續生長的牙齒、沙浴清潔的特殊需求，以及品系間差異極大的社交模式。" }],
} as const;

export const hamsterLayout = { roomDoorplatePlacement: { desktop: { x: 87, y: 16, width: 28 }, mobile: { x: 33, y: 20, width: 40 }, mobileText: { left: 4, top: 56, width: 95, height: 20, fontSize: 16 } } } as const;

export const hamsterConfig = { id: "hamster" as const, selection: hamsterSelection, preparation: hamsterPreparation, journey: hamsterJourney, scenarios: hamsterLifeScenarios, report: hamsterReport, assets: hamsterAssets, layout: hamsterLayout, feeding: { arrivalMealSceneLayout: hamsterArrivalMealSceneLayout, arrivalMealSupplyImageSizes: hamsterArrivalMealSupplyImageSizes } } as const;
