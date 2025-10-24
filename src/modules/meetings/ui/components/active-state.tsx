import { VideoIcon } from "lucide-react";
import Link from "next/link";

import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";

interface Props {
  meetingId: string;
}

export const ActiveState = ({ meetingId }: Props) => (
  <div className="flex flex-col items-center justify-center gap-y-8 rounded-lg bg-white px-4 py-5">
    <EmptyState
      description="Meeting will end once all participants have left."
      image="/upcoming.svg"
      title="Meeting is active"
    />
    <div className="flex w-full flex-col-reverse items-center gap-2 lg:flex-row lg:justify-center">
      <Button asChild className="w-full cursor-default lg:w-auto">
        <Link href={`/call/${meetingId}`}>
          <VideoIcon />
          Join Meeting
        </Link>
      </Button>
    </div>
  </div>
);
