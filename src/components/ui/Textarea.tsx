import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { invalid, className, rows = 5, ...rest },
  ref,
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cn(
        "block w-full rounded-md border bg-[color:var(--color-surface-default)] px-3 py-2",
        "text-[color:var(--color-foreground-default)] placeholder:text-[color:var(--color-foreground-muted)]",
        "border-[color:var(--color-border-default)] leading-[var(--leading-relaxed)] resize-y min-h-24",
        "transition-colors hover:border-[color:var(--color-border-strong)]",
        "focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus-ring)]",
        "disabled:cursor-not-allowed disabled:bg-[color:var(--color-background-subtle)]",
        invalid && "border-[color:var(--color-feedback-error-border)]",
        className,
      )}
      {...rest}
    />
  );
});