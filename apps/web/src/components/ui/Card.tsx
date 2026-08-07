import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

export const cardClassName =
  "rounded-xl border border-stone-200/70 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-stone-800 dark:bg-stone-950";

type CardProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

/** The bordered-container pattern (`rounded border border-stone-200 dark:border-stone-800 p-4`)
 *  repeated across every form/panel — centralized here. Pass `as="form"` for forms. */
export function Card<T extends ElementType = "div">({ as, className = "", children, ...rest }: CardProps<T>) {
  const Component = (as ?? "div") as ElementType;
  return (
    <Component className={`${cardClassName} ${className}`} {...rest}>
      {children}
    </Component>
  );
}
