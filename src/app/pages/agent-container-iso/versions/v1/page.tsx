"use client";

import { animate, motion } from "motion/react";
import React, { useState, useRef } from "react";

export default function AgentContainerIso() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasNudge, setHasNudge] = useState(false);
  const [hasBlur, setHasBlur] = useState(false);
  const [hasMask, setHasMask] = useState(true);
  const [blurAmount, setBlurAmount] = useState(0);
  const [blurOpacity, setBlurOpacity] = useState(1);

  // Ellipse mask controls
  const [ellipseWidth, setEllipseWidth] = useState(80);
  const [ellipseHeight, setEllipseHeight] = useState(70);
  const [maskStops, setMaskStops] = useState([
    { position: 0, opacity: 1 },
    { position: 35, opacity: 1 },
    { position: 40, opacity: 0.9 },
    { position: 50, opacity: 0.7 },
    { position: 60, opacity: 0.4 },
    { position: 70, opacity: 0.1 },
    { position: 100, opacity: 0 },
  ]);

  // Inner shadow controls
  const [shadowBlur1, setShadowBlur1] = useState(12);
  const [shadowBlur2, setShadowBlur2] = useState(40);
  const [shadowOpacity1, setShadowOpacity1] = useState(0.1);
  const [shadowOpacity2, setShadowOpacity2] = useState(0.1);

  // Container and image controls
  const [containerWidth, setContainerWidth] = useState(550);
  const [containerHeight, setContainerHeight] = useState(350);
  const [imageZoom, setImageZoom] = useState(100);

  return (
    <div className="min-h-screen w-full p-8 flex flex-col items-center bg-gradient-to-b to-[#DCC4C4] from-[#A0AADA] relative perspective-midrange">
      {/* Control panel */}
      <div className="fixed right-4 top-4 w-[350px] max-h-[90vh] overflow-y-auto p-4 bg-black/20 backdrop-blur-lg rounded-lg flex flex-col gap-4 z-50">
        <h3 className="text-white font-bold text-lg">Debug Controls</h3>

        {/* Basic toggles */}
        <div className="flex gap-2">
          <button
            className={`flex-1 ${
              hasBlur ? "bg-white/20" : "bg-white/10"
            } p-2 rounded-lg text-white text-sm`}
            onClick={() => setHasBlur(!hasBlur)}
          >
            Blur: {hasBlur ? "ON" : "OFF"}
          </button>
          <button
            className={`flex-1 ${
              hasMask ? "bg-white/20" : "bg-white/10"
            } p-2 rounded-lg text-white text-sm`}
            onClick={() => setHasMask(!hasMask)}
          >
            Mask: {hasMask ? "ON" : "OFF"}
          </button>
        </div>

        {/* Container & Image Controls */}
        <div className="space-y-2 border-b border-white/20 pb-4">
          <h4 className="text-white font-semibold">Container & Image</h4>

          <div>
            <label className="text-white text-sm">
              Container Width: {containerWidth}px
            </label>
            <input
              type="range"
              min={300}
              max={800}
              value={containerWidth}
              onChange={(e) => setContainerWidth(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-white text-sm">
              Container Height: {containerHeight}px
            </label>
            <input
              type="range"
              min={200}
              max={600}
              value={containerHeight}
              onChange={(e) => setContainerHeight(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-white text-sm">
              Image Zoom: {imageZoom}%
            </label>
            <input
              type="range"
              min={50}
              max={200}
              value={imageZoom}
              onChange={(e) => setImageZoom(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {hasBlur && (
          <div className="space-y-2">
            <label className="text-white text-sm">
              Blur Amount: {blurAmount}px
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={blurAmount}
              onChange={(e) => setBlurAmount(Number(e.target.value))}
              className="w-full"
            />

            <label className="text-white text-sm">
              Blur Opacity: {blurOpacity.toFixed(2)}
            </label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={blurOpacity}
              onChange={(e) => setBlurOpacity(Number(e.target.value))}
              className="w-full"
            />
          </div>
        )}

        {/* Ellipse Mask Controls */}
        {hasMask && (
          <div className="space-y-2 border-t border-white/20 pt-4">
            <h4 className="text-white font-semibold">Ellipse Mask</h4>

            <div>
              <label className="text-white text-sm">
                Width: {ellipseWidth}%
              </label>
              <input
                type="range"
                min={50}
                max={150}
                value={ellipseWidth}
                onChange={(e) => setEllipseWidth(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-white text-sm">
                Height: {ellipseHeight}%
              </label>
              <input
                type="range"
                min={50}
                max={150}
                value={ellipseHeight}
                onChange={(e) => setEllipseHeight(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="space-y-1">
              <label className="text-white text-sm">Gradient Stops</label>
              {maskStops.map((stop, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <span className="text-white text-xs w-12">
                    {stop.position}%
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={stop.opacity}
                    onChange={(e) => {
                      const newStops = [...maskStops];
                      newStops[i].opacity = Number(e.target.value);
                      setMaskStops(newStops);
                    }}
                    className="flex-1"
                  />
                  <span className="text-white text-xs w-10">
                    {stop.opacity.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Inner Shadow Controls */}
        <div className="space-y-2 border-t border-white/20 pt-4">
          <h4 className="text-white font-semibold">Inner Shadow</h4>

          <div>
            <label className="text-white text-sm">
              Shadow 1 Blur: {shadowBlur1}px
            </label>
            <input
              type="range"
              min={0}
              max={50}
              value={shadowBlur1}
              onChange={(e) => setShadowBlur1(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-white text-sm">
              Shadow 1 Opacity: {shadowOpacity1.toFixed(2)}
            </label>
            <input
              type="range"
              min={0}
              max={0.5}
              step={0.01}
              value={shadowOpacity1}
              onChange={(e) => setShadowOpacity1(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-white text-sm">
              Shadow 2 Blur: {shadowBlur2}px
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={shadowBlur2}
              onChange={(e) => setShadowBlur2(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-white text-sm">
              Shadow 2 Opacity: {shadowOpacity2.toFixed(2)}
            </label>
            <input
              type="range"
              min={0}
              max={0.5}
              step={0.01}
              value={shadowOpacity2}
              onChange={(e) => setShadowOpacity2(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>
      <motion.div
        ref={containerRef}
        className="bg-white/10 overflow-hidden relative z-50"
        onClick={() => {
          const startPosition = window.pageYOffset;
          const targetPosition = 0;
          const distance = targetPosition - startPosition;

          animate(0, 1, {
            type: "spring",
            bounce: 0.2,
            onUpdate: (progress) => {
              window.scrollTo(0, startPosition + distance * progress);
            },
          });
        }}
        style={{
          borderRadius: 46,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: `inset 0 0 ${shadowBlur1}px 0 rgba(255,255,255,${shadowOpacity1}), inset 0 0 ${shadowBlur2}px 0 rgba(255,255,255,${shadowOpacity2})`,
          y: 80,
          width: containerWidth,
          height: containerHeight,
        }}
      >
        <div className="relative h-full w-full">
          {/* <div
            className="absolute w-[90%] h-[80%] top-[5%] left-[5%]"
            style={{
              zIndex: 100,
              background:
                "radial-gradient(#FF001A 0%, rgba(255, 0, 26, 0.00) 100%)",
              mixBlendMode: "overlay",
              filter: "blur(45px)",
            }}
          ></div> */}
          {/* <div
            className="absolute w-[90%] h-[80%] top-[5%] left-[5%]"
            style={{
              opacity: "0.5",
              background:
                "radial-gradient(44.68% 74.38% at 50% 50%, rgba(244, 165, 95, 0.65) 0%, rgba(255, 111, 0, 0.00) 100%)",
              mixBlendMode: "overlay",
              filter: "blur(46.24513244628906px)",
            }}
          ></div> */}
          {hasBlur && (
            <img
              src="/assets/girl-plain.png"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter: `blur(${blurAmount}px)`,
                opacity: blurOpacity,
                transform: `scale(${imageZoom / 100})`,
              }}
            />
          )}

          {hasMask && (
            <img
              src="/assets/girl-plain.png"
              className="absolute inset-0 w-full h-full opacity-60 object-cover"
              style={{
                //   maskImage: `radial-gradient(
                //   ellipse at center,
                //   black 0%,
                //   black 40%,
                //   rgba(0, 0, 0, 0.8) 50%,
                //   rgba(0, 0, 0, 0.5) 60%,
                //   rgba(0, 0, 0, 0.2) 70%,
                //   transparent 80%
                // )`,
                transform: `scale(${imageZoom / 100})`,
                maskImage: `radial-gradient(
                  ellipse ${ellipseWidth}% ${ellipseHeight}% at center,
                  ${maskStops
                    .map((stop) =>
                      stop.opacity === 0
                        ? `transparent ${stop.position}%`
                        : stop.opacity === 1
                        ? `black ${stop.position}%`
                        : `rgba(0, 0, 0, ${stop.opacity}) ${stop.position}%`
                    )
                    .join(", ")}
                )`,
                WebkitMaskImage: `radial-gradient(
                  ellipse ${ellipseWidth}% ${ellipseHeight}% at center,
                  ${maskStops
                    .map((stop) =>
                      stop.opacity === 0
                        ? `transparent ${stop.position}%`
                        : stop.opacity === 1
                        ? `black ${stop.position}%`
                        : `rgba(0, 0, 0, ${stop.opacity}) ${stop.position}%`
                    )
                    .join(", ")}
                )`,
              }}
            />
          )}

          {/* <div
            className="absolute inset-0 w-full h-[300px] object-cover opacity-100"
            style={{
              background: `linear-gradient(to bottom, black 0%, transparent 60%)`,
            }}
          ></div> */}
        </div>
        <div
          className="h-5 w-full bg-white/10 blur-lg"
          style={{ marginTop: containerHeight - 70 }}
        ></div>

        {hasNudge && (
          <div className="w-full px-4 pb-4 h-[300px]">
            <div className="bg-black/15 w-full h-full p-6 rounded-3xl">
              <p className="text-lg font-bold">
                $BRIDGE: Major Security Breach
              </p>
              <p className="text-sm text-white/50 mt-2">
                Token dropped 10% in 10 minutes
              </p>
              <p className="text-sm mt-4">
                $BRIDGE is a new token that is designed to be a secure and
                reliable bridge between the Ethereum and Polygon networks.
              </p>
              <div className="w-full h-[2px] bg-black/15 mt-6 border-b border-white/20"></div>
              <p className="mt-4">Your impacted positions</p>
              <div className="h-[50px] w-full rounded-lg bg-black/10 mt-4"></div>
            </div>
          </div>
        )}
      </motion.div>

      <img src="/assets/example.png" className="mt-24" />
    </div>
  );
}
