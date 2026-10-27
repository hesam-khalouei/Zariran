import { useLoaderData, useParams, Link } from "react-router-dom";
import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { Breadcrumb } from "../components/ui/Breadcrumb";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { formatDateFa } from "../lib/persian";
import type { Program, StreamItem, StreamKind } from "../data/types";
import { memories } from "../data/memories";
import { reports } from "../data/reports";
import { statements } from "../data/statements";

type Kind = StreamKind | "jashn";

const basePath: Record<Kind, string> = { jashn: "/jashn", khatereh: "/khatereh", gozaresh: "/gozaresh", bayan: "/bayan" };
const label: Record<Kind, string> = { jashn: "جشن تا جشن", khatereh: "خاطرات", gozaresh: "گزارش‌ها", bayan: "بیانیه‌ها و فراخوان‌ها" };

export function StreamDetailPage({ kind }: { kind: Kind }) {
  const params = useParams();
  const loaded = useLoaderData() as Program | undefined;

  const item: Program | StreamItem | undefined =
    kind === "jashn"
      ? loaded
      : kind === "khatereh"
        ? memories.find((m) => m.slug === params.slug)
        : kind === "gozaresh"
          ? reports.find((r) => r.slug === params.slug)
          : statements.find((s) => s.slug === params.slug);

  if (!item) {
    return (
      <Section>
        <Container size="md">
          <h1 className="text-2xl font-semibold">یافت نشد</h1>
          <p className="mt-3 text-[color:var(--color-foreground-secondary)]">این صفحه وجود ندارد یا حذف شده است.</p>
          <div className="mt-6"><Link to={basePath[kind]}><Button variant="ghost">بازگشت به {label[kind]}</Button></Link></div>
        </Container>
      </Section>
    );
  }

  const date = "date" in item ? item.date : "";
  const body = "body" in item ? item.body : ("summary" in item ? item.summary : "");

  return (
    <Section>
      <Container size="md">
        <Breadcrumb items={[{ label: label[kind], href: basePath[kind] }, { label: item.title }]} />
        <h1 className="mt-6 text-3xl font-bold leading-tight md:text-4xl">{item.title}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[color:var(--color-foreground-muted)]">
          {date ? <span>{formatDateFa(new Date(date))}</span> : null}
          {"author" in item && item.author ? <span>— {item.author}</span> : null}
          {"status" in item ? (
            <Badge variant={item.status === "past" ? "neutral" : "info"}>
              {item.status === "past" ? "برگزارشده" : item.status === "upcoming" ? "پیش‌رو" : "در حال برگزاری"}
            </Badge>
          ) : null}
        </div>
        <div className="mt-8 whitespace-pre-line text-base leading-loose text-[color:var(--color-foreground-secondary)]">{body}</div>
        {"tags" in item && item.tags?.length ? (
          <div className="mt-8 flex flex-wrap gap-2">{item.tags.map((t) => <Badge key={t}>{t}</Badge>)}</div>
        ) : null}
        <div className="mt-10"><Link to={basePath[kind]}><Button variant="ghost">بازگشت به {label[kind]}</Button></Link></div>
      </Container>
    </Section>
  );
}