import { cn } from "../../lib/cn";

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("animate-pulse rounded-md bg-[color:var(--color-background-muted)] motion-reduce:animate-none", className)} />;
}