import type { inferRouterOutputs } from "@trpc/server";

import type { appRouter } from "@/trpc/routers/_app";

export type Meeting = NonNullable<
  inferRouterOutputs<typeof appRouter>["meetings"]["get"]
>;

export const meetingStatus = [
  "upcoming",
  "active",
  "completed",
  "processing",
  "cancelled",
] as const;

export type MeetingStatus = (typeof meetingStatus)[number];

export type FetchedTranscript = {
  speaker_id: string;
  type: string;
  text: string;
  start_ts: number;
  stop_ts: number;
};

export type FormattedTranscript = {
  speaker: Speaker | null;
  type: string;
  text: string;
  start_time_formatted: string;
  stop_time_formatted: string;
};

export type Speaker = {
  id: string;
  name: string;
  image?: string | null;
};
