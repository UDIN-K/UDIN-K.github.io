import React, { useState, useRef, useEffect } from 'react';
import { generateText, generateImage } from '../services/geminiService';
import { AIMode, AIChatMessage } from '../types';

export const AIPlayground: React.FC = () => {
  const [mode, setMode] = useState<AIMode>(AIMode.TEXT);
  const [input, setInput] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);
  
  // Load API Key from local storage on mount
  useEffect(() => {
    const storedKey = localStorage.getItem('udink_gemini_key');
    if (storedKey) setApiKey(storedKey);
    else setShowKeyInput(true);
  }, []);

  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
        id: 'welcome',
        role: 'model',
        content: 'Hello! I am powered by Gemini. Configure your API Key to start experimenting with text or image generation.',
        type: 'text',
        timestamp: Date.now()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }
  }, [messages, isLoading]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  const saveApiKey = (key: string) => {
      // Basic validation to check if it looks like a Google Key (starts with AIza)
      if (key !== 'demo' && !key.startsWith('AIza')) {
          alert('Warning: This looks like it might not be a valid Google Gemini API Key (usually starts with "AIza").');
      }
      setApiKey(key);
      localStorage.setItem('udink_gemini_key', key);
      setShowKeyInput(false);
      setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'model',
          content: key === 'demo' ? 'Demo Mode activated! You can now try the UI without a real key.' : 'API Key saved locally. You are ready to go! Try asking me something.',
          type: 'text',
          timestamp: Date.now()
      }]);
  };

  const removeApiKey = () => {
      setApiKey('');
      localStorage.removeItem('udink_gemini_key');
      setShowKeyInput(true);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!apiKey) {
        setShowKeyInput(true);
        return;
    }

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

    // Reset textarea height
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    try {
      if (mode === AIMode.TEXT) {
        const result = await generateText(currentInput, apiKey);
        const modelMsg: AIChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'model',
          content: result,
          type: 'text',
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, modelMsg]);
      } else {
        const imageUrl = await generateImage(currentInput, apiKey);
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
        content: errorMessage,
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
      setMessages([{
        id: Date.now().toString(),
        role: 'model',
        content: 'Chat cleared. Ready for your next idea.',
        type: 'text',
        timestamp: Date.now()
    }]);
  };

  return (
    <section id="ai-lab" className="py-24 bg-primary relative border-t border-slate-800">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-800/20 via-primary to-primary pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="mb-12 text-center">
          <div className="inline-block px-3 py-1 bg-accent/10 rounded-full text-accent text-xs font-bold uppercase tracking-wider mb-4 border border-accent/20">
            Powered by Google Gemini
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            AI <span className="text-accent">Playground</span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            Interact with the latest generative models. 
            Draft content, generate code, or visualize ideas securely.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-secondary rounded-2xl border border-slate-700 overflow-hidden shadow-2xl flex flex-col h-[700px] ring-1 ring-white/5 relative">
          
          {/* API Key Modal Overlay */}
          {showKeyInput && (
              <div className="absolute inset-0 z-50 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-secondary border border-slate-600 p-8 rounded-2xl max-w-md w-full shadow-2xl">
                      <div className="text-center mb-6">
                          <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 text-accent">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11.536 19.464a3 3 0 01-.879.879l-2.121 2.121a3 3 0 01-4.243 0 3 3 0 010-4.243l2.121-2.121a3 3 0 01.879-.879l.715-.714a6 6 0 1111.414 0z"></path></svg>
                          </div>
                          <h3 className="text-xl font-bold text-white">Enter Gemini API Key</h3>
                          <p className="text-slate-400 text-sm mt-2">
                              To use the AI Playground, please enter your <strong>Google Gemini API Key</strong>. 
                          </p>
                      </div>
                      <form onSubmit={(e) => {
                          e.preventDefault();
                          const val = (e.currentTarget.elements.namedItem('keyInput') as HTMLInputElement).value;
                          if(val) saveApiKey(val);
                      }}>
                          <input 
                            name="keyInput"
                            type="password" 
                            placeholder="Starts with AIza..." 
                            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white mb-4 focus:ring-2 focus:ring-accent focus:border-transparent outline-none placeholder-slate-500"
                            autoFocus
                          />
                          <button type="submit" className="w-full bg-accent hover:bg-accent-hover text-primary font-bold py-3 rounded-lg transition-colors mb-3">
                              Connect to AI Lab
                          </button>
                      </form>
                      
                      <div className="relative flex py-2 items-center">
                          <div className="flex-grow border-t border-slate-700"></div>
                          <span className="flex-shrink-0 mx-4 text-slate-500 text-xs">OR</span>
                          <div className="flex-grow border-t border-slate-700"></div>
                      </div>

                      <button 
                        type="button" 
                        onClick={() => saveApiKey('demo')}
                        className="w-full bg-transparent border border-slate-600 text-slate-300 hover:text-white hover:bg-slate-800 font-medium py-2 rounded-lg transition-colors text-sm"
                      >
                          Try Demo Mode (No Key Required)
                      </button>

                      <div className="mt-4 text-center">
                          <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-xs text-accent hover:underline">
                              Get a free Gemini API Key &rarr;
                          </a>
                      </div>
                  </div>
              </div>
          )}

          {/* Toolbar */}
          <div className="bg-slate-900 px-6 py-4 border-b border-slate-700 flex justify-between items-center shrink-0">
            <div className="flex space-x-1 bg-slate-800 p-1 rounded-lg border border-slate-700">
              <button
                onClick={() => setMode(AIMode.TEXT)}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                  mode === AIMode.TEXT
                    ? 'bg-accent text-primary shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                Text
              </button>
              <button
                onClick={() => setMode(AIMode.IMAGE)}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                  mode === AIMode.IMAGE
                    ? 'bg-accent text-primary shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                Image
              </button>
            </div>
            
            <div className="flex items-center gap-2">
                <button 
                    onClick={removeApiKey}
                    className="text-slate-400 hover:text-white text-xs font-medium px-3 py-2 rounded-md hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-600"
                    title="Change API Key"
                >
                    KEY: {apiKey === 'demo' ? 'DEMO MODE' : (apiKey ? '••••' + apiKey.slice(-4) : 'NOT SET')}
                </button>
                <div className="h-4 w-[1px] bg-slate-700 mx-1"></div>
                <button 
                    onClick={clearChat}
                    className="text-slate-400 hover:text-red-400 text-sm font-medium transition-colors flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-800"
                    title="Clear conversation"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    <span className="hidden sm:inline">Clear</span>
                </button>
            </div>
          </div>

          {/* Chat/Output Area */}
          <div 
            className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-900/50 scroll-smooth" 
            ref={scrollRef}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-white/10 ${
                    msg.role === 'user' ? 'bg-accent text-primary' : 'bg-slate-700 text-accent'
                }`}>
                    {msg.role === 'user' ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    ) : (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
                    )}
                </div>

                {/* Content */}
                <div
                  className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-4 shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-accent text-primary rounded-tr-sm'
                      : 'bg-slate-800 text-slate-200 border border-slate-700/50 rounded-tl-sm'
                  }`}
                >
                  <div className="text-[10px] font-bold mb-1 opacity-50 uppercase tracking-widest">
                    {msg.role === 'user' ? 'You' : 'Gemini'}
                  </div>
                  
                  {msg.type === 'text' ? (
                    <div className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">
                        {msg.content}
                    </div>
                  ) : (
                    <div className="mt-2 group">
                        <img 
                            src={msg.content} 
                            alt="Generated by AI" 
                            className="rounded-lg max-w-full border border-slate-600/50 shadow-lg transition-transform hover:scale-[1.01]"
                        />
                        <div className="mt-2 text-xs text-slate-500 flex justify-between items-center">
                            <span>Generated Image</span>
                            <a href={msg.content} download={`gemini-gen-${Date.now()}.png`} className="text-accent hover:underline flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                Download
                            </a>
                        </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0 text-accent border border-white/10">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                 </div>
                 <div className="bg-slate-800 border border-slate-700/50 rounded-2xl rounded-tl-sm p-4 flex items-center space-x-3">
                  <span className="text-sm text-slate-400 font-medium">Processing</span>
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce delay-100"></div>
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-slate-900 border-t border-slate-800">
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                    mode === AIMode.TEXT 
                    ? "Ask a question or request code... (Shift+Enter for new line)" 
                    : "Describe the image you want to create..."
                }
                rows={1}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-4 pr-14 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder-slate-500 resize-none overflow-hidden max-h-32 shadow-inner"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSubmit()}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 bottom-2 p-2 bg-accent text-primary rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500 shadow-md"
                aria-label="Send message"
              >
                <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <div className="mt-2 text-center">
                 <p className="text-[10px] text-slate-600">
                    AI responses can be inaccurate. Double-check important info.
                 </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};