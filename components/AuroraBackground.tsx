"use client";
import React, { useEffect, useRef } from 'react';

export const AuroraBackground = ({ isLight }: { isLight: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    class Particle {
      x: number; y: number; s: number; vx: number; vy: number; c: string;
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.s = Math.random() * 120 + 100;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.c = isLight
          ? `hsla(${Math.random() * 30 + 330}, 100%, 65%, 0.15)`
          : `hsla(${Math.random() * 40 + 60}, 60%, 50%, 0.06)`;
      }
      draw() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;

        const dist = Math.hypot(this.x - mouseRef.current.x, this.y - mouseRef.current.y);
        const intensity = Math.max(0, 1 - dist / 700);

        ctx!.beginPath();
        const grad = ctx!.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.s * (1 + intensity));
        grad.addColorStop(0, this.c);
        grad.addColorStop(1, 'transparent');
        ctx!.fillStyle = grad;
        ctx!.arc(this.x, this.y, this.s * (1 + intensity), 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    let particles = Array.from({ length: 14 }, () => new Particle());
    let animId: number;

    const animate = () => {
      ctx!.clearRect(0, 0, w, h);
      particles.forEach((p) => p.draw());
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [isLight]);

  return <canvas ref={canvasRef} id="aurora-canvas" />;
};
