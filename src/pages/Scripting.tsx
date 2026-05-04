import React from 'react';
import { RobloxShowcase } from '../components/RobloxShowcase';
import { NeuralHackingLab } from '../components/NeuralHackingLab';
import { Bot, Binary, Database, Code2 } from 'lucide-react';

export const Scripting: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-950 pt-32 pb-24 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.05)_0%,transparent_50%)] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none opacity-20"></div>

            <div className="container mx-auto px-4 md:px-8 mb-24 relative z-10">
                <div className="max-w-4xl">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-[1px] bg-accent/40"></div>
                        <span className="text-accent text-[10px] font-black uppercase tracking-[0.6em]">Logic_Deployment_Unit</span>
                        <div className="w-12 h-[1px] bg-accent/40"></div>
                    </div>
                    
                    <h1 className="text-6xl md:text-9xl font-black text-white font-mono tracking-tighter uppercase leading-[0.8] mb-12">
                        NEURAL <br/>
                        <span className="text-accent underline decoration-accent/10 underline-offset-[16px]">SCRIPTS</span>
                    </h1>
                    
                    <div className="grid md:grid-cols-3 gap-12 mt-16">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-white">
                                <Bot className="w-5 h-5 text-accent" />
                                <h3 className="font-black uppercase tracking-widest text-sm italic">Luau_Core</h3>
                            </div>
                            <p className="text-slate-500 font-mono text-xs leading-loose">
                                High-performance concurrent architectures for the Roblox Engine. 
                                Optimized for <strong className="text-slate-300">Task Scheduling</strong> and <strong className="text-slate-300">Buffer Intercepts</strong>.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-white">
                                <Binary className="w-5 h-5 text-accent" />
                                <h3 className="font-black uppercase tracking-widest text-sm italic">Remote_Inject</h3>
                            </div>
                            <p className="text-slate-500 font-mono text-xs leading-loose">
                                Specialized in <strong className="text-slate-300">Net_Code</strong> optimization and secure communication layers between distributed nodes.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-white">
                                <Database className="w-5 h-5 text-accent" />
                                <h3 className="font-black uppercase tracking-widest text-sm italic">Memory_Gate</h3>
                            </div>
                            <p className="text-slate-500 font-mono text-xs leading-loose">
                                Custom memory management systems and <strong className="text-slate-300">DataStore</strong> wrappers for extreme scalability and persistence.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hacking Playground Section */}
            <div className="container mx-auto px-4 md:px-8 mb-32 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
                    <div>
                        <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic mb-2">Neural_Hacking_Lab</h2>
                        <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">Live Scripting Playground // [Sandbox_Active]</p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="text-[9px] font-black text-slate-700 uppercase tracking-[0.3em]">Hardware_Link: OK</div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                    </div>
                </div>
                
                <NeuralHackingLab />
            </div>
            
            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="flex items-center gap-3 mb-12">
                     <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">Source_Archives</h2>
                     <div className="flex-1 h-[1px] bg-slate-900"></div>
                </div>
                <RobloxShowcase />
            </div>
            
            <div className="mt-32 container mx-auto px-4 md:px-8 relative z-10">
                <div className="p-16 border border-slate-900 rounded-sm text-center bg-slate-900/5 backdrop-blur-3xl group hover:border-accent/20 transition-all">
                    <div className="w-12 h-12 bg-slate-950 border border-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <Code2 className="w-6 h-6 text-slate-800 group-hover:text-accent transition-colors" />
                    </div>
                    <p className="text-[10px] font-black font-mono text-slate-700 tracking-[0.5em] uppercase group-hover:text-slate-500 transition-colors">Directory_Terminated // 2024_Archived</p>
                </div>
            </div>
        </div>
    );
};
