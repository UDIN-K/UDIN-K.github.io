
import React from 'react';
import { Mail, Code2, Heart, ArrowUpRight, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-slate-950 border-t border-slate-900 py-16 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          
          <div className="col-span-2 space-y-8">
            <h3 className="text-3xl font-black text-white tracking-widest uppercase font-mono">
              UDIN<span className="text-accent underline decoration-accent/30 underline-offset-8">K</span>
            </h3>
            <p className="text-slate-500 text-sm leading-loose max-w-sm font-mono">
                System architecture, low-level optimization, and neural experimentation. 
                Bridging the gap between binary logic and creative expression.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-slate-500 flex items-center gap-2">
                <Cpu className="w-3 h-3" /> Connect_Channels
            </h4>
            <div className="flex flex-col gap-4">
              <a 
                href="mailto:safrisam.id09@gmail.com" 
                className="group flex items-center text-slate-400 hover:text-white transition-colors text-xs font-mono"
              >
                <div className="w-8 h-8 rounded border border-slate-800 flex items-center justify-center mr-3 group-hover:border-accent/40 group-hover:bg-accent/5 transition-all">
                  <Mail className="w-3 h-3 group-hover:text-accent" />
                </div>
                safrisam.id09@gmail.com
              </a>
              <a 
                href="https://github.com/UDIN-K" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center text-slate-400 hover:text-white transition-colors text-xs font-mono"
              >
                <div className="w-8 h-8 rounded border border-slate-800 flex items-center justify-center mr-3 group-hover:border-accent/40 group-hover:bg-accent/5 transition-all">
                  <Code2 className="w-3 h-3 group-hover:text-accent" />
                </div>
                GitHub/UDIN-K
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Root_Directory</h4>
             <ul className="space-y-4 text-xs font-mono text-slate-500 uppercase tracking-tighter">
              <li>
                <a href="#home" className="hover:text-accent transition-colors flex items-center justify-between group">
                  <span>/home</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-accent transition-colors flex items-center justify-between group">
                   <span>/portfolio</span>
                   <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#ai-lab" className="hover:text-accent transition-colors flex items-center justify-between group">
                   <span>/neural-lab</span>
                   <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-600 font-mono tracking-widest uppercase">
          <p>&copy; {new Date().getFullYear()} Syafri Syamsudin (UDIN-K). All systems nominal.</p>
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <span>Compiled with</span>
            <Heart className="w-3 h-3 text-accent animate-pulse" />
            <span>and React 18</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
