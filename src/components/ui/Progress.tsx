import { toFaDigits } from "../../lib/persian";

export function Progress({ value, label }: { value: number; label?: string }) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div className="flex flex-col gap-1">
      {label ? (
        <div className="flex items-center justify-between text-xs text-[color:var(--color-foreground-muted)]">
          <span>{label}</span>
          <span>{toFaDigits(Math.round(pct))}٪</span>
        </div>
      ) : null}
      <div role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pct)} aria-label={label ?? "پیشرفت"} className="h-2 overflow-hidden rounded-full bg-[color:var(--color-background-muted)]">
        <div className="h-full bg-[color:var(--color-action-primary)]" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}