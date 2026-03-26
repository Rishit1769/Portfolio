"use client";
import React, { useEffect, useRef } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';

export const TrackingBot = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pupilsRef = useRef<SVGGElement>(null);
  const { x: mx, y: my } = useMousePosition();

  useEffect(() => {
    if (!svgRef.current || !pupilsRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const dx = mx - centerX;
    const dy = my - centerY;
    const angle = Math.atan2(dy, dx);
    
    const pupilDist = Math.min(Math.hypot(dx, dy) / 30, 6);
    const px = Math.cos(angle) * pupilDist;
    const py = Math.sin(angle) * pupilDist;
    
    const headDist = Math.min(Math.hypot(dx, dy) / 50, 5);
    const hx = Math.cos(angle) * headDist;
    const hy = Math.sin(angle) * headDist;
    const rot = (dx / (window.innerWidth / 2)) * 15;
    
    pupilsRef.current.style.transform = `translate(${px}px, ${py}px)`;
    svgRef.current.style.transform = `translate(${hx}px, ${hy}px) rotate(${rot}deg)`;
  }, [mx, my]);

  return (
    <div className="h-bot" title="I'm tracking you">
      <svg ref={svgRef} id="bot-svg" viewBox="0 0 100 100" width="54" height="54" style={{ overflow: "visible" }}>
        <line x1="50" y1="20" x2="50" y2="0" stroke="var(--t3)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="50" cy="0" r="5" className="h-bot-eye" />
        <rect x="10" y="20" width="80" height="65" rx="25" className="h-bot-body" />
        <rect x="22" y="40" width="56" height="26" rx="13" fill="var(--bg)" stroke="var(--line)" strokeWidth="3" />
        <g ref={pupilsRef} id="bot-pupils">
          <circle cx="38" cy="53" r="5" className="h-bot-eye" />
          <circle cx="62" cy="53" r="5" className="h-bot-eye" />
        </g>
      </svg>
    </div>
  );
};
