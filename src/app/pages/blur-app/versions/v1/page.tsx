"use client";

import React, { useState } from "react";
import { ProgressiveBlur } from "@/components/ProgressiveBlur";
import { motion } from "motion/react";

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
      <button
        className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-full p-2"
        onClick={() => setIsClicked(!isClicked)}
      >
        click
      </button>
      <motion.div
        className="absolute left-0 bottom-0 h-[400px] w-full"
        initial={{ translateY: 400 }}
        animate={{ translateY: isClicked ? 60 : 400 }}
        transition={{ type: "spring", stiffness: 150, damping: 19, mass: 1.2 }}
      >
        <ProgressiveBlur
          blurStart={0}
          blurEnd={100}
          direction="to-bottom"
          layers={5}
          className=""
        >
          <div className="w-full h-[400px]"></div>
        </ProgressiveBlur>
        <div className="absolute top-0 left-0 w-full h-[400px] p-8 flex flex-col space-y-2 pt-40">
          <img
            src="/assets/girl.png"
            className="w-10 h-10 rounded-full object-cover"
            alt="girl"
          />
          <p className="font-semibold text-[#353738]/50">Home</p>
          <p className="font-semibold text-[#353738]/50">Portfolio</p>
          <p className="font-semibold text-[#353738]/50">Security</p>
        </div>
      </motion.div>
    </main>
  );
}
