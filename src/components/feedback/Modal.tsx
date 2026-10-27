import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { useEscape } from "../../hooks/useEscape";
import { IconButton } from "../ui/IconButton";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
}

const sizes = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl" } as const;

export function Modal({ open, onClose, title, description, children, footer, size = "md" }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(dialogRef, open);
  useEscape(open, onClose);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div role="presentation" className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div aria-hidden="true" className="absolute inset-0 bg-[color:var(--color-surface-overlay)]" />
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby={description ? "modal-desc" : undefined}
        className={`relative w-full ${sizes[size]} rounded-lg bg-[color:var(--color-surface-raised)] shadow-xl`}>
        <div className="flex items-start justify-between gap-4 p-5 pb-3">
          <div>
            <h2 id="modal-title" className="text-lg font-semibold text-[color:var(--color-foreground-default)]">{title}</h2>
            {description ? <p id="modal-desc" className="mt-1 text-sm text-[color:var(--color-foreground-muted)]">{description}</p> : null}
          </div>
          <IconButton label="بستن" onClick={onClose} icon={<X />} size="sm" />
        </div>
        <div className="px-5 pb-5">{children}</div>
        {footer ? <div className="flex items-center justify-start gap-2 border-t border-[color:var(--color-border-subtle)] p-4">{footer}</div> : null}
      </div>
    </div>,
    document.body,
  );
}