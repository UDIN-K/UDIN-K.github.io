import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Image as ImageIcon, 
  MessageSquare, 
  X, 
  Trash2, 
  Cpu,
  Loader2
} from 'lucide-react';
import { createChatSession, generateImage } from '../services/geminiService';
import { AIMode, AIChatMessage } from '../types';
import { Chat, GenerateContentResponse } from "@google/genai";
import { cn } from '../lib/utils';

// --- Markdown/Code Renderer Helper ---
const MessageContent: React.FC<{ content: string }> = ({ content }) => {
    const parts = content.split(/(```[\s\S]*?```)/g);

    return (
        <div className="whitespace-pre-wrap leading-relaxed">
            {parts.map((part, index) => {
                if (part.startsWith('```') && part.endsWith('```')) {
                    const inner = part.slice(3, -3);
                    const newlineIndex = inner.indexOf('\n');
                    const lang = newlineIndex > -1 ? inner.slice(0, newlineIndex).trim() : 'code';
                    const code = newlineIndex > -1 ? inner.slice(newlineIndex + 1) : inner;

                    return (
                        <div key={index} className="my-4 rounded border border-slate-700 bg-slate-950 shadow-inner overflow-hidden">
                            <div className="bg-slate-900 px-3 py-1.5 text-[10px] text-slate-500 font-mono border-b border-slate-800 flex justify-between items-center uppercase tracking-widest">
                                <span>{lang || 'TERMINAL'}</span>
                                <span className="opacity-50">STDOUT</span>
                            </div>
                            <pre className="p-4 text-xs font-mono text-blue-100 overflow-x-auto custom-scrollbar">
                                <code>{code}</code>
                            </pre>
                        </div>
                    );
                } else {
                    return (
                        <span key={index} dangerouslySetInnerHTML={{
                            __html: part
                                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
                                .replace(/`(.*?)`/g, '<code class="bg-slate-700/50 px-1.5 py-0.5 rounded text-accent font-mono text-[11px] border border-white/5">$1</code>')
                        }} />
                    );
                }
            })}
        </div>
    );
};

const TechAvatar: React.FC<{ size?: string }> = ({ size = "w-full h-full" }) => (
    <div className={cn(size, "bg-slate-900 rounded-full flex items-center justify-center relative overflow-hidden shadow-2xl border border-accent/30")}>
        <img 
            src="https://api.dicebear.com/9.x/bottts-neutral/svg?seed=U-Chat&backgroundColor=0f172a,334155" 
            alt="U-Chat Avatar" 
            className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent pointer-events-none"></div>
    </div>
);

export const AIPlayground: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AIMode>(AIMode.TEXT);
  const [input, setInput] = useState('');
  
  const chatSessionRef = useRef<Chat | null>(null);

  useEffect(() => {
    const checkHash = () => {
        if (window.location.hash === '#ai-lab') {
            setIsOpen(true);
            history.replaceState(null, '', ' ');
        }
    };
    window.addEventListener('hashchange', checkHash);
    checkHash();
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const initChat = () => {
      try {
          if (!chatSessionRef.current) {
            chatSessionRef.current = createChatSession();
          }
      } catch (e) {
          console.error("Failed to init chat", e);
      }
  };

  useEffect(() => {
      if (isOpen) {
          initChat();
      }
  }, [isOpen]);

  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
        id: 'welcome',
        role: 'model',
        content: "Neural Interface **U-Chat v5.0** established. \n[STATUS] CALCULATING_OPTIMAL_PATH... \n\nGreetings, Commander. How shall we manifest greatness today?",
        type: 'text',
        timestamp: 0 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const quickPrompts = [
      { text: "Debug_Kernel", mode: AIMode.TEXT },
      { text: "Logic_Synth", mode: AIMode.TEXT },
      { text: "Visual_Forge", mode: AIMode.IMAGE },
  ];

  const applyPrompt = (text: string, pMode: AIMode) => {
      setMode(pMode);
      setInput(text);
      if(textareaRef.current) textareaRef.current.focus();
  };

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }
  }, [messages, isLoading, isOpen]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const currentInput = input;
    const userMsg: AIChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: currentInput,
      type: 'text',
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      if (mode === AIMode.TEXT) {
        if (!chatSessionRef.current) {
             chatSessionRef.current = createChatSession();
        }

        const responseId = (Date.now() + 1).toString();
        setMessages(prev => [...prev, {
            id: responseId,
            role: 'model',
            content: '',
            type: 'text',
            timestamp: Date.now()
        }]);

        const streamResult = await chatSessionRef.current.sendMessageStream({ message: currentInput });
        
        let fullText = '';
        try {
            for await (const chunk of streamResult) {
                const chunkText = (chunk as GenerateContentResponse).text;
                if (chunkText) {
                    fullText += chunkText;
                    setMessages(prev => prev.map(msg => 
                        msg.id === responseId ? { ...msg, content: fullText } : msg
                    ));
                }
            }
        } catch (streamError) {
             console.error("Stream error:", streamError);
             throw new Error("Stream connection failed. Server might be busy.");
        }

      } else {
        const imageUrl = await generateImage(currentInput);
        const modelMsg: AIChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'model',
            content: imageUrl,
            type: 'image',
            timestamp: Date.now(),
          };
          setMessages((prev) => [...prev, modelMsg]);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Internal system crash.";
      
      setMessages((prev) => {
          // Remove the empty placeholder if it failed completely
          const filtered = prev.filter(msg => !(msg.role === 'model' && msg.content === ''));
          return [...filtered, {
            id: (Date.now() + 1).toString(),
            role: 'model',
            content: `[CRITICAL FAILURE]\n\nServer Trace: ${errorMessage}\n\n*Status: API Core overwhelmed or misconfigured. Please attempt reconnection later.*`,
            type: 'text',
            timestamp: Date.now(),
          }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const clearChat = () => {
      try {
        chatSessionRef.current = createChatSession();
      } catch { /* ignore */ }
      
      setMessages([{
        id: Date.now().toString(),
        role: 'model',
        content: 'Cache flushed. Neural state: PURIFIED.',
        type: 'text',
        timestamp: Date.now()
    }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none font-sans">
        <AnimatePresence>
            {isOpen && (
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 30, rotateX: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 30, rotateX: 20 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                    className="mb-4 w-[95vw] md:w-[500px] h-[700px] bg-slate-950/95 backdrop-blur-3xl border border-accent/20 rounded-lg shadow-[0_0_50px_rgba(56,189,248,0.15)] flex flex-col overflow-hidden pointer-events-auto relative"
                 >
                    {/* Background Atmospheric Effect */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.1)_0%,transparent_70%)] pointer-events-none"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20"></div>

                    {/* Header: Hardware Style */}
                    <div className="bg-slate-900 px-6 py-5 border-b border-white/5 flex justify-between items-center shrink-0 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent p-0.5 bg-slate-950">
                                     <TechAvatar />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-slate-900 animate-pulse flex items-center justify-center">
                                    <Cpu className="w-2 h-2 text-primary" />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-black text-white text-[10px] tracking-[0.3em] uppercase font-mono">U-CHAT_CORE_V5.0</span>
                                    <span className="px-1.5 py-0.5 bg-accent/10 border border-accent/20 rounded-sm text-[8px] text-accent font-black">ULTRA</span>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3, 4].map(i => <div key={i} className="w-1 h-3 bg-accent/20 rounded-[1px]"></div>)}
                                        <div className="w-1 h-3 bg-accent rounded-[1px] animate-pulse"></div>
                                    </div>
                                    <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Encryption_Stable</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={clearChat} className="p-2 text-slate-600 hover:text-red-400 transition-all hover:bg-red-400/5 rounded" title="Flush Memory">
                                <Trash2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => setIsOpen(false)} className="p-2 text-slate-600 hover:text-white transition-all hover:bg-white/5 rounded">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Diagnostic Bar */}
                    <div className="bg-slate-950/80 px-6 py-2 border-b border-white/5 flex justify-between items-center text-[8px] font-black text-slate-500 uppercase tracking-widest shrink-0 relative z-10">
                        <div className="flex gap-6">
                            <span>Hash: 0x8F2C...1A</span>
                            <span>Latency: 1.2ms</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            <span>NEURAL_LINK_ACTIVE</span>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar relative z-10" ref={scrollRef}>
                        {messages.map((msg) => (
                            <motion.div 
                                initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                key={msg.id} 
                                className={cn("flex flex-col gap-2", msg.role === 'user' ? 'items-end' : 'items-start')}
                            >
                                <div className="flex items-center gap-2 px-1">
                                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-600">
                                        {msg.role === 'user' ? 'GUEST_ADMIN' : 'MANIFEST_CORE'}
                                    </span>
                                    <div className="w-1 h-1 bg-slate-800 rounded-full"></div>
                                    <span className="text-[8px] font-mono text-slate-700">
                                        {new Date(msg.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                    </span>
                                </div>
                                <div className={cn(
                                    "max-w-[90%] p-4 text-xs font-mono relative group",
                                    msg.role === 'user' 
                                    ? 'bg-accent/10 border border-accent/40 text-accent rounded-sm' 
                                    : 'bg-slate-900/40 text-slate-100 border border-white/5 rounded-sm'
                                )}>
                                    {/* Bubble Glitch Accents */}
                                    <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-white/20"></div>
                                    <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-white/20"></div>
                                    
                                    {msg.type === 'image' ? (
                                        <div className="space-y-4">
                                            <div className="text-[10px] text-accent/60 mb-2 italic tracking-widest uppercase">Visual_Synthesis_Complete</div>
                                            <img src={msg.content} alt="AI Gen" className="rounded-sm border border-white/10 shadow-2xl brightness-110" />
                                        </div>
                                    ) : (
                                        <MessageContent content={msg.content} />
                                    )}
                                </div>
                            </motion.div>
                        ))}
                        {isLoading && (
                            <div className="flex flex-col gap-2 ml-1">
                                <div className="text-[8px] font-black text-accent uppercase tracking-widest animate-pulse">Syncing_Neural_Patterns...</div>
                                <div className="flex items-end h-6 gap-0.5">
                                    {[2, 5, 8, 4, 9, 3, 7, 2, 6].map((h, i) => (
                                        <motion.div 
                                            key={i}
                                            animate={{ height: [h*2, h*4, h*2] }}
                                            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
                                            className="w-1 bg-accent/40 rounded-full"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer Input */}
                    <div className="bg-slate-900 p-6 border-t border-white/5 relative z-10">
                        <div className="flex gap-2 mb-5 overflow-x-auto pb-1 no-scrollbar">
                             {quickPrompts.map((qp, idx) => (
                                <button 
                                    key={idx} 
                                    onClick={() => applyPrompt(qp.text, qp.mode)} 
                                    className="text-[8px] font-black uppercase tracking-widest whitespace-nowrap px-4 py-2 bg-slate-950 border border-white/5 text-slate-500 hover:text-accent hover:border-accent/40 transition-all rounded-[2px]"
                                >
                                    {qp.text}
                                </button>
                            ))}
                        </div>
                        
                        <div className="bg-slate-950 border border-white/10 focus-within:border-accent/60 rounded p-1 transition-all group/input">
                            <div className="flex gap-1 items-stretch min-h-[50px]">
                                 <button 
                                    onClick={() => setMode(mode === AIMode.TEXT ? AIMode.IMAGE : AIMode.TEXT)}
                                    className={cn(
                                        "w-12 flex flex-col items-center justify-center gap-1 transition-all border-r border-white/5", 
                                        mode === AIMode.IMAGE ? 'text-accent bg-accent/5' : 'text-slate-700 hover:text-slate-400'
                                    )}
                                >
                                    {mode === AIMode.TEXT ? <MessageSquare className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
                                    <span className="text-[7px] font-black uppercase">{mode === AIMode.TEXT ? 'TXT' : 'VIS'}</span>
                                 </button>
                                 <textarea
                                    ref={textareaRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder={mode === AIMode.TEXT ? "COMMAND_INPUT_ROOT..." : "IMAGE_PROMPT_SYNTHESIS..."}
                                    rows={1}
                                    className="flex-1 bg-transparent text-xs text-white focus:outline-none p-3 resize-none max-h-32 placeholder-slate-800 font-mono"
                                 />
                                 <div className="w-12 bg-slate-900/50 flex items-center justify-center">
                                     <button 
                                        onClick={() => handleSubmit()}
                                        disabled={!input.trim() || isLoading}
                                        className="w-10 h-10 flex items-center justify-center bg-white text-primary rounded-sm hover:bg-accent disabled:opacity-20 disabled:cursor-not-allowed transition-all active:scale-90 shadow-2xl"
                                    >
                                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                     </button>
                                 </div>
                            </div>
                        </div>

                        <div className="mt-4 flex justify-between items-center">
                            <div className="flex gap-2">
                                {[1, 2, 3].map(i => <div key={i} className="w-8 h-[1px] bg-white/10"></div>)}
                            </div>
                            <span className="text-[8px] text-slate-700 font-black tracking-[0.3em] uppercase">Architecture v5.13_Stable</span>
                        </div>
                    </div>
                 </motion.div>
            )}
        </AnimatePresence>

        {/* CLOSED STATE: AVATAR TRIGGER */}
        <motion.button 
            onClick={() => setIsOpen(!isOpen)}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-20 h-20 flex items-center justify-center pointer-events-auto relative group"
        >
            <div className="absolute inset-0 bg-accent/20 blur-2xl group-hover:bg-accent/40 transition-colors animate-pulse"></div>
            
            {/* HUD Bracket Accents */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-accent/40 group-hover:border-accent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-accent/40 group-hover:border-accent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

            <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-white/5 relative z-10 p-0.5 bg-slate-900/80 backdrop-blur shadow-2xl group-hover:border-accent/30 transition-all">
                <TechAvatar />
            </div>
            
            {/* Data Scanning Ring */}
            <div className="absolute inset-0 border border-accent/10 rounded-lg group-hover:scale-125 transition-transform duration-700 pointer-events-none"></div>
            
            <div className="absolute -top-12 right-0 bg-slate-900 border border-white/10 px-3 py-1 rounded text-[8px] font-black text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 shadow-2xl">
                 COMM_U_CHAT
            </div>
        </motion.button>
    </div>
  );
};
