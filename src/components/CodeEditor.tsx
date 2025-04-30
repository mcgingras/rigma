import { Editor } from "@monaco-editor/react";
import { usePageStore } from "@/store/usePageStore";

export default function CodeEditor() {
  const { selectedPageId, pages, updatePage } = usePageStore();
  const selectedPage = pages.find((page) => page.id === selectedPageId);

  if (!selectedPage) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Select a page to edit</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">{selectedPage.name}</h2>
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage="typescript"
          value={selectedPage.code}
          onChange={(value) => {
            if (value !== undefined) {
              updatePage(selectedPage.id, { code: value });
            }
          }}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
          }}
        />
      </div>
    </div>
  );
}
