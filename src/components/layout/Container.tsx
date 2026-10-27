import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export function Container({ children, className, size = "xl" }: { children: ReactNode; className?: string; size?: "md" | "lg" | "xl" | "2xl" }) {
  const max = { md: "max-w-3xl", lg: "max-w-5xl", xl: "max-w-6xl", "2xl": "max-w-7xl" }[size];
  return <div className={cn("mx-auto w-full px-4", max, className)}>{children}</div>;
}