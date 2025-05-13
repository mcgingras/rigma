import { HTMLMotionProps, motion } from "framer-motion";
import React, { ReactNode } from "react";
import { Direction, Mask, masks } from "@/components/Mask";

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

/**
 * Props for the ProgressiveBlur component.
 * @extends HTMLMotionProps<"div">
 */
export interface ProgressiveBlurProps extends HTMLMotionProps<"div"> {
  /**
   * The direction of the blur effect.
   * @default "to-bottom"
   */
  direction?: Direction;

  /**
   * The starting blur value in pixels.
   * @default 0
   */
  blurStart?: number;

  /**
   * The ending blur value in pixels.
   * @default 12
   */
  blurEnd?: number;

  /**
   * The number of blur layers to create.
   * @default 5
   */
  layers?: number;

  /**
   * The content to be wrapped by the ProgressiveBlur component.
   */
  children?: ReactNode;
}

/**
 * ProgressiveBlur component creates a gradual blur effect over its children.
 * It uses multiple layers with increasing blur to create a smooth transition.
 */
export const ProgressiveBlur = React.memo(
  ({
    blurStart = 0,
    blurEnd = 12,
    direction = "to-bottom",
    layers = 5,
    children,
    ...otherProps
  }: ProgressiveBlurProps) => {
    layers = Math.max(layers, 2);
    const step = 1 / (layers + 1);
    const blurMin = Math.min(blurStart, blurEnd);
    const blurMax = Math.max(blurStart, blurEnd);
    const blurRange = blurMax - blurMin;
    const blurBase = blurRange ** (1 / (layers - 1));
    return (
      <motion.div
        {...otherProps}
        className={cn("relative", otherProps.className ?? "")}
      >
        {children}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backdropFilter: `blur(${blurMin}px)`,
          }}
        />
        {Array.from({ length: layers }).map((_, layer) => {
          return (
            <Mask
              key={layer}
              image={masks.linear({
                direction,
                opacities: [0, 1, 1, 0],
                positions: [
                  layer * step,
                  (layer + 1) * step,
                  (layer + 2) * step,
                  (layer + 3) * step,
                ],
                rotate: blurStart > blurEnd ? 180 : 0,
              })}
              className="pointer-events-none absolute inset-0 rounded-[inherit]"
              style={{
                backdropFilter: `blur(${blurBase ** layer}px)`,
              }}
            />
          );
        })}
      </motion.div>
    );
  }
);

ProgressiveBlur.displayName = "ProgressiveBlur";
