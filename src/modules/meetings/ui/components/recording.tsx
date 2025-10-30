import { DownloadIcon, Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { VideoPlayer } from "@/components/ui/video-player";
import { useDownload } from "@/modules/meetings/hooks/use-download";

interface Props {
  meetingId: string;
  recordingUrl: string;
}

export const Recording = ({ meetingId, recordingUrl }: Props) => {
  const { isDownloading, handleDownload } = useDownload({
    url: `/api/meetings/${meetingId}/recording/download`,
    successMessage: "Recording downloaded successfully",
    errorMessage: "Failed to download recording",
  });

  return (
    <div className="flex w-full flex-col gap-y-4 rounded-lg border bg-white px-4 py-5">
      <div className="flex items-center justify-between">
        <p className="font-medium text-sm">Recording</p>
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
      <VideoPlayer src={recordingUrl} />
    </div>
  );
};
