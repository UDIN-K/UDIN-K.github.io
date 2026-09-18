import React, { useEffect, useRef } from 'react';

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

function tweenOnce(delay: number, duration: number, onUpdate: (p: number) => void, onComplete?: () => void) {
  setTimeout(() => {
    const start = performance.now();
    const frame = (now: number) => {
      const t = (now - start) / duration;
      if (t >= 1) { onUpdate(1); onComplete?.(); return; }
      onUpdate(easeOutQuart(t));
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, delay);
}

export const ScrollReveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';

    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      io.unobserve(el);
      tweenOnce(delay * 1000, 900, p => {
        el.style.opacity = p.toString();
        el.style.transform = `translateY(${(20 * (1 - p)).toFixed(2)}px)`;
      }, () => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.15 });
    io.observe(el);

    return () => io.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};