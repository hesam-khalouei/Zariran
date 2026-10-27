import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { Stack } from "../components/layout/Stack";

const sections = [
  {
    title: "استراتژی",
    body: "زریران می‌کوشد فضایی فراهم کند که در آن، هر ایرانی — در هر جای جهان — بتواند در پاسداشتِ فرهنگ، تاریخ و زبانِ فارسی سهیم شود. تمرکزِ گام نخست بر روایت‌گری، برنامه‌های فرهنگی، و ثبتِ خاطرات و گزارش‌هاست.",
  },
  {
    title: "چشم‌انداز",
    body: "زریران در پی آن است که به مرجعی فرهنگی برای پژوهش، روایت و گفت‌وگو دربارهٔ ایران و ایرانشهر بدل شود؛ مرجعی مستقل، غیرسیاسی، و باز برای همه.",
  },
  {
    title: "ارزش‌ها",
    body: "استقلال از هر حکومت و جریان سیاسی. احترام به تنوعِ زبان‌ها، گویش‌ها و روایت‌ها. شفافیت در تصمیم‌ها. و باور به این‌که فرهنگ، کارِ جمعی است — نه کارِ یک گروه.",
  },
];

export function AboutPage() {
  return (
    <>
      <Section>
        <Container size="lg">
          <h1 className="text-3xl font-bold md:text-4xl">دربارهٔ زریران</h1>
          <p className="mt-4 max-w-2xl text-base leading-loose text-[color:var(--color-foreground-secondary)]">
            زریران یک پلتفرم فرهنگی است؛ گام نخست از مسیری که امیدواریم سال‌ها ادامه یابد. در این صفحه،
            استراتژی، چشم‌انداز و ارزش‌های خود را با شما در میان می‌گذاریم.
          </p>
        </Container>
      </Section>
      <Section className="bg-[color:var(--color-background-subtle)] pt-0">
        <Container size="lg">
          <Stack gap={8}>
            {sections.map((s) => (
              <article key={s.title}>
                <h2 className="text-xl font-semibold text-[color:var(--color-foreground-default)]">{s.title}</h2>
                <p className="mt-2 max-w-2xl text-base leading-loose text-[color:var(--color-foreground-secondary)]">{s.body}</p>
              </article>
            ))}
          </Stack>
        </Container>
      </Section>
    </>
  );
}