"use client";

import { usePageStore } from "@/store/usePageStore";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import PagePreview from "./PagePreview";
import { isDevMode } from "@/lib/mode";
import { Page } from "@/types/page";

function formatRelative(d: Date | string | undefined) {
  if (!d) return "—";
  const date = new Date(d);
  if (isNaN(date.getTime())) return "—";
  const diff = Date.now() - date.getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${day}d`;
  const mo = Math.floor(day / 30);
  if (mo < 12) return `${mo}mo`;
  return `${Math.floor(mo / 12)}y`;
}

export default function PageGrid() {
  const { pages, duplicatePage, refreshPages } = usePageStore();
  const isDev = isDevMode();
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const sortedPages = useMemo(
    () =>
      [...pages].sort(
        (a, b) => Number(new Date(b.updatedAt)) - Number(new Date(a.updatedAt)),
      ),
    [pages],
  );

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
        description || "Copy of current version",
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
        `Are you sure you want to delete "${page.name}"? This action cannot be undone.`,
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
      <div className="px-4 py-3 font-mono text-[12px] text-red-400">
        {error}
        <button
          onClick={() => {
            setError(null);
            refreshPages();
          }}
          className="ml-2 underline decoration-dotted"
        >
          retry
        </button>
      </div>
    );
  }

  if (!Array.isArray(pages) || pages.length === 0) {
    return (
      <div className="px-4 py-12 text-center font-mono text-[12px] text-zinc-500">
        no pages yet — create one to get started
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {sortedPages.map((page) => (
        <div
          key={page.id}
          className="group relative flex flex-col overflow-hidden rounded-lg border border-zinc-800/80 bg-zinc-900/40 transition-colors hover:border-zinc-700"
        >
          <Link
            href={`/pages/${page.id}/versions/${page.currentVersionId}`}
            className="relative block aspect-[16/10] overflow-hidden border-b border-zinc-800/80 bg-zinc-950"
          >
            <PagePreview pageId={page.id} />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.02]" />
          </Link>

          <div className="flex items-start justify-between gap-3 px-3 pb-2.5 pt-2.5">
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <Link
                  href={`/pages/${page.id}/versions/${page.currentVersionId}`}
                  className="truncate text-[13px] font-medium text-zinc-100 hover:text-white"
                >
                  {page.name}
                </Link>
              </div>
              <div className="mt-0.5 flex items-center gap-1.5 font-mono text-[10px] tabular-nums text-zinc-500">
                <span className="truncate">{page.id}</span>
                <span className="text-zinc-700">·</span>
                <span>v{page.versions?.length ?? 0}</span>
                <span className="text-zinc-700">·</span>
                <span>{formatRelative(page.updatedAt)}</span>
              </div>
              {page.description && (
                <p className="mt-1.5 line-clamp-2 text-[12px] leading-snug text-zinc-500">
                  {page.description}
                </p>
              )}
            </div>

            {isDev && (
              <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() =>
                    setSelectedPage(selectedPage === page.id ? null : page.id)
                  }
                  className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                >
                  copy
                </button>
                <button
                  onClick={() => handleDelete(page)}
                  disabled={isDeleting}
                  className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400 hover:border-red-500/30 hover:text-red-400"
                >
                  del
                </button>
              </div>
            )}
          </div>

          {selectedPage === page.id && (
            <div className="border-t border-zinc-800/80 bg-zinc-950/50 p-2.5">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="version description (optional)"
                rows={2}
                className="w-full resize-none rounded border border-zinc-800 bg-zinc-900 p-2 font-mono text-[11px] text-zinc-200 placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
              />
              <div className="mt-1.5 flex justify-end gap-1.5">
                <button
                  onClick={() => {
                    setSelectedPage(null);
                    setDescription("");
                  }}
                  className="rounded border border-zinc-800 px-2 py-1 font-mono text-[10px] text-zinc-400 hover:text-zinc-200"
                >
                  cancel
                </button>
                <button
                  onClick={() => handleCopy(page)}
                  className="rounded border border-zinc-700 bg-zinc-800 px-2 py-1 font-mono text-[10px] text-zinc-100 hover:bg-zinc-700"
                >
                  create version
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
