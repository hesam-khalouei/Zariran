import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
  ltr?: boolean;
}

const sizes = { sm: "h-8 text-sm", md: "h-10 text-sm", lg: "h-12 text-base" } as const;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = "md", invalid, ltr, className, dir, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      dir={dir ?? (ltr ? "ltr" : undefined)}
      aria-invalid={invalid || undefined}
      className={cn(
        "block w-full rounded-md border bg-[color:var(--color-surface-default)] px-3",
        "text-[color:var(--color-foreground-default)] placeholder:text-[color:var(--color-foreground-muted)]",
        "border-[color:var(--color-border-default)] transition-colors",
        "hover:border-[color:var(--color-border-strong)]",
        "focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus-ring)]",
        "disabled:cursor-not-allowed disabled:bg-[color:var(--color-background-subtle)] disabled:text-[color:var(--color-foreground-muted)]",
        sizes[size],
        invalid && "border-[color:var(--color-feedback-error-border)]",
        ltr && "text-left font-mono",
        className,
      )}
      {...rest}
    />
  );
});