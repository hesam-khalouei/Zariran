import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Container } from "../layout/Container";
import { Button } from "../ui/Button";

export function HeroManifesto() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-[color:var(--color-border-subtle)]">
      <Container size="lg" className="relative py-20 md:py-28">
        <p className="mb-3 text-sm font-medium tracking-widest text-[color:var(--color-action-primary)] uppercase">زریران</p>
        <h1 id="hero-title" className="max-w-3xl text-4xl font-bold leading-tight text-[color:var(--color-foreground-default)] md:text-5xl">
          فرهنگ، تاریخ و زبانِ فارسی؛ از آنِ همه، برای همه.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-loose text-[color:var(--color-foreground-secondary)] md:text-lg">
          زریران یک پلتفرمِ فرهنگیِ مستقل است. وابسته به هیچ حکومت، حزب یا جریانِ سیاسی نیست. کارِ ما
          پاسداشتِ فرهنگ، تاریخ و زبانِ فارسی در ایران و ایرانشهر است — و باور داریم که هر ایرانی،
          یکی از فرهنگ‌سازانِ این سرزمین است.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link to="/about/independence">
            <Button size="lg">
              استقلال و اصول
              <ArrowLeft aria-hidden="true" className="size-4" />
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="ghost" size="lg">دربارهٔ زریران</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}