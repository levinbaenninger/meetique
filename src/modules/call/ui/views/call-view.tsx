"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/lib/trpc";
import { CallProvider } from "@/modules/call/ui/components/call-provider";

interface Props {
  meetingId: string;
}

export const CallView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const { data: meeting } = useSuspenseQuery(
    trpc.meetings.get.queryOptions({ id: meetingId })
  );

  if (meeting.status === "completed") {
    return (
      <div className="flex h-screen items-center justify-center">
        <ErrorState
          description="You can no longer join this meeting."
          title="Meeting has ended"
        />
      </div>
    );
  }

  return <CallProvider meetingId={meetingId} meetingName={meeting.name} />;
};

export const CallViewLoading = () => (
  <LoadingState
    description="This may take a few seconds."
    title="Loading call"
  />
);

export const CallViewError = () => (
  <ErrorState
    description="Please try again later."
    title="Error loading call"
  />
);
