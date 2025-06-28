'use client';

import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';

export const MeetingsView = () => {
  // const trpc = useTRPC();
  // const { data: meetings } = useSuspenseQuery(
  //   trpc.meetings.list.queryOptions({}),
  // );

  return <></>;
};

export const MeetingsViewLoading = () => (
  <LoadingState
    title='Loading meetings'
    description='This may take a few seconds.'
  />
);

export const MeetingsViewError = () => (
  <ErrorState
    title='Error loading meetings'
    description='Please try again later.'
  />
);
