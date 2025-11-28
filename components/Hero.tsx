import React, { useState, useEffect } from 'react';

export const Hero: React.FC = () => {
  const [displayedCode, setDisplayedCode] = useState('');
  
  // The code snippet to animate
  const fullCode = `const idea = await ai.generate({
  prompt: 'Create something unique'
});
return idea;`;

  // Typewriter effect logic
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayedCode((prev) => {
        if (index < fullCode.length) {
            index++;
            return fullCode.slice(0, index);
        }
        return prev;
      });
    }, 50); // Speed of typing

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-primary">
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary z-0"></div>

      {/* Background Gradient Blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-60 animate-blob mix-blend-screen"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl opacity-60 animate-blob animation-delay-2000 mix-blend-screen"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fade-in-up">
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight text-white relative">
            Creative <br />
            <span className="relative inline-block">
                <span className="absolute -inset-1 bg-accent/20 blur-lg"></span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-accent to-indigo-400">
                  Developer
                </span>
            </span> & <br />
            <span className="hover:animate-glitch cursor-default transition-all">AI Enthusiast.</span>
          </h1>
          
          <p className="text-lg text-text-muted max-w-lg leading-relaxed border-l-2 border-accent/50 pl-4">
            Hi, I'm <strong className="text-white">Muhammad Syafri Syamsudin Syah (UDIN-K)</strong>. 
            Welcome to my personal portfolio. Here I showcase my experiments in Web Development and Generative AI.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#portfolio"
              className="px-8 py-3.5 bg-accent text-primary font-bold rounded-lg hover:bg-accent-hover transition-all transform hover:-translate-y-1 shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)]"
            >
              See My Projects
            </a>
            <a
              href="#ai-lab"
              className="px-8 py-3.5 bg-slate-800/50 border border-slate-600 text-white font-medium rounded-lg hover:bg-slate-700 hover:border-accent/50 transition-all backdrop-blur-sm"
            >
              Play with AI
            </a>
          </div>
          
          <div className="pt-8 flex items-center gap-6 text-slate-500">
             <div className="flex items-center gap-2">
                <div className="h-[1px] w-8 bg-slate-700"></div>
                <span className="text-xs uppercase tracking-widest font-semibold">Tech Stack</span>
             </div>
             <div className="flex gap-4 text-2xl opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <i className="devicon-react-original" title="React">⚛️</i>
                <i className="devicon-typescript-plain" title="TypeScript">TS</i>
                <i className="devicon-tailwindcss-plain" title="Tailwind">≋</i>
                <i className="devicon-google-plain" title="Gemini">✨</i>
             </div>
          </div>
        </div>

        <div className="relative hidden lg:block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {/* Abstract visual representation of code/AI */}
            <div className="relative w-full h-[500px] bg-slate-900/90 rounded-2xl border border-slate-700/50 p-1 shadow-2xl overflow-hidden group hover:border-accent/30 transition-colors duration-500 backdrop-blur-md">
                 <div className="absolute inset-0 bg-gradient-to-br from-slate-800/30 to-slate-950/80 z-0"></div>
                 
                 {/* Window Controls */}
                 <div className="relative z-10 bg-slate-950 border-b border-slate-800 px-4 py-3 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                    <div className="ml-4 text-xs font-mono text-slate-500 flex items-center gap-2">
                        <span className="text-accent">➜</span> gemini_demo.ts
                    </div>
                 </div>

                 <div className="relative z-10 p-6 font-mono text-sm leading-loose overflow-hidden">
                    <div className="text-slate-500 mb-4">// Exploring Generative AI capabilities...</div>
                    
                    <div className="space-y-1">
                        <div>
                            <span className="text-purple-400 mr-2">import</span>
                            <span className="text-yellow-200">{`{ GoogleGenAI }`}</span>
                            <span className="text-purple-400 mx-2">from</span>
                            <span className="text-green-400">"@google/genai"</span>;
                        </div>
                        <br/>
                        <div>
                            <span className="text-blue-400 mr-2">const</span>
                            <span className="text-blue-200">ai</span> = 
                            <span className="text-purple-400 mx-2">new</span>
                            <span className="text-yellow-200">GoogleGenAI</span>({`{ apiKey }`});
                        </div>
                        <br/>
                        <div>
                            <span className="text-purple-400 mr-2">async function</span> 
                            <span className="text-blue-300">create</span>() {`{`}
                        </div>
                        <div className="pl-6 border-l-2 border-slate-800 ml-1">
                            {/* Typewriter text area */}
                            <pre className="font-mono text-text bg-transparent whitespace-pre-wrap">
                                {displayedCode}
                                <span className="animate-pulse inline-block w-2 h-4 bg-accent ml-1 align-middle"></span>
                            </pre>
                        </div>
                        {/* Escaped curly brace for JSX */}
                        <div>{'}'}</div>
                    </div>

                    <div className="mt-8 p-4 bg-slate-950/80 rounded border-l-2 border-accent transition-opacity duration-1000" style={{ opacity: displayedCode.length === fullCode.length ? 1 : 0.5 }}>
                        <span className="text-accent">_</span>
                        <span className="text-slate-400">
                             {displayedCode.length === fullCode.length ? 'Execution complete. Idea generated.' : 'Compiling...'}
                        </span>
                    </div>
                 </div>
                 
                 {/* Decorative Glow */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-accent/15 transition-colors duration-500"></div>
            </div>
        </div>
      </div>
    </section>
  );
};