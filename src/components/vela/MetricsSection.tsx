import React, { useEffect, useRef } from 'react';

const METRIC = { floor: 60, start: 70, step: 151.25, catch: 0.5 };

const ITEMS = [
  { val: "20+", label: "Completed Projects" },
  { val: "100%", label: "Open Source" },
  { val: "99.9%", label: "Uptime" },
  { val: "0 ms", label: "Latency P2P" }
];

export const MetricsSection: React.FC = () => {
  const rowRef = useRef<HTMLDivElement>(null);
  const pairsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const row = rowRef.current;
    const pairs = pairsRef.current;
    if (!row || pairs.length === 0) return;

    const starts = pairs.map((_, i) => METRIC.start + i * METRIC.step);
    const topRung = starts[starts.length - 1];
    let painted: number | string | null = null;
    let running = false;
    let rafId = 0;

    const update = () => {
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const stacked = window.matchMedia("(max-width: 767px)").matches;
      
      if (isReduced || stacked) {
        if (painted !== "flat") {
          pairs.forEach(el => { if(el) el.style.transform = ""; });
          painted = "flat";
        }
        return;
      }

      const r = row.getBoundingClientRect();
      const line = window.innerHeight * METRIC.catch;
      const ceiling = Math.min(Math.max(r.bottom - line, METRIC.floor), topRung);
      
      if (painted !== null && painted !== "flat" && Math.abs(ceiling - (painted as number)) < 0.5) return;
      painted = ceiling;

      for (let i = 0; i < pairs.length; i++) {
        const lift = Math.min(starts[i], ceiling) - METRIC.floor;
        if(pairs[i]) pairs[i].style.transform = `translate3d(0, ${-lift.toFixed(1)}px, 0)`;
      }
    };

    update();

    const loop = () => { rafId = requestAnimationFrame(loop); update(); };
    const start = () => { if (!running) { running = true; rafId = requestAnimationFrame(loop); } };
    const stop = () => { running = false; cancelAnimationFrame(rafId); };

    let onScreen = false;
    const sync = () => (onScreen && !document.hidden ? start() : stop());
    
    const io = new IntersectionObserver(entries => {
      onScreen = entries[0].isIntersecting;
      sync();
    }, { rootMargin: "100px 0px" });
    io.observe(row);

    document.addEventListener("visibilitychange", sync);
    window.addEventListener("resize", () => { painted = null; update(); }, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <section className="w-full bg-[var(--system-background-color)] py-32 px-[var(--box-pad)] overflow-hidden">
      <div className="max-w-[var(--box-max)] mx-auto border-t border-[var(--ink)] pt-12">
        <div ref={rowRef} data-metrics className="flex flex-col md:flex-row justify-between gap-12 md:gap-4 h-[400px] md:h-[300px]">
          {ITEMS.map((item, i) => (
            <div 
              key={i}
              ref={el => { if(el) pairsRef.current[i] = el; }}
              data-metric 
              className="flex flex-col gap-4 will-change-transform"
            >
              <span className="text-5xl md:text-7xl font-bold tracking-tighter text-[var(--ink)]">{item.val}</span>
              <span className="text-sm font-medium uppercase tracking-widest text-[var(--ink)]/50">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};