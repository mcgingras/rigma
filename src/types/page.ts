export interface Page {
  id: string;
  name: string;
  filePath: string;
  parentId?: string; // For tracking remixes/copies
}

export interface PagePreview {
  id: string;
  name: string;
  previewUrl: string;
  updatedAt: Date;
}

export interface PageState {
  pages: Page[];
  selectedPageId: string | null;
  pagesDirectory: string;
}
