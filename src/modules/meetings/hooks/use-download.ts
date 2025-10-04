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

      const cd = response.headers.get('content-disposition') || '';
      const m = cd.match(/filename\*=UTF-8''([^;]+)|filename="?([^"]+)"?/i);

      let filename = 'download';

      if (m) {
        filename = decodeURIComponent(m[1] || m[2]);
      } else {
        try {
          const u = new URL(response.url);
          const base = u.pathname.split('/').pop();
          if (base) filename = base;
        } catch {}
      }

      a.download = filename;

      document.body.appendChild(a);

      a.click();
      a.remove();

      setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);

      toast.success(successMessage);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : errorMessage);
    } finally {
      setIsDownloading(false);
    }
  };

  return { isDownloading, handleDownload };
};
