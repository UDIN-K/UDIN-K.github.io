import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { ContactButton } from './ContactButton';
import { KinematicBackground } from './KinematicBackground';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 80, rotateX: -60, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 120,
    },
  },
};

export const HeroSection: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen h-screen w-full relative flex flex-col justify-between overflow-x-clip bg-[#0C0C0C] select-none"
    >
      {/* 3D Kinematic Background */}
      <KinematicBackground />

      {/* Subtle Background Radial Ambient Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[300px] sm:h-[400px] bg-gradient-to-b from-[#B600A8]/10 via-[#7621B0]/5 to-transparent rounded-full blur-[120px] pointer-events-none z-0" 
        aria-hidden="true" 
      />

      {/* Navbar: Refined horizontal nav bar */}
      <FadeIn 
        delay={0} 
        y={-20} 
        as="nav" 
        className="w-full flex justify-between items-center px-5 sm:px-10 md:px-14 pt-6 md:pt-8 z-30 font-medium uppercase tracking-widest text-[#D7E2EA] text-[11px] sm:text-base md:text-lg lg:text-[1.3rem]"
      >
        {NAV_ITEMS.map((item) => (
          <a 
            key={item.label}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            className="group relative py-1 hover:text-white transition-colors duration-200"
          >
            <span>{item.label}</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#B600A8] to-[#7621B0] transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </FadeIn>

      {/* Hero Heading: Massive "UDINK" Centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 w-full overflow-hidden perspective-[1000px]">
        <motion.h1 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hero-heading font-black uppercase tracking-tighter leading-none whitespace-nowrap w-full text-center text-[20vw] sm:text-[22vw] md:text-[24vw] drop-shadow-[0_10px_40px_rgba(0,0,0,0.9)] flex justify-center"
        >
          {"UDINK".split("").map((letter, index) => (
            <motion.span 
              key={index} 
              variants={letterVariants} 
              className="inline-block origin-bottom"
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>
        
        {/* Micro Badge: Availability Status centered under the massive text */}
        <FadeIn delay={1.2} y={20} className="mt-4 sm:mt-6 md:mt-8 pointer-events-auto">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0C0C0C]/80 border border-white/10 backdrop-blur-md shadow-lg whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] sm:text-xs uppercase tracking-wider font-medium text-[#D7E2EA]/80">
              Open for Projects
            </span>
          </div>
        </FadeIn>
      </div>

      {/* Bottom bar: Flexbox justify-between items-end */}
      <div className="w-full flex justify-between items-end px-6 sm:px-10 md:px-14 pb-7 sm:pb-9 md:pb-11 z-20 pointer-events-auto">
        <FadeIn delay={0.35} y={20}>
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#D7E2EA]/50 font-medium flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[#D7E2EA]/50" />
              Fullstack Developer
            </span>
            <p 
              className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[170px] sm:max-w-[240px] md:max-w-[300px]"
              style={{ fontSize: 'clamp(0.75rem, 1.35vw, 1.4rem)' }}
            >
              crafting scalable web, mobile & distributed cloud systems
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.45} y={20}>
          <ContactButton href="#contact" />
        </FadeIn>
      </div>
    </section>
  );
};
