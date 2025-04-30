"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface PagePreviewProps {
  pageId: string;
}

export default function PagePreview({ pageId }: PagePreviewProps) {
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const generateScreenshot = async () => {
      try {
        const response = await fetch(`/api/pages/${pageId}/screenshot`);
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to generate screenshot");
        }
        const data = await response.json();
        setScreenshotUrl(data.url);
        setError(null);
      } catch (err) {
        console.error("Error generating screenshot:", err);
        setError(
          err instanceof Error ? err.message : "Failed to generate preview"
        );

        // Retry up to 3 times with a delay
        if (retryCount < 3) {
          setTimeout(() => {
            setRetryCount((prev) => prev + 1);
          }, 1000);
        }
      }
    };

    generateScreenshot();
  }, [pageId, retryCount]);

  if (error) {
    return (
      <div className="text-red-500 p-4">
        {error}
        {retryCount < 3 && <div className="text-sm mt-2">Retrying...</div>}
      </div>
    );
  }

  if (!screenshotUrl) {
    return <div className="p-4">Generating preview...</div>;
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Image
        src={screenshotUrl}
        alt={`Preview of ${pageId}`}
        fill
        className="object-contain"
        onError={() => {
          console.error("Error loading screenshot:", screenshotUrl);
          setError("Failed to load preview image");
        }}
      />
    </div>
  );
}
