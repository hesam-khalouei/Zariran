import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { Alert } from "../components/ui/Alert";

export function IndependencePage() {
  return (
    <>
      <Section>
        <Container size="lg">
          <h1 className="text-3xl font-bold md:text-4xl">استقلال و اصول</h1>
          <p className="mt-4 max-w-2xl text-base leading-loose text-[color:var(--color-foreground-secondary)]">
            استقلالِ زریران، شرطِ بقای فرهنگی و امنیتِ همراهان است. این صفحه، اصولی را که زریران خود را
            به آن‌ها متعهد می‌داند، به روشنی بیان می‌کند.
          </p>
          <Alert variant="info" className="mt-8" title="جمع‌بندی">
            زریران وابسته به هیچ حکومت، حزب، یا جریان سیاسی نیست. فعالیت‌های خود را بر پایهٔ فرهنگ، تاریخ
            و زبانِ فارسی در ایران و ایرانشهر سازمان می‌دهد.
          </Alert>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container size="lg">
          <h2 className="text-xl font-semibold text-[color:var(--color-foreground-default)]">اصول</h2>
          <ul className="mt-4 flex flex-col gap-3 leading-loose text-[color:var(--color-foreground-secondary)]">
            <li>استقلال از هر حکومت، حزب یا جریان سیاسی.</li>
            <li>احترام به تنوعِ زبان‌ها، گویش‌ها و روایت‌ها در ایران و ایرانشهر.</li>
            <li>شفافیت در تصمیم‌ها و در نحوهٔ مصرف منابع.</li>
            <li>پرهیز از هرگونه استفادهٔ ابزاری از فرهنگ برای اهداف سیاسی.</li>
            <li>حفاظت از امنیت و حریم خصوصی همراهان.</li>
            <li>باز بودنِ فضا برای نقد، گفت‌وگو و تولید محتوا.</li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold text-[color:var(--color-foreground-default)]">امنیت همراهان</h2>
          <p className="mt-3 leading-loose text-[color:var(--color-foreground-secondary)]">
            زریران اطلاعات شخصی همراهان را جز در موارد ضروری و با رضایتِ صریح، ذخیره نمی‌کند و در
            صورت لزوم، آن را با شخص ثالث به اشتراک نمی‌گذارد. دسترسی به داده‌ها محدود به تیمِ فنی و
            مدیرانِ محتوای مربوطه است.
          </p>
        </Container>
      </Section>
    </>
  );
}