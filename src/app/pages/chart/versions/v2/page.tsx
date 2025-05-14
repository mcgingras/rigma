"use client";

import PortfolioChart from "@/app/components/PortfolioChart";
import SelectionBlur from "@/app/components/SelectionBlur";
import React from "react";

export default function Page() {
  return (
    <SelectionBlur>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
        <div className="h-[calc(100vh-12rem)] w-full">
          <PortfolioChart dataPattern="sharp" />
        </div>
      </main>
    </SelectionBlur>
  );
}
