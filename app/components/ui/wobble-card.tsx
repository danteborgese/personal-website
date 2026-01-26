'use client';

import React, { useRef, useState, ReactNode } from 'react';

interface WobbleCardProps {
  children: ReactNode;
  containerClassName?: string;
  className?: string;
  onClick?: () => void;
  gradientColors?: string[];
  isExpanded?: boolean;
}

export function WobbleCard({ 
  children, 
  containerClassName = '', 
  className = '',
  onClick,
  gradientColors,
  isExpanded = false
}: WobbleCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setMousePosition({ x: rotateY, y: rotateX });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const gradientStyle = gradientColors && gradientColors.length >= 2
    ? {
        backgroundImage: gradientColors.length >= 3
          ? `linear-gradient(135deg, ${gradientColors[0]} 0%, ${gradientColors[1]} 50%, ${gradientColors[2]} 100%)`
          : `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
      }
    : {};

  return (
    <div
      ref={ref}
      className={`wobble-card-container ${containerClassName} ${isExpanded ? 'expanded' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`
          : 'perspective(1000px) rotateX(0) rotateY(0)',
        transition: isHovered ? 'none' : 'transform 0.3s ease-out',
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <div 
        className={`wobble-card ${className} ${isExpanded ? 'expanded' : ''}`}
        style={gradientStyle}
      >
        {children}
        {isExpanded && <span className="wobble-card-indicator">▼</span>}
      </div>
    </div>
  );
}
