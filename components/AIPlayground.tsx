import React, { useState, useRef, useEffect } from 'react';
import { createChatSession, generateImage } from '../services/geminiService';
import { AIMode, AIChatMessage } from '../types';
import { Chat, GenerateContentResponse } from "@google/genai";

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
                        <div key={index} className="my-3 rounded-lg overflow-hidden border border-slate-700 bg-[#0d1117]">
                            <div className="bg-slate-800 px-3 py-1 text-xs text-slate-400 font-mono border-b border-slate-700 flex justify-between">
                                <span>{lang || 'plaintext'}</span>
                                <span>copy</span>
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
                                .replace(/`(.*?)`/g, '<code class="bg-slate-800 px-1 py-0.5 rounded text-yellow-300 font-mono text-xs">$1</code>')
                        }} />
                    );
                }
            })}
        </div>
    );
};

// --- Custom "UAI" Avatar Component ---
const UAIAvatar: React.FC<{ size?: string }> = ({ size = "w-full h-full" }) => (
    <div className={`${size} bg-slate-900 flex items-center justify-center border-2 border-accent text-accent font-black tracking-tighter shadow-[0_0_10px_rgba(56,189,248,0.3)]`}>
        <span className="text-[10px] sm:text-xs">UAI</span>
    </div>
);

export const AIPlayground: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AIMode>(AIMode.TEXT);
  const [input, setInput] = useState('');
  
  const chatSessionRef = useRef<Chat | null>(null);

  // Load AI Lab if hash matches
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

  // Initialize Chat Session when opening
  useEffect(() => {
      if (isOpen) {
          initChat();
      }
  }, [isOpen]);

  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
        id: 'welcome',
        role: 'model',
        content: "Yo. Gemini GAROX here. ⚡\nSystem online. Ready to dominate tasks. What's the mission, Boss?",
        type: 'text',
        timestamp: Date.now()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const quickPrompts = [
      { text: "Optimize Lua Script", mode: AIMode.TEXT },
      { text: "Generate System Architecture", mode: AIMode.TEXT },
      { text: "Create Cyberpunk Asset", mode: AIMode.IMAGE },
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
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
      
      const errorMsg: AIChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: "System Failure. Error log: \n" + errorMessage,
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
      } catch (e) { /* ignore */ }
      
      setMessages([{
        id: Date.now().toString(),
        role: 'model',
        content: 'Memory wiped. Clean slate. Give me commands.',
        type: 'text',
        timestamp: Date.now()
    }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
        
        {/* OPEN STATE: CHAT MODAL */}
        {isOpen && (
             <div className="mb-4 w-[90vw] md:w-[400px] h-[500px] md:h-[600px] bg-slate-950/95 backdrop-blur-xl border border-slate-700/50 rounded-lg shadow-2xl flex flex-col overflow-hidden animate-fade-in-up origin-bottom-right ring-1 ring-accent/20 pointer-events-auto">
                
                {/* Header */}
                <div className="bg-slate-900 border-b border-slate-800 p-4 flex justify-between items-center shrink-0 select-none">
                    <div className="flex items-center gap-3">
                        {/* Custom UAI Avatar */}
                        <div className="w-10 h-10 rounded overflow-hidden">
                             <UAIAvatar />
                        </div>
                        <div>
                            <span className="font-black text-white text-sm block tracking-wide">GEMINI GAROX</span>
                            <span className="text-[10px] text-accent block flex items-center gap-1 font-mono">
                                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span> ONLINE
                            </span>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="text-slate-500 hover:text-white hover:bg-slate-800 p-2 rounded transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20 relative" ref={scrollRef}>
                    
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            {msg.role !== 'user' && (
                                <div className="w-8 h-8 shrink-0 rounded overflow-hidden self-start mt-1">
                                    <UAIAvatar size="w-full h-full text-[8px]" />
                                </div>
                            )}
                            <div className={`max-w-[85%] rounded p-3 text-sm shadow-sm ${
                                msg.role === 'user' ? 'bg-accent text-slate-900 font-bold' : 'bg-slate-800 text-slate-300 border border-slate-700 font-medium'
                            }`}>
                                {msg.type === 'image' ? (
                                    <img src={msg.content} alt="AI Gen" className="rounded-lg mb-1 shadow-lg border border-white/10" />
                                ) : (
                                    <MessageContent content={msg.content} />
                                )}
                            </div>
                        </div>
                    ))}
                    {isLoading && mode === AIMode.IMAGE && (
                        <div className="flex gap-2 items-center text-xs text-slate-500 ml-11 font-mono">
                            <span className="animate-pulse">RENDERING...</span>
                        </div>
                    )}
                </div>

                {/* Footer Input */}
                <div className="bg-slate-900 p-3 border-t border-slate-800">
                    <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide mask-fade-right">
                         {quickPrompts.map((qp, idx) => (
                            <button key={idx} onClick={() => applyPrompt(qp.text, qp.mode)} className="text-[10px] whitespace-nowrap px-3 py-1.5 bg-slate-800 rounded border border-slate-700 text-slate-400 hover:border-accent hover:text-accent transition-all font-mono uppercase">
                                {qp.mode === AIMode.IMAGE ? 'IMAGINE' : 'CMD'} :: {qp.text}
                            </button>
                        ))}
                    </div>
                    
                    <div className="flex gap-2 items-end bg-black/40 p-1.5 rounded border border-slate-700 focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-all">
                         <button 
                            onClick={() => setMode(mode === AIMode.TEXT ? AIMode.IMAGE : AIMode.TEXT)}
                            className={`p-2 rounded transition-colors ${mode === AIMode.IMAGE ? 'text-accent bg-slate-800' : 'text-slate-500 hover:text-white'}`}
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
                            placeholder={mode === AIMode.TEXT ? "Enter command..." : "Describe visual asset..."}
                            rows={1}
                            className="flex-1 bg-transparent text-sm text-white focus:outline-none py-2 resize-none max-h-24 placeholder-slate-600 font-mono"
                         />
                         <button 
                            onClick={() => handleSubmit()}
                            disabled={!input.trim() || isLoading}
                            className="p-2 bg-accent text-slate-900 rounded hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-lg shadow-accent/20"
                        >
                            {isLoading && mode === AIMode.TEXT ? (
                                <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <svg className="w-5 h-5 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                            )}
                         </button>
                    </div>
                    <div className="text-center mt-2 flex justify-between items-center px-1">
                         <span className="text-[8px] text-slate-600 uppercase font-mono tracking-widest">SYSTEM: ONLINE</span>
                         <button onClick={clearChat} className="text-[9px] text-slate-600 hover:text-red-500 font-mono uppercase tracking-wider">/RESET_LOG</button>
                    </div>
                </div>

             </div>
        )}

        {/* CLOSED STATE: AVATAR TRIGGER */}
        {!isOpen && (
            <button 
                onClick={() => setIsOpen(true)}
                className="group relative w-16 h-16 flex items-center justify-center transition-transform duration-300 focus:outline-none outline-none pointer-events-auto hover:scale-105"
                aria-label="Open Gemini GAROX"
            >
                {/* Animation Wrapper - Simple Float */}
                <div className="w-full h-full flex items-center justify-center animate-float">
                    
                    {/* Glow Ring */}
                    <div className="absolute inset-0 rounded-full blur-md bg-accent/20 group-hover:bg-accent/40 transition-colors duration-300"></div>
                    
                    {/* Avatar Image Wrapper - Fixed Overflow */}
                    <div className="relative z-10 w-full h-full rounded-full overflow-hidden flex items-center justify-center shadow-2xl">
                         <UAIAvatar />
                    </div>
                </div>
            </button>
        )}
    </div>
  );
};