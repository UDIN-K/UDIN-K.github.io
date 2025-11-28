import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RobloxShowcase } from './components/RobloxShowcase';
import { AIPlayground } from './components/AIPlayground';
import { ThreeDGame } from './components/ThreeDGame';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-primary text-text font-sans antialiased selection:bg-accent selection:text-primary relative">
      <Header />
      
      <main>
        <Hero />

        {/* About & Tech Stack */}
        <section id="about" className="py-24 relative overflow-hidden bg-slate-950/50">
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-16 items-start">
                    <div className="animate-fade-in-up">
                        <div className="inline-block px-3 py-1 bg-slate-800 rounded-lg text-accent text-xs font-bold uppercase tracking-wider mb-4 border border-slate-700">
                             Introduction
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Software <span className="text-accent">Engineer</span></h2>
                        <p className="text-lg text-text-muted leading-relaxed mb-6">
                            I am a multidisciplinary Software Engineer specialized in <strong>Backend Architecture</strong>, <strong>Embedded Systems Logic</strong>, and <strong>High-Performance Data Processing</strong>.
                        </p>
                        <p className="text-lg text-text-muted leading-relaxed mb-6">
                            My expertise lies in crafting efficient algorithms using <strong className="text-white">C++</strong> and <strong className="text-white">Java</strong>, building scalable web solutions with <strong className="text-white">PHP</strong> and <strong className="text-white">SQL</strong>, and scripting complex behavioral logic in <strong className="text-white">Lua</strong>.
                        </p>
                        <p className="text-lg text-text-muted leading-relaxed">
                             I bridge the gap between low-level memory management and modern high-level applications.
                        </p>
                    </div>

                    <div className="bg-secondary/30 p-8 rounded-2xl border border-slate-700/50 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <h3 className="text-xl font-bold mb-6 text-white border-b border-slate-700 pb-4">Technology Stack</h3>
                        
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-6 text-center">
                            <div className="group flex flex-col items-center gap-2">
                                <i className="devicon-cplusplus-plain text-4xl group-hover:text-blue-500 transition-colors opacity-80 group-hover:opacity-100"></i>
                                <span className="text-[10px] text-slate-500 font-mono mt-1">C++</span>
                            </div>
                            <div className="group flex flex-col items-center gap-2">
                                <i className="devicon-csharp-plain text-4xl group-hover:text-purple-500 transition-colors opacity-80 group-hover:opacity-100"></i>
                                <span className="text-[10px] text-slate-500 font-mono mt-1">C#</span>
                            </div>
                            <div className="group flex flex-col items-center gap-2">
                                <i className="devicon-java-plain text-4xl group-hover:text-red-500 transition-colors opacity-80 group-hover:opacity-100"></i>
                                <span className="text-[10px] text-slate-500 font-mono mt-1">Java</span>
                            </div>
                            <div className="group flex flex-col items-center gap-2">
                                <i className="devicon-lua-plain text-4xl group-hover:text-blue-300 transition-colors opacity-80 group-hover:opacity-100"></i>
                                <span className="text-[10px] text-slate-500 font-mono mt-1">Lua</span>
                            </div>
                            <div className="group flex flex-col items-center gap-2">
                                <i className="devicon-php-plain text-4xl group-hover:text-indigo-400 transition-colors opacity-80 group-hover:opacity-100"></i>
                                <span className="text-[10px] text-slate-500 font-mono mt-1">PHP</span>
                            </div>
                            <div className="group flex flex-col items-center gap-2">
                                <i className="devicon-mysql-plain text-4xl group-hover:text-orange-400 transition-colors opacity-80 group-hover:opacity-100"></i>
                                <span className="text-[10px] text-slate-500 font-mono mt-1">MySQL</span>
                            </div>
                            <div className="group flex flex-col items-center gap-2">
                                <i className="devicon-oracle-original text-4xl group-hover:text-red-600 transition-colors opacity-80 group-hover:opacity-100"></i>
                                <span className="text-[10px] text-slate-500 font-mono mt-1">Oracle</span>
                            </div>
                            <div className="group flex flex-col items-center gap-2">
                                <i className="devicon-html5-plain text-4xl group-hover:text-orange-500 transition-colors opacity-80 group-hover:opacity-100"></i>
                                <span className="text-[10px] text-slate-500 font-mono mt-1">HTML</span>
                            </div>
                            <div className="group flex flex-col items-center gap-2">
                                <i className="devicon-react-original text-4xl group-hover:text-accent transition-colors opacity-80 group-hover:opacity-100"></i>
                                <span className="text-[10px] text-slate-500 font-mono mt-1">React</span>
                            </div>
                             <div className="group flex flex-col items-center gap-2">
                                <i className="devicon-typescript-plain text-4xl group-hover:text-blue-600 transition-colors opacity-80 group-hover:opacity-100"></i>
                                <span className="text-[10px] text-slate-500 font-mono mt-1">TS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* 3D Game Section */}
        <section className="py-20 bg-slate-900 border-y border-slate-800">
             <div className="container mx-auto px-4 md:px-8">
                 <div className="flex flex-col lg:flex-row gap-12 items-center">
                     <div className="lg:w-1/3 space-y-6">
                         <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-500 text-xs font-bold">
                             <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                             </span>
                             INTERACTIVE DEMO
                         </div>
                         <h3 className="text-4xl font-bold text-white leading-tight">Physics & <br/>Rendering Engine</h3>
                         <p className="text-slate-400 leading-relaxed">
                             A fully functional <strong>Side-scrolling Platformer</strong> running natively in the browser using Three.js.
                         </p>
                         <p className="text-slate-400 leading-relaxed text-sm">
                             This demo highlights my ability to implement physics vectors (gravity, velocity), collision detection algorithms, and optimize the rendering loop for 60FPS performance.
                         </p>
                         
                         <div className="grid grid-cols-1 gap-3 pt-2">
                             <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                                 <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs">PHY</div>
                                 <div className="text-sm text-slate-300">Vector-based Jump Physics</div>
                             </div>
                             <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                                 <div className="w-8 h-8 rounded bg-green-500/20 flex items-center justify-center text-green-400 font-bold text-xs">ALG</div>
                                 <div className="text-sm text-slate-300">Procedural Obstacle Spawning</div>
                             </div>
                         </div>
                     </div>
                     
                     <div className="lg:w-2/3 w-full">
                         <ThreeDGame />
                     </div>
                 </div>
             </div>
        </section>

        {/* Scripting Showcase */}
        <RobloxShowcase />

      </main>

      <Footer />

      {/* Floating AI Widget (Outside Main Flow) */}
      <AIPlayground />
    </div>
  );
};

export default App;