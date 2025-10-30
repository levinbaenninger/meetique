import { type ClassValue, clsx } from "clsx";
import humanizeDuration from "humanize-duration";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SECONDS_TO_MILLISECONDS = 1000;

export const formatDuration = (seconds: number) =>
  humanizeDuration(seconds * SECONDS_TO_MILLISECONDS, {
    largest: 1,
    round: true,
    units: ["h", "m", "s"],
  });
