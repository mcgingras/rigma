"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  HomeIcon,
  ShieldCheckIcon,
  BellAlertIcon,
} from "@heroicons/react/24/solid";

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
            initial={{ y: 1000, scale: 0.93 }}
            animate={{ y: 0, scale: 0.95 }}
            exit={{ y: 1000, scale: 0.93 }}
            transition={{
              delay: isClicked ? 0.12 : 0,
              duration: 0.3,
              type: "spring",
              stiffness: 150,
              damping: 23.5,
              mass: 1.2,
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src="/assets/girl.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>

            <div className="h-full w-full relative flex flex-col items-center justify-center">
              {/* <div className="h-full w-full bg-white/10 absolute top-0 left-0 backdrop-blur"></div> */}
              <p className="text-white text-2xl font-bold">Focus mode</p>
              <button
                onClick={() => setIsClicked(false)}
                className="absolute top-4 left-1/2 -translate-x-1/2 text-white bg-white/20 backdrop-blur-lg rounded-full px-4 py-2 cursor-pointer font-semibold border border-white/10"
              >
                Close
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
          opacity: isClicked ? 0.5 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative h-full w-full bg-gray-200"
      >
        <motion.div
          animate={{
            borderRadius: isClicked ? "2rem 2rem 0rem 0rem" : "0rem",
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full h-[60px] bg-gray-100 border-b border-gray-300 flex flex-row items-center justify-center"
        >
          <div className="flex flex-row space-x-6 text-gray-400 mx-auto">
            <HomeIcon className="w-6 h-6" />
            <ShieldCheckIcon className="w-6 h-6" />
            <BellAlertIcon className="w-6 h-6" />
          </div>
        </motion.div>
        <div className="w-full h-[calc(100%-60px)] flex flex-col items-center justify-center">
          <p className="text-gray-400">Placeholder content</p>
        </div>

        {!isOpen && (
          <motion.div
            layoutId="ambush-a-container"
            className="absolute bottom-8 right-8"
            onMouseOver={() => setIsOpen(true)}
          >
            <motion.div
              layoutId="ambush-a"
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
            className="absolute bottom-8 right-8 border border-gray-100 rounded-xl p-1 flex flex-row space-x-1 shadow-lg bg-white overflow-y-hidden"
            onMouseLeave={() => setIsOpen(false)}
          >
            <motion.div
              layout="position"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.35,
              }}
              className="relative flex flex-col space-y-2 items-center justify-center bg-gradient-to-t from-gray-100 to-[#F4E7C1] rounded-lg pt-4 pb-2 w-[200px]"
            >
              <img
                src="/assets/side.png"
                alt="Ambush A"
                className="w-12 h-12"
              />
              <span
                className="text-sm bg-white/70 backdrop-blur-md rounded-lg px-2 py-0.5 text-black/30 border border-black/10 cursor-pointer"
                onClick={() => setIsClicked(true)}
              >
                2 new alerts
              </span>
            </motion.div>
            <div className="flex flex-col space-y-2 items-center justify-end">
              <motion.div
                layoutId="ambush-a"
                className="flex flex-col items-center justify-center bg-gray-300 rounded-lg p-2 self-end cursor-pointer"
                onClick={() => setIsClicked(true)}
              >
                <img
                  src="/assets/ambush_a.svg"
                  alt="Ambush A"
                  className="w-3 h-3"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
};

export default BrandPage;
