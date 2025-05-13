"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const Card = ({ isSpread, index }: { isSpread: boolean; index: number }) => {
  return (
    <motion.div
      className="w-[600px] p-4 border rounded-lg shadow-sm bg-white"
      initial={{
        marginTop: isSpread ? 20 : -65,
        scale: isSpread ? 1 : 1 - index * 0.05,
      }}
      animate={{
        marginTop: isSpread ? 20 : -65,
        scale: isSpread ? 1 : 1 - index * 0.05,
      }}
      style={{ zIndex: 2 - index }}
      transition={{ type: "spring", stiffness: 800, damping: 80, mass: 4 }}
    >
      <div className="flex flex-row space-x-2 items-center">
        <span className="h-10 w-10 bg-gray-400 rounded"></span>
        <div className="flex flex-col">
          <h1 className="text-base font-semibold text-gray-700">
            Notification #{index + 1}
          </h1>
          <p className="text-sm text-gray-500">Description</p>
        </div>
        <div className="flex-1 self-end text-right">
          <span className="text-xs text-gray-500">10/10/2021</span>
        </div>
      </div>
    </motion.div>
  );
};

export default function Stack() {
  const [isSpread, setIsSpread] = useState(false);

  return (
    <main className="h-screen w-screen bg-white flex flex-col items-center justify-center space-y-2">
      <motion.div className="flex flex-col items-center">
        <Card isSpread={isSpread} index={0} />
        <Card isSpread={isSpread} index={1} />
        <Card isSpread={isSpread} index={2} />
      </motion.div>
      <button
        onClick={() => setIsSpread((prev) => !prev)}
        className="mt-8 bg-[#BABBFE] text-[#353738] px-8 py-2 border border-[#B1B2FF]/20 rounded-full font-semibold shadow-[inset_0_3px_3px_-2px_rgba(255,255,255,0.6)]"
      >
        {isSpread ? "Stack" : "Split"}
      </button>
    </main>
  );
}
