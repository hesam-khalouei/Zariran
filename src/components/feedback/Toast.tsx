import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";
import { IconButton } from "../ui/IconButton";

export type ToastVariant = "success" | "error" | "info" | "warning";
export interface ToastItem {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastCtx { push: (t: Omit<ToastItem, "id">) => void; }

const Ctx = createContext<ToastCtx | null>(null);

const icons = {
  success: <CheckCircle2 aria-hidden="true" className="size-5 text-[color:var(--color-feedback-success-fg)]" />,
  error: <AlertCircle aria-hidden="true" className="size-5 text-[color:var(--color-feedback-error-fg)]" />,
  warning: <AlertTriangle aria-hidden="true" className="size-5 text-[color:var(--color-feedback-warning-fg)]" />,
  info: <Info aria-hidden="true" className="size-5 text-[color:var(--color-feedback-info-fg)]" />,
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const remove = useCallback((id: string) => {
    setItems((all) => all.filter((t) => t.id !== id));
  }, []);

  const push = useCallback((t: Omit<ToastItem, "id">) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const duration = t.duration ?? 5000;
    setItems((all) => [...all, { ...t, id }]);
    window.setTimeout(() => remove(id), duration);
  }, [remove]);

  return (
    <Ctx.Provider value={{ push }}>
      {children}
      {typeof document !== "undefined"
        ? createPortal(
            <div aria-live="polite" aria-atomic="false" className="fixed bottom-4 end-4 z-[1100] flex w-full max-w-sm flex-col gap-2">
              {items.map((t) => (
                <div key={t.id} role="status"
                  className="flex items-start gap-3 rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-raised)] p-3 shadow-lg">
                  <span className="mt-0.5">{icons[t.variant]}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[color:var(--color-foreground-default)]">{t.title}</p>
                    {t.description ? <p className="mt-0.5 text-xs text-[color:var(--color-foreground-muted)]">{t.description}</p> : null}
                  </div>
                  <IconButton label="بستن" onClick={() => remove(t.id)} icon={<X />} size="sm" />
                </div>
              ))}
            </div>,
            document.body,
          )
        : null}
    </Ctx.Provider>
  );
}

export function useToast(): ToastCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}