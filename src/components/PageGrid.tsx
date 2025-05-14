"use client";

import { usePageStore } from "@/store/usePageStore";
import { useEffect, useState } from "react";
import Link from "next/link";
import PagePreview from "./PagePreview";
import { isDevMode } from "@/lib/mode";
import { Page } from "@/types/page";

export default function PageGrid() {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {pages.map((page) => (
        <div
          key={page.id}
          className="border border-zinc-800 rounded-lg p-4 hover:shadow-lg transition-shadow bg-zinc-900"
        >
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-start">
              <Link
                href={`/pages/${page.id}/versions/${page.currentVersionId}`}
                className="text-lg font-semibold hover:text-zinc-200"
              >
                {page.name}
              </Link>
              {isDev && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setSelectedPage(selectedPage === page.id ? null : page.id)
                    }
                    className="text-sm text-zinc-300 hover:text-zinc-400"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => handleDelete(page)}
                    disabled={isDeleting}
                    className="text-sm text-red-500 hover:text-red-400"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            <p className="text-sm text-zinc-400">{page.description}</p>

            <div className="text-xs text-zinc-500">
              {page.versions?.length || 0} version
              {(page.versions?.length || 0) !== 1 ? "s" : ""}
            </div>

            {selectedPage === page.id && (
              <div className="mt-2 space-y-2">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Version description (optional)"
                  className="w-full p-2 text-sm bg-zinc-800 rounded border border-zinc-700"
                  rows={2}
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => {
                      setSelectedPage(null);
                      setDescription("");
                    }}
                    className="px-2 py-1 text-sm text-zinc-400 hover:text-zinc-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleCopy(page)}
                    className="px-2 py-1 text-sm bg-zinc-800 rounded hover:bg-zinc-700"
                  >
                    Create Version
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 aspect-video bg-gray-100 rounded overflow-hidden relative">
            <div className="absolute inset-0">
              <PagePreview pageId={page.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
