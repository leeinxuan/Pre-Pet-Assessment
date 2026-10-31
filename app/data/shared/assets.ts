/** 全物種共用的視覺素材。 */
export const sharedAssets = {
  nameplate: "/assets/shared/nameplate.webp",
  housing: {
    tenant: "/assets/shared/tenant.webp",
    homeowner: "/assets/shared/homeownership.webp",
  },
} as const;

/** Housing choice artwork used by the shared readiness screen. */
export const housingChoiceImages = {
  owner: sharedAssets.housing.homeowner,
  renter: sharedAssets.housing.tenant,
} as const;
