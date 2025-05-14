"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Page } from "@/types/page";

const PageDetailsData = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pageData, setPageData] = useState<Page>();
  const pathname = usePathname();
  const pageId = pathname?.split("/")[2]; // pages/id

  useEffect(() => {
    const fetchPageData = async () => {
      const response = await fetch(`/api/pages/${pageId}`);
      const data = await response.json();
      setPageData(data);
    };
    fetchPageData();
  }, []);

  return (
    <div className="fixed right-4 top-4 bg-black/5 backdrop-blur-sm text-black border border-black/10 rounded p-2 z-[9999] w-[300px]">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold">Page</h2>
        <button onClick={() => setIsOpen(!isOpen)} className="text-sm">
          {isOpen ? "Close" : "Open"}
        </button>
      </div>
      {isOpen && (
        <>
          <div className="mt-2">
            <h3 className="text-sm font-bold">Description</h3>
            <p className="text-xs">{pageData?.description}</p>
          </div>
          <div className="mt-2">
            <p className="text-sm font-bold">
              Total versions ({pageData?.versions.length})
            </p>
            <div className="flex flex-col gap-1">
              {pageData?.versions.map((version) => (
                <li key={version.id} className="text-xs">
                  {version.id} - {version.name}
                </li>
              ))}
            </div>
            <button className="mt-4 text-white w-full py-1 rounded-md text-xs font-bold bg-gray-500 cursor-pointer">
              Add Version
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PageDetailsData;
