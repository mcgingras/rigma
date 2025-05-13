import { create } from "zustand";
import { Page, PageState } from "@/types/page";

interface PageStore extends PageState {
  addPage: (
    page: Omit<
      Page,
      "id" | "createdAt" | "updatedAt" | "versions" | "currentVersionId"
    >
  ) => void;
  updatePage: (id: string, updates: Partial<Page>) => void;
  deletePage: (id: string) => void;
  selectPage: (id: string) => void;
  duplicatePage: (
    id: string,
    versionName: string,
    description: string
  ) => Promise<void>;
  refreshPages: () => Promise<void>;
}

export const usePageStore = create<PageStore>((set) => ({
  pages: [],
  selectedPageId: null,
  pagesDirectory: "pages",

  addPage: (page) =>
    set((state) => ({
      pages: [
        ...state.pages,
        {
          ...page,
          id: crypto.randomUUID(),
          versions: [
            {
              id: "v1",
              name: `${page.name} - Initial Version`,
              description: "Initial version",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          currentVersionId: "v1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    })),

  updatePage: (id, updates) =>
    set((state) => ({
      pages: state.pages.map((page) =>
        page.id === id ? { ...page, ...updates, updatedAt: new Date() } : page
      ),
    })),

  deletePage: (id) =>
    set((state) => ({
      pages: state.pages.filter((page) => page.id !== id),
      selectedPageId: state.selectedPageId === id ? null : state.selectedPageId,
    })),

  selectPage: (id) => set({ selectedPageId: id }),

  refreshPages: async () => {
    const response = await fetch("/api/pages");
    const pages = await response.json();
    set({ pages });
  },

  duplicatePage: async (id, versionName, description) => {
    await fetch("/api/pages", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sourceId: id,
        versionName,
        description,
      }),
    });

    // Refresh the pages list to get the new version
    const response = await fetch("/api/pages");
    const pages = await response.json();
    set({ pages });
  },
}));
