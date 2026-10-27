import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
}

const pad = { none: "", sm: "p-3", md: "p-5", lg: "p-8" } as const;

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { padding = "md", className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-default)] shadow-sm",
        pad[padding],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});