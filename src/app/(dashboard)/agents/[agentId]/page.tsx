import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import {
  AgentView,
  AgentViewError,
  AgentViewLoading,
} from "@/modules/agents/ui/views/agent-view";
import { getQueryClient, trpc } from "@/trpc/server";

interface Props {
  params: Promise<{ agentId: string }>;
}

export const metadata: Metadata = {
  title: "Agent",
};

const Page = async ({ params }: Props) => {
  const { agentId } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.get.queryOptions({ id: agentId }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentViewLoading />}>
        <ErrorBoundary fallback={<AgentViewError />}>
          <AgentView agentId={agentId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
