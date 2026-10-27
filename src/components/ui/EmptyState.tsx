import type { ReactNode } from "react";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-[color:var(--color-border-default)] p-10 text-center">
      {icon ? <div className="text-[color:var(--color-foreground-muted)]">{icon}</div> : null}
      <h3 className="text-base font-semibold text-[color:var(--color-foreground-default)]">{title}</h3>
      {description ? <p className="max-w-prose text-sm text-[color:var(--color-foreground-muted)]">{description}</p> : null}
      {action ? <div className="pt-2">{action}</div> : null}
    </div>
  );
}