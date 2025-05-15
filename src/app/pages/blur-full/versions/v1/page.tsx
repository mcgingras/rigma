"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { PlusIcon } from "@heroicons/react/24/outline";

const cards = [
  { index: 1, title: "Social" },
  { index: 2, title: "Defi" },
  { index: 3, title: "Security" },
  { index: 4, title: "Settings" },
];

const Card = ({
  index,
  title,
  show,
}: {
  index: number;
  title: string;
  show: boolean;
}) => {
  return (
    <motion.div
      className="p-4 rounded-md bg-black/10 hover:bg-black/20 backdrop-blur-sm w-[150px] h-[200px] flex flex-col cursor-pointer"
      initial={{ opacity: 0, y: 230 }}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 230 }}
      transition={{
        y: {
          duration: 0.3,
          delay: show ? 0.15 + index * 0.05 : 0,
          type: "spring",
          stiffness: 150,
          damping: 19,
          mass: 1.2,
        },
        opacity: {
          duration: 0.2,
          delay: show ? 0.15 + index * 0.05 : 0.3, // Delay opacity fade out until after y animation
        },
      }}
    >
      <span className="bg-black/50 text-white rounded-full h-10 w-10 flex items-center justify-center">
        {index}
      </span>
      <div className="mt-auto text-black/70 text-2xl">{title}</div>
    </motion.div>
  );
};

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
      <motion.div
        className="absolute inset-0 bg-white/20 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: isClicked ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: isClicked ? 0.3 : 0.5,
          delay: isClicked ? 0 : 0.15,
        }}
      ></motion.div>

      <button
        className="fixed bottom-4 left-4 backdrop-blur-sm rounded-full p-2"
        onClick={() => setIsClicked(!isClicked)}
      >
        <motion.div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          initial={{ rotate: 0, backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          animate={{
            rotate: isClicked ? 45 : 0,
            backgroundColor: isClicked
              ? "rgba(0, 0, 0, 0.5)"
              : "rgba(0, 0, 0, 0.2)",
          }}
          transition={{
            duration: 0.3,
            type: "spring",
            stiffness: 150,
            damping: 19,
            mass: 1.2,
          }}
        >
          <PlusIcon className="w-6 h-6 text-white" />
        </motion.div>
      </button>
      <div className="fixed bg-white/20 bottom-0 ml-20 mb-4 flex flex-row gap-4">
        {cards.map((card) => (
          <Card key={card.index} {...card} show={isClicked} />
        ))}
      </div>
    </main>
  );
}
