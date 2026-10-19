"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";

/**
 * Shared visual marker for anatomy inspection points. The activity setting
 * controls whether a sequence number is meaningful; completed points always
 * use a check so players can keep track without implying an order.
 */
export function InspectionHotspot({
  className,
  complete,
  showOrder,
  order,
  children,
  ...buttonProps
}: Omit<ComponentPropsWithoutRef<"button">, "children" | "className"> & {
  className: string;
  complete: boolean;
  showOrder: boolean;
  order: number;
  children?: ReactNode;
}) {
  return (
    <button {...buttonProps} className={className}>
      <span className="inspection-hotspot-symbol" aria-hidden="true">
        {complete ? "✓" : showOrder ? order : null}
      </span>
      {children}
    </button>
  );
}
