import React, { useEffect, useState } from 'react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Reveal animation
    const t = setTimeout(() => {
      const nav = document.getElementById('main-nav');
      if (nav) {
        nav.style.opacity = '1';
        nav.style.transform = 'translateY(0)';
      }
    }, 2800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    // Handle body lock on mobile menu
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return (
    <>
      <nav id="main-nav" className="fixed top-0 left-0 w-full p-[var(--box-pad)] z-40 flex justify-between items-center opacity-0 -translate-y-4 transition-all duration-1000 ease-out pointer-events-none">
        <div className="text-white font-bold tracking-widest text-lg md:text-xl pointer-events-auto mix-blend-difference">
          U<span className="text-[var(--accent)]">K</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-[var(--caps-size)] uppercase tracking-widest font-medium text-white mix-blend-difference pointer-events-auto">
          <a href="#projects" className="hover:text-[var(--accent)] transition-colors">Projects</a>
          <a href="#gallery" className="hover:text-[var(--accent)] transition-colors">Gallery</a>
          <a href="#contact" className="hover:text-[var(--accent)] transition-colors">Contact</a>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white mix-blend-difference pointer-events-auto uppercase tracking-widest text-[var(--caps-size)] font-medium"
        >
          {isOpen ? 'Close' : 'Menu'}
        </button>
      </nav>

      {/* Mobile Panel */}
      <div 
        className={`fixed inset-0 bg-[var(--ink)] z-30 transition-transform duration-700 ease-[var(--ease-out-quart)] flex flex-col justify-center items-center gap-12 md:hidden ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <a href="#projects" onClick={() => setIsOpen(false)} className="text-4xl font-bold uppercase text-white tracking-widest">Projects</a>
        <a href="#gallery" onClick={() => setIsOpen(false)} className="text-4xl font-bold uppercase text-white tracking-widest">Gallery</a>
        <a href="#contact" onClick={() => setIsOpen(false)} className="text-4xl font-bold uppercase text-white tracking-widest">Contact</a>
      </div>
    </>
  );
};