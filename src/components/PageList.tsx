"use client";

import { usePageStore } from "@/store/usePageStore";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

function formatRelative(d: Date | string | undefined) {
  if (!d) return "—";
  const date = new Date(d);
  if (isNaN(date.getTime())) return "—";
  const diff = Date.now() - date.getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${day}d ago`;
  const mo = Math.floor(day / 30);
  if (mo < 12) return `${mo}mo ago`;
  return `${Math.floor(mo / 12)}y ago`;
}

export default function PageList() {
  const { pages, refreshPages } = usePageStore();
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const sortedPages = useMemo(() => {
    const filtered = !query.trim()
      ? pages
      : pages.filter((p) => {
          const q = query.toLowerCase();
          return (
            p.name.toLowerCase().includes(q) ||
            p.id.toLowerCase().includes(q) ||
            (p.description || "").toLowerCase().includes(q)
          );
        });
    return [...filtered].sort(
      (a, b) => Number(new Date(b.updatedAt)) - Number(new Date(a.updatedAt)),
    );
  }, [pages, query]);

  useEffect(() => {
    refreshPages().catch((err) => {
      console.error("Error refreshing pages:", err);
      setError("Failed to load pages");
    });
  }, [refreshPages]);

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
    <div>
      <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-zinc-800/80 bg-zinc-950/85 px-4 py-2 backdrop-blur">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className="text-zinc-500"
        >
          <circle cx="5.25" cy="5.25" r="3" stroke="currentColor" strokeWidth="1.2" />
          <path d="M7.5 7.5L10 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="filter prototypes…"
          className="w-full bg-transparent font-mono text-[12px] text-zinc-200 placeholder:text-zinc-600 focus:outline-none"
        />
        <span className="font-mono text-[11px] tabular-nums text-zinc-600">
          {sortedPages.length}/{pages.length}
        </span>
      </div>

      <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-6 border-b border-zinc-900 px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-600">
        <span>name</span>
        <span>versions</span>
        <span className="w-20 text-right">updated</span>
      </div>

      <ul className="divide-y divide-zinc-900">
        {sortedPages.map((page) => (
          <li key={page.id}>
            <Link
              href={`/pages/${page.id}/versions/${page.currentVersionId}`}
              className="group grid grid-cols-[1fr_auto_auto] items-center gap-x-6 px-4 py-2 transition-colors hover:bg-zinc-900/60"
            >
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="truncate text-[13px] font-medium text-zinc-100 group-hover:text-white">
                    {page.name}
                  </span>
                  <span className="truncate font-mono text-[11px] text-zinc-600">
                    {page.id}
                  </span>
                </div>
                {page.description && (
                  <p className="mt-0.5 truncate text-[12px] text-zinc-500">
                    {page.description}
                  </p>
                )}
              </div>

              <span className="font-mono text-[11px] tabular-nums text-zinc-500">
                v{page.versions?.length ?? 0}
              </span>

              <span className="w-20 text-right font-mono text-[11px] tabular-nums text-zinc-500">
                {formatRelative(page.updatedAt)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
