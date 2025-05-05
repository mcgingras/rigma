"use client";

import React, { useState } from "react";
import PortfolioChart from "@/app/components/PortfolioChart";
import { AnimatePresence, motion } from "motion/react";

export default function Page() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <main className="h-screen w-full relative bg-white p-4">
      <div className="grid grid-cols-3 gap-2 w-full h-full">
        <section className="flex flex-col space-y-2">
          <motion.div
            layoutId="portfolio-chart"
            className="h-1/3 w-full bg-gray-100 rounded transition-all duration-300 cursor-pointer"
            onClick={() => setIsClicked(true)}
          >
            <PortfolioChart />
          </motion.div>
          <div className="h-2/3 w-full bg-gray-100 rounded"></div>
        </section>
        <section className="flex flex-col space-y-2">
          <div className="h-full w-full bg-gray-100 rounded p-6">
            <div className="flex flex-row items-center space-x-2">
              <img src="/assets/side.png" alt="side" className="w-10 h-10" />
              <h1 className="text-2xl font-bold text-zinc-700">
                Good morning, Michael
              </h1>
            </div>
          </div>
        </section>
        <section className="flex flex-col space-y-2">
          <div className="h-1/3 w-full bg-gray-100 rounded"></div>
          <div className="h-1/3 w-full bg-gray-100 rounded"></div>
          <div className="h-1/3 w-full bg-gray-100 rounded"></div>
        </section>
      </div>

      <AnimatePresence>
        {isClicked && (
          <motion.div
            key="fullscreen"
            layoutId="portfolio-chart"
            className="fixed inset-0 z-50 flex items-center justify-center bg-white"
            onClick={() => setIsClicked(false)}
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ pointerEvents: isClicked ? "auto" : "none" }}
          >
            <div className="w-full h-full">
              <PortfolioChart />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
