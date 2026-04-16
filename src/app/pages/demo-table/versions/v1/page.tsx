"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DemoTable = () => {
  const [isJoined, setIsJoined] = useState(false);

  const data = [
    { id: "1", name: "ETH", value: 100 },
    { id: "2", name: "ETH", value: 200 },
    { id: "3", name: "DOGE", value: 300 },
    { id: "4", name: "ETH", value: 300 },
    { id: "5", name: "UNI", value: 200 },
    { id: "6", name: "DOGE", value: 100 },
  ];

  const joinedData = [
    { id: "1", name: "ETH", value: 100 },
    { id: "2", name: "ETH", value: 200 },
    { id: "3", name: "DOGE", value: 300 },
    { id: "5", name: "UNI", value: 200 },
    { id: "6", name: "DOGE", value: 100 },
  ];
  const finalData = isJoined ? joinedData : data;

  return (
    <>
      <button
        onClick={() => setIsJoined(!isJoined)}
        className="mb-4 rounded-md bg-gray-200 px-3 py-1.5 text-sm hover:bg-gray-300"
      >
        {isJoined ? "Unmerge" : "Merge"}
      </button>
      <motion.div
        className="relative w-full overflow-hidden rounded-lg border"
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
      >
        <motion.div className="flex flex-col">
          <AnimatePresence initial={false} mode="popLayout">
            {finalData.map((item) => {
              return (
                <motion.div
                  className="flex flex-row justify-between px-2 py-1"
                  key={item.id}
                  initial={{ opacity: 0, y: -60 }}
                  exit={{
                    opacity: 0,
                    y: item.name === "ETH" ? -50 : -30,
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: 1,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div layout>{item.name}</motion.div>
                  <motion.div layout>{item.value}</motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
};

export default function Page() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white p-24">
      <div className="w-full max-w-md">
        <DemoTable />
      </div>
    </div>
  );
}
