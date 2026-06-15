"use client";

import { useEffect, useState } from "react";
import PageGrid from "@/components/PageGrid";
import { usePageStore } from "@/store/usePageStore";
import { Page } from "@/types/page";
import { isDevMode } from "@/lib/mode";
import PageList from "@/components/PageList";

export default function Home() {
  const { pages, refreshPages } = usePageStore();
  const isDev = isDevMode();
  const [view, setView] = useState<"list" | "grid">("list");

  useEffect(() => {
    refreshPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNewPage = async () => {
    const name = "new_page";
    let counter = 1;
    let finalName = name;

    const existingPages = await fetch("/api/pages").then((res) => res.json());
    while (existingPages.some((p: Page) => p.name === finalName)) {
      finalName = `${name}${counter}`;
      counter++;
    }

    const content = `import React from 'react';

export default function ${finalName}() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">${finalName}</h1>
      <p>Edit this component to get started!</p>
    </div>
  );
}`;

    await fetch("/api/pages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: finalName, content }),
    });

    refreshPages();
  };

  const count = Array.isArray(pages) ? pages.length : 0;

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur">
        <div className="flex h-12 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="font-mono text-[13px] font-medium tracking-tight text-zinc-100">
                rigma
              </span>
            </div>
            <span className="text-zinc-700">/</span>
            <span className="font-mono text-[12px] text-zinc-400">
              prototypes
            </span>
            <span className="ml-1 rounded-sm border border-zinc-800 px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-zinc-400">
              {count}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <ViewToggle view={view} onChange={setView} />
            {isDev && (
              <button
                onClick={handleNewPage}
                className="ml-1 h-7 rounded-md border border-zinc-800 bg-zinc-900 px-2.5 font-mono text-[11px] text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
              >
                + new
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="h-[calc(100vh-48px)] overflow-auto">
        {view === "grid" ? <PageGrid /> : <PageList />}
      </div>
    </main>
  );
}

function ViewToggle({
  view,
  onChange,
}: {
  view: "list" | "grid";
  onChange: (v: "list" | "grid") => void;
}) {
  return (
    <div className="flex h-7 items-center rounded-md border border-zinc-800 bg-zinc-900 p-0.5">
      <button
        onClick={() => onChange("list")}
        aria-label="List view"
        className={`flex h-6 w-7 items-center justify-center rounded-[4px] transition-colors ${
          view === "list"
            ? "bg-zinc-800 text-zinc-100"
            : "text-zinc-500 hover:text-zinc-300"
        }`}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M2 3h8M2 6h8M2 9h8"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <button
        onClick={() => onChange("grid")}
        aria-label="Grid view"
        className={`flex h-6 w-7 items-center justify-center rounded-[4px] transition-colors ${
          view === "grid"
            ? "bg-zinc-800 text-zinc-100"
            : "text-zinc-500 hover:text-zinc-300"
        }`}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <rect
            x="2"
            y="2"
            width="3.5"
            height="3.5"
            stroke="currentColor"
            strokeWidth="1.1"
          />
          <rect
            x="6.5"
            y="2"
            width="3.5"
            height="3.5"
            stroke="currentColor"
            strokeWidth="1.1"
          />
          <rect
            x="2"
            y="6.5"
            width="3.5"
            height="3.5"
            stroke="currentColor"
            strokeWidth="1.1"
          />
          <rect
            x="6.5"
            y="6.5"
            width="3.5"
            height="3.5"
            stroke="currentColor"
            strokeWidth="1.1"
          />
        </svg>
      </button>
    </div>
  );
}
