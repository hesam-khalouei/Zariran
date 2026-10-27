import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { useEscape } from "../../hooks/useEscape";
import { IconButton } from "../ui/IconButton";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  side?: "end" | "start";
  children: ReactNode;
}

export function Drawer({ open, onClose, title, side = "end", children }: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, open);
  useEscape(open, onClose);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div role="presentation" className="fixed inset-0 z-[900]" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div aria-hidden="true" className="absolute inset-0 bg-[color:var(--color-surface-overlay)]" />
      <div ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="drawer-title"
        className={`absolute top-0 h-full w-full max-w-sm bg-[color:var(--color-surface-raised)] shadow-xl ${side === "end" ? "end-0" : "start-0"}`}>
        <div className="flex items-center justify-between border-b border-[color:var(--color-border-subtle)] p-4">
          <h2 id="drawer-title" className="text-base font-semibold">{title}</h2>
          <IconButton label="بستن" onClick={onClose} icon={<X />} size="sm" />
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>,
    document.body,
  );
}