import { type ClassValue,clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines and merges class names, resolving Tailwind CSS conflicts.
 *
 * Accepts any number of class values, conditionally joins them, and merges Tailwind CSS classes to eliminate duplicates and conflicting styles.
 *
 * @returns The final merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
