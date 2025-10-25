import { addDays, differenceInDays, isBefore } from "date-fns";

import { RESOURCE_RETENTION_DAYS } from "@/modules/meetings/constants";
import type { MeetingStatus } from "@/modules/meetings/types";

export const isLockedStatus = (status: MeetingStatus): boolean =>
  status !== "upcoming";

export const getResourcesExpiryDate = (endedAt: Date): Date =>
  addDays(endedAt, RESOURCE_RETENTION_DAYS);

export const areResourcesAvailable = (endedAt: Date | null): boolean => {
  if (!endedAt) {
    return false;
  }
  const expiryDate = getResourcesExpiryDate(endedAt);
  return isBefore(new Date(), expiryDate);
};

export const getDaysUntilExpiry = (endedAt: Date): number => {
  const expiryDate = getResourcesExpiryDate(endedAt);
  const days = differenceInDays(expiryDate, new Date());
  return Math.max(0, days);
};
