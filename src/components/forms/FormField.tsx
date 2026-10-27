import type { ReactNode } from "react";
import { useId } from "../../hooks/useId";

export interface FormFieldProps {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: (ids: { inputId: string; describedBy?: string; invalid: boolean }) => ReactNode;
}

export function FormField({ label, hint, error, required, children }: FormFieldProps) {
  const inputId = useId("field");
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-err` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-[color:var(--color-foreground-default)]">
        {label}
        {required ? <span aria-hidden="true" className="ms-1 text-[color:var(--color-feedback-error-fg)]">*</span> : null}
        {required ? <span className="sr-only"> (الزامی)</span> : null}
      </label>
      {children({ inputId, describedBy, invalid: Boolean(error) })}
      {hint && !error ? <p id={hintId} className="text-xs text-[color:var(--color-foreground-muted)]">{hint}</p> : null}
      {error ? <p id={errorId} role="alert" className="text-xs text-[color:var(--color-feedback-error-fg)]">{error}</p> : null}
    </div>
  );
}