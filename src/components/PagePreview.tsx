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
        setError("Failed to load preview");
      }
    };

    fetchScreenshot();
  }, [pageId]);

  if (error) {
    return (
      <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-400">
        {error}
      </div>
    );
  }

  if (!previewUrl) {
    return (
      <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-400">
        Loading preview...
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
