import React from 'react';
import { motion } from 'motion/react';
import { ThreeDGame } from '../components/ThreeDGame';

export const Play: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-950 pt-32 pb-24 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col gap-12 items-center">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center md:max-w-2xl"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-accent/5 border border-accent/10 rounded-sm text-accent text-[9px] font-black tracking-[0.3em] uppercase mb-10">
                            <div className="relative flex h-2 w-2">
                                <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></div>
                                <div className="relative inline-flex rounded-full h-2 w-2 bg-accent"></div>
                            </div>
                            Real-Time Engine Active
                        </div>
                        
                        <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.8] font-mono mb-8 tracking-tighter uppercase">
                            NEURAL <br/>
                            <span className="text-accent underline decoration-accent/20 underline-offset-[12px]">PLAYGROUND</span>
                        </h1>
                        
                        <p className="text-slate-500 leading-loose font-mono text-sm">
                            Functional <strong className="text-slate-300">Three.js</strong> implementation exploring physics-based movement, AABB collisions, and GPU-accelerated rendering cycles.
                        </p>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-5xl"
                    >
                        <div className="relative p-1 bg-slate-900 rounded-lg border border-slate-800 shadow-2xl">
                            <div className="absolute top-4 left-4 h-2 w-2 bg-red-500 rounded-full z-10 animate-pulse"></div>
                            <div className="h-[60vh] min-h-[400px]">
                                <ThreeDGame />
                            </div>
                            {/* HUD Overlays */}
                            <div className="absolute bottom-6 left-6 font-mono text-[10px] text-accent/50 space-y-1 hidden md:block">
                                <div>LOC_CODE: 0x7F23</div>
                                <div>CORE_TEMP: 42°C</div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl">
                         {[
                             { label: 'GRAVITY', val: '9.81m/s²' },
                             { label: 'RENDER', val: 'WebGl2' },
                             { label: 'LOGIC', val: 'Tick-based' },
                             { label: 'ENGINE', val: 'U-3D v1' }
                         ].map((stat, i) => (
                             <div key={i} className="p-4 bg-slate-900/50 border border-slate-900 rounded text-center">
                                 <div className="text-[8px] font-black text-slate-700 uppercase tracking-widest mb-1">{stat.label}</div>
                                 <div className="text-xs font-mono text-white">{stat.val}</div>
                             </div>
                         ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
