import { useEffect, useState } from "react";
import { usePageStore } from "@/store/usePageStore";

export default function PageRenderer() {
  const { selectedPageId, pages } = usePageStore();
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const selectedPage = pages.find((page) => page.id === selectedPageId);
    if (!selectedPage) {
      setComponent(null);
      return;
    }

    try {
      // Create a new function from the code string
      const fn = new Function("React", selectedPage.code);

      // Execute the function to get the component
      const component = fn(require("react"));

      setComponent(() => component);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error rendering component"
      );
      setComponent(null);
    }
  }, [selectedPageId, pages]);

  if (!selectedPageId) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Select a page to preview</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        <h3 className="font-semibold mb-2">Error rendering component:</h3>
        <pre className="bg-red-50 p-2 rounded">{error}</pre>
      </div>
    );
  }

  if (!Component) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading component...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Component />
    </div>
  );
}
