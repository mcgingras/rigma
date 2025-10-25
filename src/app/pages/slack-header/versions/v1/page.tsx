"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
// import {
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
//   Ellipsis,
//   FilePlus2,
//   GalleryVerticalEnd,
//   Headphones,
//   MessagesSquare,
//   Search,
//   Settings,
//   Star,
//   User,
//   UserRoundPlus,
//   X,
// } from "lucide-react";

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

const cn = (...classes: (string | undefined)[]): string =>
  classes.filter(Boolean).join(" ");
const Separator = ({ className }: { className?: string }) => (
  <div className={cn("w-full h-[1px] bg-gray-200", className)} />
);

export default function SlackProfileView() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-300">
      <div className="h-[600px] w-[400px] text-white relative border border-white/10 bg-zinc-800 rounded-lg overflow-hidden">
        <MotionConfig transition={{ duration: 2.5, type: "spring", bounce: 0 }}>
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-[60] bg-black/50"
                onClick={() => setIsOpen(false)}
              ></motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isOpen && (
              <div className="absolute top-[8px] left-0 z-[61] flex w-[400px] justify-center">
                <motion.div
                  layoutId="wrapper"
                  className="bg-[#232429] relative h-full w-[97%] overflow-hidden"
                  style={{ borderRadius: 20 }}
                >
                  <header className="flex h-12 items-center gap-1 px-2">
                    <div className="relative isolate h-8 w-8">
                      <motion.div
                        layoutId="wrapper-avatar"
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
                    <motion.div
                      layoutId="wrapper-user-info"
                      className="-space-y-px"
                    >
                      <h2 className="text-sm font-bold">Ali Samadi</h2>
                      <p className="text-white/50 flex items-center text-xs">
                        3 tabs
                      </p>
                    </motion.div>
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
                  <WrapperMenu />
                </motion.div>
              </div>
            )}
          </AnimatePresence>
          <header className="bg-[#1b1d20] border-b-[#27292e] sticky top-0 z-20 flex h-12 items-center gap-1 border-b px-2">
            <button className="flex h-8 w-8 items-center justify-center">
              <ChevronLeftIcon strokeWidth={1} className="w-5 h-5" />
            </button>
            <motion.div
              layoutId="wrapper"
              className="bg-[#232429] relative grow overflow-hidden px-2 py-1 cursor-pointer"
              style={{ borderRadius: 8 }}
              onClick={() => setIsOpen(true)}
            >
              <div className="flex items-center gap-2">
                <div className="relative isolate h-8 w-8">
                  <motion.div
                    layoutId="wrapper-avatar"
                    className="relative isolate h-8 w-8"
                  >
                    <Image
                      src={testImage}
                      alt="logo"
                      fill
                      className="rounded-lg"
                    />
                  </motion.div>
                  <motion.div
                    layoutId="wrapper-close-button"
                    className="absolute top-0 left-0 -z-10 flex h-8 w-8 items-center justify-center"
                  >
                    <XMarkIcon strokeWidth={1.5} className="w-5 h-5" />
                  </motion.div>
                </div>
                <motion.div
                  layoutId="wrapper-user-info"
                  className="flex flex-col space-y-0.5"
                >
                  <h2 className="text-sm font-bold">Ali Samadi</h2>
                  <p className="text-white/50 flex items-center text-xs gap-1">
                    3 tabs
                    <ChevronDownIcon strokeWidth={1.5} className="w-4 h-4" />
                  </p>
                </motion.div>
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

function WrapperMenu({ className }: { className?: string }) {
  return (
    <AnimatePresence>
      <motion.div layoutId="wrapper-menu" className={cn("mt-1", className)}>
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
            <MagnifyingGlassIcon strokeWidth={1.5} className="w-5 h-5" />
            Search
          </button>
        </motion.div>
        <motion.div layout className="flex flex-col px-1">
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
        </motion.div>
        <div className="flex h-4 items-center justify-center">
          <Separator className="w-full bg-[#23272A]" />
        </div>
        <motion.div layout className="flex flex-col px-1">
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
    </AnimatePresence>
  );
}
