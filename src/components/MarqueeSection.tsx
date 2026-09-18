import React, { useEffect, useRef, useState } from 'react';

const ROW1_IMAGES = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
];

const ROW2_IMAGES = [
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
];

// Tripled lists for seamless scrolling
const TRIPLED_ROW1 = [...ROW1_IMAGES, ...ROW1_IMAGES, ...ROW1_IMAGES];
const TRIPLED_ROW2 = [...ROW2_IMAGES, ...ROW2_IMAGES, ...ROW2_IMAGES];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const sectionTop = window.scrollY + rect.top;
            const calculatedOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
            setOffset(calculatedOffset);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      id="marquee"
      ref={sectionRef} 
      className="bg-[#0C0C0C] pt-20 sm:pt-28 md:pt-36 pb-10 overflow-hidden w-full relative select-none"
    >
      {/* Edge Gradient Masking for smooth editorial overflow */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 md:w-36 bg-gradient-to-r from-[#0C0C0C] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 md:w-36 bg-gradient-to-l from-[#0C0C0C] to-transparent z-10" />

      <div className="flex flex-col gap-3.5 w-full">
        {/* Row 1: Moves RIGHT on scroll */}
        <div 
          className="flex gap-3.5 w-max"
          style={{ 
            transform: `translate3d(${offset - 200}px, 0, 0)`,
            willChange: 'transform' 
          }}
        >
          {TRIPLED_ROW1.map((src, i) => (
            <img 
              key={`row1-${i}`}
              src={src} 
              alt="Fullstack engineering showcase preview" 
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-[340px] sm:w-[420px] h-[220px] sm:h-[270px] min-w-[340px] sm:min-w-[420px] rounded-2xl object-cover shrink-0 bg-neutral-900 border border-white/5 shadow-md"
            />
          ))}
        </div>

        {/* Row 2: Moves LEFT on scroll */}
        <div 
          className="flex gap-3.5 w-max"
          style={{ 
            transform: `translate3d(${-(offset - 200)}px, 0, 0)`,
            willChange: 'transform' 
          }}
        >
          {TRIPLED_ROW2.map((src, i) => (
            <img 
              key={`row2-${i}`}
              src={src} 
              alt="Fullstack engineering showcase preview" 
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-[340px] sm:w-[420px] h-[220px] sm:h-[270px] min-w-[340px] sm:min-w-[420px] rounded-2xl object-cover shrink-0 bg-neutral-900 border border-white/5 shadow-md"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
