/** Replaces data-driven pet-name tokens before text reaches UI or exports. */
export function petNameFallback(species?: string) {
  if (species === "rabbit") return "小白";
  if (species === "cat") return "貓咪";
  return "小狗";
}

export function interpolatePetName(text: string, petName: string, species?: string) {
  const name = petName.trim() || petNameFallback(species);
  return text
    .replaceAll("`{petName}`", name)
    .replaceAll("{petName}", name)
    .replaceAll("${petName}", name);
}
