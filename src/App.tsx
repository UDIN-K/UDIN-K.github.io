import React from 'react';
import { motion } from 'motion/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RobloxShowcase } from './components/RobloxShowcase';
import { AIPlayground } from './components/AIPlayground';
import { ThreeDGame } from './components/ThreeDGame';
import { Footer } from './components/Footer';
import { cn } from './lib/utils';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-primary text-text font-sans antialiased selection:bg-accent selection:text-primary relative overflow-x-hidden">
      <Header />
      
      <main>
        <Hero />

        {/* About & Tech Stack */}
        <section id="about" className="py-32 relative overflow-hidden bg-slate-950">
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none"></div>
            
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-24 items-start">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                             <div className="w-10 h-px bg-accent"></div>
                             <span className="text-accent text-[10px] font-black uppercase tracking-[0.4em]">Background</span>
                        </div>
                        
                        <h2 className="text-4xl md:text-6xl font-black mb-10 font-mono tracking-tighter text-white leading-[0.9]">
                            SYSTEM <br/> 
                            <span className="text-accent">ARCHITECT</span>
                        </h2>

                        <div className="space-y-8 text-base text-slate-500 leading-loose font-mono max-w-xl">
                            <p className="relative pl-6 border-l border-slate-900">
                                Specialized in <strong className="text-slate-300">Backend Systems</strong> and <strong className="text-slate-300">Embedded Logic</strong>. I focus on optimizing the path between execution and result.
                            </p>
                            <p className="relative pl-6 border-l border-slate-900">
                                Expertise spans across <strong className="text-slate-300">C++, Java, and Rust</strong>, with deep roots in behavioral conditioning through <strong className="text-slate-300">Lua</strong> and <strong className="text-slate-300">Python</strong>.
                            </p>
                            <div className="p-6 bg-slate-900/30 border border-slate-900 rounded backdrop-blur-sm group hover:border-accent/20 transition-all">
                                <p className="text-sm italic text-slate-600 group-hover:text-slate-400 transition-colors">
                                    "I bridge the gap between low-level resource management and the abstract complexity of modern software layers."
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="bg-slate-900/10 p-10 rounded-lg border border-slate-900 backdrop-blur-sm shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]">
                            <div className="flex justify-between items-end mb-12">
                                <div className="space-y-1">
                                    <h3 className="text-xs font-black text-white tracking-[0.3em] uppercase">Tech Stack</h3>
                                    <div className="text-[8px] font-mono text-slate-700 tracking-widest uppercase">Verified Competencies v1.0.4</div>
                                </div>
                                <div className="flex gap-1">
                                    {[1, 2, 3].map(i => <div key={i} className="w-1 h-3 bg-accent/20 rounded-full"></div>)}
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-4 sm:grid-cols-5 gap-y-12 gap-x-6">
                                {[
                                    { icon: 'devicon-cplusplus-plain', name: 'C++', color: 'group-hover:text-blue-500' },
                                    { icon: 'devicon-csharp-plain', name: 'C#', color: 'group-hover:text-purple-500' },
                                    { icon: 'devicon-java-plain', name: 'Java', color: 'group-hover:text-red-500' },
                                    { icon: 'devicon-lua-plain', name: 'Lua', color: 'group-hover:text-blue-300' },
                                    { icon: 'devicon-rust-plain', name: 'Rust', color: 'group-hover:text-orange-600' },
                                    { icon: 'devicon-php-plain', name: 'PHP', color: 'group-hover:text-indigo-400' },
                                    { icon: 'devicon-mysql-plain', name: 'MySQL', color: 'group-hover:text-orange-400' },
                                    { icon: 'devicon-oracle-original', name: 'Oracle', color: 'group-hover:text-red-600' },
                                    { icon: 'devicon-react-original', name: 'React', color: 'group-hover:text-accent' },
                                    { icon: 'devicon-typescript-plain', name: 'TS', color: 'group-hover:text-blue-600' },
                                ].map((tech, idx) => (
                                    <motion.div 
                                        key={idx}
                                        whileHover={{ y: -5 }}
                                        className="group flex flex-col items-center gap-3"
                                    >
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
                                            <i className={cn(tech.icon, "text-4xl text-slate-700 transition-all duration-300 group-hover:scale-110", tech.color)}></i>
                                        </div>
                                        <span className="text-[7px] text-slate-600 font-black mt-1 opacity-0 group-hover:opacity-100 transition-all uppercase tracking-[0.2em]">
                                            {tech.name}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-16 pt-8 border-t border-slate-900 flex justify-between items-center opacity-30">
                                <div className="text-[8px] font-mono text-slate-500">CRC32: 0xEDB88320</div>
                                <div className="text-[8px] font-mono text-slate-500">MD5: AF12C9...</div>
                            </div>
                        </div>

                        {/* Decoration Elements */}
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 border-r border-b border-accent/20"></div>
                        <div className="absolute -top-6 -left-6 w-24 h-24 border-l border-t border-accent/20"></div>
                    </motion.div>
                </div>
            </div>
        </section>

        {/* 3D Game Section */}
        <section className="py-32 bg-slate-900/50 border-y border-slate-900 relative">
             <div className="container mx-auto px-4 md:px-8">
                 <div className="flex flex-col lg:flex-row gap-24 items-center">
                     <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/3"
                     >
                         <div className="inline-flex items-center gap-3 px-4 py-2 bg-accent/5 border border-accent/10 rounded-sm text-accent text-[9px] font-black tracking-[0.3em] uppercase mb-10">
                             <div className="relative flex h-2 w-2">
                                <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></div>
                                <div className="relative inline-flex rounded-full h-2 w-2 bg-accent"></div>
                             </div>
                             Real-Time Engine
                         </div>
                         
                         <h3 className="text-4xl font-black text-white leading-[0.9] font-mono mb-8 tracking-tighter uppercase">
                            PHYSICS & <br/>
                            <span className="text-accent underline decoration-4 underline-offset-[12px] decoration-accent/20">RENDERING</span>
                         </h3>
                         
                         <p className="text-slate-500 leading-loose font-mono text-sm mb-12">
                             Functional <strong className="text-slate-300">Three.js</strong> implementation exploring gravity, AABB collisions, and procedural generation.
                         </p>
                         
                         <div className="space-y-4">
                             {[
                                 { label: 'PHY', title: 'Vector-based Jump Mechanics' },
                                 { label: 'ALG', title: 'Procedural Spawn Logic' }
                             ].map((item, i) => (
                                <div key={i} className="flex items-center gap-6 p-4 rounded border border-slate-900 bg-slate-950/40 group hover:border-accent/40 transition-colors">
                                    <div className="text-[10px] font-black text-accent opacity-40 group-hover:opacity-100 transition-opacity font-mono">{item.label}</div>
                                    <div className="text-xs text-slate-500 group-hover:text-slate-300 font-mono tracking-tight">{item.title}</div>
                                </div>
                             ))}
                         </div>
                     </motion.div>
                     
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="lg:w-2/3 w-full"
                     >
                         <div className="relative p-1 bg-slate-900 rounded-lg border border-slate-800 shadow-2xl">
                             <div className="absolute top-4 left-4 h-2 w-2 bg-red-500 rounded-full z-10 animate-pulse"></div>
                             <ThreeDGame />
                         </div>
                     </motion.div>
                 </div>
             </div>
        </section>

        {/* Scripting Showcase */}
        <RobloxShowcase />

      </main>

      <Footer />

      {/* Floating AI Widget */}
      <AIPlayground />
    </div>
  );
};

export default App;
