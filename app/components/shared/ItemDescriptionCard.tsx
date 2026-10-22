type ItemDescriptionCardProps = {
  title: string;
  description: string;
  /** Optional footer keeps the card's information row consistent with priced preparation items. */
  footer?: string;
  className?: string;
};

/**
 * Shared completion card used wherever an inventory item becomes an explained item.
 * Preparation supplies may show a price in the footer; activities can show status text.
 */
export function ItemDescriptionCard({ title, description, footer, className = "" }: ItemDescriptionCardProps) {
  return <div className={`supply-slot-note ${className}`.trim()} aria-live="polite">
    <b>{title}</b>
    <small>{description}</small>
    {footer && <span className="supply-slot-price">{footer}</span>}
  </div>;
}
