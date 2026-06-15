"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface PagePreviewProps {
  pageId: string;
}

export default function PagePreview({ pageId }: PagePreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScreenshot = async () => {
      try {
        const response = await fetch(`/api/pages/${pageId}/screenshot`);
        if (!response.ok) {
          throw new Error("Failed to fetch screenshot");
        }
        const data = await response.json();
        setPreviewUrl(data.url);
        setError(null);
      } catch (error) {
        console.error("Error fetching screenshot:", error);
        setError("preview unavailable");
      }
    };

    fetchScreenshot();
  }, [pageId]);

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-zinc-950">
        <div className="flex flex-col items-center gap-1.5 text-zinc-600">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect
              x="2"
              y="3"
              width="12"
              height="10"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.1"
            />
            <path
              d="M2 11l3.5-3.5 2.5 2.5 2-2L14 11"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-mono text-[10px]">{error}</span>
        </div>
      </div>
    );
  }

  if (!previewUrl) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-zinc-900 via-zinc-900/50 to-zinc-950" />
      </div>
    );
  }

  return (
    <Image
      src={previewUrl}
      alt={`Preview of ${pageId}`}
      fill
      className="object-cover"
    />
  );
}
