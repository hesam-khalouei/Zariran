import { Link } from "react-router-dom";
import { Card } from "../ui/Card";
import { formatDateFa } from "../../lib/persian";
import type { StreamItem } from "../../data/types";

const basePath = { khatereh: "/khatereh", gozaresh: "/gozaresh", bayan: "/bayan" } as const;

export function StreamCard({ item }: { item: StreamItem }) {
  return (
    <Card padding="md" className="flex h-full flex-col gap-2">
      <p className="text-xs text-[color:var(--color-foreground-muted)]">{formatDateFa(new Date(item.date))}</p>
      <h3 className="text-base font-semibold text-[color:var(--color-foreground-default)]">
        <Link to={`${basePath[item.kind]}/${item.slug}`} className="hover:text-[color:var(--color-action-primary)]">{item.title}</Link>
      </h3>
      <p className="text-sm leading-relaxed text-[color:var(--color-foreground-secondary)]">{item.summary}</p>
      <p className="mt-auto text-xs text-[color:var(--color-foreground-muted)]">{item.author}</p>
    </Card>
  );
}