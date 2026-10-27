import { useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { Grid } from "../components/layout/Grid";
import { Input } from "../components/ui/Input";
import { EmptyState } from "../components/ui/EmptyState";
import { ProgramCard } from "../components/product/ProgramCard";
import { StreamCard } from "../components/product/StreamCard";
import { memories } from "../data/memories";
import { reports } from "../data/reports";
import { statements } from "../data/statements";
import type { Program, StreamItem, StreamKind } from "../data/types";

type Kind = StreamKind | "jashn";

const heading: Record<Kind, { title: string; description: string }> = {
  jashn: { title: "جشن تا جشن", description: "برنامه‌های فرهنگی زریران در شهرها و مناسبت‌ها." },
  khatereh: { title: "خاطرات", description: "روایت‌های گذشته؛ از زبان همراهان." },
  gozaresh: { title: "گزارش‌ها", description: "آنچه در زریران می‌گذرد." },
  bayan: { title: "بیانیه‌ها و فراخوان‌ها", description: "آیندهٔ زریران؛ دعوت به همراهی." },
};

export function StreamPage({ kind }: { kind: Kind }) {
  const [q, setQ] = useState("");
  const programsData = useLoaderData() as { programs: Program[] } | undefined;

  const items: (StreamItem | Program)[] = useMemo(() => {
    if (kind === "jashn") return programsData?.programs ?? [];
    if (kind === "khatereh") return memories;
    if (kind === "gozaresh") return reports;
    return statements;
  }, [kind, programsData]);

  const filtered = useMemo(() => {
    const term = q.trim();
    if (!term) return items;
    return items.filter((it) => {
      const t = "title" in it ? it.title : "";
      const s = "summary" in it ? it.summary : "";
      return (t + " " + s).includes(term);
    });
  }, [items, q]);

  return (
    <>
      <Section>
        <Container size="xl">
          <h1 className="text-3xl font-bold md:text-4xl">{heading[kind].title}</h1>
          <p className="mt-3 max-w-2xl text-base leading-loose text-[color:var(--color-foreground-secondary)]">{heading[kind].description}</p>
          <div className="mt-6 max-w-sm">
            <Input type="search" aria-label="جستجو" placeholder="جستجو…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container size="xl">
          {filtered.length === 0 ? (
            <EmptyState title="چیزی یافت نشد" description={q ? "با عبارت دیگری جستجو کنید." : "به‌زودی محتوای این بخش منتشر می‌شود."} />
          ) : (
            <Grid cols={3}>
              {kind === "jashn"
                ? (filtered as Program[]).map((p) => <ProgramCard key={p.slug} program={p} />)
                : (filtered as StreamItem[]).map((s) => <StreamCard key={s.slug} item={s} />)}
            </Grid>
          )}
        </Container>
      </Section>
    </>
  );
}