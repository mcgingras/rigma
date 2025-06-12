"use client";

import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import DynamicIsland from "@/app/components/DynamicIsland";
import { useState } from "react";

const WidgetContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-black/10 p-2 col-span-1 row-span-1 rounded-2xl">
      {children}
    </div>
  );
};

const stacks = [
  { id: "0", title: "Today's Report", color: "#e76f51" },
  { id: "1", title: "Weekly Summary", color: "#F4A261" },
  { id: "2", title: "Monthly Overview", color: "#e9c46a" },
];

function DailyReportStacks({ stacks, setIndex }: { stacks: any; setIndex: any }) {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-4">
      {stacks.map((stack: any, i: number) => (
        <motion.div
          key={stack.id}
          className="cursor-pointer"
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 0.98,
          }}
          onClick={() => {
            setIndex(i);
          }}
          style={{
            backgroundColor: stack.color,
            borderRadius: "20px",
            width: "300px",
            height: "100px",
          }}
          layoutId={stack.id}
        >
          <div className="flex items-center justify-center h-full w-full p-4">
            <motion.p
              className="text-2xl font-bold text-white"
              layoutId={`title-${stack.id}`}
            >
              {stack.title}
            </motion.p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ModalStack({ index, stacks, setIndex }: { index: any; stacks: any; setIndex: any }) {
  return (
    <motion.div
      style={{
        position: "fixed",
        top: "50%",
        transform: "translate(-50%, -50%)",
        left: "50%",
        display: "flex",
        width: "fit-content",
        height: "fit-content",
        justifyContent: "center",
        justifySelf: "center",
        alignContent: "center",
      }}
    >
      <motion.div
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          duration: 0.3,
          ease: "easeInOut",
        }}
        layoutId={stacks[index].id}
        style={{
          width: "90vw",
          height: "90vh",
          borderRadius: "20px",
          backgroundColor: stacks[index].color,
        }}
        className="flex flex-col justify-between items-center p-8"
      >
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <DynamicIsland showButton={false} />
          <motion.p
            className="text-4xl font-bold text-white"
            layoutId={`title-${stacks[index].id}`}
          >
            {stacks[index].title}
          </motion.p>
        </motion.div>

        <motion.div
          className="flex-1 grid grid-cols-3 grid-rows-2 w-[70%] gap-4 my-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <WidgetContainer>
            <div className="h-full flex items-center justify-center text-white/80">
              Widget 1
            </div>
          </WidgetContainer>
          <WidgetContainer>
            <div className="h-full flex items-center justify-center text-white/80">
              Widget 2
            </div>
          </WidgetContainer>
          <WidgetContainer>
            <div className="h-full flex items-center justify-center text-white/80">
              Widget 3
            </div>
          </WidgetContainer>
          <WidgetContainer>
            <div className="h-full flex items-center justify-center text-white/80">
              Widget 4
            </div>
          </WidgetContainer>
          <WidgetContainer>
            <div className="h-full flex items-center justify-center text-white/80">
              Widget 5
            </div>
          </WidgetContainer>
          <WidgetContainer>
            <div className="h-full flex items-center justify-center text-white/80">
              Widget 6
            </div>
          </WidgetContainer>
        </motion.div>

        <motion.button
          className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium hover:bg-white/30 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setIndex(false);
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          Close Report
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

const DailyReport = () => {
  const [index, setIndex] = useState<number | false>(false);
  
  return (
    <div className="h-screen w-screen bg-gray-900">
      <LayoutGroup>
        <AnimatePresence>
          <DailyReportStacks setIndex={setIndex} stacks={stacks} />
          
          {index !== false && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.95 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              key="overlay"
              style={{
                backgroundColor: "rgba(0,0,0,0.8)",
                width: "100vw",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: 0,
              }}
              onClick={() => {
                setIndex(false);
              }}
            />
          )}

          {index !== false && (
            <ModalStack key="modal-stack" index={index} stacks={stacks} setIndex={setIndex} />
          )}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
};

export default DailyReport;
