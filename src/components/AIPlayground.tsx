import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Image as ImageIcon, 
  MessageSquare, 
  X, 
  Trash2, 
  Terminal,
  Cpu
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
    <div className={cn(size, "bg-slate-950 rounded-full flex items-center justify-center relative overflow-hidden shadow-inner border border-slate-800")}>
        <img 
            src="https://api.dicebear.com/9.x/lorelei/svg?seed=GeminiChan&backgroundColor=b6e3f4" 
            alt="AI Avatar" 
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10 pointer-events-none"></div>
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
        content: "System Initialized. **Tralalero Tralala** online. \nRunning Core: **U-AI 4.5 alpha**. \n\nHow can I optimize your workflow today, Boss?",
        type: 'text',
        timestamp: 0 // Will be updated if needed, but fixed value for purity
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const quickPrompts = [
      { text: "Debug Logic", mode: AIMode.TEXT },
      { text: "System Design", mode: AIMode.TEXT },
      { text: "Neural Art", mode: AIMode.IMAGE },
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
        for await (const chunk of streamResult) {
            const chunkText = (chunk as GenerateContentResponse).text;
            if (chunkText) {
                fullText += chunkText;
                setMessages(prev => prev.map(msg => 
                    msg.id === responseId ? { ...msg, content: fullText } : msg
                ));
            }
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
      
      const errorMsg: AIChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: "CRITICAL FAILURE. \nTrace: " + errorMessage,
        type: 'text',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
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
        content: 'Cache cleared. System state: CLEAN.',
        type: 'text',
        timestamp: Date.now()
    }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none font-sans">
        <AnimatePresence>
            {isOpen && (
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.95, y: 20, filter: 'blur(10px)' }}
                    className="mb-4 w-[90vw] md:w-[450px] h-[600px] bg-slate-900/90 backdrop-blur-2xl border border-slate-700/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto ring-1 ring-white/10"
                 >
                    {/* Header */}
                    <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex justify-between items-center shrink-0">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-accent/20">
                                 <TechAvatar />
                            </div>
                            <div>
                                <span className="font-bold text-white text-xs block uppercase tracking-[0.2em] font-mono">Tralalero v4.5</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>
                                    <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Neural Core Online</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <button onClick={clearChat} className="p-2 text-slate-500 hover:text-red-400 transition-colors" title="Flush Memory">
                                <Trash2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => setIsOpen(false)} className="p-2 text-slate-500 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar" ref={scrollRef}>
                        {messages.map((msg) => (
                            <div key={msg.id} className={cn("flex gap-4", msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')}>
                                {msg.role !== 'user' && (
                                    <div className="w-8 h-8 shrink-0 mt-1 rounded-full overflow-hidden border border-slate-800">
                                        <TechAvatar size="w-full h-full" />
                                    </div>
                                )}
                                <div className={cn(
                                    "max-w-[85%] rounded-lg p-4 text-sm shadow-sm font-mono",
                                    msg.role === 'user' 
                                    ? 'bg-accent text-primary font-bold rounded-tr-none' 
                                    : 'bg-slate-800/50 text-slate-200 border border-slate-700/50 rounded-tl-none'
                                )}>
                                    {msg.type === 'image' ? (
                                        <img src={msg.content} alt="AI Gen" className="rounded border border-white/5" />
                                    ) : (
                                        <MessageContent content={msg.content} />
                                    )}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-center gap-2 ml-12">
                                <div className="flex space-x-1.5 mt-2">
                                    <div className="w-1 h-1 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                                    <div className="w-1 h-1 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-1 h-1 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer Input */}
                    <div className="bg-slate-950 p-5 border-t border-slate-800">
                        <div className="flex gap-2 mb-4 overflow-x-auto pb-1 no-scrollbar">
                             {quickPrompts.map((qp, idx) => (
                                <button 
                                    key={idx} 
                                    onClick={() => applyPrompt(qp.text, qp.mode)} 
                                    className="text-[9px] font-mono whitespace-nowrap px-3 py-1.5 bg-slate-900 border border-slate-700 text-slate-500 hover:text-accent hover:border-accent/30 transition-all rounded"
                                >
                                    {qp.mode === AIMode.IMAGE ? <ImageIcon className="w-3 h-3 inline mr-1" /> : <Terminal className="w-3 h-3 inline mr-1" />}
                                    {qp.text}
                                </button>
                            ))}
                        </div>
                        
                        <div className="flex gap-3 items-end bg-slate-900/50 p-2 rounded border border-slate-700 focus-within:border-accent/40 transition-all">
                             <button 
                                onClick={() => setMode(mode === AIMode.TEXT ? AIMode.IMAGE : AIMode.TEXT)}
                                className={cn(
                                    "p-2.5 rounded transition-all", 
                                    mode === AIMode.IMAGE ? 'text-accent bg-accent/5' : 'text-slate-500 hover:text-white'
                                )}
                            >
                                {mode === AIMode.TEXT ? <MessageSquare className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
                             </button>
                             <textarea
                                ref={textareaRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={mode === AIMode.TEXT ? "Execute command..." : "Synthesize image..."}
                                rows={1}
                                className="flex-1 bg-transparent text-sm text-white focus:outline-none py-2 resize-none max-h-32 placeholder-slate-700 font-mono"
                             />
                             <button 
                                onClick={() => handleSubmit()}
                                disabled={!input.trim() || isLoading}
                                className="p-2.5 bg-white text-primary rounded hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 shadow-lg"
                            >
                                {isLoading ? <Cpu className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                             </button>
                        </div>
                        <div className="mt-3 flex justify-between items-center text-[10px] text-slate-600 font-mono tracking-widest uppercase">
                            <span>Press Enter to Send</span>
                            <span>Secure Channel v4</span>
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
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 flex items-center justify-center pointer-events-auto relative group"
        >
            <div className="absolute inset-0 bg-accent/20 blur-xl group-hover:bg-accent/40 transition-colors animate-pulse"></div>
            <div className="w-full h-full rounded-full overflow-hidden border border-accent/50 relative z-10 p-0.5 bg-slate-900">
                <TechAvatar />
            </div>
            {/* Animated Ring */}
            <div className="absolute -inset-1 rounded-full border border-accent/20 animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </motion.button>
    </div>
  );
};
