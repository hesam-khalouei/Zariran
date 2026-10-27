import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
}

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-md " +
  "transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "disabled:cursor-not-allowed disabled:opacity-60";

const sizes: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[color:var(--color-action-primary)] text-[color:var(--color-action-primary-foreground)] hover:bg-[color:var(--color-action-primary-hover)]",
  secondary:
    "bg-[color:var(--color-action-secondary)] text-[color:var(--color-action-secondary-foreground)] hover:bg-[color:var(--color-action-secondary-hover)]",
  ghost:
    "bg-transparent text-[color:var(--color-foreground-default)] hover:bg-[color:var(--color-background-subtle)]",
  destructive:
    "bg-[color:var(--color-feedback-error-fg)] text-[color:var(--color-foreground-on-brand)] hover:bg-[color:var(--color-feedback-error-border)]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", isLoading = false, fullWidth = false, className, children, disabled, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={rest.type ?? "button"}
      aria-busy={isLoading || undefined}
      disabled={disabled || isLoading}
      className={cn("focus-visible:outline-[color:var(--color-focus-ring)]", base, sizes[size], variants[variant], fullWidth && "w-full", className)}
      {...rest}
    >
      {isLoading ? (
        <span aria-hidden="true" className="inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none" />
      ) : null}
      <span>{children}</span>
    </button>
  );
});