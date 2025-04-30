"use client";

import localFont from "next/font/local";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const cardVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: [0.175, 0.885, 0.32, 1.1],
    },
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeOut" } },
};

const NotificationCard = ({ index }: { index: number }) => {
  return (
    <motion.div
      className="h-[150px] w-[200px] rounded bg-white/40 p-4"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      custom={index}
    >
      <div className="flex h-full flex-col">
        <span className="text-[10px] font-bold uppercase text-black/60">
          Contract request
        </span>
        <span className="mt-1 text-lg font-bold uppercase text-black/90">
          Joe Smith
        </span>
        <div className="flex flex-1 flex-col items-end justify-end">
          <div className="flex w-full flex-row items-center justify-center space-x-1">
            <button className="w-1/2 rounded bg-black/10 px-2 py-1 text-[10px] text-black/70">
              Accept
            </button>
            <button className="w-1/2 rounded bg-black/10 px-2 py-1 text-[10px] text-black/70">
              Reject
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const HomePage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const numCards = 5;

  return (
    <motion.main
      className="relative flex h-screen w-full flex-col justify-end overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/assets/girl.png")' }}
      //   animate={{ scale: isExpanded ? 1.1 : 1, y: isExpanded ? -50 : 0 }}
      //   transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <button
        className="absolute right-4 top-4 z-10 rounded-full border border-white/30 bg-white/10 px-3 py-2"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <img
          src="/assets/ambush_logo_white.svg"
          alt="Ambush"
          className="w-16"
        />
      </button>
      <div className="absolute top-0 flex flex-row space-x-6 p-6">
        <AnimatePresence>
          {isExpanded && (
            <>
              <NotificationCard index={0} />
              <NotificationCard index={1} />
              <NotificationCard index={2} />
              <NotificationCard index={3} />
              <NotificationCard index={4} />
            </>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        animate={{ y: isExpanded ? 200 : 0 }}
        transition={{
          duration: isExpanded ? 0.7 : 0.2,
          ease: isExpanded ? [0.175, 0.885, 0.32, 1.1] : "easeOut",
        }}
      >
        <motion.div className="h-[calc(100vh-50px)] w-full bg-gradient-to-t from-white via-white via-90% to-transparent to-100%">
          <div className="mx-auto max-w-screen-lg pt-[150px]"></div>
        </motion.div>
      </motion.div>
    </motion.main>
  );
};

export default HomePage;
