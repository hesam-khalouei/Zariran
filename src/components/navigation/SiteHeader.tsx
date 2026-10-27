import { Link, NavLink } from "react-router-dom";
import { Moon, Sun, Menu } from "lucide-react";
import { IconButton } from "../ui/IconButton";
import { useTheme } from "../../lib/theme";
import { cn } from "../../lib/cn";

const navItems = [
  { to: "/jashn", label: "جشن تا جشن" },
  { to: "/khatereh", label: "خاطرات" },
  { to: "/gozaresh", label: "گزارش‌ها" },
  { to: "/bayan", label: "بیانیه‌ها" },
  { to: "/poll", label: "نظرسنجی" },
  { to: "/about", label: "درباره ما" },
];

export function SiteHeader({ onOpenMobileNav }: { onOpenMobileNav: () => void }) {
  const { theme, toggle } = useTheme();
  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--color-border-subtle)] bg-[color:var(--color-background-default)]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
        <Link to="/" className="flex items-center gap-2">
          <span aria-hidden="true" className="inline-block size-6 rounded bg-[color:var(--color-lapis-700)]" />
          <span className="font-semibold tracking-tight text-[color:var(--color-foreground-default)]">زریران</span>
        </Link>
        <nav aria-label="اصلی" className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to}
              className={({ isActive }) => cn(
                "rounded-md px-3 py-2 text-sm transition-colors",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus-ring)]",
                isActive
                  ? "text-[color:var(--color-action-primary)] font-medium"
                  : "text-[color:var(--color-foreground-secondary)] hover:bg-[color:var(--color-background-subtle)]",
              )}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="ms-auto flex items-center gap-1">
          <IconButton label={theme === "dark" ? "حالت روشن" : "حالت تاریک"} onClick={toggle} icon={theme === "dark" ? <Sun /> : <Moon />} size="sm" />
          <span className="md:hidden">
            <IconButton label="منو" onClick={onOpenMobileNav} icon={<Menu />} size="sm" />
          </span>
        </div>
      </div>
    </header>
  );
}