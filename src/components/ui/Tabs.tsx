import { createContext, useContext, useId, type ReactNode } from "react";
import { cn } from "../../lib/cn";

type Ctx = { value: string; onChange: (v: string) => void; baseId: string };
const TabsCtx = createContext<Ctx | null>(null);

export function Tabs({ value, onChange, children, className }: { value: string; onChange: (v: string) => void; children: ReactNode; className?: string }) {
  const baseId = useId();
  return <TabsCtx.Provider value={{ value, onChange, baseId }}><div className={className}>{children}</div></TabsCtx.Provider>;
}

export function TabList({ children, label, className }: { children: ReactNode; label: string; className?: string }) {
  return <div role="tablist" aria-label={label} className={cn("inline-flex gap-1 rounded-lg bg-[color:var(--color-background-subtle)] p-1", className)}>{children}</div>;
}

export function Tab({ value, children }: { value: string; children: ReactNode }) {
  const ctx = useContext(TabsCtx);
  if (!ctx) throw new Error("Tab must be inside <Tabs>");
  const selected = ctx.value === value;
  return (
    <button
      role="tab"
      type="button"
      id={`${ctx.baseId}-tab-${value}`}
      aria-selected={selected}
      aria-controls={`${ctx.baseId}-panel-${value}`}
      tabIndex={selected ? 0 : -1}
      onClick={() => ctx.onChange(value)}
      className={cn(
        "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus-ring)]",
        selected ? "bg-[color:var(--color-surface-default)] shadow-sm" : "text-[color:var(--color-foreground-muted)] hover:text-[color:var(--color-foreground-default)]",
      )}
    >
      {children}
    </button>
  );
}

export function TabPanel({ value, children }: { value: string; children: ReactNode }) {
  const ctx = useContext(TabsCtx);
  if (!ctx) throw new Error("TabPanel must be inside <Tabs>");
  if (ctx.value !== value) return null;
  return (
    <div role="tabpanel" id={`${ctx.baseId}-panel-${value}`} aria-labelledby={`${ctx.baseId}-tab-${value}`} tabIndex={0} className="mt-4 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus-ring)]">
      {children}
    </div>
  );
}