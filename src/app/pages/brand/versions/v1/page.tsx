"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const BrandPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <main
      className="h-screen w-full relative bg-white"
      style={
        {
          // background: "linear-gradient(276deg, #B8D1DC 21.66%, #E4E8E7 113.77%)",
        }
      }
    >
      <AnimatePresence mode="popLayout">
        {isClicked && (
          <motion.div
            className="z-[50] absolute top-0 w-full h-full left-0 flex flex-col justify-end overflow-hidden bg-cover bg-center bg-no-repeat rounded-[2rem]"
            style={{ backgroundImage: 'url("/assets/girl.png")' }}
            initial={{ y: 1000, scale: 0.93 }}
            animate={{ y: 0, scale: 0.95 }}
            exit={{ y: 1000, scale: 0.93 }}
            transition={{
              delay: isClicked ? 0.2 : 0,
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <div className="h-full w-full relative flex flex-col items-center justify-center">
              <p className="text-white text-2xl font-bold">Focus mode</p>
              <button
                onClick={() => setIsClicked(false)}
                className="absolute top-4 left-1/2 -translate-x-1/2 text-white bg-black/20 backdrop-blur-lg rounded-full px-4 py-2 cursor-pointer"
              >
                close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ scale: 1, borderRadius: "1rem" }}
        animate={{
          scale: isClicked ? 0.95 : 1,
          borderRadius: isClicked ? "2rem" : "0rem",
          opacity: isClicked ? 0.7 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative h-full w-full bg-gray-200 flex flex-col items-center justify-center"
      >
        <p className="text-gray-400">Placeholder content</p>
        {!isOpen && (
          <motion.div
            layoutId="ambush-a-container"
            className="absolute bottom-8 right-8"
            onMouseOver={() => setIsOpen(true)}
          >
            <motion.div
              layoutId="ambush-a"
              layout="position"
              transition={{
                layout: {
                  duration: 0.3,
                  ease: "easeInOut",
                },
              }}
              className="flex flex-col items-center justify-center bg-gray-300 rounded-lg p-3"
            >
              <img
                src="/assets/ambush_a.svg"
                alt="Ambush A"
                className="w-4 h-4"
              />
            </motion.div>
          </motion.div>
        )}
        {isOpen && (
          <motion.div
            layoutId="ambush-a-container"
            className="absolute bottom-8 right-8 border border-gray-100 rounded-lg p-2 flex flex-col space-y-2 shadow-sm bg-white"
            onMouseLeave={() => setIsOpen(false)}
          >
            <div className="relative flex flex-col items-center justify-center bg-gradient-to-t from-gray-100 to-[#F4E7C1] rounded-lg py-10 w-[250px]">
              <img
                src="/assets/side.png"
                alt="Ambush A"
                className="w-12 h-12"
              />
              <span
                className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm bg-white/10 backdrop-blur-md rounded-lg px-2 py-0.5 text-black/30 border border-black/10 cursor-pointer"
                onClick={() => setIsClicked(true)}
              >
                2 new alerts
              </span>
            </div>
            <div className="flex flex-row space-x-2 items-center">
              <motion.div
                layoutId="ambush-a"
                layout="position"
                transition={{
                  layout: {
                    duration: 0.3,
                    ease: "easeInOut",
                  },
                }}
                className="flex flex-col items-center justify-center bg-gray-300 rounded-lg p-2"
              >
                <img
                  src="/assets/ambush_a.svg"
                  alt="Ambush A"
                  className="w-2 h-2"
                />
              </motion.div>
              <motion.p
                className="text-sm text-gray-400"
                onClick={() => setIsOpen(!isOpen)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                Ask Agent
              </motion.p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
};

export default BrandPage;
