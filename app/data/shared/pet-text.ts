/** Replaces data-driven pet-name tokens before text reaches UI or exports. */
export function petNameFallback(species?: string) {
  const fallbackNames = {
    dog: "小狗",
    cat: "貓咪",
    rabbit: "小白",
    bird: "小啾",
    hamster: "芝麻",
    gecko: "小守宮",
  } as const;

  return fallbackNames[species as keyof typeof fallbackNames] ?? "牠";
}

export function interpolatePetName(text: string, petName: string, species?: string) {
  const name = petName.trim() || petNameFallback(species);
  return text
    .replaceAll("`{petName}`", name)
    .replaceAll("{petName}", name)
    .replaceAll("${petName}", name);
}
