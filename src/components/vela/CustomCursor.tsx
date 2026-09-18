import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) {
      cursor.style.display = 'none';
      dot.style.display = 'none';
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let isHovering = false;
    let rafId = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Immediate dot update
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      // Check if hovering clickable elements
      const target = e.target as HTMLElement;
      const clickable = target.closest('a, button, [data-gallery]');
      isHovering = !!clickable;
    };

    const loop = () => {
      // Lerp for the outer ring (smooth follow)
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      
      const scale = isHovering ? 2.5 : 1;
      const opacity = isHovering ? 0.5 : 1;
      
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) scale(${scale})`;
      cursor.style.opacity = opacity.toString();
      
      if (isHovering) {
        dot.style.opacity = '0';
      } else {
        dot.style.opacity = '1';
      }

      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-white/50 rounded-full pointer-events-none z-[100] -ml-4 -mt-4 mix-blend-difference will-change-transform transition-[opacity,transform] duration-75"
      />
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[100] -ml-[3px] -mt-[3px] mix-blend-difference will-change-transform"
      />
      <style>{`
        * { cursor: none !important; }
      `}</style>
    </>
  );
};