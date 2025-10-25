"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import {
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  UserIcon,
  UserPlusIcon,
  StarIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon,
  ChatBubbleBottomCenterTextIcon,
  PlusIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const testImage = "/assets/girl.png";

export default function SlackProfileView() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-300">
      <div className="h-[600px] w-[400px] text-white relative border border-white/10 bg-zinc-700 rounded-lg overflow-hidden">
        <MotionConfig
          // transition={{ duration: 2.5, type: "spring", bounce: 0 }}
          transition={{ duration: 2.5, type: "linear" }}
        >
          <AnimatePresence initial={false} mode="sync">
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-[60] bg-black/30"
                onClick={() => setIsOpen(false)}
              ></motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence mode="sync">
            {isOpen && (
              <div className="absolute top-[8px] left-0 z-[61] flex w-[400px] justify-center p-1">
                <motion.div
                  initial={{ height: "45px", width: "90%" }}
                  animate={{ height: "auto", width: "97%" }}
                  exit={{ height: "45px", width: "90%" }}
                  className="bg-zinc-700 relative overflow-hidden"
                  style={{ borderRadius: 20 }}
                >
                  <header className="flex h-12 items-center gap-1 px-2">
                    <div className="relative isolate h-8 w-8">
                      <motion.div
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 0, opacity: 0 }}
                        className="absolute top-0 left-0 isolate h-8 w-8"
                      >
                        <Image
                          src={testImage}
                          alt="logo"
                          fill
                          className="rounded-md"
                        />
                      </motion.div>
                      <motion.button
                        layoutId="wrapper-close-button"
                        className="absolute top-0 left-0 -z-10 flex h-8 w-8 items-center justify-center text-[#C7C9CD]"
                        onClick={() => setIsOpen(false)}
                      >
                        <XMarkIcon strokeWidth={1.5} className="w-5 h-5" />
                      </motion.button>
                    </div>
                    <div className="-space-y-px">
                      <motion.h2
                        layoutId="wrapper-user-name"
                        className="text-sm font-bold"
                      >
                        Ali Samadi
                      </motion.h2>
                      <motion.p
                        layoutId="wrapper-user-details"
                        className="text-white/50 flex items-center text-xs"
                      >
                        Other content
                      </motion.p>
                    </div>
                    <button className="ml-auto flex h-8 w-8 items-center justify-center">
                      <motion.div
                        layoutId="wrapper-ellipsis"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute top-2 right-0 isolate h-8 w-8"
                      >
                        <EllipsisHorizontalIcon
                          strokeWidth={1.5}
                          className="w-5 h-5"
                        />
                      </motion.div>
                    </button>
                  </header>
                  <motion.div
                    className="mt-1 pb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      layout
                      className="mb-2 grid grid-cols-3 gap-2 px-3 text-white"
                    >
                      <button className="border-[#27292e] flex h-9 items-center justify-center gap-1 rounded-md border px-1 text-sm">
                        <UserPlusIcon strokeWidth={1.5} className="w-5 h-5" />
                        Add
                      </button>
                      <button className="border-[#27292e] flex h-9 items-center justify-center gap-1 rounded-md border px-1 text-sm">
                        <StarIcon strokeWidth={1.5} className="w-5 h-5" />
                        Move
                      </button>
                      <button className="border-[#27292e] flex h-9 items-center justify-center gap-1 rounded-md border px-1 text-sm">
                        <MagnifyingGlassIcon
                          strokeWidth={1.5}
                          className="w-5 h-5"
                        />
                        Search
                      </button>
                    </motion.div>
                    <motion.div layout className="flex flex-col px-1">
                      <button className="hover:bg-[#27292e] border-[#27292e] bg-zinc-700 flex h-8 items-center gap-1 rounded-md px-1 text-start text-sm">
                        <div className="flex h-8 w-8 items-center justify-center">
                          <ChatBubbleBottomCenterTextIcon
                            strokeWidth={1.5}
                            className="w-5 h-5"
                          />
                        </div>
                        Messages
                      </button>
                      <button className="hover:bg-[#27292e] border-[#27292e] flex h-8 items-center gap-1 rounded-md px-1 text-start text-sm">
                        <div className="flex h-8 w-8 items-center justify-center">
                          <PlusIcon strokeWidth={1.5} className="w-5 h-5" />
                        </div>
                        Add canvas
                      </button>
                      <button className="hover:bg-[#27292e] border-[#27292e] flex h-8 items-center gap-1 rounded-md px-1 text-start text-sm">
                        <div className="flex h-8 w-8 items-center justify-center">
                          <PhotoIcon strokeWidth={1.5} className="w-5 h-5" />
                        </div>
                        Files
                      </button>
                    </motion.div>
                    <motion.div layout className="flex flex-col px-1">
                      <button className="hover:bg-[#27292e] border-[#27292e] flex h-8 items-center gap-1 rounded-md px-1 text-start text-sm">
                        <div className="flex h-8 w-8 items-center justify-center">
                          <UserIcon strokeWidth={1.5} className="w-5 h-5" />
                        </div>
                        <span className="inline-block grow">View Profile</span>
                        <ChevronRightIcon
                          strokeWidth={1.5}
                          className="w-5 h-5"
                        />
                      </button>
                      <button className="hover:bg-[#27292e] border-[#27292e] flex h-8 items-center gap-1 rounded-md px-1 text-start text-sm">
                        <div className="flex h-8 w-8 items-center justify-center">
                          <Cog6ToothIcon
                            strokeWidth={1.5}
                            className="w-5 h-5"
                          />
                        </div>
                        <span className="inline-block grow">View Profile</span>
                        <ChevronRightIcon
                          strokeWidth={1.5}
                          className="w-5 h-5"
                        />
                      </button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {!isOpen && (
              <div className="absolute w-[80%] top-[8px] left-[10%] rounded-lg">
                <header className="flex h-12 items-center gap-2 px-2">
                  <div className="relative isolate h-8 w-8">
                    <motion.div
                      initial={{ scale: 1, opacity: 1 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute top-0 left-0 isolate h-8 w-8"
                    >
                      <Image
                        src={testImage}
                        alt="logo"
                        fill
                        className="rounded-md"
                      />
                    </motion.div>
                  </div>
                  <motion.div
                    layoutId="wrapper-user-info"
                    className="-space-y-px"
                  >
                    <motion.h2
                      layoutId="wrapper-user-name"
                      className="text-sm font-bold"
                    >
                      Ali Samadi
                    </motion.h2>
                    <motion.p
                      layoutId="wrapper-user-details"
                      className="text-white/50 flex items-center text-xs"
                    >
                      3 tabs
                    </motion.p>
                  </motion.div>
                </header>
              </div>
            )}
          </AnimatePresence>
        </MotionConfig>
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-black bg-zinc-200 px-2 py-1 rounded-lg"
      >
        {isOpen ? "Close" : "Open"}
      </button>
    </div>
  );
}
