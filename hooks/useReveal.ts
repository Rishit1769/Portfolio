"use client";
import { useEffect } from 'react';

export const useReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            const counters = entry.target.querySelectorAll<HTMLSpanElement>('.ac-val');
            counters.forEach((c) => {
              if (c.dataset.counted) return;
              c.dataset.counted = "true";
              const targetAttr = c.getAttribute('data-count');
              if (!targetAttr) return; 
              
              const target = +targetAttr;
              let current = 0;
              const step = target / 50;
              const intv = setInterval(() => {
                current += step;
                if (current >= target) {
                  c.innerText = target + '+';
                  clearInterval(intv);
                } else {
                  c.innerText = Math.floor(current).toString();
                }
              }, 20);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.rv').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};
