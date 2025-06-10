"use client";

import { usePageStore } from "@/store/usePageStore";
import { useEffect, useState } from "react";
import { isDevMode } from "@/lib/mode";
import { Page } from "@/types/page";
import Link from "next/link";

export default function PageList() {
  const { pages, duplicatePage, refreshPages } = usePageStore();
  const isDev = isDevMode();
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    refreshPages().catch((err) => {
      console.error("Error refreshing pages:", err);
      setError("Failed to load pages");
    });
  }, [refreshPages]);

  const handleCopy = async (page: Page) => {
    try {
      const versionName = `${page.name} - Copy`;
      await duplicatePage(
        page.id,
        versionName,
        description || "Copy of current version"
      );
      setDescription("");
      setSelectedPage(null);
      await refreshPages();
    } catch (error) {
      console.error("Error copying page:", error);
      setError("Failed to copy page");
    }
  };

  const handleDelete = async (page: Page) => {
    if (
      !confirm(
        `Are you sure you want to delete "${page.name}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/pages/${page.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete page");
      await refreshPages();
    } catch (error) {
      console.error("Error deleting page:", error);
      setError("Failed to delete page");
    } finally {
      setIsDeleting(false);
    }
  };

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
      {pages.map((page) => (
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
