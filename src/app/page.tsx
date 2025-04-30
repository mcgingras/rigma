"use client";

import { useEffect } from "react";
import PageGrid from "@/components/PageGrid";
import { usePageStore } from "@/store/usePageStore";

export default function Home() {
  const { refreshPages } = usePageStore();

  useEffect(() => {
    refreshPages();
  }, []);

  const handleNewPage = async () => {
    const name = "new_page";
    let counter = 1;
    let finalName = name;

    // Check if name exists
    const existingPages = await fetch("/api/pages").then((res) => res.json());
    while (existingPages.some((p: any) => p.name === finalName)) {
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
      <div className="border-b p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Rigma</h1>
        <button
          onClick={handleNewPage}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          New Page
        </button>
      </div>

      <div className="h-[calc(100vh-73px)] overflow-auto">
        <PageGrid />
      </div>
    </main>
  );
}
