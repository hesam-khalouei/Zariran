import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export function Grid({ children, cols = 3, className }: { children: ReactNode; cols?: 1 | 2 | 3 | 4; className?: string }) {
  const colsMap = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  } as const;
  return <div className={cn("grid gap-6", colsMap[cols], className)}>{children}</div>;
}