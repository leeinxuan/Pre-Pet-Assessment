/** Shared species identifiers used by shared UI and data configuration. */
export type SpeciesId = "dog" | "cat" | "rabbit" | "bird" | "hamster" | "gecko";

/**
 * 依物種查物種表；未註冊的物種沿用既有規則退回犬資料。
 * 使用 hasOwn，避免 "constructor" 等原型屬性被誤認為物種。
 */
export function pickSpeciesEntry<T>(table: Record<SpeciesId, T>, species: string | undefined): T {
  return species !== undefined && Object.hasOwn(table, species) ? table[species as SpeciesId] : table.dog;
}
