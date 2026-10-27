import { cn } from "../../lib/cn";

export interface AvatarProps {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = { sm: "size-8 text-xs", md: "size-10 text-sm", lg: "size-12 text-base" } as const;

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "؟";
  if (parts.length === 1) return parts[0].slice(0, 2);
  return (parts[0][0] ?? "") + (parts[parts.length - 1][0] ?? "");
}

export function Avatar({ name, src, size = "md" }: AvatarProps) {
  return (
    <span className={cn("inline-flex items-center justify-center overflow-hidden rounded-full bg-[color:var(--color-background-muted)] text-[color:var(--color-foreground-secondary)] font-medium", sizes[size])} title={name}>
      {src ? <img src={src} alt="" className="size-full object-cover" /> : <span aria-hidden="true">{initials(name)}</span>}
      <span className="sr-only">{name}</span>
    </span>
  );
}