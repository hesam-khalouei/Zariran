import { ChevronRight, ChevronLeft } from "lucide-react";
import { toFaDigits } from "../../lib/persian";
import { cn } from "../../lib/cn";

export interface PaginationProps {
  page: number;
  pageCount: number;
  onChange: (next: number) => void;
}

export function Pagination({ page, pageCount, onChange }: PaginationProps) {
  if (pageCount <= 1) return null;
  const pages: (number | "…")[] = [];
  const push = (n: number | "…") => pages.push(n);
  push(1);
  if (page > 3) push("…");
  for (let i = Math.max(2, page - 1); i <= Math.min(pageCount - 1, page + 1); i++) push(i);
  if (page < pageCount - 2) push("…");
  push(pageCount);

  return (
    <nav aria-label="صفحه‌بندی" className="flex items-center justify-center gap-1">
      <button type="button" aria-label="صفحه قبل" disabled={page === 1} onClick={() => onChange(page - 1)}
        className="inline-flex size-9 items-center justify-center rounded-md hover:bg-[color:var(--color-background-subtle)] disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus-ring)]">
        <ChevronRight aria-hidden="true" className="size-4" />
      </button>
      {pages.map((p, i) => p === "…" ? (
        <span key={`gap-${i}`} className="px-2 text-[color:var(--color-foreground-muted)]">…</span>
      ) : (
        <button key={p} type="button" aria-current={p === page ? "page" : undefined} onClick={() => onChange(p)}
          className={cn("inline-flex size-9 items-center justify-center rounded-md text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus-ring)]",
            p === page ? "bg-[color:var(--color-action-primary)] text-[color:var(--color-action-primary-foreground)]" : "hover:bg-[color:var(--color-background-subtle)] text-[color:var(--color-foreground-secondary)]")}>
          {toFaDigits(p)}
        </button>
      ))}
      <button type="button" aria-label="صفحه بعد" disabled={page === pageCount} onClick={() => onChange(page + 1)}
        className="inline-flex size-9 items-center justify-center rounded-md hover:bg-[color:var(--color-background-subtle)] disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus-ring)]">
        <ChevronLeft aria-hidden="true" className="size-4" />
      </button>
    </nav>
  );
}