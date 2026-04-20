import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
    ChevronRight, 
    Unlock, 
    Zap, 
    ShieldAlert, 
    Database, 
    Terminal as TerminalIcon,
    Layers,
    Activity
} from 'lucide-react';
import { cn } from '../lib/utils';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col relative overflow-hidden font-sans">
      {/* Background Matrix-like Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] pointer-events-none z-10 opacity-30"></div>
      
      {/* Hero Section: High-Fidelity Entry */}
      <section className="relative flex-1 flex flex-col items-center justify-center pt-40 pb-32 px-4 text-center z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-16 flex flex-col items-center"
          >
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-[0.3em] rounded-full">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                      RESTRICTED ACCESS: KERNEL_V5.0
                  </div>
                  <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[10px] font-black uppercase tracking-[0.3em] rounded-full">
                      IMPORTANT: PERSONAL PORTFOLIO ONLY
                  </div>
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-black text-slate-100 leading-[0.85] tracking-tighter uppercase mb-6">
                <span className="text-slate-600 block mb-2">UNLOCK THE</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent via-blue-400 to-accent drop-shadow-[0_0_30px_rgba(56,189,248,0.3)]">
                    SYSTEM
                </span>
              </h1>

              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent my-8"></div>

              <p className="text-slate-400 text-[11px] md:text-sm font-mono tracking-[0.2em] uppercase max-w-2xl leading-relaxed px-4">
                Digital Architecture by <span className="text-white font-bold">Muhammad Syafri (UDIN-K)</span>. <br className="hidden md:block"/>
                Neural connections active. Explore the authorized modules below.
              </p>
          </motion.div>

          {/* Module Grid: Bento Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4 mx-auto">

              {[
                  { 
                      title: "VIEW EXPERIENCE", 
                      subtitle: "The Architect's Core", 
                      desc: "Complete telemetry on stack & backend logic.",
                      link: "/experience",
                      icon: <Database className="w-5 h-5" />,
                      color: "border-blue-500/20 bg-blue-500/5 text-blue-400"
                  },
                  { 
                      title: "LAUNCH THE ENGINE", 
                      subtitle: "3D Physical Sandbox", 
                      desc: "Experience real-time Three.js rendering.",
                      link: "/play",
                      icon: <Zap className="w-5 h-5" />,
                      color: "border-accent/20 bg-accent/5 text-accent"
                  },
                  { 
                      title: "CODE REPOSITORY", 
                      subtitle: "Lua & System Scripts", 
                      desc: "Explore high-level scripting patterns.",
                      link: "/scripting",
                      icon: <TerminalIcon className="w-5 h-5" />,
                      color: "border-purple-500/20 bg-purple-500/5 text-purple-400"
                  },
                  { 
                      title: "EXPERIMENTAL LABS", 
                      subtitle: "Neural Sub-Systems", 
                      desc: "Where AI meets architectural abstraction.",
                      link: "/labs",
                      icon: <Layers className="w-5 h-5" />,
                      color: "border-green-500/20 bg-green-500/5 text-green-400"
                  },
                  { 
                      title: "UDIN IDE", 
                      subtitle: "Neural Build Suite", 
                      desc: "The professional cloud workspace.",
                      link: "/ide",
                      icon: <Activity className="w-5 h-5" />,
                      color: "border-white/10 bg-white/5 text-white"
                  },
                  { 
                      title: "CREDENTIAL VAULT", 
                      subtitle: "Verified Assets", 
                      desc: "Industry-standard certification records.",
                      link: "/certificates",
                      icon: <Unlock className="w-5 h-5" />,
                      color: "border-slate-500/20 bg-slate-500/5 text-slate-400"
                  },
                  { 
                      title: "SECURE COMMS", 
                      subtitle: "Encrypted Uplink", 
                      desc: "Direct terminal for urgent transmissions.",
                      link: "/contact",
                      icon: <ShieldAlert className="w-5 h-5" />,
                      color: "border-red-500/30 bg-red-500/5 text-red-500"
                  }
              ].map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + (i * 0.1) }}
                    className={cn(
                        i === 6 ? "md:col-span-2 lg:col-span-3 lg:max-w-2xl lg:mx-auto w-full" : ""
                    )}
                  >
                      <Link 
                        to={card.link}
                        className={cn(
                            "group block p-8 border rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden h-full flex flex-col",
                            card.color
                        )}
                      >
                          <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                              {React.cloneElement(card.icon as React.ReactElement, { className: "w-32 h-32" })}
                          </div>
                          
                          <div className="flex items-center gap-3 mb-6">
                              <div className="p-2.5 rounded bg-white/5 border border-white/5 group-hover:border-white/20 transition-colors backdrop-blur-md z-10">
                                  {card.icon}
                              </div>
                              <span className="text-[10px] font-black uppercase tracking-[0.3em] font-mono opacity-60 group-hover:opacity-100 transition-all z-10">{card.subtitle}</span>
                          </div>
                          
                          <h3 className="text-2xl font-black text-white mb-3 font-mono group-hover:text-accent transition-colors tracking-tighter uppercase leading-tight z-10">
                              {card.title}
                          </h3>
                          <p className="text-slate-500 text-[12px] font-mono leading-relaxed mb-8 flex-grow z-10">
                              {card.desc}
                          </p>
                          
                          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] group-hover:translate-x-2 transition-transform mt-auto z-10 text-white/50 group-hover:text-white">
                              INITIATE PROTOCOL <ChevronRight className="w-3 h-3 text-accent" />
                          </div>
                      </Link>
                  </motion.div>
              ))}
          </div>
      </section>

      {/* Social / Footer-lite */}
      <div className="py-12 px-8 flex justify-between items-center bg-black/40 border-t border-slate-900 relative z-20">
          <div className="flex gap-8 text-[9px] font-black text-slate-700 uppercase tracking-widest font-mono">
              <span className="animate-pulse">SYAFRI_OS v5.0.0</span>
              <span>EST. 2024</span>
          </div>
          <div className="h-0.5 w-1/3 bg-slate-900"></div>
          <div className="text-[9px] font-black text-accent uppercase tracking-[0.4em] font-mono">
              ALL SYSTEMS GO
          </div>
      </div>
    </div>
  );
};
