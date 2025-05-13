"use client";

import React, { useState } from "react";

import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

const cards = [
  { id: "0", title: "Card 0", color: "#e76f51" },
  { id: "1", title: "Card 1", color: "#F4A261" },
  { id: "2", title: "Card 2", color: "#e9c46a" },
  { id: "3", title: "Card 3", color: "#264653" },
];

function Cards({ cards, setIndex }: { cards: any; setIndex: any }) {
  return (
    <>
      <div className="w-full h-full grid flex-wrap grid-rows-4 p-4 md:grid-rows-6 grid-cols-2 gap-4 justify-center ">
        {cards.map((card: any, i: number) => (
          <>
            <div
              key={card.id}
              /* Bento Box Grid Layout */
              className={`col-span-1 md:col-span-1 p-0 ${
                i == 1
                  ? "md:row-span-4"
                  : i == 3
                  ? "md:row-span-2"
                  : "md:row-span-3"
              }`}
            >
              <motion.div
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 0.98,
                  color: "#f7f7f7",
                }}
                className={`flex w-full h-full`}
                onClick={() => {
                  setIndex(i);
                }}
                style={{
                  backgroundColor: card.color,
                  color: "#000",
                  borderRadius: "30px",
                }}
                layoutId={card.id}
              >
                <motion.p
                  className="text-3xl p-4 font-bold self-end"
                  layoutId="card-title"
                >
                  {card.title}
                </motion.p>
              </motion.div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

//Single card modal
function ModalCard({ index, cards }: { index: any; cards: any }) {
  return (
    /* Container */
    <motion.div
      id={cards[index].id}
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
      {/* Card */}
      <motion.div
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          duration: 0.3,
          ease: "easeInOut",
        }}
        /* Layout ID */
        layoutId={cards[index].id}
        style={{
          width: "70vw",
          height: "60vh",
          borderRadius: "20px",
          backgroundColor: cards[index].color,
        }}
        className="single-image flex justify-center bg-black/30"
      >
        {index !== false && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          >
            <motion.p
              className="text-3xl text-white font-bold"
              layoutId="card-title"
            >
              {cards[index].title}
            </motion.p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [index, setIndex] = useState(false);
  return (
    <>
      <div
        style={{
          height: "100vh",
        }}
        className={`flex h-full justify-center content-center bg-black`}
      >
        <LayoutGroup>
          <AnimatePresence>
            {/* Cards */}
            <Cards setIndex={setIndex} cards={cards} />
            {/* Overlay */}
            {index !== false && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                key="overlay"
                style={{
                  backgroundColor: "rgba(0,0,0,0.99)",
                  width: "100vw",
                  height: "100vh",
                  position: "fixed",
                }}
                onClick={() => {
                  setIndex(false);
                }}
              />
            )}

            {index !== false && (
              <ModalCard key="singlecard" index={index} cards={cards} />
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </>
  );
}
