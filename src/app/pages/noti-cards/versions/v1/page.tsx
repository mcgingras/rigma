"use client";

import React, { useState } from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

function ModalCard({
  selectedId,
  onClose,
}: {
  selectedId: string | null;
  onClose: () => void;
}) {
  if (!selectedId) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black"
      />
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          layoutId={selectedId}
          className="bg-white w-[600px] h-[400px] rounded-2xl p-6 pointer-events-auto"
        >
          <div className="h-full w-full flex flex-col">
            <div className="flex flex-row justify-between">
              <div>
                <h3 className="font-bold text-gray-700 text-lg">Inbox</h3>
                <span className="text-gray-400 uppercase text-xs block">
                  2 new
                </span>
              </div>
              <ArrowUpRightIcon
                className="w-6 h-6 text-gray-500 mt-1 hover:bg-gray-50 rounded-lg p-1 cursor-pointer"
                onClick={onClose}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 divide-x divide-gray-200 flex-1 mt-4">
              <div className="flex flex-col p-2 h-full">
                <div className="flex flex-row gap-x-2 items-center hover:bg-gray-50 rounded-lg cursor-pointer p-2">
                  <span className="h-10 w-10 bg-gray-200 rounded-lg"></span>
                  <div className="flex flex-col">
                    <h3 className="text-gray-700 font-semibold">Renew ENS</h3>
                    <span className="text-gray-500 text-sm font-medium">
                      Your ENS name is expiring.
                    </span>
                  </div>
                </div>
                <div className="flex flex-row mt-4 gap-x-2 items-center hover:bg-gray-50 rounded-lg cursor-pointer p-2">
                  <span className="h-10 w-10 bg-gray-200 rounded-lg"></span>
                  <div className="flex flex-col">
                    <h3 className="text-gray-700 font-semibold">SEC Impact</h3>
                    <span className="text-gray-500 text-sm font-medium">
                      SEC did some stuff.
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-2 h-full">
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, quos.
                </p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                  Action
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default function NotiCards() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="w-screen h-screen bg-gray-100 p-8">
      <LayoutGroup>
        <div className="flex flex-col gap-4 items-center h-full w-full">
          <div className="h-12 w-[300px] block bg-white border border-gray-200 rounded-2xl p-2">
            <div className="h-full w-full flex items-center z-[100]">
              <div
                className="h-8 w-8 aspect-square border rounded-full"
                style={{
                  backgroundImage: `url(/assets/girl.png)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-row gap-8 items-center h-full w-full">
            <div className="flex-1 w-full h-full grid grid-cols-5 grid-rows-3 gap-4">
              <div className="col-span-2 row-span-2 bg-white border border-gray-200 rounded-2xl"></div>
              <motion.div
                layoutId="inbox-card"
                onClick={() => setSelectedId("inbox-card")}
                className="col-span-1 row-span-1 bg-white border border-gray-200 rounded-2xl p-4 cursor-pointer"
              >
                <div className="flex flex-row justify-between">
                  <div>
                    <h3 className="font-bold text-gray-700 text-lg">Inbox</h3>
                    <span className="text-gray-400 uppercase text-xs block">
                      2 new
                    </span>
                  </div>
                  <ArrowUpRightIcon className="w-6 h-6 text-gray-500 mt-1 hover:bg-gray-50 rounded-lg p-1 cursor-pointer" />
                </div>

                <div className="flex flex-row mt-10 gap-x-2 items-center hover:bg-gray-50 rounded-lg cursor-pointer p-2">
                  <span className="h-10 w-10 bg-gray-200 rounded-lg"></span>
                  <div className="flex flex-col">
                    <h3 className="text-gray-700 font-semibold">Renew ENS</h3>
                    <span className="text-gray-500 text-sm font-medium">
                      Your ENS name is expiring.
                    </span>
                  </div>
                </div>
                <div className="flex flex-row mt-4 gap-x-2 items-center hover:bg-gray-50 rounded-lg cursor-pointer p-2">
                  <span className="h-10 w-10 bg-gray-200 rounded-lg"></span>
                  <div className="flex flex-col">
                    <h3 className="text-gray-700 font-semibold">SEC Impact</h3>
                    <span className="text-gray-500 text-sm font-medium">
                      SEC did some stuff.
                    </span>
                  </div>
                </div>
              </motion.div>
              <div className="col-span-2 row-span-3 bg-white border border-gray-200 rounded-2xl"></div>
              <div className="col-span-1 row-span-1 bg-white border border-gray-200 rounded-2xl"></div>
              <div className="col-span-1 row-span-1 bg-white border border-gray-200 rounded-2xl"></div>
              <div className="col-span-2 row-span-1 bg-white border border-gray-200 rounded-2xl"></div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {selectedId && (
            <ModalCard
              selectedId={selectedId}
              onClose={() => setSelectedId(null)}
            />
          )}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
}
