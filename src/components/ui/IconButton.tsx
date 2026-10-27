import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon: ReactNode;
  variant?: "ghost" | "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

const sizes = { sm: "size-8", md: "size-10", lg: "size-12" } as const;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, icon, variant = "ghost", size = "md", className, ...rest },
  ref,
) {
  const variantCls =
    variant === "primary"
      ? "bg-[color:var(--color-action-primary)] text-[color:var(--color-action-primary-foreground)] hover:bg-[color:var(--color-action-primary-hover)]"
      : variant === "secondary"
        ? "bg-[color:var(--color-action-secondary)] text-[color:var(--color-action-secondary-foreground)]"
        : "bg-transparent text-[color:var(--color-foreground-secondary)] hover:bg-[color:var(--color-background-subtle)]";

  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      className={cn(
        "inline-flex items-center justify-center rounded-md transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus-ring)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        sizes[size], variantCls, className,
      )}
      {...rest}
    >
      <span aria-hidden="true" className="inline-flex">{icon}</span>
    </button>
  );
});