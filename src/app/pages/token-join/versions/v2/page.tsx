"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const tokens = [
  { id: "eth-main", name: "Ethereum", primary: true },
  {
    id: "eth-base",
    name: "Ethereum (Base)",
    primary: false,
    parentId: "eth-main",
  },
  {
    id: "eth-op",
    name: "Ethereum (Optimism)",
    primary: false,
    parentId: "eth-main",
  },
  { id: "usdc", name: "USDC", primary: true },
  { id: "dai", name: "DAI", primary: true },
];

export default function TokenList() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="p-4">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mb-4 rounded bg-yellow-400 px-4 py-2 text-black"
      >
        Toggle Collapse
      </button>

      <motion.ul
        layout
        initial={false}
        animate={{ transition: { duration: 0.4 } }}
      >
        <AnimatePresence initial={false}>
          {tokens.map((token) => {
            const isVisible = collapsed ? token.primary : true;
            return (
              <motion.li
                key={token.id}
                layout
                layoutId={token.id}
                initial={false}
                animate="visible"
                exit="exit"
                variants={{
                  visible: {
                    opacity: isVisible ? 1 : 0,
                    scale: isVisible ? 1 : 0.6,
                    y: isVisible ? 0 : -20,
                  },
                  exit: isVisible
                    ? {
                        opacity: 0,
                        scale: 0.6,
                        y: -20,
                        transition: { duration: 0.25 },
                      }
                    : {},
                }}
                transition={{
                  layout: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                }}
                style={{ position: "relative", zIndex: token.primary ? 1 : 0 }}
                className="mb-2 rounded bg-gray-800 p-3 text-white shadow"
              >
                {token.name}
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
