import { Link } from "react-router-dom";
import { CalendarDays, MapPin } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { formatDateFa } from "../../lib/persian";
import type { Program } from "../../data/types";

const statusLabel = { upcoming: "پیش‌رو", ongoing: "در حال برگزاری", past: "برگزارشده" } as const;
const statusVariant = { upcoming: "info", ongoing: "success", past: "neutral" } as const;

export function ProgramCard({ program }: { program: Program }) {
  return (
    <Card padding="md" className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-2">
        <Badge variant={statusVariant[program.status]}>{statusLabel[program.status]}</Badge>
      </div>
      <h3 className="text-lg font-semibold text-[color:var(--color-foreground-default)]">
        <Link to={`/jashn/${program.slug}`} className="hover:text-[color:var(--color-action-primary)]">{program.title}</Link>
      </h3>
      <p className="text-sm leading-relaxed text-[color:var(--color-foreground-secondary)]">{program.summary}</p>
      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[color:var(--color-foreground-muted)]">
        <span className="inline-flex items-center gap-1"><CalendarDays aria-hidden="true" className="size-3.5" />{formatDateFa(new Date(program.date))}</span>
        <span className="inline-flex items-center gap-1"><MapPin aria-hidden="true" className="size-3.5" />{program.city}</span>
      </div>
    </Card>
  );
}