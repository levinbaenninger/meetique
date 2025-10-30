import { useState } from "react";
import { toast } from "sonner";

interface UseDownloadOptions {
  url: string;
  successMessage?: string;
  errorMessage?: string;
}

const FILENAME_REGEX = /filename\*=UTF-8''([^;]+)|filename="?([^"]+)"?/i;
const SECONDS_TO_MILLISECONDS = 1000;

const extractFilename = (response: Response): string => {
  const cd = response.headers.get("content-disposition") || "";
  const m = cd.match(FILENAME_REGEX);

  if (m) {
    return decodeURIComponent(m[1] || m[2]);
  }

  try {
    const u = new URL(response.url);
    const base = u.pathname.split("/").pop();
    if (base) {
      return base;
    }
  } catch {
    // Ignore error
  }

  return "download";
};

export const useDownload = ({
  url,
  successMessage = "Downloaded successfully",
  errorMessage = "Failed to download",
}: UseDownloadOptions) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(url);

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || errorMessage);
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = extractFilename(response);

      document.body.appendChild(a);

      a.click();
      a.remove();

      setTimeout(() => URL.revokeObjectURL(objectUrl), SECONDS_TO_MILLISECONDS);

      toast.success(successMessage);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : errorMessage);
    } finally {
      setIsDownloading(false);
    }
  };

  return { isDownloading, handleDownload };
};
