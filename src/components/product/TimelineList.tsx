export interface TimelineEntry {
  key: string;
  date: string;
  title: string;
  href?: string;
  summary?: string;
}

export function TimelineList({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="relative flex flex-col gap-6 border-s border-[color:var(--color-border-default)] ps-6">
      {entries.map((e) => (
        <li key={e.key} className="relative">
          <span aria-hidden="true" className="absolute -start-[calc(1.5rem+1px)] top-1.5 size-3 rounded-full border-2 border-[color:var(--color-action-primary)] bg-[color:var(--color-background-default)]" />
          <p className="text-xs text-[color:var(--color-foreground-muted)]">{e.date}</p>
          <p className="mt-1 text-sm font-medium text-[color:var(--color-foreground-default)]">
            {e.href ? <a href={e.href} className="hover:text-[color:var(--color-action-primary)]">{e.title}</a> : e.title}
          </p>
          {e.summary ? <p className="mt-1 text-sm leading-relaxed text-[color:var(--color-foreground-secondary)]">{e.summary}</p> : null}
        </li>
      ))}
    </ol>
  );
}