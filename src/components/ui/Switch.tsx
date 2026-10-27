import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { useId } from "../../hooks/useId";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "role"> {
  label?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, id, className, ...rest },
  ref,
) {
  const generated = useId("sw");
  const inputId = id ?? generated;
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <span className="relative inline-flex h-6 w-11 items-center">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          role="switch"
          className={cn(
            "peer appearance-none h-6 w-11 rounded-full bg-[color:var(--color-border-strong)]",
            "checked:bg-[color:var(--color-action-primary)]",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus-ring)]",
            "disabled:cursor-not-allowed disabled:opacity-50",
          )}
          {...rest}
        />
        <span aria-hidden="true" className={cn(
          "pointer-events-none absolute top-0.5 start-0.5 size-5 rounded-full bg-white shadow-sm",
          "transition-transform peer-checked:translate-x-[calc(100%+2px)] rtl:peer-checked:-translate-x-[calc(100%+2px)]",
        )} />
      </span>
      {label ? <label htmlFor={inputId} className="text-sm cursor-pointer">{label}</label> : null}
    </div>
  );
});