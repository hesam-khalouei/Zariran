import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export function Section({ children, className, as: Tag = "section", id }: { children: ReactNode; className?: string; as?: "section" | "div" | "article"; id?: string }) {
  return <Tag id={id} className={cn("py-16 md:py-24", className)}>{children}</Tag>;
}