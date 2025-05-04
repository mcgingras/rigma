import { usePageStore } from "@/store/usePageStore";
import { useEffect } from "react";
import Link from "next/link";
import PagePreview from "./PagePreview";
import { isDevMode } from "@/lib/mode";

export default function PageGrid() {
  const { pages, duplicatePage, refreshPages } = usePageStore();
  const isDev = isDevMode();
  useEffect(() => {
    refreshPages();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {pages.map((page) => (
        <div
          key={page.id}
          className="border border-zinc-800 rounded-lg p-4 hover:shadow-lg transition-shadow bg-zinc-900"
        >
          <div className="flex justify-between items-start mb-2">
            <Link
              href={`/pages/${page.id}`}
              className="text-lg font-semibold hover:text-zinc-200"
            >
              {page.name}
            </Link>
            {isDev && (
              <div className="space-x-2">
                <button
                  onClick={() => duplicatePage(page.id)}
                  className="text-sm text-zinc-300 hover:text-zinc-400"
                >
                  Copy
                </button>
              </div>
            )}
          </div>
          <div className="aspect-video bg-gray-100 rounded overflow-hidden relative">
            <div className="absolute inset-0">
              <PagePreview pageId={page.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
