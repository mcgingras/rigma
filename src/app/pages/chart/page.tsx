"use client";

import PortfolioChart from "@/app/components/PortfolioChart";
import SelectionBlurTwo from "@/app/components/SelectionBlurTwo";
import React from "react";

export default function Page() {
  return (
    <SelectionBlurTwo>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
        <div className="h-[calc(100vh-12rem)] w-full">
          <PortfolioChart dataPattern="sharp" />
        </div>
      </main>
    </SelectionBlurTwo>
  );
}
