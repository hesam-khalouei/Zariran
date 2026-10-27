import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

const gapMap = { 1: "gap-1", 2: "gap-2", 3: "gap-3", 4: "gap-4", 6: "gap-6", 8: "gap-8", 12: "gap-12" } as const;

export function Stack({ children, gap = 4, className }: { children: ReactNode; gap?: keyof typeof gapMap; className?: string }) {
  return <div className={cn("flex flex-col", gapMap[gap], className)}>{children}</div>;
}