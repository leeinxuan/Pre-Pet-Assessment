import type { ReactNode } from "react";

type ActivityGameHeadingProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
  descriptionClassName?: string;
  titleId?: string;
  as?: "div" | "header";
  descriptionAs?: "p" | "span";
};

/** Shared heading markup; activity-specific progress and scene remain outside this component. */
export function ActivityGameHeading({ eyebrow, title, description, children, className = "", descriptionClassName, titleId, as: Tag = "div", descriptionAs: Description = "p" }: ActivityGameHeadingProps) {
  return <Tag className={`activity-game-heading ${className}`.trim()}>
    <p className="life-stage-label">{eyebrow}</p>
    <h1 id={titleId}>{title}</h1>
    {description && <Description className={`activity-game-heading-description ${descriptionClassName ?? ""}`.trim()}>{description}</Description>}
    {children}
  </Tag>;
}
