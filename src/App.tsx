import React, { useEffect } from 'react';
import { VirtualScroll } from './components/vela/VirtualScroll';
import { CurtainLoader } from './components/vela/CurtainLoader';
import { CustomCursor } from './components/vela/CustomCursor';
import { Navbar } from './components/vela/Navbar';
import { FluidHero } from './components/vela/FluidHero';
import { StatementSection } from './components/vela/StatementSection';
import { ProjectsRail } from './components/vela/ProjectsRail';
import { MetricsSection } from './components/vela/MetricsSection';
import { GalleryRing } from './components/vela/GalleryRing';
import { QuotesSpine } from './components/vela/QuotesSpine';
import { FaqSection } from './components/vela/FaqSection';
import { CtaSection } from './components/vela/CtaSection';
import { FooterSection } from './components/FooterSection';

export const App: React.FC = () => {
  useEffect(() => {
    document.documentElement.classList.add('js');
    const t = setTimeout(() => {
      const l = document.getElementById('loading');
      if (l) l.classList.add('is-done');
    }, 8000);

    // Global scroll reveals for [data-reveal]
    const reveals = document.querySelectorAll('[data-reveal]');
    if (reveals.length > 0 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            io.unobserve(entry.target);
            const el = entry.target as HTMLElement;
            el.style.transition = 'all 0.9s cubic-bezier(0.165, 0.84, 0.44, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }
        });
      }, { rootMargin: "0px 0px -12% 0px", threshold: 0.15 });

      reveals.forEach(el => {
        const e = el as HTMLElement;
        e.style.opacity = '0';
        e.style.transform = 'translateY(20px)';
        io.observe(e);
      });
    }

    return () => clearTimeout(t);
  }, []);

  return (
    <div className="uichemy-vela-1">
      <CustomCursor />
      <CurtainLoader />
      <Navbar />
      <VirtualScroll>
        <FluidHero />
        <StatementSection />
        <ProjectsRail />
        <MetricsSection />
        <GalleryRing />
        <QuotesSpine />
        <FaqSection />
        <CtaSection />
        <FooterSection />
      </VirtualScroll>
    </div>
  );
};

export default App;