'use client';

import { memo, ReactNode } from 'react';

interface AuroraTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  speed?: number;
}

const AuroraText = memo(
  ({
    children,
    className = "",
    colors = ["#FF0080", "#7928CA", "#0070F3", "#38bdf8"],
    speed = 1,
  }: AuroraTextProps) => {
    const gradientStyle = {
      backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${
        colors[0]
      })`,
      WebkitBackgroundClip: "text" as const,
      backgroundClip: "text" as const,
      WebkitTextFillColor: "transparent" as const,
      animationDuration: `${10 / speed}s`,
      backgroundSize: "200% auto",
    };

    return (
      <span className={`relative inline-block ${className}`}>
        <span className="sr-only">{children}</span>
        <span
          className="animate-aurora"
          style={gradientStyle}
          aria-hidden="true"
        >
          {children}
        </span>
      </span>
    );
  }
);

AuroraText.displayName = "AuroraText";

export default AuroraText;
