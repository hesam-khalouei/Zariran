import { NavLink } from "react-router-dom";
import { Drawer } from "../feedback/Drawer";

const items = [
  { to: "/", label: "خانه" },
  { to: "/jashn", label: "جشن تا جشن" },
  { to: "/khatereh", label: "خاطرات" },
  { to: "/gozaresh", label: "گزارش‌ها" },
  { to: "/bayan", label: "بیانیه‌ها" },
  { to: "/poll", label: "نظرسنجی" },
  { to: "/about", label: "درباره ما" },
  { to: "/about/independence", label: "استقلال و اصول" },
  { to: "/roadmap", label: "نقشه راه" },
  { to: "/contact", label: "تماس" },
];

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Drawer open={open} onClose={onClose} title="منو" side="end">
      <nav aria-label="منوی موبایل">
        <ul className="flex flex-col gap-1">
          {items.map((i) => (
            <li key={i.to}>
              <NavLink to={i.to} onClick={onClose}
                className={({ isActive }) => `block rounded-md px-3 py-2 text-sm ${
                  isActive
                    ? "bg-[color:var(--color-background-subtle)] text-[color:var(--color-action-primary)] font-medium"
                    : "text-[color:var(--color-foreground-secondary)] hover:bg-[color:var(--color-background-subtle)]"
                }`}>
                {i.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </Drawer>
  );
}