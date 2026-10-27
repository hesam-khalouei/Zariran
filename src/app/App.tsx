import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "../lib/theme";
import { ToastProvider } from "../components/feedback";
import { SiteHeader, SiteFooter, MobileNav } from "../components/navigation";

export function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <ThemeProvider>
      <ToastProvider>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:start-2 focus:z-50 focus:rounded-md focus:bg-[color:var(--color-action-primary)] focus:px-3 focus:py-2 focus:text-[color:var(--color-action-primary-foreground)]">
          رفتن به محتوای اصلی
        </a>
        <SiteHeader onOpenMobileNav={() => setMobileOpen(true)} />
        <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
        <main id="main" className="min-h-[60vh]"><Outlet /></main>
        <SiteFooter />
      </ToastProvider>
    </ThemeProvider>
  );
}