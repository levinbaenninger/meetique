import { useQuery } from "@tanstack/react-query";
import { RocketIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useSidebar } from "@/components/ui/sidebar";
import { useTRPC } from "@/lib/trpc";

const MAX_PROGRESS = 100;
const PERCENTAGE_MULTIPLIER = 100;

export const DashboardTrial = () => {
  const trpc = useTRPC();
  const { setOpenMobile } = useSidebar();
  const { data: freeUsage } = useQuery(
    trpc.premium.getFreeUsage.queryOptions()
  );

  if (!freeUsage) {
    return null;
  }

  const getTierDisplayName = (tier: string) => {
    switch (tier) {
      case "free":
        return "Free Trial";
      case "starter":
        return "Starter Plan";
      case "pro":
        return "Pro Plan";
      case "enterprise":
        return "Enterprise Plan";
      default:
        return "Free Trial";
    }
  };

  const formatLimit = (limit: number) =>
    limit === -1 ? "∞" : limit.toString();

  const calculateProgress = (current: number, limit: number) => {
    if (limit === -1) {
      return 0; // Unlimited, no progress bar
    }
    return Math.min((current / limit) * PERCENTAGE_MULTIPLIER, MAX_PROGRESS);
  };

  const isUnlimited =
    freeUsage.limits.agents === -1 && freeUsage.limits.meetings === -1;

  return (
    <div className="flex w-full flex-col gap-y-2 rounded-lg border border-border/10 bg-white/5">
      <div className="flex flex-col gap-y-4 p-3">
        <div className="flex items-center gap-2">
          <RocketIcon className="size-4" />
          <p className="font-medium text-sm">
            {getTierDisplayName(freeUsage.tier)}
          </p>
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="text-xs">
            {freeUsage.agentCount}/{formatLimit(freeUsage.limits.agents)} Agents
          </p>
          {freeUsage.limits.agents !== -1 && (
            <Progress
              value={calculateProgress(
                freeUsage.agentCount,
                freeUsage.limits.agents
              )}
            />
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="text-xs">
            {freeUsage.meetingCount}/{formatLimit(freeUsage.limits.meetings)}{" "}
            Meetings
            {freeUsage.tier === "starter" && " (this month)"}
          </p>
          {freeUsage.limits.meetings !== -1 && (
            <Progress
              value={calculateProgress(
                freeUsage.meetingCount,
                freeUsage.limits.meetings
              )}
            />
          )}
        </div>
        {isUnlimited && (
          <div className="text-muted-foreground text-xs">
            Unlimited access to all features
          </div>
        )}
      </div>
      <Button
        asChild
        className="cursor-default rounded-t-none border-border/10 border-t bg-transparent hover:bg-white/10"
      >
        <Link href="/upgrade" onClick={() => setOpenMobile(false)}>
          Manage Subscription
        </Link>
      </Button>
    </div>
  );
};
