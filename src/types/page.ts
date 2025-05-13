export interface PageVersion {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Page {
  id: string;
  name: string;
  description: string;
  versions: PageVersion[];
  currentVersionId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PagePreview {
  id: string;
  name: string;
  description: string;
  previewUrl: string;
  updatedAt: Date;
  versionCount: number;
}

export interface PageState {
  pages: Page[];
  selectedPageId: string | null;
  pagesDirectory: string;
}
