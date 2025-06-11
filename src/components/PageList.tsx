"use client";

import { usePageStore } from "@/store/usePageStore";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PageList() {
  const { pages, refreshPages } = usePageStore();
  const [error, setError] = useState<string | null>(null);

  console.log(pages);

  const sortedPages = pages.sort((a, b) => {
    return Number(b.updatedAt) - Number(a.updatedAt);
  });

  useEffect(() => {
    refreshPages().catch((err) => {
      console.error("Error refreshing pages:", err);
      setError("Failed to load pages");
    });
  }, [refreshPages]);

  if (error) {
    return (
      <div className="p-4 text-red-500">
        {error}
        <button
          onClick={() => {
            setError(null);
            refreshPages();
          }}
          className="ml-2 underline"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!Array.isArray(pages) || pages.length === 0) {
    return (
      <div className="p-4 text-zinc-400">
        No pages found. Create a new page to get started.
      </div>
    );
  }

  return (
    <div className="">
      {sortedPages.map((page) => (
        <div key={page.id} className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 border-b border-zinc-800">
            <div className="flex flex-col gap-2 w-full px-2 py-1 hover:bg-zinc-900 rounded-lg">
              <Link
                href={`/pages/${page.id}/versions/${page.currentVersionId}`}
                className="text-sm font-bold text-zinc-300 hover:text-zinc-400"
              >
                {page.name}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
