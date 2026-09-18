import React, { useEffect, useRef } from 'react';

export const VirtualScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const spacer = spacerRef.current;
    if (!scroller || !spacer) return;

    const native = window.matchMedia("(hover: none)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (native) {
      document.documentElement.classList.add('is-native-scroll');
      return;
    }

    let current = window.scrollY;
    let target = window.scrollY;
    let rendered: number | null = null;
    let lastTime = performance.now();
    let rafId = 0;

    const measure = () => {
      spacer.style.height = `${scroller.scrollHeight}px`;
    };

    const resizeObserver = new ResizeObserver(() => measure());
    resizeObserver.observe(scroller);

    const loop = (now: number) => {
      rafId = requestAnimationFrame(loop);
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      target = window.scrollY;
      const factor = 1 - Math.pow(1 - 0.1, dt * 60);
      current += (target - current) * factor;
      
      if (Math.abs(target - current) < 0.05) current = target;

      if (rendered === null || Math.abs(current - rendered) > 0.01) {
        rendered = current;
        scroller.style.transform = `translate3d(0, ${(-current).toFixed(2)}px, 0)`;
      }
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <>
      <div id="scroll" ref={scrollerRef} className="fixed top-0 left-0 w-full will-change-transform z-10">
        {children}
      </div>
      <div id="scroll-spacer" ref={spacerRef} className="w-full" />
    </>
  );
};