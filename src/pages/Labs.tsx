import React from 'react';
import { motion } from 'motion/react';
import { Cpu, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

export const Labs: React.FC = () => {
    useSEO({
        title: 'Experimental Labs — UDINK',
        description: 'Experimental modules and interactive demos: UDIN IDE, Neural Vision, Kernel Stats, and more.'
    });

    const labModules = [
        { 
            title: 'UDIN IDE', 
            desc: 'Full-stack cloud editor with integrated Gemini neural core.', 
            tag: 'ACTIVE',
            link: '/ide'
        },
        { 
            title: 'Neural Vision', 
            desc: 'Real-time image deconstruction using Neural-Pro vision patterns.', 
            tag: 'ACTIVE',
            link: '/labs/vision'
        },
        { 
            title: 'Kernel Stats', 
            desc: 'Real-time telemetry and hardware resource monitoring dashboard.', 
            tag: 'ACTIVE',
            link: '/labs/kernel'
        },
        { 
            title: 'U-Chat API', 
            desc: 'Headless neural interface for external system integration.', 
            tag: 'ALPHA',
            link: '#'
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 pt-32 pb-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none"></div>
            
            <div className="container mx-auto px-4 md:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-0.5 bg-accent"></div>
                        <span className="text-accent text-xs font-black uppercase tracking-[0.4em]">Experimental Sub-Systems</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-white font-mono tracking-tighter uppercase leading-[0.9]">
                        NEURAL <br/>
                        <span className="text-accent underline decoration-accent/20 underline-offset-[12px]">LABS</span>
                    </h1>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {labModules.map((lab, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="group p-10 bg-slate-900/40 border border-slate-800 hover:border-accent/40 rounded-xl transition-all relative overflow-hidden flex flex-col"
                        >
                            <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                                <Cpu className="w-48 h-48 text-accent" />
                            </div>

                            <div className="flex justify-between items-start mb-10 relative z-20">
                                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-white border border-white/10 group-hover:border-accent/30 group-hover:text-accent transition-colors">
                                    <Cpu className="w-6 h-6" />
                                </div>
                                <span className={cn(
                                    "text-[9px] font-black px-3 py-1.5 rounded-full tracking-[0.2em] border",
                                    lab.tag === 'ACTIVE' ? "bg-green-500/10 text-green-500 border-green-500/20" : 
                                    lab.tag === 'ALPHA' ? "bg-accent/10 text-accent border-accent/20" :
                                    "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                                )}>{lab.tag}</span>
                            </div>
                            
                            <h2 className="text-3xl font-bold text-white mb-4 font-mono group-hover:text-accent transition-colors tracking-tighter uppercase relative z-20">
                                {lab.title}
                            </h2>
                            <p className="text-slate-400 text-xs font-mono leading-relaxed mb-10 max-w-lg flex-grow relative z-20">
                                {lab.desc}
                            </p>
                            
                            <div className="relative z-20 mt-auto">
                                {lab.link !== '#' ? (
                                    <Link to={lab.link} className="inline-flex items-center gap-3 text-[10px] font-black text-accent uppercase tracking-[0.2em] hover:text-white transition-colors group/link bg-accent/5 px-6 py-3 rounded border border-accent/20 hover:bg-accent hover:border-accent hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]">
                                        Access Protocol <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                ) : (
                                    <div className="inline-flex items-center gap-3 text-[10px] font-black text-slate-700 uppercase tracking-[0.2em] bg-slate-900/50 px-6 py-3 rounded border border-slate-800 cursor-not-allowed">
                                        Locked Section
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
