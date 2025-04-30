"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface PagePreviewProps {
  pageId: string;
}

export default function PagePreview({ pageId }: PagePreviewProps) {
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateScreenshot = async () => {
      try {
        const response = await fetch(`/api/pages/${pageId}/screenshot`);
        if (!response.ok) {
          throw new Error("Failed to generate screenshot");
        }
        const data = await response.json();
        setScreenshotUrl(data.url);
      } catch (err) {
        console.error("Error generating screenshot:", err);
        setError("Failed to generate preview");
      }
    };

    generateScreenshot();
  }, [pageId]);

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
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
      />
    </div>
  );
}
