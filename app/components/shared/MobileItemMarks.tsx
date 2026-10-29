/** Visual-only markers for mobile inventory cards; the whole card remains the button. */
export function MobileItemInfoBadge() {
  return <span className="mobile-item-info-badge" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><circle cx="12" cy="6.5" r="1.2" fill="currentColor" stroke="none" /><path d="M12 10.5v7" /></svg></span>;
}

export function MobileItemPlacedCheck() {
  return <span className="mobile-item-placed-check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 4.5 4.5L19 7" /></svg></span>;
}
