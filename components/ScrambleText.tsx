"use client";
import React, { useEffect, useRef } from 'react';

export const ScrambleText = ({ text }: { text: string }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  
  useEffect(() => {
    if (!nodeRef.current) return;
    const el = nodeRef.current;
    
    let frameRequest: number;
    let frame = 0;
    const queue: any[] = [];
    
    for (let i = 0; i < text.length; i++) {
      const from = '';
      const to = text[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      queue.push({ from, to, start, end, char: '' });
    }

    const update = () => {
      let output = '';
      let complete = 0;
      for (let i = 0; i < queue.length; i++) {
        let { from, to, start, end, char } = queue[i];
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = chars[Math.floor(Math.random() * chars.length)];
            queue[i].char = char;
          }
          output += `<span style="color:var(--acc)">${char}</span>`;
        } else {
          output += from;
        }
      }
      el.innerHTML = output;
      if (complete === queue.length) return;
      frameRequest = requestAnimationFrame(update);
      frame++;
    };
    
    update();
    return () => cancelAnimationFrame(frameRequest);
  }, [text]);

  return <span ref={nodeRef}>{text}</span>;
};
