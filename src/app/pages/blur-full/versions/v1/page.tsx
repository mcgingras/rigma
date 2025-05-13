"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function Page() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <main
      className="h-screen w-full relative bg-white overflow-hidden"
      style={{
        backgroundImage: "url(/assets/blur-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <AnimatePresence>
        {isClicked && (
          <motion.div
            className="absolute inset-0 bg-white/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        )}
      </AnimatePresence>
      <button
        className="fixed bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-full p-2"
        onClick={() => setIsClicked(!isClicked)}
      >
        click
      </button>
    </main>
  );
}
