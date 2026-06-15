"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Page, PageVersion } from "@/types/page";
import Link from "next/link";
import { usePageStore } from "@/store/usePageStore";
import { isDevMode } from "@/lib/mode";

const PageDetailsData = () => {
  const isDev = isDevMode();
  const [isOpen, setIsOpen] = useState(false);
  const [pageData, setPageData] = useState<Page>();
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editingVersionId, setEditingVersionId] = useState<string | null>(null);
  const [editedVersionDescription, setEditedVersionDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { duplicatePage, refreshPages } = usePageStore();
  const pathname = usePathname();
  const pageId = pathname?.split("/")[2];
  const currentVersionId = pathname?.split("/")[4];

  useEffect(() => {
    fetchPageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPageData = async () => {
    const response = await fetch(`/api/pages/${pageId}`);
    const data = await response.json();
    setPageData(data);
    setEditedDescription(data.description || "");
    setEditedTitle(data.name || "");
  };

  const handleSaveTitle = async () => {
    if (!pageData || !editedTitle.trim()) return;
    setIsSaving(true);
    try {
      const response = await fetch(`/api/pages/${pageId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editedTitle }),
      });
      if (!response.ok) throw new Error("Failed to update title");
      const updatedPage = await response.json();
      setPageData(updatedPage);
      setIsEditingTitle(false);
    } catch (error) {
      console.error("Failed to save title:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveDescription = async () => {
    if (!pageData) return;
    setIsSaving(true);
    try {
      const response = await fetch(`/api/pages/${pageId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: editedDescription }),
      });
      if (!response.ok) throw new Error("Failed to update description");
      const updatedPage = await response.json();
      setPageData(updatedPage);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save description:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveVersionDescription = async (version: PageVersion) => {
    if (!pageData) return;
    setIsSaving(true);
    try {
      const response = await fetch(
        `/api/pages/${pageId}/versions/${version.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description: editedVersionDescription }),
        },
      );
      if (!response.ok) throw new Error("Failed to update version description");
      const updatedPage = await response.json();
      setPageData(updatedPage);
      setEditingVersionId(null);
    } catch (error) {
      console.error("Failed to save version description:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopy = async (page: Page) => {
    try {
      const versionName = `${page.name} - Copy`;
      await duplicatePage(page.id, versionName, "Copy of current version");
      await refreshPages();
      await fetchPageData();
    } catch (error) {
      console.error("Error copying page:", error);
    }
  };

  const handleDeleteVersion = async (version: PageVersion) => {
    if (!pageData || pageData.versions.length <= 1) return;
    if (
      !confirm(
        `Are you sure you want to delete version "${version.id} - ${version.name}"?`,
      )
    ) {
      return;
    }
    setIsDeleting(true);
    try {
      const response = await fetch(
        `/api/pages/${pageId}/versions/${version.id}`,
        { method: "DELETE" },
      );
      if (!response.ok) throw new Error("Failed to delete version");
      const updatedPage = await response.json();
      setPageData(updatedPage);
    } catch (error) {
      console.error("Failed to delete version:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-3 top-3 z-[9999] flex h-7 items-center gap-2 rounded-md border border-white/10 bg-zinc-950/70 px-2.5 font-mono text-[11px] text-zinc-200 shadow-lg backdrop-blur-md transition-colors hover:border-white/20 hover:bg-zinc-950/80"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span className="text-zinc-100">{pageData?.name ?? pageId}</span>
        <span className="text-zinc-500">·</span>
        <span className="tabular-nums text-zinc-400">
          {currentVersionId ?? pageData?.currentVersionId}
        </span>
      </button>
    );
  }

  return (
    <div className="fixed right-3 top-3 z-[9999] w-[320px] overflow-hidden rounded-lg border border-white/10 bg-zinc-950/85 text-zinc-100 shadow-2xl backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-white/5 px-3 py-2">
        <Link
          href="/"
          className="flex h-5 w-5 items-center justify-center rounded text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
          title="Home"
        >
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path
              d="M7 9L4 6l3-3"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        {isEditingTitle && isDev ? (
          <div className="flex-1">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full rounded border border-white/10 bg-zinc-900 px-2 py-1 font-mono text-[12px] text-zinc-100 focus:border-white/30 focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveTitle();
                else if (e.key === "Escape") {
                  setIsEditingTitle(false);
                  setEditedTitle(pageData?.name || "");
                }
              }}
              autoFocus
            />
          </div>
        ) : (
          <div
            className={`flex-1 truncate font-mono text-[12px] font-medium text-zinc-100 ${
              isDev ? "cursor-text rounded px-1 hover:bg-white/5" : ""
            }`}
            onClick={() => isDev && setIsEditingTitle(true)}
          >
            {pageData?.name}
          </div>
        )}

        <button
          onClick={() => setIsOpen(false)}
          className="flex h-5 w-5 items-center justify-center rounded text-zinc-500 hover:bg-white/5 hover:text-zinc-200"
          title="Close"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M2 2l6 6M8 2l-6 6"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Description */}
      <div className="border-b border-white/5 px-3 py-2.5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
            description
          </span>
          {!isEditing && isDev && (
            <button
              onClick={() => setIsEditing(true)}
              className="font-mono text-[10px] text-zinc-500 hover:text-zinc-300"
            >
              edit
            </button>
          )}
        </div>
        {isEditing ? (
          <div className="mt-1.5">
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              rows={3}
              className="w-full resize-none rounded border border-white/10 bg-zinc-900 p-1.5 text-[12px] text-zinc-200 focus:border-white/30 focus:outline-none"
            />
            <div className="mt-1.5 flex justify-end gap-1.5">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditedDescription(pageData?.description || "");
                }}
                disabled={isSaving}
                className="rounded border border-white/10 px-2 py-0.5 font-mono text-[10px] text-zinc-400 hover:text-zinc-100"
              >
                cancel
              </button>
              <button
                onClick={handleSaveDescription}
                disabled={isSaving}
                className="rounded border border-white/20 bg-white/10 px-2 py-0.5 font-mono text-[10px] text-zinc-100 hover:bg-white/15"
              >
                {isSaving ? "saving…" : "save"}
              </button>
            </div>
          </div>
        ) : (
          <p
            className={`mt-1 text-[12px] leading-snug text-zinc-300 ${
              isDev ? "cursor-text rounded hover:text-zinc-200" : ""
            } ${!pageData?.description ? "italic text-zinc-500" : ""}`}
            onClick={() => isDev && setIsEditing(true)}
          >
            {pageData?.description || "add a description…"}
          </p>
        )}
      </div>

      {/* Versions */}
      <div className="px-3 py-2.5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
            versions
          </span>
          <span className="font-mono text-[10px] tabular-nums text-zinc-500">
            {pageData?.versions.length ?? 0}
          </span>
        </div>

        <ul className="mt-1.5 flex flex-col divide-y divide-white/5">
          {pageData?.versions.map((version) => {
            const isCurrent = version.id === currentVersionId;
            return (
              <li key={version.id} className="py-1.5 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between gap-2">
                  <Link
                    href={`/pages/${pageId}/versions/${version.id}`}
                    className="flex min-w-0 flex-1 items-center gap-2"
                  >
                    <span
                      className={`h-1 w-1 rounded-full ${
                        isCurrent ? "bg-emerald-400" : "bg-zinc-700"
                      }`}
                    />
                    <span className="font-mono text-[11px] tabular-nums text-zinc-400">
                      {version.id}
                    </span>
                    <span className="truncate text-[12px] text-zinc-200 hover:text-white">
                      {version.name}
                    </span>
                  </Link>
                  {isDev && (
                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingVersionId(version.id);
                          setEditedVersionDescription(version.description || "");
                        }}
                        className="font-mono text-[10px] text-zinc-500 hover:text-zinc-300"
                      >
                        edit
                      </button>
                      {pageData.versions.length > 1 && !isCurrent && (
                        <button
                          onClick={() => handleDeleteVersion(version)}
                          disabled={isDeleting}
                          className="font-mono text-[10px] text-zinc-500 hover:text-red-400"
                        >
                          del
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {editingVersionId === version.id ? (
                  <div className="mt-1.5">
                    <textarea
                      value={editedVersionDescription}
                      onChange={(e) =>
                        setEditedVersionDescription(e.target.value)
                      }
                      rows={2}
                      className="w-full resize-none rounded border border-white/10 bg-zinc-900 p-1.5 text-[11px] text-zinc-200 focus:border-white/30 focus:outline-none"
                    />
                    <div className="mt-1.5 flex justify-end gap-1.5">
                      <button
                        onClick={() => {
                          setEditingVersionId(null);
                          setEditedVersionDescription(version.description || "");
                        }}
                        disabled={isSaving}
                        className="rounded border border-white/10 px-2 py-0.5 font-mono text-[10px] text-zinc-400 hover:text-zinc-100"
                      >
                        cancel
                      </button>
                      <button
                        onClick={() => handleSaveVersionDescription(version)}
                        disabled={isSaving}
                        className="rounded border border-white/20 bg-white/10 px-2 py-0.5 font-mono text-[10px] text-zinc-100 hover:bg-white/15"
                      >
                        {isSaving ? "saving…" : "save"}
                      </button>
                    </div>
                  </div>
                ) : (
                  version.description && (
                    <p className="mt-0.5 pl-4 text-[11px] leading-snug text-zinc-500">
                      {version.description}
                    </p>
                  )
                )}
              </li>
            );
          })}
        </ul>

        {isDev && (
          <button
            onClick={async () => {
              if (pageData) await handleCopy(pageData);
            }}
            className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded border border-white/10 bg-white/5 py-1.5 font-mono text-[11px] text-zinc-200 hover:bg-white/10"
          >
            <span>+</span> add version
          </button>
        )}
      </div>
    </div>
  );
};

export default PageDetailsData;
