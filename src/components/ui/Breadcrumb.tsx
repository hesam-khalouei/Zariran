import { ChevronLeft } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items, homeLabel = "خانه" }: { items: BreadcrumbItem[]; homeLabel?: string }) {
  return (
    <nav aria-label="مسیر" className="text-sm text-[color:var(--color-foreground-muted)]">
      <ol className="flex flex-wrap items-center gap-1">
        <li><a href="/" className="hover:text-[color:var(--color-foreground-default)]">{homeLabel}</a></li>
        {items.map((it, i) => (
          <li key={`${it.label}-${i}`} className="flex items-center gap-1">
            <ChevronLeft aria-hidden="true" className="size-4" />
            {it.href && i < items.length - 1 ? (
              <a href={it.href} className="hover:text-[color:var(--color-foreground-default)]">{it.label}</a>
            ) : (
              <span aria-current="page" className="text-[color:var(--color-foreground-default)]">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}