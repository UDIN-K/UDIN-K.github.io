import React, { useState, useRef, useEffect } from 'react';
import { createChatSession, generateImage } from '../services/geminiService';
import { AIMode, AIChatMessage } from '../types';
import { Chat, GenerateContentResponse } from "@google/genai";

// Renderer Markdown/Kode
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
                        <div key={index} className="my-3 rounded-lg overflow-hidden border border-slate-700 bg-[#0d1117] shadow-sm">
                            <div className="bg-slate-800/50 px-3 py-1.5 text-xs text-slate-400 font-mono border-b border-slate-700/50 flex justify-between items-center">
                                <span className="uppercase tracking-wider font-bold text-[10px] text-accent">{lang || 'TEXT'}</span>
                                <span className="opacity-50 text-[10px]">READ-ONLY</span>
                            </div>
                            <pre className="p-3 text-sm font-mono text-blue-100 overflow-x-auto custom-scrollbar">
                                <code>{code}</code>
                            </pre>
                        </div>
                    );
                } else {
                    return (
                        <span key={index} dangerouslySetInnerHTML={{
                            __html: part
                                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
                                .replace(/`(.*?)`/g, '<code class="bg-slate-700/50 px-1 py-0.5 rounded text-yellow-300 font-mono text-xs border border-white/10">$1</code>')
                        }} />
                    );
                }
            })}
        </div>
    );
};

// Avatar CSS futuristik
const TechAvatar: React.FC<{ size?: string, animated?: boolean }> = ({ size = "w-full h-full", animated = true }) => (
    <div className={`${size} bg-slate-950 rounded-full flex items-center justify-center relative overflow-hidden shadow-inner border border-slate-800`}>
        {/* pakai gambar lokal, fallback DiceBear */}
        <img 
            src="/avatar.png" 
            alt="AI Avatar" 
            className="w-full h-full object-cover"
            onError={(e) => {
                // fallback avatar jika file lokal hilang
                e.currentTarget.src = "https://api.dicebear.com/9.x/lorelei/svg?seed=GeminiChan&backgroundColor=b6e3f4";
            }}
        />
        
        {/* overlay glow opsional */}
        <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10 pointer-events-none"></div>
    </div>
);

export const AIPlayground: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AIMode>(AIMode.TEXT);
  const [input, setInput] = useState('');
  
  const chatSessionRef = useRef<Chat | null>(null);

    // buka AI Lab jika hash cocok
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
          console.error("Gagal inisialisasi chat", e);
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
        content: "Beep Boop! **Tralalero Tralala** is here! \nRunning Core: **U-AI 4.5 alpha**. \n\nMau ngoding apa kita hari ini, Boss?",
        type: 'text',
        timestamp: Date.now()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const quickPrompts = [
      { text: "Fix my Bug", mode: AIMode.TEXT },
      { text: "System Arch", mode: AIMode.TEXT },
      { text: "Surprise Me", mode: AIMode.IMAGE },
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
      const errorMessage = error instanceof Error ? error.message : "Unknown error.";
      
      const errorMsg: AIChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: "CRITICAL FAILURE. \nLog: " + errorMessage,
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
    } catch (e) { /* abaikan */ }
      
      setMessages([{
        id: Date.now().toString(),
        role: 'model',
        content: 'System flushed. Tralalero memory reset! Next?',
        type: 'text',
        timestamp: Date.now()
    }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none font-sans">
        
        {/* BUKA: CHAT MODAL */}
        {isOpen && (
             <div className="mb-4 w-[90vw] md:w-[420px] h-[550px] bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up origin-bottom-right ring-1 ring-white/10 pointer-events-auto">
                
                {/* Kepala */}
                <div className="bg-slate-950/50 border-b border-slate-800 p-4 flex justify-between items-center shrink-0 select-none">
                    <div className="flex items-center gap-3">
                        {/* Kontainer avatar bundar */}
                        <div className="w-10 h-10 shadow-[0_0_15px_rgba(56,189,248,0.2)] rounded-full overflow-hidden isolate transform translate-z-0 border border-slate-700">
                             <TechAvatar />
                        </div>
                        <div>
                            <span className="font-extrabold text-white text-sm block tracking-wider uppercase">Tralalero Tralala</span>
                            <span className="text-[10px] text-accent/80 block flex items-center gap-1.5 font-mono">
                                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse shadow-[0_0_5px_#38bdf8]"></span> 
                                U-AI 4.5 alpha
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={clearChat} className="p-2 text-slate-500 hover:text-red-400 transition-colors" title="Reset Chat">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                        <button onClick={() => setIsOpen(false)} className="p-2 text-slate-500 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                </div>

                {/* Area Chat */}
                <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-gradient-to-b from-transparent to-black/20" ref={scrollRef}>
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            {msg.role !== 'user' && (
                                <div className="w-8 h-8 shrink-0 mt-1 rounded-full overflow-hidden border border-slate-700">
                                    <TechAvatar size="w-full h-full" animated={false} />
                                </div>
                            )}
                            <div className={`max-w-[85%] rounded-2xl p-3.5 text-sm shadow-md border ${
                                msg.role === 'user' 
                                ? 'bg-accent text-slate-900 font-bold border-accent rounded-tr-none' 
                                : 'bg-slate-800/80 text-slate-200 border-slate-700 rounded-tl-none backdrop-blur-sm'
                            }`}>
                                {msg.type === 'image' ? (
                                    <img src={msg.content} alt="AI Gen" className="rounded-lg shadow-lg border border-white/10" />
                                ) : (
                                    <MessageContent content={msg.content} />
                                )}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-center gap-2 ml-11">
                            <div className="flex space-x-1">
                                <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                                <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Footer */}
                <div className="bg-slate-950 p-4 border-t border-slate-800/80">
                    <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
                         {quickPrompts.map((qp, idx) => (
                            <button key={idx} onClick={() => applyPrompt(qp.text, qp.mode)} className="text-[10px] whitespace-nowrap px-3 py-1.5 bg-slate-800/50 hover:bg-slate-800 rounded-full border border-slate-700 text-slate-400 hover:text-accent hover:border-accent/50 transition-all font-mono font-bold tracking-tight">
                                {qp.mode === AIMode.IMAGE ? '🎨 IMAGINE' : '⚡ ' + qp.text}
                            </button>
                        ))}
                    </div>
                    
                    <div className="flex gap-2 items-end bg-slate-900/50 p-1.5 rounded-xl border border-slate-700 focus-within:border-accent/50 focus-within:bg-slate-900 focus-within:ring-1 focus-within:ring-accent/20 transition-all">
                         <button 
                            onClick={() => setMode(mode === AIMode.TEXT ? AIMode.IMAGE : AIMode.TEXT)}
                            className={`p-2.5 rounded-lg transition-all ${mode === AIMode.IMAGE ? 'text-accent bg-accent/10' : 'text-slate-400 hover:text-white'}`}
                            title={mode === AIMode.TEXT ? "Switch to Image Mode" : "Switch to Text Mode"}
                        >
                            {mode === AIMode.TEXT ? (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            )}
                         </button>
                         <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={mode === AIMode.TEXT ? "Input command directive..." : "Describe visual output..."}
                            rows={1}
                            className="flex-1 bg-transparent text-sm text-white focus:outline-none py-2.5 resize-none max-h-24 placeholder-slate-600 font-medium"
                         />
                         <button 
                            onClick={() => handleSubmit()}
                            disabled={!input.trim() || isLoading}
                            className="p-2.5 bg-accent text-slate-950 rounded-lg hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                        >
                            {isLoading && mode === AIMode.TEXT ? (
                                <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <svg className="w-5 h-5 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                            )}
                         </button>
                    </div>
                </div>
             </div>
        )}

        {/* TUTUP: TRIGGER AVATAR */}
        {!isOpen && (
            <button 
                onClick={() => setIsOpen(true)}
                className="group relative w-16 h-16 flex items-center justify-center transition-transform duration-300 focus:outline-none outline-none pointer-events-auto hover:scale-110 active:scale-95"
                aria-label="Open AI Terminal"
            >
                {/* Efek Glow */}
                <div className="absolute inset-0 rounded-full bg-accent/30 blur-xl group-hover:bg-accent/50 transition-colors duration-500 animate-pulse"></div>
                
                {/* Avatar Teknologi */}
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-accent/50">
                    <TechAvatar />
                </div>
            </button>
        )}
    </div>
  );
};