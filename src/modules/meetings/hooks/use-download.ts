import { useState } from 'react';
import { toast } from 'sonner';

interface UseDownloadOptions {
  url: string;
  successMessage?: string;
  errorMessage?: string;
}

export const useDownload = ({
  url,
  successMessage = 'Downloaded successfully',
  errorMessage = 'Failed to download',
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
      const a = document.createElement('a');
      a.href = objectUrl;
      a.download =
        response.headers
          .get('content-disposition')
          ?.split('filename=')[1]
          ?.replace(/"/g, '') || 'download';
      a.click();
      URL.revokeObjectURL(objectUrl);

      toast.success(successMessage);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : errorMessage);
    } finally {
      setIsDownloading(false);
    }
  };

  return { isDownloading, handleDownload };
};
