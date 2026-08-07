import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

export const cardClassName = "rounded-md border border-outline-variant bg-surface-container p-4";

type CardProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

/** The bordered-container pattern repeated across every form/panel — centralized here.
 *  Pass `as="form"` for forms. */
export function Card<T extends ElementType = "div">({ as, className = "", children, ...rest }: CardProps<T>) {
  const Component = (as ?? "div") as ElementType;
  return (
    <Component className={`${cardClassName} ${className}`} {...rest}>
      {children}
    </Component>
  );
}

/** Card header row used by every panel in the design — icon/title on the left,
 *  an optional action (e.g. "View all") on the right. */
export function CardHeader({
  title,
  action,
  icon,
}: {
  title: string;
  action?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="-mx-4 -mt-4 mb-4 flex items-center justify-between border-b border-outline-variant bg-surface-container-high px-4 py-2.5">
      <div className="flex items-center gap-2 label-caps text-on-surface">
        {icon}
        {title}
      </div>
      {action}
    </div>
  );
}
