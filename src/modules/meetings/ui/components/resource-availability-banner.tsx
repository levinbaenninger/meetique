import { format } from "date-fns";
import { AlertCircleIcon, InfoIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RESOURCE_RETENTION_DAYS } from "@/modules/meetings/constants";
import {
  areResourcesAvailable,
  getDaysUntilExpiry,
  getResourcesExpiryDate,
} from "@/modules/meetings/utils";

interface Props {
  endedAt: Date | null;
  hasTranscript: boolean;
  hasRecording: boolean;
}

export const ResourceAvailabilityBanner = ({
  endedAt,
  hasTranscript,
  hasRecording,
}: Props) => {
  if (!(endedAt && (hasTranscript || hasRecording))) {
    return null;
  }

  const isAvailable = areResourcesAvailable(endedAt);
  const daysLeft = isAvailable ? getDaysUntilExpiry(endedAt) : 0;
  const expiryDate = getResourcesExpiryDate(endedAt);

  const expiryMessage = () => {
    if (daysLeft === 0) {
      return <>Transcript and recording expire today</>;
    }
    if (daysLeft === 1) {
      return <>Transcript and recording expire tomorrow</>;
    }
    return (
      <>
        Transcript and recording available for {daysLeft} more days (until{" "}
        {format(expiryDate, "PPP")})
      </>
    );
  };

  if (isAvailable) {
    return (
      <Alert>
        <InfoIcon />
        <AlertTitle>Resources Available</AlertTitle>
        <AlertDescription>{expiryMessage()}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>Resources No Longer Available</AlertTitle>
      <AlertDescription>
        The transcript and recording are no longer available. Stream resources
        are retained for {RESOURCE_RETENTION_DAYS} days after the meeting ends.
      </AlertDescription>
    </Alert>
  );
};
