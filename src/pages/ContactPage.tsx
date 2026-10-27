import { useState, type FormEvent } from "react";
import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { FormField } from "../components/forms";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { Select } from "../components/ui/Select";
import { Button } from "../components/ui/Button";
import { Alert } from "../components/ui/Alert";
import { useToast } from "../components/feedback";

interface FormState { name: string; email: string; topic: string; message: string; }
const initial: FormState = { name: "", email: "", topic: "general", message: "" };

export function ContactPage() {
  const { push } = useToast();
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): boolean {
    const next: typeof errors = {};
    if (form.name.trim().length < 2) next.name = "نام را کامل‌تر بنویسید.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "ایمیل معتبر نیست.";
    if (form.message.trim().length < 10) next.message = "پیام باید دست‌کم ۱۰ نویسه باشد.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    push({ variant: "info", title: "پیام شما ثبت شد (نمایشی)", description: "در گام نخست، ارسال واقعیِ پیام پیاده‌سازی نشده است." });
    setForm(initial);
  }

  return (
    <Section>
      <Container size="md">
        <h1 className="text-3xl font-bold md:text-4xl">همراهی و تماس</h1>
        <p className="mt-3 text-base leading-loose text-[color:var(--color-foreground-secondary)]">برای پیشنهادِ برنامه، همکاری، یا هر پرسش، از این فرم بنویسید.</p>

        <Alert variant="warning" className="mt-6" title="توجه">
          این فرم در گام نخست، صرفاً در مرورگر اعتبارسنجی می‌شود و پیام شما جایی ذخیره یا ارسال
          نمی‌شود. اتصال به سرور در نقشهٔ راه است.
        </Alert>

        {submitted ? <Alert variant="success" className="mt-6" title="ثبت شد">اگر این فرم به سرور متصل بود، پیام شما ارسال می‌شد.</Alert> : null}

        <form onSubmit={onSubmit} noValidate className="mt-8 flex flex-col gap-5">
          <FormField label="نام" required error={errors.name}>
            {({ inputId, describedBy, invalid }) => (
              <Input id={inputId} aria-describedby={describedBy} invalid={invalid} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" />
            )}
          </FormField>

          <FormField label="ایمیل" required error={errors.email} hint="مثال: name@example.com">
            {({ inputId, describedBy, invalid }) => (
              <Input id={inputId} aria-describedby={describedBy} invalid={invalid} ltr type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" />
            )}
          </FormField>

          <FormField label="موضوع">
            {({ inputId }) => (
              <Select id={inputId} value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}
                options={[
                  { value: "general", label: "پرسش عمومی" },
                  { value: "program", label: "پیشنهاد برنامه" },
                  { value: "collab", label: "همکاری" },
                  { value: "press", label: "رسانه" },
                ]} />
            )}
          </FormField>

          <FormField label="پیام" required error={errors.message}>
            {({ inputId, describedBy, invalid }) => (
              <Textarea id={inputId} aria-describedby={describedBy} invalid={invalid} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={6} />
            )}
          </FormField>

          <div><Button type="submit">ارسال پیام</Button></div>
        </form>
      </Container>
    </Section>
  );
}