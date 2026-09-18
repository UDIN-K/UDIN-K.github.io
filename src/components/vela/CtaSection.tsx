import React, { useEffect, useRef } from 'react';

export const CtaSection: React.FC = () => {
  const secRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const sec = secRef.current;
    const title = titleRef.current;
    if (!sec || !title) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      title.style.transform = 'scale(1)';
      return;
    }

    let painted: number | null = null;
    let running = false;
    let rafId = 0;

    const update = () => {
      const top = sec.getBoundingClientRect().top;
      const from = window.innerHeight;
      const to = -window.innerHeight * 0.2;
      const p = Math.min(Math.max((from - top) / (from - to), 0), 1);
      const scale = 2 - p;
      
      if (painted !== null && Math.abs(scale - painted) < 0.002) return;
      painted = scale;
      title.style.transform = `scale(${scale.toFixed(4)})`;
    };

    update();
    const loop = () => { rafId = requestAnimationFrame(loop); update(); };
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        if (!running) { running = true; rafId = requestAnimationFrame(loop); }
      } else {
        running = false;
        cancelAnimationFrame(rafId);
      }
    }, { rootMargin: "30% 0px" });
    io.observe(sec);

    return () => { cancelAnimationFrame(rafId); io.disconnect(); };
  }, []);

  return (
    <section ref={secRef} className="p-cta relative w-full h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden bg-[var(--cta-ground)] text-white">
      {/* Background Plate Mock - normally a video player here */}
      <div className="absolute inset-0 w-full h-full opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--cta-ground)] via-transparent to-[var(--cta-ground)] z-10" />
        <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600" className="w-full h-full object-cover" alt="Background" />
      </div>

      <div className="relative z-20 flex flex-col items-center text-center px-[var(--box-pad)]">
        <span className="uppercase tracking-widest text-[var(--eyebrow-size)] font-medium text-[var(--accent)] mb-8">Let's build together</span>
        
        <h2 className="p-cta__title text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none flex justify-center w-full" data-reveal>
          <span ref={titleRef} className="inline-block will-change-transform origin-center whitespace-nowrap">
            READY TO START?
          </span>
        </h2>
        
        <div className="mt-16" data-reveal>
          <a href="#contact" className="group relative overflow-hidden inline-flex items-center justify-center px-10 py-5 rounded-full bg-white text-black font-semibold uppercase tracking-widest transition-transform duration-500 hover:scale-105 active:scale-95">
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">Contact Me</span>
            <div className="absolute inset-0 bg-[var(--accent)] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </a>
        </div>
      </div>
    </section>
  );
};