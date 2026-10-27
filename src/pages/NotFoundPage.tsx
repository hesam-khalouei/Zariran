import { Link } from "react-router-dom";
import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { Button } from "../components/ui/Button";

export function NotFoundPage() {
  return (
    <Section>
      <Container size="md">
        <p className="text-sm text-[color:var(--color-foreground-muted)]">۴۰۴</p>
        <h1 className="mt-2 text-3xl font-bold">صفحه پیدا نشد</h1>
        <p className="mt-3 text-base leading-loose text-[color:var(--color-foreground-secondary)]">
          ممکن است نشانی اشتباه باشد یا این صفحه حذف شده باشد.
        </p>
        <div className="mt-6"><Link to="/"><Button>بازگشت به خانه</Button></Link></div>
      </Container>
    </Section>
  );
}