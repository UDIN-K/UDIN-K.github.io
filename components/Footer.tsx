
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-slate-950 border-t border-slate-800 py-16 relative overflow-hidden">
      {/* Decorative top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              UDIN<span className="text-accent">K</span>
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Building immersive worlds and intelligent systems. 
              Focusing on Game Development, High-Performance Computing, and Generative AI.
            </p>
          </div>

          {/* Connect Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:safrisam.id09@gmail.com" 
                  className="group flex items-center text-slate-400 hover:text-white transition-colors text-sm"
                >
                  <span className="w-8 h-8 rounded bg-slate-900 border border-slate-700 flex items-center justify-center mr-3 group-hover:border-accent group-hover:bg-accent/10 transition-colors">
                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </span>
                  safrisam.id09@gmail.com
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/UDIN-K" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center text-slate-400 hover:text-white transition-colors text-sm"
                >
                  <span className="w-8 h-8 rounded bg-slate-900 border border-slate-700 flex items-center justify-center mr-3 group-hover:border-accent group-hover:bg-accent/10 transition-colors">
                    <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                    </svg>
                  </span>
                  GitHub: UDIN-K
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Explore</h4>
             <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#home" className="hover:text-accent transition-colors flex items-center gap-2">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  Home
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-accent transition-colors flex items-center gap-2">
                   <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                   Game Projects
                </a>
              </li>
              <li>
                <a href="#ai-lab" className="hover:text-accent transition-colors flex items-center gap-2">
                   <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                   AI Playground
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Muhammad Syafri Syamsudin Syah.</p>
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <span>Made with</span>
            <svg className="w-3 h-3 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <span>and React</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
