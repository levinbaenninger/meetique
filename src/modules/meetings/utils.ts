import type { MeetingStatus } from './types';

export const isLockedStatus = (status: MeetingStatus): boolean => {
  return status !== 'upcoming';
};
