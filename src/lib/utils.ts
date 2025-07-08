import { type ClassValue, clsx } from 'clsx';
import humanizeDuration from 'humanize-duration';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDuration = (seconds: number) => {
  return humanizeDuration(seconds * 1000, {
    largest: 1,
    round: true,
    units: ['h', 'm', 's'],
  });
};
