import { CSSProperties, FC, ReactNode } from "react";

const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

interface AnimatedShinyTextProps {
  children: ReactNode;
  textRestingColorCSSVariable?: string;
  textShimmerColorCSSVariable?: string;
  className?: string;
  shimmerWidth?: number;
  animationDuration?: string;
}

const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className = "",
  shimmerWidth = 100,
  textRestingColorCSSVariable = "#000",
  textShimmerColorCSSVariable = "#FFF",
  animationDuration = "3s",
}) => {
  return (
    <p
      style={
        {
          "--shiny-width": `${shimmerWidth}px`,
          "--text-resting-color": textRestingColorCSSVariable,
          "--text-shimmer-color": textShimmerColorCSSVariable,
          "--animation-duration": animationDuration,
        } as CSSProperties
      }
      className={cn(
        `animate-shiny-text !bg-clip-text text-transparent [background:radial-gradient(circle_at_center,var(--text-shimmer-color),transparent)_-200%_50%_/_var(--shiny-width)_100%_no-repeat,var(--text-resting-color)]`,
        className
      )}
    >
      {children}
    </p>
  );
};

export default AnimatedShinyText;
