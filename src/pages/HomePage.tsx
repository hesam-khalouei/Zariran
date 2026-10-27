import { Link } from "react-router-dom";
import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { Grid } from "../components/layout/Grid";
import { Stack } from "../components/layout/Stack";
import { Button } from "../components/ui/Button";
import { HeroManifesto } from "../components/product/HeroManifesto";
import { ProgramCard } from "../components/product/ProgramCard";
import { StreamCard } from "../components/product/StreamCard";
import { programs } from "../data/programs";
import { memories } from "../data/memories";
import { reports } from "../data/reports";
import { statements } from "../data/statements";

export function HomePage() {
  const upcoming = programs.filter((p) => p.status !== "past").slice(0, 3);
  return (
    <>
      <HeroManifesto />

      <Section>
        <Container size="xl">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold text-[color:var(--color-foreground-default)] md:text-3xl">جشن تا جشن</h2>
            <Link to="/jashn" className="text-sm text-[color:var(--color-action-primary)] hover:underline">همهٔ برنامه‌ها</Link>
          </div>
          <Grid cols={3}>
            {upcoming.map((p) => <ProgramCard key={p.slug} program={p} />)}
          </Grid>
        </Container>
      </Section>

      <Section className="bg-[color:var(--color-background-subtle)]">
        <Container size="xl">
          <h2 className="mb-6 text-2xl font-semibold md:text-3xl">سه روایت، سه زمان</h2>
          <Grid cols={3}>
            <div>
              <p className="mb-3 text-sm font-semibold text-[color:var(--color-action-primary)]">گذشته — خاطرات</p>
              <Stack gap={3}>{memories.map((m) => <StreamCard key={m.slug} item={m} />)}</Stack>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold text-[color:var(--color-action-primary)]">امروز — گزارش‌ها</p>
              <Stack gap={3}>{reports.map((r) => <StreamCard key={r.slug} item={r} />)}</Stack>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold text-[color:var(--color-action-primary)]">آینده — بیانیه‌ها و فراخوان‌ها</p>
              <Stack gap={3}>{statements.map((s) => <StreamCard key={s.slug} item={s} />)}</Stack>
            </div>
          </Grid>
        </Container>
      </Section>

      <Section>
        <Container size="lg">
          <div className="rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-default)] p-8 md:p-12">
            <h2 className="text-2xl font-semibold">همراهِ زریران شوید</h2>
            <p className="mt-3 max-w-2xl text-sm leading-loose text-[color:var(--color-foreground-secondary)]">
              زریران در گام نخست است. اگر باور دارید که فرهنگ، تاریخ و زبانِ فارسی سرمایهٔ مشترکِ ماست،
              راه‌های همراهی را ببینید — از شرکت در نظرسنجی تا پیشنهادِ برنامه و پیامِ مستقیم.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/poll"><Button>نظرسنجی</Button></Link>
              <Link to="/contact"><Button variant="ghost">تماس</Button></Link>
              <Link to="/roadmap"><Button variant="ghost">نقشهٔ راه</Button></Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}