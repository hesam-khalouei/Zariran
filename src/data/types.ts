export interface Program {
  slug: string;
  title: string;
  summary: string;
  city: string;
  date: string;
  status: "upcoming" | "past" | "ongoing";
}

export type StreamKind = "khatereh" | "gozaresh" | "bayan";

export interface StreamItem {
  slug: string;
  kind: StreamKind;
  title: string;
  summary: string;
  body: string;
  author: string;
  date: string;
  tags?: string[];
}

export interface PollOption {
  id: string;
  label: string;
}

export interface Poll {
  id: string;
  question: string;
  context: string;
  options: PollOption[];
  closesAt: string;
  alreadyVotedNote: string;
}

export interface RoadmapItem {
  phase: "done" | "in-progress" | "planned";
  title: string;
  description: string;
}