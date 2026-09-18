import React, { useEffect, useRef } from 'react';

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
const easeInOutQuart = (t: number) => (t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2);
const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

function runTween(delay: number, duration: number, ease: (t: number) => number, onUpdate: (p: number) => void, onComplete?: () => void) {
  setTimeout(() => {
    const start = performance.now();
    const frame = (now: number) => {
      let t = (now - start) / duration;
      if (t >= 1) {
        onUpdate(1);
        if (onComplete) onComplete();
        return;
      }
      onUpdate(ease(t));
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, delay);
}

export const CurtainLoader: React.FC = () => {
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loadingRef.current) return;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      loadingRef.current.classList.add('is-done');
      return;
    }

    const mark = loadingRef.current.querySelector('[data-loading-mark]') as HTMLElement;
    const rules = Array.from(loadingRef.current.querySelectorAll('[data-loading-rule]')) as HTMLElement[];
    const metas = Array.from(loadingRef.current.querySelectorAll('[data-loading-meta]')) as HTMLElement[];
    const gauge = loadingRef.current.querySelector('[data-loading-gauge]') as HTMLElement;
    const depth = loadingRef.current.querySelector('[data-loading-depth]') as HTMLElement;
    const rise = loadingRef.current.querySelector('[data-loading-rise]') as HTMLElement;
    const top = loadingRef.current.querySelector('[data-loading-top]') as HTMLElement;
    const bottom = loadingRef.current.querySelector('[data-loading-bottom]') as HTMLElement;

    const glyphs = Array.from(mark.children) as HTMLElement[];

    // 0: Meta fade in
    metas.forEach((el, i) => runTween(i * 60, 700, easeOutQuart, p => {
      el.style.opacity = p.toString();
      el.style.transform = `translateY(${(8 * (1 - p)).toFixed(2)}px)`;
    }));

    // 120: Waterline splits
    rules.forEach(el => runTween(120, 1000, easeInOutQuart, p => el.style.transform = `scaleX(${p})`));

    // 320: Wordmark surfaces
    [...glyphs, rise].forEach((g, i) => runTween(320 + i * 40, 1300, easeOutQuart, p => {
      g.style.transform = `translateY(${100 * (1 - p)}%)`;
    }));

    // 420: Gauge runs
    runTween(420, 1700, easeInOutQuad, p => {
      gauge.style.transform = `scaleX(${p})`;
      depth.textContent = String(Math.round(p * 90)).padStart(3, "0");
    });

    // 2200: Sinks back
    [...glyphs, rise].forEach((g, i) => runTween(2200 + i * 30, 850, easeInOutQuart, p => {
      g.style.transform = `translateY(${100 * p}%)`;
    }));

    // 2250: Meta out
    metas.forEach(el => runTween(2250, 450, easeInOutQuart, p => el.style.opacity = (1 - p).toString()));

    // 2700: Surface parts
    runTween(2700, 1300, easeInOutQuart, p => {
      bottom.style.transform = `translate3d(0, ${(100 * p).toFixed(2)}%, 0)`;
    });
    runTween(2780, 1300, easeInOutQuart, p => {
      top.style.transform = `translate3d(0, ${(-100 * p).toFixed(2)}%, 0)`;
    }, () => {
      setTimeout(() => {
        if (loadingRef.current) loadingRef.current.classList.add('is-done');
      }, 40);
    });

  }, []);

  return (
    <div id="loading" ref={loadingRef} className="c-loading fixed inset-0 z-50 pointer-events-none flex flex-col [&.is-done]:hidden">
      {/* Top half */}
      <div data-loading-top className="h-1/2 w-full bg-[#111111] relative overflow-hidden text-[#555] font-mono text-[10px]">
        <div data-loading-meta className="absolute top-6 left-6 opacity-0">UDINK PORTFOLIO</div>
        <div data-loading-meta className="absolute top-6 right-6 opacity-0">INIT</div>
        
        {/* Wordmark top half container */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden flex justify-center items-end" style={{ height: '120px' }}>
          <div data-loading-mark className="flex overflow-hidden text-7xl md:text-9xl font-bold tracking-tighter text-[#eeeeee]">
            {"UDINK".split("").map((c, i) => <span key={i} style={{transform: "translateY(100%)"}} className="inline-block">{c}</span>)}
          </div>
        </div>
        <div data-loading-rule className="absolute bottom-0 left-0 w-full h-[1px] bg-[#444] origin-center scale-x-0" />
      </div>

      {/* Bottom half */}
      <div data-loading-bottom className="h-1/2 w-full bg-[#111111] relative overflow-hidden text-[#555] font-mono text-[10px]">
        <div data-loading-rule className="absolute top-0 left-0 w-full h-[1px] bg-[#444] origin-center scale-x-0" />
        <div data-loading-meta className="absolute bottom-6 left-6 opacity-0 flex flex-col">
          <span>DEPTH</span>
          <span className="flex items-center gap-2"><div data-loading-gauge className="w-12 h-[1px] bg-[#555] origin-left scale-x-0" /> <span data-loading-depth>000</span>m</span>
        </div>
        <div data-loading-meta className="absolute bottom-6 right-6 opacity-0">SOUNDING</div>
        
        {/* Under waterline gauge container */}
        <div data-loading-rise className="absolute top-6 left-1/2 -translate-x-1/2 opacity-60 translate-y-full">
          [ MEASURING ]
        </div>
      </div>
    </div>
  );
};