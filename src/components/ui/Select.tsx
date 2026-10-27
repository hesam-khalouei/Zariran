import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/cn";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
  options: SelectOption[];
  placeholder?: string;
}

const sizes = { sm: "h-8 text-sm", md: "h-10 text-sm", lg: "h-12 text-base" } as const;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { size = "md", invalid, options, placeholder, className, ...rest },
  ref,
) {
  return (
    <div className="relative">
      <select
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(
          "appearance-none block w-full rounded-md border bg-[color:var(--color-surface-default)] ps-3 pe-10",
          "text-[color:var(--color-foreground-default)] border-[color:var(--color-border-default)] transition-colors",
          "hover:border-[color:var(--color-border-strong)]",
          "focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus-ring)]",
          "disabled:cursor-not-allowed disabled:bg-[color:var(--color-background-subtle)]",
          sizes[size],
          invalid && "border-[color:var(--color-feedback-error-border)]",
          className,
        )}
        {...rest}
      >
        {placeholder ? <option value="" disabled>{placeholder}</option> : null}
        {options.map((o) => (
          <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>
        ))}
      </select>
      <ChevronDown aria-hidden="true" className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-[color:var(--color-foreground-muted)]" />
    </div>
  );
});