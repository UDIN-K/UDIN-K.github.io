import React, { useEffect, useRef } from 'react';

export const StatementSection: React.FC = () => {
  const leadRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const lead = leadRef.current;
    if (!lead) return;
    const source = lead.textContent?.replace(/\s+/g, ' ').trim() || '';
    lead.textContent = '';
    const words = source.split(' ').map((word, i, arr) => {
      const w = document.createElement('span');
      w.className = 'w inline transition-colors duration-300 text-white/20';
      w.textContent = i < arr.length - 1 ? word + ' ' : word;
      lead.appendChild(w);
      return w;
    });

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      words.forEach(w => w.classList.add('is-lit'));
      return;
    }

    let lit = -1;
    let running = false;
    let rafId = 0;

    const update = () => {
      const r = lead.getBoundingClientRect();
      const from = window.innerHeight * 0.85;
      const to = window.innerHeight * 0.3;
      const p = (from - r.top) / Math.max(1, from - to + r.height);
      const n = Math.round(Math.min(Math.max(p, 0), 1) * words.length);
      if (n === lit) return;
      lit = n;
      words.forEach((w, i) => {
        if (i < n) {
          w.style.color = 'var(--ink)';
          w.style.opacity = '1';
        } else {
          w.style.color = '';
          w.style.opacity = '';
        }
      });
    };

    const loop = () => { rafId = requestAnimationFrame(loop); update(); };
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        if (!running) { running = true; rafId = requestAnimationFrame(loop); }
      } else {
        running = false;
        cancelAnimationFrame(rafId);
      }
    }, { rootMargin: "20% 0px" });
    io.observe(lead);
    update();

    return () => { cancelAnimationFrame(rafId); io.disconnect(); };
  }, []);

  return (
    <section className="relative w-full min-h-[60vh] flex items-center justify-center px-[var(--box-pad)] py-32 bg-[var(--system-background-color)]">
      <div className="max-w-[var(--box-max)] w-full mx-auto" data-reveal>
        <p
          ref={leadRef}
          className="text-3xl md:text-5xl lg:text-6xl font-light leading-relaxed tracking-tight"
          data-word-highlight
        >
          Building scalable web platforms, native Android apps, and distributed cloud architectures — crafted with precision from concept to deployment.
        </p>
      </div>
    </section>
  );
};