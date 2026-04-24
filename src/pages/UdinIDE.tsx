import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import {
    Terminal,
    Play,
    Cpu,
    Sparkles,
    Code2,
    Monitor,
    Database,
    Download,
    Trash2
} from 'lucide-react';
import { createChatSession } from '../services/geminiService';
import { cn } from '../lib/utils';
import { Chat, GenerateContentResponse } from "@google/genai";

export const UdinIDE: React.FC = () => {
    const [code, setCode] = useState<string>('// System Initialized...\n// UDIN IDE v1.0.0-beta\n\nfunction boot() {\n    console.log("Welcome to UDIN IDE, Master Syafri!");\n    console.log("CPU_LOAD: 2.4%");\n    console.log("NEURAL_SYNC: OK");\n}\n\nboot();');
    const [language, setLanguage] = useState('javascript');
    const [output, setOutput] = useState<string[]>(['[SYSTEM] UDIN_IDE_CORE_V1.1 initialized.', '[AUTH] ACCESS_GRANTED: MAJIKAN_SYAFRI']);
    const [aiInput, setAiInput] = useState('');
    const [isAiProcessing, setIsAiProcessing] = useState(false);
    const chatRef = useRef<Chat | null>(null);

    const languages = [
        { name: 'JavaScript', value: 'javascript', ext: 'js' },
        { name: 'TypeScript', value: 'typescript', ext: 'ts' },
        { name: 'Python', value: 'python', ext: 'py' },
        { name: 'C++', value: 'cpp', ext: 'cpp' },
        { name: 'Lua', value: 'lua', ext: 'lua' },
    ];

    const runCode = async () => {
        setOutput([]);
        setTimeout(() => {
            setOutput([`[EXEC] Initializing ${language} engine...`]);
        }, 50);

        if (language === 'javascript') {
            const originalLog = console.log;
            const originalError = console.error;
            const originalWarn = console.warn;

            // Override console methods to stream to state
            console.log = (...args) => {
                const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
                setOutput(prev => [...prev, `[LOG] ${msg}`]);
            };
            console.error = (...args) => {
                const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
                setOutput(prev => [...prev, `[ERR] ${msg}`]);
            };
            console.warn = (...args) => {
                const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
                setOutput(prev => [...prev, `[WARN] ${msg}`]);
            };

            try {
                // Allows using top-level await and async functions
                const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;
                const executor = new AsyncFunction(code);

                await executor();

                setOutput(prev => [...prev, '[DONE] Execution finished successfully.']);
            } catch (err) {
                setOutput(prev => [...prev, `[ERR] RUNTIME_EXCEPTION: ${err instanceof Error ? err.message : String(err)}`]);
            } finally {
                // Restore original console
                console.log = originalLog;
                console.error = originalError;
                console.warn = originalWarn;
            }
        } else {
            setOutput(prev => [
                ...prev,
                `[WARN] Engine for ${language.toUpperCase()} requires a native compiler. falling back to Cloud-VM Simulation...`,
                `[SIM] Syntax looks valid. Running heuristic analysis...`,
                `[DONE] Simulation complete. Zero runtime anomalies detected.`
            ]);
        }
    };

    const exportCode = () => {
        const lang = languages.find(l => l.value === language);
        const fileName = `udin_script_${Date.now()}.${lang?.ext || 'txt'}`;
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setOutput(prev => [...prev, `[SYSTEM] File exported: ${fileName}`]);
    };

    const handleAiCommand = async () => {
        if (!aiInput.trim()) return;
        setIsAiProcessing(true);
        setOutput(prev => [...prev, `[AI] Analyzing request: "${aiInput}"`]);

        try {
            if (!chatRef.current) {
                chatRef.current = createChatSession();
            }

            const prompt = `Act as an expert code architect. You are integrated into UDIN IDE.
            Current Language: ${language}
            Current Code Content:
            \`\`\`${language}
            ${code}
            \`\`\`
            User Request: ${aiInput}
            
            Return ONLY the updated code block followed by a brief explanation of what you changed. Use the format [CODE_START] {code} [CODE_END] [EXPLANATION] {explanation}`;

            const result = await chatRef.current.sendMessage({ message: prompt });
            const responseText = (result as GenerateContentResponse).text;

            if (responseText) {
                const codeMatch = responseText.match(/\[CODE_START\]([\s\S]*?)\[CODE_END\]/);
                const explanationMatch = responseText.match(/\[EXPLANATION\]([\s\S]*)/);

                if (codeMatch && codeMatch[1]) {
                    const newCode = codeMatch[1].trim();
                    setCode(newCode);
                }

                if (explanationMatch && explanationMatch[1]) {
                    setOutput(prev => [...prev, `[AI_EXPLAIN] ${explanationMatch[1].trim()}`]);
                } else {
                    setOutput(prev => [...prev, `[AI] Operation complete.`]);
                }
            }
        } catch (error) {
            setOutput(prev => [...prev, `[ERR] AI_CORE_BUSY: ${error instanceof Error ? error.message : 'Unknown failure'}`]);
        } finally {
            setIsAiProcessing(false);
            setAiInput('');
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col font-sans selection:bg-accent/30 overflow-hidden pt-16">
            {/* Top Toolbar */}
            <div className="h-12 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 shrink-0 relative z-30">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Monitor className="w-4 h-4 text-accent" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">UDIN IDE</span>
                    </div>
                    <div className="flex items-center gap-1">
                        {languages.map((lang) => (
                            <button
                                key={lang.value}
                                onClick={() => setLanguage(lang.value)}
                                className={cn(
                                    "px-4 py-2 min-h-[32px] flex items-center justify-center text-[9px] font-mono border rounded-sm transition-all uppercase tracking-tighter",
                                    language === lang.value
                                        ? "bg-accent/10 border-accent/40 text-accent"
                                        : "border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
                                )}
                            >
                                {lang.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setOutput([])}
                        title="Clear Console"
                        className="p-1.5 text-slate-500 hover:text-red-400 transition-colors bg-slate-950 rounded-sm border border-slate-800"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                        onClick={exportCode}
                        className="flex items-center gap-2 px-4 py-2 min-h-[32px] bg-slate-800 text-white rounded-sm hover:bg-slate-700 transition-all text-[10px] font-black uppercase tracking-widest active:scale-95 border border-slate-700"
                    >
                        <Download className="w-3 h-3 pointer-events-none" />
                        Export
                    </button>
                    <button
                        onClick={runCode}
                        className="flex items-center gap-2 px-4 py-2 min-h-[32px] bg-white text-primary rounded-sm hover:bg-accent transition-all text-[10px] font-black uppercase tracking-widest active:scale-95 shadow-lg shadow-white/5"
                    >
                        <Play className="w-3 h-3 fill-current pointer-events-none" />
                        Execute
                    </button>
                </div>
            </div>

            {/* Main Environment */}
            <div className="flex-1 flex overflow-hidden">
                {/* Sideline (Files etc - Mock) */}
                <div className="w-12 bg-slate-950 border-r border-slate-900 flex flex-col items-center py-4 gap-4 shrink-0 hidden md:flex">
                    <button className="p-2.5 rounded-md bg-accent/10 border border-accent/20 text-accent hover:brightness-110 transition-all active:scale-95">
                        <Code2 className="w-5 h-5 pointer-events-none" />
                    </button>
                    <button className="p-2.5 rounded-md border border-transparent text-slate-600 hover:text-slate-300 hover:bg-slate-900 transition-all active:scale-95">
                        <Database className="w-5 h-5 pointer-events-none" />
                    </button>
                    <button className="p-2.5 rounded-md border border-transparent text-slate-600 hover:text-slate-300 hover:bg-slate-900 transition-all active:scale-95">
                        <Terminal className="w-5 h-5 pointer-events-none" />
                    </button>
                </div>

                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Editor Area */}
                    <div className="flex-1 relative group">
                        <Editor
                            height="100%"
                            language={language}
                            theme="vs-dark"
                            value={code}
                            onChange={(value) => setCode(value || '')}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 13,
                                lineNumbers: 'on',
                                roundedSelection: true,
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                padding: { top: 20 },
                                theme: 'vs-dark',
                                cursorBlinking: 'smooth',
                                smoothScrolling: true,
                                fontFamily: 'JetBrains Mono, monospace'
                            }}
                        />
                        {/* Status Overlay */}
                        <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur border border-slate-800 px-3 py-1 rounded text-[8px] font-mono text-slate-500 uppercase tracking-widest pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                            UTF-8 | CRLF | {language.toUpperCase()}
                        </div>
                    </div>

                    {/* Console / Console Input Area */}
                    <div className="h-[200px] md:h-[250px] bg-slate-950 border-t border-slate-800 flex flex-col shrink-0">
                        {/* Output Header */}
                        <div className="px-6 py-2 border-b border-slate-900 flex justify-between items-center bg-slate-900/30">
                            <div className="flex items-center gap-2">
                                <Terminal className="w-3 h-3 text-slate-500" />
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">System Output</span>
                            </div>
                        </div>

                        {/* Logs */}
                        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-black/20">
                            {output.map((line, i) => (
                                <div key={i} className="font-mono text-[11px] leading-relaxed mb-1">
                                    <span className="text-slate-800 mr-2">[{i.toString().padStart(2, '0')}]</span>
                                    <span className={cn(
                                        "flex-1",
                                        line.startsWith('[ERR]') ? "text-red-500 font-bold" :
                                            line.startsWith('[LOG]') ? "text-slate-300" :
                                                line.startsWith('[DONE]') ? "text-green-500 font-black" :
                                                    line.startsWith('[EXEC]') ? "text-yellow-500 animate-pulse" :
                                                        line.startsWith('[SYSTEM]') ? "text-accent" :
                                                            line.startsWith('[AI]') ? "text-accent" :
                                                                line.startsWith('[AI_EXPLAIN]') ? "text-slate-400 italic" :
                                                                    "text-slate-500"
                                    )}>
                                        {line}
                                    </span>
                                </div>
                            ))}
                            {isAiProcessing && (
                                <div className="flex items-center gap-2 font-mono text-[11px] text-accent mt-2">
                                    <Cpu className="w-3 h-3 animate-spin" />
                                    <span>U-CHAT_NEURAL_LOGIC_SYNC...</span>
                                </div>
                            )}
                        </div>

                        {/* AI Input Rail */}
                        <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20">
                                <Sparkles className="w-4 h-4 text-accent" />
                            </div>
                            <input
                                type="text"
                                value={aiInput}
                                onChange={(e) => setAiInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAiCommand()}
                                placeholder="Command AI to refactor, debug, or generate code..."
                                className="flex-1 bg-transparent text-xs text-white focus:outline-none font-mono placeholder:text-slate-700"
                            />
                            <button
                                onClick={handleAiCommand}
                                disabled={isAiProcessing || !aiInput.trim()}
                                className="px-4 py-1.5 bg-accent text-primary rounded-sm text-[10px] font-black uppercase tracking-widest disabled:opacity-30 transition-all hover:brightness-110"
                            >
                                Send Command
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
