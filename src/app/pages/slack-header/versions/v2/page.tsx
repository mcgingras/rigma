"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
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
  SpeakerWaveIcon,
} from "@heroicons/react/24/outline";
const testImage = "/assets/girl.png";

export default function SlackProfileView() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-300">
      <div className="h-[600px] w-[400px] text-white relative border border-white/10 bg-zinc-800 rounded-lg overflow-hidden">
        <MotionConfig transition={{ duration: 2.5, type: "spring", bounce: 0 }}>
          <AnimatePresence>
            {isOpen && (
              <div className="absolute top-[8px] left-0 z-[61] flex w-[400px] justify-center">
                <motion.div
                  initial={{ width: "97%", height: 40 }}
                  animate={{ width: "97%", height: 260 }}
                  exit={{ width: "97%", height: 40 }}
                  className="bg-[#232429] relative overflow-hidden flex flex-col"
                  style={{ borderRadius: 20 }}
                >
                  <header className="flex h-12 items-center gap-1 px-2 flex-shrink-0">
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
                        className="absolute top-0 left-0 -z-10 flex h-8 w-8 items-center justify-center text-[#C7C9CD] cursor-pointer"
                        onClick={() => setIsOpen(false)}
                      >
                        <XMarkIcon strokeWidth={1.5} className="w-5 h-5" />
                      </motion.button>
                    </div>
                    <motion.div
                      className="-space-y-px"
                    >
                      <h2 className="text-sm font-bold">Ali Samadi</h2>
                      <p className="text-white/50 flex items-center text-xs">
                        3 tabs
                      </p>
                    </motion.div>
                    <button className="ml-auto flex h-8 w-8 items-center justify-center">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex h-8 w-8 items-center justify-center"
                      >
                        <EllipsisHorizontalIcon
                          strokeWidth={1.5}
                          className="w-5 h-5"
                        />
                      </motion.div>
                    </button>
                  </header>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-2 grid grid-cols-3 gap-2 px-3 text-white flex-shrink-0"
                  >
                    <button
                      className="border-[#27292e] flex h-9 items-center justify-center gap-1 rounded-md border px-1 text-sm hover:bg-zinc-500 cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    >
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
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col px-1 grow overflow-hidden"
                  >
                    <button className="hover:bg-[#27292e] border-[#27292e] flex h-8 items-center gap-1 rounded-md px-1 text-start text-sm">
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
                    <button className="hover:bg-[#27292e] border-[#27292e] flex h-8 items-center gap-1 rounded-md px-1 text-start text-sm">
                      <div className="flex h-8 w-8 items-center justify-center">
                        <UserIcon strokeWidth={1.5} className="w-5 h-5" />
                      </div>
                      <span className="inline-block grow">View Profile</span>
                      <ChevronRightIcon strokeWidth={1.5} className="w-5 h-5" />
                    </button>
                    <button className="hover:bg-[#27292e] border-[#27292e] flex h-8 items-center gap-1 rounded-md px-1 text-start text-sm">
                      <div className="flex h-8 w-8 items-center justify-center">
                        <Cog6ToothIcon strokeWidth={1.5} className="w-5 h-5" />
                      </div>
                      <span className="inline-block grow">View Profile</span>
                      <ChevronRightIcon strokeWidth={1.5} className="w-5 h-5" />
                    </button>
                  </motion.div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
          <header className="bg-[#1b1d20] border-b-[#27292e] sticky top-0 z-20 flex h-12 items-center gap-1 border-b px-2">
            <button className="flex h-8 w-8 items-center justify-center">
              <ChevronLeftIcon strokeWidth={1} className="w-5 h-5" />
            </button>
            <motion.div
              className="bg-[#232429] relative grow overflow-hidden px-2 py-1 cursor-pointer"
              style={{ borderRadius: 8 }}
              onClick={() => setIsOpen(true)}
            >
              <div className="flex items-center gap-2">
                <div className="relative isolate h-8 w-8">
                  <Image
                    src={testImage}
                    alt="logo"
                    fill
                    className="rounded-lg"
                  />
                </div>
                <div className="flex flex-col space-y-0.5">
                  <h2 className="text-sm font-bold">Ali Samadi</h2>
                  <p className="text-white/50 flex items-center text-xs gap-1">
                    3 tabs
                    <ChevronDownIcon strokeWidth={1.5} className="w-4 h-4" />
                  </p>
                </div>
              </div>
            </motion.div>
            <button className="flex h-8 w-8 items-center justify-center">
              <SpeakerWaveIcon strokeWidth={1.7} className="w-5 h-5" />
            </button>
          </header>
          <div className="flex items-center justify-center h-[calc(100%-100px)] text-white/50">
            <p>messages</p>
          </div>
        </MotionConfig>
      </div>
    </div>
  );
}
