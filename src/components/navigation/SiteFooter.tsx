import { Link } from "react-router-dom";

const groups = [
  { title: "زریران", links: [
    { to: "/about", label: "درباره ما" },
    { to: "/about/independence", label: "استقلال و اصول" },
    { to: "/roadmap", label: "نقشه راه" },
  ]},
  { title: "فرهنگ", links: [
    { to: "/jashn", label: "جشن تا جشن" },
    { to: "/khatereh", label: "خاطرات" },
    { to: "/gozaresh", label: "گزارش‌ها" },
    { to: "/bayan", label: "بیانیه‌ها و فراخوان‌ها" },
  ]},
  { title: "همراهی", links: [
    { to: "/poll", label: "نظرسنجی" },
    { to: "/contact", label: "تماس" },
    { to: "/design", label: "سیستم طراحی" },
  ]},
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-background-subtle)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <p className="font-semibold text-[color:var(--color-foreground-default)]">زریران</p>
          <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-foreground-muted)]">
            پلتفرمی فرهنگی، مستقل و غیرسیاسی؛ برای پاسداشت زبان فارسی، تاریخ و فرهنگ ایران و ایرانشهر.
          </p>
        </div>
        {groups.map((g) => (
          <div key={g.title}>
            <p className="mb-3 text-sm font-semibold text-[color:var(--color-foreground-default)]">{g.title}</p>
            <ul className="flex flex-col gap-2">
              {g.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-[color:var(--color-foreground-secondary)] hover:text-[color:var(--color-action-primary)]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-[color:var(--color-border-subtle)]">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-[color:var(--color-foreground-muted)]">© زریران — گام نخست.</p>
      </div>
    </footer>
  );
}