import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { useId } from "../../hooks/useId";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, description, id, className, ...rest },
  ref,
) {
  const generated = useId("rd");
  const inputId = id ?? generated;
  const descId = description ? `${inputId}-desc` : undefined;
  return (
    <div className={cn("flex items-start gap-2", className)}>
      <span className="relative inline-flex size-5 shrink-0 items-center justify-center">
        <input
          ref={ref}
          id={inputId}
          type="radio"
          aria-describedby={descId}
          className={cn(
            "peer appearance-none size-5 rounded-full border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface-default)]",
            "checked:border-[color:var(--color-action-primary)]",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus-ring)]",
            "disabled:cursor-not-allowed disabled:opacity-50",
          )}
          {...rest}
        />
        <span aria-hidden="true" className="pointer-events-none absolute size-2.5 rounded-full bg-[color:var(--color-action-primary)] opacity-0 peer-checked:opacity-100" />
      </span>
      {(label || description) && (
        <span className="flex flex-col gap-0.5 pt-0.5">
          {label ? <label htmlFor={inputId} className="text-sm cursor-pointer">{label}</label> : null}
          {description ? <span id={descId} className="text-xs text-[color:var(--color-foreground-muted)]">{description}</span> : null}
        </span>
      )}
    </div>
  );
});