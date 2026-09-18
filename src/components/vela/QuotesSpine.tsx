import React, { useEffect, useRef } from 'react';

const REVIEWS = [
  {
    text: "P2P Share engine works flawlessly. Zero-data transfer speeds are incredible, bypassing all network limitations locally.",
    author: "Network Engineer"
  },
  {
    text: "SiLATORJANA simplified our entire institutional document workflow. The transition was smooth and the Appwrite backend handles it securely.",
    author: "Project Manager"
  },
  {
    text: "KOMA is one of the best open-source manga readers out there. Built cleanly on Kotlin with solid offline capabilities.",
    author: "Open Source Contributor"
  }
];

export const QuotesSpine: React.FC = () => {
  const secRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = secRef.current;
    if (!sec) return;
    
    // Convert text to spans per character for the print effect
    const prints = Array.from(sec.querySelectorAll('[data-print]')) as HTMLElement[];
    const runs = prints.map(el => {
      const chars: HTMLElement[] = [];
      const parts = el.textContent?.split(/(\s+)/) || [];
      el.textContent = '';
      for (const part of parts) {
        if (!part) continue;
        if (/^\s+$/.test(part)) { el.appendChild(document.createTextNode(part)); continue; }
        const word = document.createElement('span');
        word.className = 'inline-block';
        for (const ch of part) {
          const c = document.createElement('span');
          c.textContent = ch;
          c.className = 'transition-colors duration-200 text-white/20';
          word.appendChild(c);
          chars.push(c);
        }
        el.appendChild(word);
      }
      return { el, chars, lit: 0 };
    });

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      runs.forEach(r => r.chars.forEach(c => { c.style.color = '#fff'; }));
      return;
    }

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
    const split = window.matchMedia("(min-width: 768px)");

    let asideTy = 0, starTy = 0, spine = -1;
    let running = false;
    let rafId = 0;

    const update = () => {
      const r = sec.getBoundingClientRect();
      const mid = window.innerHeight / 2;

      const s = Math.min(clamp01((mid - r.top) / mid), clamp01((r.bottom - mid) / mid));
      const eased = easeOut(s);
      
      if (Math.abs(eased - spine) > 0.002) {
        spine = eased;
        if (lineRef.current) lineRef.current.style.transform = `scaleY(${eased.toFixed(3)})`;
        if (starRef.current) starRef.current.style.transform = `translateY(${starTy.toFixed(1)}px) scale(${eased.toFixed(3)})`;
      }

      const pin = (el: HTMLElement, ty: number, height: number) => {
        const base = el.getBoundingClientRect().top - ty;
        const room = r.height - (base - r.top) - height;
        return Math.min(Math.max(mid - height / 2 - base, 0), Math.max(room, 0));
      };

      if (asideRef.current) {
        const nextAside = split.matches ? pin(asideRef.current, asideTy, asideRef.current.offsetHeight) : 0;
        if (Math.abs(nextAside - asideTy) > 0.5) {
          asideTy = nextAside;
          asideRef.current.style.transform = asideTy ? `translateY(${asideTy.toFixed(1)}px)` : '';
        }
      }

      if (starRef.current) {
        const nextStar = pin(starRef.current, starTy, starRef.current.offsetHeight);
        if (Math.abs(nextStar - starTy) > 0.5) {
          starTy = nextStar;
          starRef.current.style.transform = `translateY(${starTy.toFixed(1)}px) scale(${spine.toFixed(3)})`;
        }
      }

      // Print head
      for (const run of runs) {
        const b = run.el.getBoundingClientRect();
        if (b.height === 0) continue;
        const p = clamp01((mid - b.top) / Math.max(b.height, 44));
        const want = Math.round(p * run.chars.length);
        if (want === run.lit) continue;
        if (want > run.lit) {
          for (let i = run.lit; i < want; i++) run.chars[i].style.color = '#fff';
        } else {
          for (let i = run.lit - 1; i >= want; i--) run.chars[i].style.color = '';
        }
        run.lit = want;
      }
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
    }, { rootMargin: "20% 0px" });
    io.observe(sec);
    window.addEventListener('resize', update, { passive: true });
    split.addEventListener('change', update);

    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
      window.removeEventListener('resize', update);
      split.removeEventListener('change', update);
    };
  }, []);

  return (
    <section ref={secRef} className="relative w-full py-32 bg-[var(--cta-ground)] text-white overflow-hidden">
      <div className="max-w-[var(--box-max)] mx-auto px-[var(--box-pad)] relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
        
        {/* Central Spine Line */}
        <div className="hidden md:block absolute top-0 left-1/2 w-px h-full bg-white/20 origin-top" ref={lineRef} />
        {/* Spine Star */}
        <div className="hidden md:flex absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 items-center justify-center text-xl z-10" ref={starRef}>
          ✦
        </div>

        <div className="md:col-span-5 relative">
          <div ref={asideRef} className="will-change-transform sticky top-1/2 -translate-y-1/2">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">Feedback</h2>
            <p className="text-white/50 text-sm uppercase tracking-widest max-w-[200px]">From people who used my open source work.</p>
          </div>
        </div>

        <div className="md:col-start-7 md:col-span-6 flex flex-col gap-32 py-[20vh]">
          {REVIEWS.map((r, i) => (
            <div key={i} className="flex flex-col gap-6">
              <p data-print className="text-2xl md:text-3xl lg:text-4xl font-light leading-snug tracking-tight text-white/20">
                "{r.text}"
              </p>
              <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-widest text-white/40">
                <span className="w-8 h-px bg-white/20" />
                {r.author}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};