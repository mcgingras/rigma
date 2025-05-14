"use client";

import { useEffect } from "react";
import PageGrid from "@/components/PageGrid";
import { usePageStore } from "@/store/usePageStore";
import { Page } from "@/types/page";
import { isDevMode } from "@/lib/mode";

export default function Home() {
  const { refreshPages } = usePageStore();
  const isDev = isDevMode();
  useEffect(() => {
    refreshPages();
  }, []);

  const handleNewPage = async () => {
    const name = "new_page";
    let counter = 1;
    let finalName = name;

    // Check if name exists
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: finalName,
        content,
      }),
    });

    refreshPages();
  };

  return (
    <main className="min-h-screen">
      <div className="border-b border-zinc-800 p-4 flex justify-between items-center bg-zinc-900">
        <h1 className="text-2xl font-bold">UI prototypes</h1>
        {isDev && (
          <button
            onClick={handleNewPage}
            className="text-base font-bold text-zinc-300 hover:text-zinc-400 bg-zinc-700 px-4 py-2 rounded-lg cursor-pointer"
          >
            New Page
          </button>
        )}
      </div>

      <div className="h-[calc(100vh-73px)] overflow-auto">
        <PageGrid />
      </div>
    </main>
  );
}
