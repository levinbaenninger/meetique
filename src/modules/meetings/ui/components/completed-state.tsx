import { TabsList } from "@radix-ui/react-tabs";
import { format } from "date-fns";
import {
  BookOpenTextIcon,
  ClockFadingIcon,
  FileTextIcon,
  FileVideoIcon,
  MessageCircleIcon,
} from "lucide-react";
import Link from "next/link";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { MarkdownStyleType, MarkdownView } from "@/components/ui/markdown-view";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { formatDuration } from "@/lib/utils";
import { MeetingChat } from "@/modules/meetingchats/ui/components/chat";
import type { Meeting } from "@/modules/meetings/types";
import { Recording } from "@/modules/meetings/ui/components/recording";
import { ResourceAvailabilityBanner } from "@/modules/meetings/ui/components/resource-availability-banner";
import { Transcript } from "@/modules/meetings/ui/components/transcript";
import { areResourcesAvailable } from "@/modules/meetings/utils";

interface Props {
  meeting: Meeting;
}

export const CompletedState = ({ meeting }: Props) => {
  const resourcesAvailable = areResourcesAvailable(meeting.endedAt);
  const hasTranscript = !!meeting.transcriptUrl && resourcesAvailable;
  const hasRecording = !!meeting.recordingUrl && resourcesAvailable;

  const tabsTriggerClassName =
    "h-full rounded-none border-transparent border-b-2 bg-background text-muted-foreground hover:text-accent-foreground data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground data-[state=active]:shadow-none";

  return (
    <div className="flex flex-col gap-y-4">
      <ResourceAvailabilityBanner
        endedAt={meeting.endedAt}
        hasRecording={!!meeting.recordingUrl}
        hasTranscript={!!meeting.transcriptUrl}
      />
      <Tabs defaultValue="summary">
        <div className="rounded-lg border bg-white px-3">
          <ScrollArea>
            <TabsList className="h-13 justify-start rounded-none bg-background p-0">
              <TabsTrigger className={tabsTriggerClassName} value="summary">
                <BookOpenTextIcon />
                Summary
              </TabsTrigger>
              {hasTranscript && (
                <TabsTrigger
                  className={tabsTriggerClassName}
                  value="transcript"
                >
                  <FileTextIcon />
                  Transcript
                </TabsTrigger>
              )}
              {hasRecording && (
                <TabsTrigger className={tabsTriggerClassName} value="recording">
                  <FileVideoIcon />
                  Recording
                </TabsTrigger>
              )}
              <TabsTrigger
                className="h-full rounded-none border-transparent border-b-2 bg-background text-muted-foreground hover:text-accent-foreground data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground data-[state=active]:shadow-none"
                value="chat"
              >
                <MessageCircleIcon />
                Chat
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <TabsContent value="summary">
          <div className="rounded-lg border bg-white">
            <div className="col-span-5 flex flex-col gap-y-5 px-4 py-5">
              <h2 className="font-medium text-2xl capitalize">
                {meeting.name}
              </h2>
              <div className="flex items-center gap-x-2">
                <Link
                  className="flex items-center gap-x-2 capitalize underline underline-offset-4"
                  href={`/agents/${meeting.agent.id}`}
                >
                  <GeneratedAvatar
                    className="size-6"
                    seed={meeting.agent.name}
                    variant="botttsNeutral"
                  />
                  {meeting.agent.name}
                </Link>
                <p className="text-muted-foreground text-sm">
                  {meeting.startedAt ? format(meeting.startedAt, "PPP") : ""}
                </p>
              </div>
              <Badge
                className="flex items-center gap-x-2 [&>svg]:size-4"
                variant="outline"
              >
                <ClockFadingIcon className="text-primary" />
                {meeting.duration
                  ? formatDuration(meeting.duration)
                  : "No duration"}
              </Badge>
              <div>
                {meeting.summary ? (
                  <MarkdownView
                    markdownText={meeting.summary}
                    type={MarkdownStyleType.TextMuted}
                  />
                ) : (
                  <p className="text-primary text-sm">No summary available.</p>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
        {hasTranscript && (
          <TabsContent value="transcript">
            <Transcript meetingId={meeting.id} />
          </TabsContent>
        )}
        {hasRecording && (
          <TabsContent value="recording">
            <Recording
              meetingId={meeting.id}
              recordingUrl={meeting.recordingUrl as string}
            />
          </TabsContent>
        )}
        <TabsContent value="chat">
          <MeetingChat meeting={meeting} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
