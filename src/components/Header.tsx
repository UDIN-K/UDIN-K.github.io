import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeSelector } from './ThemeSelector';
import { useLanguage } from '../hooks/useLanguage';

import { LanguageSelector } from './LanguageSelector';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const language = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = {
    en: { port: 'Portfolio', koma: 'Koma' },
    id: { port: 'Portofolio', koma: 'Koma' },
    es: { port: 'Portafolio', koma: 'Koma' },
    ja: { port: 'ポートフォリオ', koma: 'Koma' },
    ko: { port: '포트폴리오', koma: 'Koma' },
    zh: { port: '作品集', koma: 'Koma' },
    fr: { port: 'Portfolio', koma: 'Koma' },
    ar: { port: 'أعمالي', koma: 'Koma' }
  };
  const text = t[language as keyof typeof t] || t.en;

  const navLinks = [
    { name: text.port, href: '/projects' },
    { name: text.koma, href: 'https://koma.udink.me' },
  ];

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith('#')) {
      const id = href.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    if (href.startsWith('/#') && location.pathname === '/') {
      const id = href.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-primary/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 md:px-8 flex justify-between items-center">
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-white text-primary flex items-center justify-center font-black text-xl rounded-sm group-hover:bg-accent transition-colors">
              U
            </div>
            <span className="text-xl font-bold tracking-widest text-white uppercase font-mono">
              UDIN<span className="text-slate-500 group-hover:text-accent transition-colors">K</span>
            </span>
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <motion.div key={link.name} whileHover={{ y: -2 }}>
              {link.href.startsWith('http') || link.href.startsWith('#') ? (
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors relative group block"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </a>
              ) : (
                <Link
                  to={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors relative group block"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </Link>
              )}
            </motion.div>
          ))}
          <div className="h-4 w-px bg-slate-800 mx-4"></div>
          
          <ThemeSelector />
          <LanguageSelector />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2 sm:gap-4">
          <ThemeSelector />
          <LanguageSelector />
          <button
            className="text-white hover:text-accent transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-t border-slate-800 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col py-6 px-4 space-y-4">
              {navLinks.map((link) => (
                link.href.startsWith('http') || link.href.startsWith('#') ? (
                  <a
                    key={link.name}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm font-bold uppercase tracking-widest text-slate-300 hover:text-accent transform transition-transform active:scale-95"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className="text-sm font-bold uppercase tracking-widest text-slate-300 hover:text-accent transform transition-transform active:scale-95"
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
