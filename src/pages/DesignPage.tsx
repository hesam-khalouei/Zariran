import { useState } from "react";
import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Input } from "../components/ui/Input";
import { Checkbox } from "../components/ui/Checkbox";
import { Radio } from "../components/ui/Radio";
import { Switch } from "../components/ui/Switch";
import { Alert } from "../components/ui/Alert";
import { Tabs, TabList, Tab, TabPanel } from "../components/ui/Tabs";
import { Modal } from "../components/feedback/Modal";

const swatches = [
  { name: "Lapis 700", cls: "bg-[color:var(--color-lapis-700)]" },
  { name: "Turquoise 600", cls: "bg-[color:var(--color-turquoise-600)]" },
  { name: "Saffron 500", cls: "bg-[color:var(--color-saffron-500)]" },
  { name: "Pomegranate 600", cls: "bg-[color:var(--color-pomegranate-600)]" },
  { name: "Pistachio 600", cls: "bg-[color:var(--color-pistachio-600)]" },
  { name: "Stone-warm 100", cls: "bg-[color:var(--color-stone-warm-100)]" },
  { name: "Ink 900", cls: "bg-[color:var(--color-ink-900)]" },
];

export function DesignPage() {
  const [tab, setTab] = useState("a");
  const [modal, setModal] = useState(false);

  return (
    <Section>
      <Container size="xl">
        <h1 className="text-3xl font-bold">سیستم طراحی زریران</h1>
        <p className="mt-3 max-w-2xl text-base leading-loose text-[color:var(--color-foreground-secondary)]">
          نمایشِ زندهٔ توکن‌ها و مؤلفه‌ها. برای رنگ‌ها، حالت روشن و تاریک را از سربرگ تغییر دهید.
        </p>

        <h2 className="mt-12 text-xl font-semibold">رنگ‌های برند</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {swatches.map((s) => (
            <div key={s.name} className="flex flex-col gap-1">
              <div className={`h-16 rounded-md border border-[color:var(--color-border-subtle)] ${s.cls}`} />
              <span className="text-xs text-[color:var(--color-foreground-muted)]">{s.name}</span>
            </div>
          ))}
        </div>

        <h2 className="mt-12 text-xl font-semibold">دکمه‌ها</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button>اصلی</Button>
          <Button variant="secondary">ثانویه</Button>
          <Button variant="ghost">سایه‌ای</Button>
          <Button variant="destructive">حذف</Button>
          <Button isLoading>در حال ارسال</Button>
          <Button disabled>غیرفعال</Button>
        </div>

        <h2 className="mt-12 text-xl font-semibold">نشان‌ها</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge>عادی</Badge>
          <Badge variant="success">موفق</Badge>
          <Badge variant="warning">هشدار</Badge>
          <Badge variant="error">خطا</Badge>
          <Badge variant="info">اطلاع</Badge>
        </div>

        <h2 className="mt-12 text-xl font-semibold">فرم‌ها</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Input placeholder="ورودی متنی" aria-label="ورودی نمونه" />
          <Input placeholder="name@example.com" ltr aria-label="ایمیل نمونه" />
          <Checkbox label="مرا به یاد بسپار" />
          <Radio name="d" label="گزینه یک" />
          <Switch label="فعال‌سازی" />
        </div>

        <h2 className="mt-12 text-xl font-semibold">هشدارها</h2>
        <div className="mt-4 flex flex-col gap-3">
          <Alert variant="info" title="اطلاع">این یک پیام اطلاع‌رسانی است.</Alert>
          <Alert variant="success" title="موفق">عملیات با موفقیت انجام شد.</Alert>
          <Alert variant="warning" title="هشدار">به این نکته توجه کنید.</Alert>
          <Alert variant="error" title="خطا">مشکلی پیش آمد.</Alert>
        </div>

        <h2 className="mt-12 text-xl font-semibold">زبانه‌ها و لایه‌ها</h2>
        <div className="mt-4">
          <Tabs value={tab} onChange={setTab}>
            <TabList label="نمونه"><Tab value="a">تب اول</Tab><Tab value="b">تب دوم</Tab></TabList>
            <TabPanel value="a">محتوای تب اول.</TabPanel>
            <TabPanel value="b">محتوای تب دوم.</TabPanel>
          </Tabs>
        </div>
        <div className="mt-4">
          <Button onClick={() => setModal(true)}>باز کردن مودال</Button>
          <Modal open={modal} onClose={() => setModal(false)} title="مودال نمونه" description="برای نمایش رفتار فوکوس.">
            <p className="text-sm leading-relaxed">این یک مودالِ نمونه است.</p>
          </Modal>
        </div>
      </Container>
    </Section>
  );
}