import { useId as useReactId } from "react";

export function useId(prefix = "z"): string {
  const id = useReactId();
  return `${prefix}-${id}`;
}