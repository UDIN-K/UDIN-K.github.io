import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Image as ImageIcon, 
  MessageSquare, 
  X, 
  Trash2, 
  Headset,
  Loader2,
  Sparkles
} from 'lucide-react';
import { createChatSession, generateImage } from '../services/geminiService';
import { AIMode, AIChatMessage } from '../types';
import { Chat, GenerateContentResponse } from "@google/genai";
import { cn } from '../lib/utils';
import ReactMarkdown from 'react-markdown';

import { useLanguage } from '../hooks/useLanguage';

// --- Markdown/Code Renderer Helper ---
const MessageContent: React.FC<{ content: string }> = ({ content }) => {
    return (
        <div className="markdown-body text-sm leading-relaxed break-words max-w-none">
            <ReactMarkdown
                components={{
                    p: ({...props}) => <p className="mb-2 last:mb-0" {...props} />,
                    a: ({...props}) => <a className="text-accent hover:underline break-all" target="_blank" rel="noopener noreferrer" {...props} />,
                    h1: ({...props}) => <h1 className="text-xl font-bold mt-4 mb-2 text-white" {...props} />,
                    h2: ({...props}) => <h2 className="text-lg font-bold mt-4 mb-2 text-white" {...props} />,
                    h3: ({...props}) => <h3 className="text-base font-bold mt-3 mb-2 text-white" {...props} />,
                    ul: ({...props}) => <ul className="list-disc list-outside ml-4 mb-2" {...props} />,
                    ol: ({...props}) => <ol className="list-decimal list-outside ml-4 mb-2" {...props} />,
                    li: ({...props}) => <li className="mb-1" {...props} />,
                    strong: ({...props}) => <strong className="font-bold text-white" {...props} />,
                    pre: ({...props}) => (
                        <div className="my-4 rounded border border-slate-700 bg-slate-950 shadow-inner overflow-hidden">
                            <pre className="p-4 text-xs font-mono text-blue-100 overflow-x-auto custom-scrollbar" {...props} />
                        </div>
                    ),
                    code: ({className, children, ...props}) => {
                        const match = /language-(\w+)/.exec(className || '');
                        const isBlock = match || (typeof children === 'string' && children.includes('\n'));
                        
                        return isBlock ? (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        ) : (
                            <code className="bg-slate-700/50 px-1.5 py-0.5 rounded text-accent font-mono text-[11px] border border-slate-600" {...props}>
                                {children}
                            </code>
                        );
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

const TechAvatar: React.FC<{ size?: string }> = ({ size = "w-full h-full" }) => (
    <div className={cn(size, "bg-slate-800 rounded-full flex items-center justify-center relative overflow-hidden shadow-lg border border-slate-700")}>
        <Headset className="w-1/2 h-1/2 text-accent" />
    </div>
);

export const AIPlayground: React.FC = () => {
  const language = useLanguage();
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
            chatSessionRef.current = createChatSession(language);
          }
      } catch (e) {
          console.error("Failed to init chat", e);
      }
  };

  useEffect(() => {
      if (isOpen) {
          initChat();
      }
  }, [isOpen, language]);

  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
        id: 'welcome',
        role: 'model',
        content: "Halo! 👋 Aku asisten AI Koma. Ada yang bisa kubantu? Misalnya, cari URL repo untuk Tachiyomi, Koma, atau sekadar memperbaiki error ekstensi?",
        type: 'text',
        timestamp: 0 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const quickPrompts = [
      { text: "Cari Repository", mode: AIMode.TEXT },
      { text: "Cara Install Ekstensi", mode: AIMode.TEXT },
      { text: "Gambar Karakter", mode: AIMode.IMAGE },
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
             chatSessionRef.current = createChatSession(language);
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
             throw new Error("Stream connection failed. Server might be busy.", { cause: streamError });
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
          content: `Maaf ya, sedang ada gangguan server nih. 😥\n\nDetail Error: ${errorMessage}`,
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
        chatSessionRef.current = createChatSession(language);
      } catch { /* ignore */ }
      
      setMessages([{
        id: Date.now().toString(),
        role: 'model',
        content: 'Riwayat obrolan telah dibersihkan! Mari mulai yang baru. ✨',
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
                    className="mb-4 w-[95vw] md:w-[500px] h-[700px] bg-slate-900/95 backdrop-blur-3xl border border-slate-700/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto relative"
                 >
                    {/* Header: Friendly Style */}
                    <div className="bg-slate-800/80 px-6 py-5 border-b border-slate-700/50 flex justify-between items-center shrink-0 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-900">
                                     <TechAvatar />
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-slate-800"></div>
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-white text-sm">Koma AI Assistant</span>
                                    <Sparkles className="w-4 h-4 text-accent" />
                                </div>
                                <div className="text-xs text-slate-400 mt-0.5">Online • Siap membantu</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={clearChat} className="p-2 text-slate-400 hover:text-slate-200 transition-all hover:bg-slate-700 rounded-full" title="Mulai teks baru">
                                <Trash2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-white transition-all hover:bg-slate-700 rounded-full">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar relative z-10 bg-slate-900" ref={scrollRef}>
                        {messages.map((msg) => (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                key={msg.id} 
                                className={cn("flex flex-col gap-1 w-full", msg.role === 'user' ? 'items-end' : 'items-start')}
                            >
                                <div className="px-1 text-xs text-slate-400 font-medium">
                                    {msg.role === 'user' ? 'Kamu' : 'Koma AI'}
                                </div>
                                <div className={cn(
                                    "max-w-[85%] p-4 text-sm relative group rounded-2xl",
                                    msg.role === 'user' 
                                    ? 'bg-accent text-slate-950 rounded-tr-sm' 
                                    : 'bg-slate-800 text-slate-100 rounded-tl-sm border border-slate-700/50'
                                )}>
                                    {msg.type === 'image' ? (
                                        <div className="space-y-4">
                                            <div className="text-xs text-accent/80 mb-2 font-medium">Gambar berhasil dibuat ✨</div>
                                            <img src={msg.content} alt="AI Gen" className="rounded-xl border border-slate-700 shadow-md" />
                                        </div>
                                    ) : (
                                        <MessageContent content={msg.content} />
                                    )}
                                </div>
                            </motion.div>
                        ))}
                        {isLoading && (
                            <div className="flex flex-col gap-2 ml-1">
                                <div className="text-xs text-slate-400 font-medium">Koma AI sedang mengetik...</div>
                            </div>
                        )}
                    </div>

                    {/* Footer Input */}
                    <div className="bg-slate-800 p-4 shrink-0 relative z-10 border-t border-slate-700/50">
                        <div className="flex gap-2 mb-3 overflow-x-auto pb-1 no-scrollbar">
                             {quickPrompts.map((qp, idx) => (
                                <button 
                                    key={idx} 
                                    onClick={() => applyPrompt(qp.text, qp.mode)} 
                                    className="text-xs font-medium whitespace-nowrap px-4 py-1.5 bg-slate-700 border border-slate-600 text-slate-300 hover:text-white hover:bg-slate-600 transition-all rounded-full"
                                >
                                    {qp.text}
                                </button>
                            ))}
                        </div>
                        
                        <div className="bg-slate-900 border border-slate-700 focus-within:border-accent/60 rounded-xl transition-all group/input shadow-inner">
                            <div className="flex gap-2 items-center p-1.5 min-h-[50px]">
                                 <button 
                                    onClick={() => setMode(mode === AIMode.TEXT ? AIMode.IMAGE : AIMode.TEXT)}
                                    className={cn(
                                        "w-10 h-10 flex items-center justify-center transition-all bg-slate-800 rounded-lg shrink-0", 
                                        mode === AIMode.IMAGE ? 'text-accent' : 'text-slate-400 hover:text-slate-200'
                                    )}
                                >
                                    {mode === AIMode.TEXT ? <MessageSquare className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
                                 </button>
                                 <textarea
                                    ref={textareaRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder={mode === AIMode.TEXT ? "Ketik pesan di sini..." : "Deskripsikan gambar yang ingin dibuat..."}
                                    rows={1}
                                    className="flex-1 bg-transparent text-sm text-white focus:outline-none py-2 px-1 resize-none max-h-32 placeholder-slate-500 font-sans"
                                 />
                                 <button 
                                    onClick={() => handleSubmit()}
                                    disabled={!input.trim() || isLoading}
                                    className="w-10 h-10 flex items-center justify-center bg-accent text-slate-950 rounded-lg hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 shrink-0"
                                >
                                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin text-slate-950" /> : <Send className="w-4 h-4 ml-0.5" />}
                                 </button>
                            </div>
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
            className="w-16 h-16 flex items-center justify-center pointer-events-auto relative group shadow-2xl"
        >
            <div className="absolute inset-0 bg-accent/30 blur-2xl group-hover:bg-accent/40 transition-colors animate-pulse"></div>
            
            <div className="w-14 h-14 rounded-full overflow-hidden border border-slate-700 relative z-10 bg-slate-900 shadow-lg group-hover:border-accent transition-all">
                <TechAvatar />
            </div>
            
            <div className="absolute -top-10 right-0 bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-xs font-bold text-white shadow-xl opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 whitespace-nowrap">
                 Tanya Koma AI ✨
            </div>
        </motion.button>
    </div>
  );
};
