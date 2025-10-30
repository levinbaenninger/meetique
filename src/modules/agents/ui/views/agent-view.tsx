"use client";

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { ErrorState } from "@/components/error-state";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { LoadingState } from "@/components/loading-state";
import { Badge } from "@/components/ui/badge";
import { useConfirm } from "@/hooks/use-confirm";
import { useTRPC } from "@/lib/trpc";
import { AgentHeader } from "@/modules/agents/ui/components/agent-header";
import { UpdateAgentDialog } from "@/modules/agents/ui/components/update-agent-dialog";

interface Props {
  agentId: string;
}

export const AgentView = ({ agentId }: Props) => {
  const router = useRouter();
  const [updateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false);

  const queryClient = useQueryClient();
  const trpc = useTRPC();
  const { data: agent } = useSuspenseQuery(
    trpc.agents.get.queryOptions({ id: agentId })
  );

  const removeAgent = useMutation(
    trpc.agents.delete.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.agents.list.queryOptions({}));
        await queryClient.invalidateQueries(
          trpc.premium.getFreeUsage.queryOptions()
        );
        router.push("/agents");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const [RemoveConfirmDialog, confirmRemove] = useConfirm(
    "Are you absolutely sure?",
    `This action cannot be undone. This will permanently delete this agent and all ${agent.meetingCount} meetings associated with it.`,
    "Delete Agent"
  );

  const handleRemove = async () => {
    const confirmed = await confirmRemove();
    if (!confirmed) {
      return;
    }

    await removeAgent.mutateAsync({ id: agentId });
  };

  return (
    <>
      <RemoveConfirmDialog />
      <UpdateAgentDialog
        initialValues={agent}
        onOpenChange={setUpdateAgentDialogOpen}
        open={updateAgentDialogOpen}
      />
      <div className="flex flex-1 flex-col gap-y-4 p-4 md:px-8">
        <AgentHeader
          agentName={agent.name}
          onEdit={() => setUpdateAgentDialogOpen(true)}
          onRemove={handleRemove}
        />
        <div className="rounded-lg border bg-white">
          <div className="col-span-5 flex flex-col gap-y-5 px-4 py-5">
            <div className="flex items-center gap-x-3">
              <GeneratedAvatar
                className="size-10"
                seed={agent.name}
                variant="botttsNeutral"
              />
              <h2 className="font-medium text-2xl">{agent.name}</h2>
            </div>
            <Badge
              className="flex cursor-pointer items-center gap-x-2 hover:bg-muted [&_svg]:size-4"
              onClick={() => router.push(`/meetings?agentId=${agent.id}`)}
              variant="outline"
            >
              <VideoIcon className="text-primary" />
              {agent.meetingCount}{" "}
              {agent.meetingCount === 1 ? "Meeting" : "Meetings"}
            </Badge>
            <div className="flex flex-col gap-x-4">
              <p className="font-medium text-lg">Instructions</p>
              <p className="text-muted-foreground text-sm">
                {agent.instructions}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const AgentViewLoading = () => (
  <LoadingState
    description="This may take a few seconds."
    title="Loading agent"
  />
);

export const AgentViewError = () => (
  <ErrorState
    description="Please try again later."
    title="Error loading agent"
  />
);
