import { create } from "zustand";
import { Page, PageState } from "@/types/page";

interface PageStore extends PageState {
  addPage: (page: Omit<Page, "id" | "createdAt" | "updatedAt">) => void;
  updatePage: (id: string, updates: Partial<Page>) => void;
  deletePage: (id: string) => void;
  selectPage: (id: string) => void;
  duplicatePage: (id: string) => Promise<void>;
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

  duplicatePage: async (id) => {
    const pageToDuplicate = (
      await fetch("/api/pages").then((res) => res.json())
    ).find((p: Page) => p.id === id);

    if (!pageToDuplicate) return;

    let newName = `${pageToDuplicate.name}_copy`;
    let counter = 1;

    // Check if name exists
    const existingPages = await fetch("/api/pages").then((res) => res.json());
    while (existingPages.some((p: Page) => p.name === newName)) {
      newName = `${pageToDuplicate.name}_copy${counter}`;
      counter++;
    }

    await fetch("/api/pages", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sourcePath: pageToDuplicate.filePath,
        newName,
      }),
    });

    set((state) => ({
      pages: [
        ...state.pages,
        { ...pageToDuplicate, id: newName, name: newName },
      ],
    }));
  },
}));
