import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Cpu, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const [displayedCode, setDisplayedCode] = useState('');
  const fullCode = `const architecture = {
  engine: 'Three.js',
  logic: 'Lua',
  backend: 'C++',
  ai: 'Gemini'
};
deploy(architecture);`;

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayedCode(fullCode.slice(0, index));
      index++;
      if (index > fullCode.length) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, [fullCode]);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-primary px-4 md:px-8">
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] z-0"></div>
      
      <div className="container mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-accent text-[10px] font-bold tracking-widest uppercase">
            <Cpu className="w-3 h-3" />
            System Online: v4.5-stable
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter text-white uppercase group">
            UDIN<span className="text-accent group-hover:animate-pulse">K</span><br />
            <span className="text-3xl md:text-5xl font-light tracking-normal lowercase text-slate-500 block mt-2">
              Software Architect
            </span>
          </h1>
          
          <p className="text-lg text-text-muted max-w-lg leading-relaxed font-mono">
            Hi, I'm <strong className="text-white">UDIN-K</strong>.
            Crafting low-level logic, scalable backends, and AI-driven experiences.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#portfolio"
              className="px-8 py-4 bg-white text-primary font-bold rounded-sm hover:bg-accent transition-colors flex items-center gap-2 uppercase text-xs tracking-widest"
            >
              Initialize Portfolio
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/UDIN-k"
              target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 bg-slate-800/50 border border-slate-700 text-white font-bold rounded-sm hover:border-slate-500 transition-all flex items-center gap-2 uppercase text-xs tracking-widest backdrop-blur-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              GitHub Workflow
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#ai-lab"
              className="px-8 py-4 bg-slate-800/50 border border-slate-700 text-white font-bold rounded-sm hover:border-accent transition-all flex items-center gap-2 uppercase text-xs tracking-widest backdrop-blur-sm"
            >
              <Terminal className="w-4 h-4" />
              Access AI Lab
            </motion.a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
            <div className="relative w-full h-[520px] bg-slate-950 rounded-lg border border-slate-800 p-1 shadow-2xl overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <Sparkles className="w-64 h-64 text-accent" />
                 </div>

                 <div className="relative z-10 bg-slate-900/50 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                        Core_Engine_v1.bin
                    </div>
                 </div>

                 <div className="relative z-10 p-8 font-mono text-sm leading-relaxed overflow-hidden h-[calc(100%-48px)]">
                    <div className="text-slate-600 mb-6">// Analyzing system dependencies...</div>
                    
                    <div className="space-y-2">
                        <div className="flex gap-4">
                            <span className="text-slate-500">01</span>
                            <div className="flex gap-2">
                                <span className="text-blue-400">typedef</span>
                                <span className="text-yellow-200">struct</span>
                                <span className="text-white">{`{`}</span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-slate-500">02</span>
                            <div className="pl-6 border-l border-slate-800 flex gap-2">
                                <span className="text-green-400">string</span>
                                <span className="text-slate-300">expertise;</span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-slate-500">03</span>
                            <div className="pl-6 border-l border-slate-800 flex gap-2">
                                <span className="text-green-400">uint32_t</span>
                                <span className="text-slate-300">vRAM_Optimized;</span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-slate-500">04</span>
                            <div className="flex gap-2">
                                <span className="text-white">{`}`}</span>
                                <span className="text-yellow-200">Engineer;</span>
                            </div>
                        </div>
                        <br />
                        <div className="flex gap-4">
                            <span className="text-slate-500">05</span>
                            <pre className="font-mono text-accent">
                                {displayedCode}
                                <span className="animate-pulse inline-block w-2 h-4 bg-accent ml-1 align-middle"></span>
                            </pre>
                        </div>
                    </div>

                    <AnimatePresence>
                        {displayedCode.length === fullCode.length && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-12 p-6 bg-accent/5 border border-accent/20 rounded font-mono text-xs text-slate-400 relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-accent font-bold">SUCCESS</span>
                                    <span>[OK]</span>
                                </div>
                                <p>Engine initialized. Memory safe. All logic gates verified.</p>
                                <div className="mt-4 flex gap-2 overflow-hidden items-center">
                                    <div className="h-1 bg-accent/30 flex-1 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ x: '-100%' }}
                                            animate={{ x: '100%' }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            className="h-full w-1/3 bg-accent"
                                        />
                                    </div>
                                    <span className="text-[10px] text-accent/50">Processing_Frame_60fps</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                 </div>
                 
                 <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>
            </div>
        </motion.div>
      </div>
    </section>
  );
};
