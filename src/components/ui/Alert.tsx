import type { HTMLAttributes, ReactNode } from "react";
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react";
import { cn } from "../../lib/cn";

export type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
}

const icons: Record<AlertVariant, ReactNode> = {
  info: <Info aria-hidden="true" className="size-5" />,
  success: <CheckCircle2 aria-hidden="true" className="size-5" />,
  warning: <AlertTriangle aria-hidden="true" className="size-5" />,
  error: <AlertCircle aria-hidden="true" className="size-5" />,
};

const styles: Record<AlertVariant, string> = {
  info: "bg-[color:var(--color-feedback-info-bg)] text-[color:var(--color-feedback-info-fg)] border-[color:var(--color-feedback-info-border)]",
  success: "bg-[color:var(--color-feedback-success-bg)] text-[color:var(--color-feedback-success-fg)] border-[color:var(--color-feedback-success-border)]",
  warning: "bg-[color:var(--color-feedback-warning-bg)] text-[color:var(--color-feedback-warning-fg)] border-[color:var(--color-feedback-warning-border)]",
  error: "bg-[color:var(--color-feedback-error-bg)] text-[color:var(--color-feedback-error-fg)] border-[color:var(--color-feedback-error-border)]",
};

export function Alert({ variant = "info", title, children, className, ...rest }: AlertProps) {
  return (
    <div role={variant === "error" ? "alert" : "status"} className={cn("flex items-start gap-3 rounded-lg border p-4 text-sm", styles[variant], className)} {...rest}>
      <span className="mt-0.5 shrink-0">{icons[variant]}</span>
      <div className="flex-1">
        {title ? <p className="mb-1 font-semibold">{title}</p> : null}
        <div className="leading-relaxed">{children}</div>
      </div>
    </div>
  );
}