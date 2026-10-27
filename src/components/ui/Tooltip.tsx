import { useId, useState, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface TooltipProps {
  content: string;
  children: ReactNode;
  side?: "top" | "bottom";
}

export function Tooltip({ content, children, side = "top" }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <span className="relative inline-flex" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}>
      <span aria-describedby={open ? id : undefined} className="inline-flex">{children}</span>
      {open ? (
        <span role="tooltip" id={id} className={cn(
          "pointer-events-none absolute z-50 whitespace-nowrap rounded bg-[color:var(--color-foreground-default)] px-2 py-1 text-xs text-[color:var(--color-foreground-inverse)] shadow-md",
          "start-1/2 -translate-x-1/2 rtl:translate-x-1/2",
          side === "top" ? "bottom-full mb-1" : "top-full mt-1",
        )}>
          {content}
        </span>
      ) : null}
    </span>
  );
}