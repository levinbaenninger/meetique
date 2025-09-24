import type { MeetingStatus } from './types';

export const isMeetingStarted = (status: MeetingStatus): boolean => {
  return (
    status === 'active' ||
    status === 'completed' ||
    status === 'processing' ||
    status === 'cancelled'
  );
};
