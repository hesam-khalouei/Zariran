const faDigits = ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"] as const;

export function toFaDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => faDigits[Number(d)]);
}

export function toEnDigits(input: string): string {
  return input.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
}

export function formatNumberFa(n: number, opts: Intl.NumberFormatOptions = {}): string {
  const s = new Intl.NumberFormat("en-US", opts).format(n);
  return toFaDigits(s);
}

export function formatDateFa(date: Date, opts: Intl.DateTimeFormatOptions = {}): string {
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...opts,
  }).format(date);
}

export function formatDateFaShort(date: Date): string {
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function formatDateGregorian(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function formatRelativeFa(date: Date, now = new Date()): string {
  const diffMs = now.getTime() - date.getTime();
  const days = Math.round(diffMs / 86_400_000);
  if (Math.abs(days) < 1) return "امروز";
  if (days === 1) return "دیروز";
  if (days === -1) return "فردا";
  if (days > 0 && days < 30) return `${toFaDigits(days)} روز پیش`;
  if (days < 0 && days > -30) return `${toFaDigits(-days)} روز آینده`;
  return formatDateFaShort(date);
}