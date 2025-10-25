import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import {
  MeetingView,
  MeetingViewError,
  MeetingViewLoading,
} from "@/modules/meetings/ui/views/meeting-view";
import { getQueryClient, trpc } from "@/trpc/server";

interface Props {
  params: Promise<{
    meetingId: string;
  }>;
}

export const metadata: Metadata = {
  title: "Meeting",
};

const Page = async ({ params }: Props) => {
  const { meetingId } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.get.queryOptions({ id: meetingId })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingViewLoading />}>
        <ErrorBoundary fallback={<MeetingViewError />}>
          <MeetingView meetingId={meetingId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};
export default Page;
