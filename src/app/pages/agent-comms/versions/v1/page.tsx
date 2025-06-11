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

export default function AgentComms() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const handleSubmit = () => {
    if (inputValue.trim()) {
      setIsThinking(true);
      setInputValue("");
      
      setTimeout(() => {
        setIsThinking(false);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-100 p-8">
      <LayoutGroup>
        <div className="flex flex-col gap-4 items-center h-full w-full">
          <div className={`h-12 w-[300px] block bg-white rounded-2xl p-2 relative ${
            isThinking 
              ? "border-2 border-blue-400 shadow-lg shadow-blue-400/50" 
              : "border border-gray-200"
          }`}>
            {isThinking && (
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-blue-400"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(59, 130, 246, 0.4)",
                    "0 0 20px 5px rgba(59, 130, 246, 0.2)",
                    "0 0 0 0 rgba(59, 130, 246, 0.4)",
                  ],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
            <div className="h-full w-full flex items-center gap-2 z-[100] relative">
              <div
                className="h-8 w-8 aspect-square border rounded-full flex-shrink-0"
                style={{
                  backgroundImage: `url(/assets/girl.png)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isThinking ? "Thinking..." : "Type a message..."}
                disabled={isThinking}
                className="flex-1 h-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 disabled:placeholder-gray-300"
              />
            </div>
          </div>
          <div className="flex-1 flex flex-row gap-8 items-center h-full w-full">
            <div className="flex-1 w-full h-full grid grid-cols-5 grid-rows-3 gap-4">
              <div className="col-span-2 row-span-2 bg-white border border-gray-200 rounded-2xl p-4">
                <div className="flex flex-row justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-700 text-lg">Holdings</h3>
                    <span className="text-gray-400 uppercase text-xs block">
                      Portfolio
                    </span>
                  </div>
                  <ArrowUpRightIcon className="w-6 h-6 text-gray-500 mt-1 hover:bg-gray-50 rounded-lg p-1 cursor-pointer" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-x-2 items-center">
                      <div className="h-8 w-8 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">₿</span>
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-gray-700 font-semibold text-sm">Bitcoin</h4>
                        <span className="text-gray-500 text-xs">BTC</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-700 font-semibold text-sm">0.25 BTC</div>
                      <div className="text-green-500 text-xs">$11,250</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-x-2 items-center">
                      <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">Ξ</span>
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-gray-700 font-semibold text-sm">Ethereum</h4>
                        <span className="text-gray-500 text-xs">ETH</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-700 font-semibold text-sm">3.5 ETH</div>
                      <div className="text-green-500 text-xs">$8,750</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-x-2 items-center">
                      <div className="h-8 w-8 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">S</span>
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-gray-700 font-semibold text-sm">Solana</h4>
                        <span className="text-gray-500 text-xs">SOL</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-700 font-semibold text-sm">45 SOL</div>
                      <div className="text-green-500 text-xs">$4,500</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-x-2 items-center">
                      <div className="h-8 w-8 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">A</span>
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-gray-700 font-semibold text-sm">Avalanche</h4>
                        <span className="text-gray-500 text-xs">AVAX</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-700 font-semibold text-sm">120 AVAX</div>
                      <div className="text-red-500 text-xs">$3,600</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="flex flex-row justify-between">
                    <span className="text-gray-500 text-sm">Total Value</span>
                    <span className="text-gray-700 font-bold">$28,100</span>
                  </div>
                </div>
              </div>
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
