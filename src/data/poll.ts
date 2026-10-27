import type { Poll } from "./types";

export const activePoll: Poll = {
  id: "poll-jashn-next",
  question: "دوست دارید جشنِ بعدیِ زریران در کدام شهر برگزار شود؟",
  context: "این نظرسنجی صرفاً برای سنجشِ علاقه است و نتیجهٔ آن قطعی نیست.",
  options: [
    { id: "tehran", label: "تهران" },
    { id: "isfahan", label: "اصفهان" },
    { id: "shiraz", label: "شیراز" },
    { id: "tabriz", label: "تبریز" },
    { id: "mashhad", label: "مشهد" },
    { id: "other", label: "شهر دیگر" },
  ],
  closesAt: "2025-12-31T23:59:59+03:30",
  alreadyVotedNote: "شما در این نظرسنجی رأی داده‌اید. این رأی صرفاً در همین مرورگر نگه داشته می‌شود.",
};