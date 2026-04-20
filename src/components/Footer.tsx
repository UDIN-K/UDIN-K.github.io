
import { Mail, Heart, ArrowUpRight, Cpu, Terminal, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

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
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Core Stable</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">U-Chat Synced</span>
                </div>
            </div>
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
                href="https://github.com/UDIN-k" 
                target="_blank" rel="noopener noreferrer"
                className="group flex items-center text-slate-400 hover:text-white transition-colors text-xs font-mono"
              >
                <div className="w-8 h-8 rounded border border-slate-800 flex items-center justify-center mr-3 group-hover:border-white/40 group-hover:bg-white/5 transition-all">
                  <Terminal className="w-3 h-3 group-hover:text-white" />
                </div>
                github.com/UDIN-k
              </a>
              <Link 
                to="/contact"
                className="group flex items-center text-slate-400 hover:text-white transition-colors text-xs font-mono"
              >
                <div className="w-8 h-8 rounded border border-slate-800 flex items-center justify-center mr-3 group-hover:border-red-500/40 group-hover:bg-red-500/5 transition-all">
                  <Shield className="w-3 h-3 group-hover:text-red-500" />
                </div>
                Secure Comms (Terminal)
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Root_Directory</h4>
             <ul className="space-y-4 text-xs font-mono text-slate-500 uppercase tracking-tighter">
              <li>
                <Link to="/" className="hover:text-accent transition-colors flex items-center justify-between group">
                  <span>/home</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/experience" className="hover:text-accent transition-colors flex items-center justify-between group">
                   <span>/experience</span>
                   <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/labs" className="hover:text-accent transition-colors flex items-center justify-between group">
                   <span>/labs</span>
                   <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/labs/kernel" className="hover:text-accent transition-colors flex items-center justify-between group">
                   <span>/kernel-stats</span>
                   <Shield className="w-3 h-3 text-accent" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-600 font-mono tracking-widest uppercase">
          <p>&copy; {new Date().getFullYear()} MUHAMMAD SYAFRI (UDIN-K). ALL SYSTEMS NOMINAL.</p>
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <span>U-AI 5.0 CORE ACTIVE</span>
            <Heart className="w-3 h-3 text-accent animate-pulse" />
            <span>ENCRYPTED_PORTFOLIO</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
