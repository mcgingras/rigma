"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { isDevMode } from "@/lib/mode";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function PreviewPage({ params }: PageProps) {
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [pageId, setPageId] = useState<string | null>(null);
  const isDev = isDevMode();

  useEffect(() => {
    const loadParams = async () => {
      const resolvedParams = await params;
      setPageId(resolvedParams.id);
    };
    loadParams();
  }, [params]);

  useEffect(() => {
    if (!pageId) return;

    const generateScreenshot = async () => {
      try {
        // Add a cache-busting parameter
        const response = await fetch(
          `/api/pages/${pageId}/screenshot?t=${Date.now()}`
        );
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

    if (isDev) {
      generateScreenshot();
    }
  }, [pageId, retryCount, isDev]);

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
        src={`${screenshotUrl}?t=${Date.now()}`}
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
