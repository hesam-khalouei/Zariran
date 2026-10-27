import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export type BadgeVariant = "neutral" | "success" | "warning" | "error" | "info";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const styles: Record<BadgeVariant, string> = {
  neutral: "bg-[color:var(--color-background-subtle)] text-[color:var(--color-foreground-secondary)] border-[color:var(--color-border-subtle)]",
  success: "bg-[color:var(--color-feedback-success-bg)] text-[color:var(--color-feedback-success-fg)] border-[color:var(--color-feedback-success-border)]",
  warning: "bg-[color:var(--color-feedback-warning-bg)] text-[color:var(--color-feedback-warning-fg)] border-[color:var(--color-feedback-warning-border)]",
  error: "bg-[color:var(--color-feedback-error-bg)] text-[color:var(--color-feedback-error-fg)] border-[color:var(--color-feedback-error-border)]",
  info: "bg-[color:var(--color-feedback-info-bg)] text-[color:var(--color-feedback-info-fg)] border-[color:var(--color-feedback-info-border)]",
};

export function Badge({ variant = "neutral", className, children, ...rest }: BadgeProps) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium", styles[variant], className)} {...rest}>
      {children}
    </span>
  );
}