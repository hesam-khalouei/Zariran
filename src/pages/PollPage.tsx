import { useState } from "react";
import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { Card } from "../components/ui/Card";
import { Radio } from "../components/ui/Radio";
import { Button } from "../components/ui/Button";
import { Alert } from "../components/ui/Alert";
import { Progress } from "../components/ui/Progress";
import { toFaDigits, formatDateFa } from "../lib/persian";
import { activePoll } from "../data/poll";
import { useToast } from "../components/feedback";

const storageKey = `zariran.poll.${activePoll.id}`;

export function PollPage() {
  const { push } = useToast();
  const [choice, setChoice] = useState<string>("");
  const [voted, setVoted] = useState<string | null>(() => {
    try { return window.localStorage.getItem(storageKey); } catch { return null; }
  });
  const [tally, setTally] = useState<Record<string, number>>(() => ({
    tehran: 42, isfahan: 28, shiraz: 17, tabriz: 9, mashhad: 11, other: 5,
  }));

  function submit() {
    if (!choice) return;
    try { window.localStorage.setItem(storageKey, choice); } catch { /* ignore */ }
    setVoted(choice);
    setTally((t) => ({ ...t, [choice]: (t[choice] ?? 0) + 1 }));
    push({ variant: "success", title: "رأی شما ثبت شد", description: activePoll.alreadyVotedNote });
  }

  const total = Object.values(tally).reduce((a, b) => a + b, 0);

  return (
    <Section>
      <Container size="md">
        <h1 className="text-3xl font-bold md:text-4xl">نظرسنجی</h1>
        <p className="mt-3 text-base leading-loose text-[color:var(--color-foreground-secondary)]">{activePoll.context}</p>

        <Card padding="lg" className="mt-8">
          <h2 className="text-lg font-semibold">{activePoll.question}</h2>
          <p className="mt-1 text-xs text-[color:var(--color-foreground-muted)]">تا {formatDateFa(new Date(activePoll.closesAt))}</p>

          {!voted ? (
            <div className="mt-6 flex flex-col gap-3" role="radiogroup" aria-label="گزینه‌ها">
              {activePoll.options.map((o) => (
                <Radio key={o.id} name="poll" value={o.id} checked={choice === o.id} onChange={() => setChoice(o.id)} label={o.label} />
              ))}
              <div className="mt-2"><Button onClick={submit} disabled={!choice}>ثبت رأی</Button></div>
            </div>
          ) : (
            <div className="mt-6 flex flex-col gap-4">
              <Alert variant="info" title="شما رأی داده‌اید">{activePoll.alreadyVotedNote}</Alert>
              <div className="flex flex-col gap-3">
                {activePoll.options.map((o) => {
                  const v = tally[o.id] ?? 0;
                  const pct = total === 0 ? 0 : (v / total) * 100;
                  return (
                    <div key={o.id}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className={voted === o.id ? "font-semibold" : ""}>{o.label}</span>
                        <span className="text-[color:var(--color-foreground-muted)]">{toFaDigits(v)} رأی ({toFaDigits(Math.round(pct))}٪)</span>
                      </div>
                      <Progress value={pct} />
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-[color:var(--color-foreground-muted)]">مجموع: {toFaDigits(total)} رأیِ نمایشی. شمارشِ واقعی در نقشهٔ راه است.</p>
            </div>
          )}
        </Card>
      </Container>
    </Section>
  );
}