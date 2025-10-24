import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { DownloadIcon, Loader2Icon, SearchIcon } from "lucide-react";
import { useState } from "react";
import Highlighter from "react-highlight-words";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTRPC } from "@/lib/trpc";
import { useDownload } from "@/modules/meetings/hooks/use-download";

interface Props {
  meetingId: string;
}

export const Transcript = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const { data: transcript } = useQuery(
    trpc.meetings.getTranscript.queryOptions({ meetingId })
  );

  const [searchQuery, setSearchQuery] = useState("");

  const { isDownloading, handleDownload } = useDownload({
    url: `/api/meetings/${meetingId}/transcript/download`,
    successMessage: "Transcript downloaded successfully",
    errorMessage: "Failed to download transcript",
  });

  const filteredData = (transcript ?? []).filter((t) =>
    t.text.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex w-full flex-col gap-y-4 rounded-lg border bg-white px-4 py-5">
      <div className="flex items-center justify-between">
        <p className="font-medium text-sm">Transcript</p>
        <Button
          disabled={isDownloading}
          onClick={handleDownload}
          size="sm"
          variant="outline"
        >
          {isDownloading ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <DownloadIcon />
          )}
          {isDownloading ? "Downloading..." : "Download"}
        </Button>
      </div>
      <div className="relative">
        <Input
          className="h-9 w-[240px] pl-7"
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Transcript"
          value={searchQuery}
        />
        <SearchIcon className="-translate-y-1/2 absolute top-1/2 left-2 size-4 text-muted-foreground" />
      </div>
      <ScrollArea>
        <div className="flex flex-col gap-y-4">
          {filteredData.map((item) => (
            <div
              className="flex flex-col gap-y-2 rounded-md border p-4 hover:bg-muted"
              key={item.start_ts}
            >
              <div className="flex items-center gap-x-2">
                <Avatar className="size-6">
                  <AvatarImage alt={item.user.name} src={item.user.image} />
                </Avatar>
                <p className="font-medium text-sm">{item.user.name}</p>
                <p className="text-muted-foreground text-xs">
                  {format(new Date(0, 0, 0, 0, 0, 0, item.start_ts), "mm:ss")}
                </p>
              </div>
              <Highlighter
                autoEscape={true}
                className="text-muted-foreground text-sm"
                highlightClassName="bg-primary text-primary-foreground"
                searchWords={[searchQuery]}
                textToHighlight={item.text}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
