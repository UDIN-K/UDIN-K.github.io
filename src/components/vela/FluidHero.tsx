import React, { useEffect, useRef } from 'react';
import { WebGLFluid } from './WebGLFluid';

export const FluidHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleGroupRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Settle animation (scale 1.3 -> 1.0 after curtain clears)
    const t = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.style.transform = 'scale(1)';
        containerRef.current.style.filter = 'brightness(1)';
      }
    }, 2800);

    // Staggered character reveal from alternating sides (like Vela splitTitle)
    const titleGroup = titleGroupRef.current;
    if (titleGroup) {
      const chars = Array.from(titleGroup.querySelectorAll('.ch')) as HTMLElement[];
      chars.forEach((c, i) => {
        const from = (chars.length - i) % 2 === 0 ? "100%" : "-100%";
        c.style.transform = `translateY(${from})`;
        
        setTimeout(() => {
          c.style.transition = 'transform 1.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
          c.style.transform = 'translateY(0%)';
        }, 2800 + (i * 20));
      });
    }

    return () => clearTimeout(t);
  }, []);

  const renderTitleChar = (char: string, i: number) => (
    <span key={i} className="inline-block overflow-hidden pb-4">
      <span className="ch inline-block will-change-transform text-white drop-shadow-2xl">{char === " " ? "\u00A0" : char}</span>
    </span>
  );

  return (
    <section className="relative w-full h-[100svh] overflow-hidden bg-[var(--ink)]">
      {/* Background WebGL Fluid */}
      <div 
        ref={containerRef}
        className="absolute inset-0 w-full h-full will-change-transform origin-center"
        style={{ transform: 'scale(1.3)', filter: 'brightness(1.2)', transition: 'transform 1.6s cubic-bezier(0.165, 0.84, 0.44, 1), filter 1.6s cubic-bezier(0.165, 0.84, 0.44, 1)' }}
        data-mv-bg
      >
        <WebGLFluid 
          colorSrc="/img/bg.jpg"
          monoSrc="/img/bg.jpg" 
        />
      </div>

      {/* Tech Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Grid Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-[var(--box-pad)] pb-12 md:pb-16 z-10 pointer-events-none">
        
        {/* Status Badge */}
        <div className="overflow-hidden mb-6">
          <div className="badge-reveal transform translate-y-full transition-transform duration-1000 delay-[3200ms] ease-out-quart flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-black/20 backdrop-blur-sm w-max">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-white/80 font-medium">System Online · Open for Projects</span>
          </div>
        </div>

        <h1 ref={titleGroupRef} className="uppercase tracking-tighter leading-none flex flex-wrap" style={{ fontSize: 'clamp(5rem, 15vw, 12.7rem)' }}>
          {"UDINK".split("").map((c, i) => renderTitleChar(c, i))}
        </h1>
        
        <div className="flex justify-between items-end mt-4 uppercase tracking-widest text-[var(--caps-size)] text-white/70 overflow-hidden">
          <span className="block transform translate-y-full transition-transform duration-1000 delay-[3000ms] ease-out-quart subtitle-reveal">FULLSTACK ENGINEER</span>
          <div className="flex flex-col items-end gap-2">
            <span className="block transform translate-y-full transition-transform duration-1000 delay-[3100ms] ease-out-quart subtitle-reveal">2026 EDITION</span>
            {/* Scroll Indicator */}
            <div className="w-px h-12 bg-white/20 relative overflow-hidden mt-4">
              <div className="w-full h-full bg-white animate-scroll-down origin-top" />
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .ease-out-quart { transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1); }
        .js .subtitle-reveal, .js .badge-reveal { transform: translateY(0) !important; }
        @keyframes scroll-down {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }
        .animate-scroll-down {
          animation: scroll-down 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
        }
      `}</style>
    </section>
  );
};