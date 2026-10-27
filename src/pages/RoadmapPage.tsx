import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { Badge } from "../components/ui/Badge";
import { roadmap } from "../data/roadmap";

const groupLabel = {
  done: { text: "انجام‌شده", variant: "success" as const },
  "in-progress": { text: "در حال انجام", variant: "info" as const },
  planned: { text: "برنامه‌ریزی‌شده", variant: "neutral" as const },
};

export function RoadmapPage() {
  return (
    <Section>
      <Container size="lg">
        <h1 className="text-3xl font-bold md:text-4xl">نقشهٔ راه</h1>
        <p className="mt-3 max-w-2xl text-base leading-loose text-[color:var(--color-foreground-secondary)]">
          زریران مرحله‌به‌مرحله رشد می‌کند. این صفحه، صادقانه نشان می‌دهد چه چیزی انجام شده، چه چیزی در
          جریان است، و چه چیزی هنوز در مرحلهٔ برنامه‌ریزی است.
        </p>
        <ol className="mt-10 flex flex-col gap-4">
          {roadmap.map((r, i) => {
            const g = groupLabel[r.phase];
            return (
              <li key={i} className="rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-default)] p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant={g.variant}>{g.text}</Badge>
                  <h2 className="text-base font-semibold">{r.title}</h2>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-foreground-secondary)]">{r.description}</p>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}