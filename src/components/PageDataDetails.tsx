"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Page, PageVersion } from "@/types/page";
import Link from "next/link";
import { usePageStore } from "@/store/usePageStore";

const PageDetailsData = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [pageData, setPageData] = useState<Page>();
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");
  const [editingVersionId, setEditingVersionId] = useState<string | null>(null);
  const [editedVersionDescription, setEditedVersionDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { duplicatePage, refreshPages } = usePageStore();
  const pathname = usePathname();
  const pageId = pathname?.split("/")[2]; // pages/id

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    const response = await fetch(`/api/pages/${pageId}`);
    const data = await response.json();
    setPageData(data);
    setEditedDescription(data.description || "");
  };

  const handleSaveDescription = async () => {
    if (!pageData) return;
    setIsSaving(true);
    try {
      const response = await fetch(`/api/pages/${pageId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: editedDescription,
        }),
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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: editedVersionDescription,
          }),
        }
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

  return (
    <div className="fixed right-4 top-4 bg-black/5 backdrop-blur-sm text-black border border-black/10 rounded p-2 z-[9999] w-[300px]">
      <div className="flex items-center justify-between">
        <Link className="text-sm w-[50px]" href="/">
          Home
        </Link>
        <h2 className="text-base font-bold">{pageData?.name}</h2>
        <button onClick={() => setIsOpen(!isOpen)} className="text-sm w-[50px]">
          {isOpen ? "Close" : "Open"}
        </button>
      </div>
      {isOpen && (
        <>
          <div className="mt-2 border-t border-gray-200 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold">Description</h3>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-xs text-gray-500 hover:text-gray-700 cursor-pointer hover:underline"
                >
                  Edit
                </button>
              )}
            </div>
            {isEditing ? (
              <div className="mt-1">
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="w-full text-xs p-1 border border-gray-300 rounded resize-none focus:outline-none focus:ring-1 focus:ring-gray-400"
                  rows={3}
                />
                <div className="flex justify-end gap-2 mt-1">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditedDescription(pageData?.description || "");
                    }}
                    className="text-xs text-gray-500 hover:text-gray-700"
                    disabled={isSaving}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveDescription}
                    className="text-xs text-white bg-gray-500 hover:bg-gray-600 px-2 py-1 rounded"
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            ) : (
              <p
                className="text-xs cursor-pointer hover:bg-black/5 p-1 rounded text-zinc-700"
                onClick={() => setIsEditing(true)}
              >
                {pageData?.description || "Add a description..."}
              </p>
            )}
          </div>
          <div className="mt-2 border-t border-gray-200 pt-2">
            <p className="text-base font-bold">
              Total versions ({pageData?.versions.length})
            </p>
            <div className="flex flex-col gap-2">
              {pageData?.versions.map((version) => (
                <div
                  key={version.id}
                  className="border-b border-gray-200 pb-2 last:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/pages/${pageId}/versions/${version.id}`}
                      className="text-sm hover:underline"
                    >
                      {version.id} - {version.name}
                    </Link>
                    <button
                      onClick={() => {
                        setEditingVersionId(version.id);
                        setEditedVersionDescription(version.description || "");
                      }}
                      className="text-xs text-gray-500 hover:text-gray-700 cursor-pointer hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  {editingVersionId === version.id ? (
                    <div className="mt-1">
                      <textarea
                        value={editedVersionDescription}
                        onChange={(e) =>
                          setEditedVersionDescription(e.target.value)
                        }
                        className="w-full text-xs p-1 border border-gray-300 rounded resize-none focus:outline-none focus:ring-1 focus:ring-gray-400"
                        rows={2}
                      />
                      <div className="flex justify-end gap-2 mt-1">
                        <button
                          onClick={() => {
                            setEditingVersionId(null);
                            setEditedVersionDescription(
                              version.description || ""
                            );
                          }}
                          className="text-xs text-gray-500 hover:text-gray-700"
                          disabled={isSaving}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveVersionDescription(version)}
                          className="text-xs text-white bg-gray-500 hover:bg-gray-600 px-2 py-1 rounded"
                          disabled={isSaving}
                        >
                          {isSaving ? "Saving..." : "Save"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between group">
                      <p
                        className="text-xs text-zinc-700 cursor-pointer hover:bg-black/5 p-1 rounded flex-grow"
                        onClick={() => {
                          setEditingVersionId(version.id);
                          setEditedVersionDescription(
                            version.description || ""
                          );
                        }}
                      >
                        {version.description || "Add a description..."}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button
              className="mt-4 text-white w-full py-1 rounded-md text-xs font-bold bg-gray-500 cursor-pointer"
              onClick={async () => {
                if (pageData) {
                  await handleCopy(pageData);
                }
              }}
            >
              Add Version
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PageDetailsData;
