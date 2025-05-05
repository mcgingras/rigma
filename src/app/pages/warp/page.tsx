"use client";

import {
  animate,
  AnimatePresence,
  motion,
  useIsPresent,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

const intensity = 0.05;
export default function WarpOverlay() {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    setSize({
      width: ref.current?.clientWidth || 0,
      height: ref.current?.clientHeight || 0,
    });
  }, [ref]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const deform = useMotionValue(0);
  const rotateX = useTransform(() => deform.get() * -1);
  const skewY = useTransform(() => deform.get() * -0.5);
  const scaleY = useTransform(() => 1 + deform.get() * intensity);
  const scaleX = useTransform(() => 1 - deform.get() * intensity * 0.6);

  // Open delete modal and trigger deformation animation
  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);

    animate([
      [deform, 1, { duration: 0.3, ease: [0.65, 0, 0.35, 1] }],
      [deform, 0, { duration: 1.5, ease: [0.22, 1, 0.36, 1] }],
    ]);
  };

  const closeModal = () => setIsDeleteModalOpen(false);

  return (
    <div className="iphone-screen">
      <div className="app-content" ref={ref}>
        <motion.div
          className="email-app-container flex flex-col h-full"
          style={{
            rotateX,
            skewY,
            scaleY,
            scaleX,
            originX: 0.5,
            originY: 0,
            transformPerspective: 500,
            willChange: "transform",
          }}
        >
          <header className="header"></header>

          <div className="bg-black block h-[800px] relative">
            <div className="grid grid-cols-3 h-3/4 w-3/4 mx-auto gap-2 mt-12">
              <section className="flex flex-col space-y-2">
                <div className="h-1/3 w-full bg-gray-100 rounded"></div>
                <div className="h-1/3 w-full bg-gray-100 rounded"></div>
                <div className="h-1/3 w-full bg-gray-100 rounded"></div>
              </section>
              <section className="flex flex-col space-y-2">
                <div className="h-1/3 w-full bg-gray-100 rounded"></div>
                <div className="h-1/3 w-full bg-gray-100 rounded"></div>
                <div className="h-1/3 w-full bg-gray-100 rounded"></div>
              </section>
              <section className="flex flex-col space-y-2">
                <div className="h-1/3 w-full bg-gray-100 rounded"></div>
                <div className="h-1/3 w-full bg-gray-100 rounded"></div>
                <div className="h-1/3 w-full bg-gray-100 rounded"></div>
              </section>
              <motion.button
                className="p-2 rounded-full bg-gray-500 ring-2 ring-red-500 ring-offset-2 ring-offset-black absolute bottom-4 left-1/2 -translate-x-1/2"
                onClick={handleDeleteClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src="/assets/ambush_a.svg"
                  alt="delete"
                  className="w-4 h-4"
                />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isDeleteModalOpen ? (
          <ImmersiveOverlay close={closeModal} size={size} />
        ) : null}
      </AnimatePresence>

      <StyleSheet />
    </div>
  );
}

function GradientOverlay({
  size,
}: {
  size: { width: number; height: number };
}) {
  const breathe = useMotionValue(0);
  const isPresent = useIsPresent();

  useEffect(() => {
    if (!isPresent) {
      animate(breathe, 0, { duration: 0.5, ease: "easeInOut" });
    }
  }, [isPresent]);

  const enterDuration = 0.75;
  const exitDuration = 0.5;

  const expandingCircleRadius = size.width / 3;

  return (
    <div className="gradient-container">
      <motion.div
        className="expanding-circle"
        initial={{
          scale: 0,
          opacity: 1,
          backgroundColor: "rgb(233, 167, 160)",
        }}
        animate={{
          scale: 10,
          opacity: 0.2,
          backgroundColor: "rgb(246, 63, 42)",
          transition: {
            duration: enterDuration,
            opacity: { duration: enterDuration, ease: "easeInOut" },
          },
        }}
        exit={{
          scale: 0,
          opacity: 1,
          backgroundColor: "rgb(233, 167, 160)",
          transition: { duration: exitDuration },
        }}
        style={{
          left: `calc(50% - ${expandingCircleRadius / 2}px)`,
          top: "100%",
          width: expandingCircleRadius,
          height: expandingCircleRadius,
          originX: 0.5,
          originY: 1,
        }}
      />
    </div>
  );
}

function ImmersiveOverlay({
  close,
  size,
}: {
  close: () => void;

  size: { width: number; height: number };
}) {
  const transition = {
    duration: 0.35,
    ease: [0.59, 0, 0.35, 1],
  };

  const enteringState = {
    rotateX: 0,
    skewY: 0,
    scaleY: 1,
    scaleX: 1,
    y: 0,
    transition: {
      ...transition,
      y: { type: "spring", visualDuration: 0.7, bounce: 0.2 },
    },
  };

  const exitingState = {
    rotateX: -5,
    skewY: -1.5,
    scaleY: 2,
    scaleX: 0.4,
    y: 100,
  };

  return (
    <div className="overlay-root" onClick={close}>
      <GradientOverlay size={size} />
      <motion.div
        className="overlay-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={transition}
      >
        <motion.div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
          initial={exitingState}
          animate={enteringState}
          exit={exitingState}
          transition={transition}
          style={{
            transformPerspective: 1000,
            originX: 0.5,
            originY: 0,
          }}
        >
          <header>
            <h2 className="text-2xl font-bold">Focus mode</h2>
            <p className="text-sm bg-gradient-to-t from-white/10 to-white/20 rounded-full px-2 py-1 border border-white/20">
              2 new critical alerts
            </p>
          </header>
        </motion.div>
      </motion.div>
    </div>
  );
}

/**
 * ==============   Styles   ================
 */
function StyleSheet() {
  return (
    <style>{`
        body {
            overflow: hidden;
            margin: 0;
            padding: 0;
            background-color: #f0f0f0;
        }

        .iphone-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100vh;
            padding: 20px;
            box-sizing: border-box;
        }

        .iphone-mock {
            position: relative;
            width: 375px;
            height: 812px;
            background-color: #1a1a1a;
            box-shadow: 0 0 0 14px #121212, 0 0 0 17px #232323, 0 20px 40px rgba(0, 0, 0, 0.8);
            padding: 0;
            box-sizing: border-box;
            overflow: hidden;
        }

        @media (max-height: 900px) {
            .iphone-mock {
                width: 300px;
                height: 600px;
            }
        }

        @media (max-height: 600px) {
            .iphone-wrapper {
               padding: 0;
             }

            .iphone-mock {
                width: 100%;
                height: 100%;
                background-color: transparent;
                border-radius: 0;
                padding-top: 50px;
                box-shadow: none;
            }

            .dynamic-island {
                display: none;
            }

            .iphone-status-bar {
                display: none !important;
            }

            .iphone-home-indicator {
                display: none;
            }

            .iphone-screen {
                border-radius: 0;
            }
        }

        .iphone-screen {
            position: relative;
            width: 100%;
            height: 100%;
            background-color: #0b1011;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }

        .dynamic-island {
            position: absolute;
            top: 12px;
            left: 50%;
            transform: translateX(-50%);
            width: 120px;
            height: 34px;
            background-color: #000;
            border-radius: 20px;
            z-index: 2000;
        }

        .iphone-status-bar {
            height: 60px;
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            color: white;
            font-weight: 600;
            font-size: 14px;
            padding-top: 15px;
        }

        .iphone-home-indicator {
            position: absolute;
            bottom: 8px;
            left: 50%;
            transform: translateX(-50%);
            width: 134px;
            height: 5px;
            background-color: white;
            opacity: 0.2;
            border-radius: 3px;
            z-index: 2000;
        }

        .app-content {
            flex: 1;
            padding: 0;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            margin-top: 10px;
        }

        .email-app-container {
            display: flex;
            flex-direction: column;
            height: 100%;
            background-color: #0b1011;
            color: #f5f5f5;
            border: none;
            border-radius: 0;
            overflow: hidden;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 26px 20px 16px;
            border-bottom: 1px solid #1d2628;
        }

        .header h1 {
            font-size: 24px;
            margin: 0;
        }

        .delete-button {
            background-color: #fff4;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }

        .delete-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            background-color: #fff0;
        }

        .email-list {
            flex: 1;
            overflow-y: auto;
            padding: 0;
        }

        .email-item {
            display: flex;
            padding: 16px 20px;
            border-bottom: 1px solid #1d2628;
            align-items: center;
            display: flex;
            gap: 16px;
        }

        .checkbox {
            width: 20px;
            height: 20px;
        }

        .email-content {
            flex: 1;
        }

        .email-content h3 {
            margin: 0 0 8px 0;
            font-size: 16px;
        }

        .email-content p {
            margin: 0;
            font-size: 14px;
            opacity: 0.7;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .overlay-root {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
        }

        .overlay-content {
            background: rgb(246, 63, 42, 0.2);
            backdrop-filter: blur(3px);
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1001;
            will-change: opacity;
        }

        .modal-content {
            width: 75%;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 30px;
            will-change: transform;
        }

        .modal-content p {
            color: #f5f5f5;
        }

        .modal-content header {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 5px;
        }

        .controls {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
        }

        button.delete {
            background-color: #f5f5f5;
            color: #0f1115;
            border-radius: 20px;
            padding: 10px 20px;
        }

        .gradient-container {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1001;
        }

        .expanding-circle {
            position: absolute;
            border-radius: 50%;
            background:  rgb(251, 148, 137,0.8);
            filter: blur(15px);
            transform-origin: center;
            will-change: transform;
        }

        .gradient-circle {
            position: absolute;
            border-radius: 50%;
            filter: blur(100px);
            width: 200%;
            aspect-ratio: 1;
            will-change: transform;
        }

        .top-left {
            background: rgb(246, 63, 42, 0.9);
        }

        .bottom-right {
            background: rgb(243, 92, 76, 0.9);
        }
    `}</style>
  );
}
