import {
  createContext, useContext, useEffect, useState, type ReactNode,
} from "react";

type Theme = "light" | "dark";
type ThemeCtx = { theme: Theme; setTheme: (t: Theme) => void; toggle: () => void };

const Ctx = createContext<ThemeCtx | null>(null);
const STORAGE_KEY = "zariran.theme";

function safeStorage(): Storage | null {
  try {
    if (typeof window === "undefined") return null;
    const s = window.localStorage;
    if (!s) return null;
    return s;
  } catch {
    return null;
  }
}

function readInitial(): Theme {
  if (typeof window === "undefined") return "light";
  const storage = safeStorage();
  if (storage) {
    const stored = storage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  }
  if (typeof window.matchMedia === "function") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readInitial);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
    const storage = safeStorage();
    if (storage) {
      try { storage.setItem(STORAGE_KEY, theme); } catch { /* quota or disabled */ }
    }
  }, [theme]);

  const setTheme = (t: Theme) => setThemeState(t);
  const toggle = () => setThemeState((t) => (t === "dark" ? "light" : "dark"));

  return <Ctx.Provider value={{ theme, setTheme, toggle }}>{children}</Ctx.Provider>;
}

export function useTheme(): ThemeCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error("useTheme must be used within <ThemeProvider>");
  return v;
}