export function Divider({ className }: { className?: string }) {
  return <hr role="separator" className={`border-0 border-t border-[color:var(--color-border-subtle)] ${className ?? ""}`} />;
}