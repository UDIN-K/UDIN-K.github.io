import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
    Upload, 
    Zap, 
    Cpu,
    Image as ImageIcon,
    X,
    MessageSquare,
    Loader2
} from 'lucide-react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { cn } from '../lib/utils';

export const NeuralVision: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (readerEvent) => {
                setImage(readerEvent.target?.result as string);
                setAnalysis(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const analyzeImage = async () => {
        if (!image) return;
        setIsAnalyzing(true);
        
        try {
            const apiKey = process.env.GEMINI_API_KEY;
            if (!apiKey) throw new Error("GEMINI_API_KEY is required.");

            const ai = new GoogleGenAI({ apiKey });
            
            // Extract base64 data and mime type
            const base64Data = image.split(',')[1];
            const mimeType = image.split(',')[0].split(':')[1].split(';')[0];

            const response: GenerateContentResponse = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: {
                    parts: [
                        { inlineData: { data: base64Data, mimeType } },
                        { text: "Act as U-Chat v5.0 (Neural Vision Core). Analyze this image in extreme technical detail. Identify objects, textures, lighting patterns, and metadata context. Provide a sharp, concise architectural breakdown in professional but cool Indonesian-slang or English based on detection. Format it in a clean tech-log style." }
                    ]
                }
            });

            setAnalysis(response.text || "SYSTEM_ERROR: NULL_RESPONSE");
        } catch (error) {
            setAnalysis(`[CRITICAL_FAILURE] ${error instanceof Error ? error.message : 'Unknown neural dropout'}`);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-24 relative overflow-hidden font-mono text-slate-400 selection:bg-accent/30 selection:text-white">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.05)_0%,transparent_50%)] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20"></div>

            <div className="container mx-auto px-4 md:px-8">
                {/* Header Track */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-0.5 bg-accent"></div>
                        <span className="text-accent text-xs font-black uppercase tracking-[0.4em]">Sub-System: Vision-Pro</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-white leading-none tracking-tighter uppercase font-mono italic flex items-center gap-6">
                        NEURAL <br/>
                        <span className="text-accent underline decoration-accent/10 underline-offset-[16px]">VISION</span>
                    </h1>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left: Input Controller */}
                    <div className="space-y-8">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-slate-900/40 p-1 border border-slate-900 rounded-2xl relative overflow-hidden group shadow-2xl h-[450px] flex flex-col"
                        >
                            <input 
                                type="file" 
                                accept="image/*" 
                                ref={fileInputRef} 
                                onChange={handleFileUpload} 
                                className="hidden" 
                            />
                            
                            {!image ? (
                                <button 
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex-1 flex flex-col items-center justify-center gap-6 group/btn relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                                    <div className="w-20 h-20 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-700 group-hover/btn:text-accent group-hover/btn:border-accent/40 group-hover/btn:scale-110 transition-all duration-500 shadow-inner">
                                        <Upload className="w-8 h-8" />
                                    </div>
                                    <div className="text-center">
                                        <div className="text-white font-black uppercase text-xs tracking-widest mb-2">Ingest Visual Data</div>
                                        <div className="text-[10px] text-slate-700 font-mono tracking-widest uppercase">Support: PNG, JPG, WEBP</div>
                                    </div>
                                </button>
                            ) : (
                                <div className="relative flex-1 overflow-hidden rounded-xl">
                                    <img src={image} alt="Target" className={cn("w-full h-full object-cover transition-all duration-1000", isAnalyzing && "blur-md grayscale opacity-50 overflow-hidden")} />
                                    
                                    {/* Analysis Scanning Animation */}
                                    <AnimatePresence>
                                        {isAnalyzing && (
                                            <motion.div 
                                                initial={{ top: '-100%' }}
                                                animate={{ top: '100%' }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                                className="absolute left-0 right-0 h-1 bg-accent shadow-[0_0_20px_2px_rgba(56,189,248,0.8)] z-20 pointer-events-none"
                                            />
                                        )}
                                    </AnimatePresence>

                                    {/* Action Buttons Overlay */}
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <button 
                                            onClick={() => setImage(null)} 
                                            className="p-2 bg-black/60 backdrop-blur border border-white/10 rounded-full text-white hover:bg-red-500/80 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Analyze Trigger */}
                                    {!isAnalyzing && !analysis && (
                                        <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black to-transparent">
                                            <button 
                                                onClick={analyzeImage}
                                                className="w-full py-4 bg-accent text-primary rounded-lg font-black uppercase text-xs tracking-[0.3em] flex items-center justify-center gap-3 hover:brightness-110 transform active:scale-95 transition-all shadow-xl shadow-accent/20"
                                            >
                                                <Zap className="w-4 h-4 fill-current" />
                                                Initiate Neural Sync
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Corner Tech Accents */}
                            <div className="absolute top-4 left-4 flex gap-1 items-center pointer-events-none">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
                                <span className="text-[8px] font-black text-accent uppercase tracking-widest">Active_Probe_v5</span>
                            </div>
                        </motion.div>

                        {/* Lab Stats */}
                        <div className="grid grid-cols-3 gap-4">
                             {[
                                 { label: 'ACCURACY', val: '99.4%' },
                                 { label: 'LATENCY', val: '1.2ms' },
                                 { label: 'MODEL', val: 'U-CHAT' }
                             ].map((stat, i) => (
                                 <div key={i} className="p-4 bg-slate-900/30 border border-slate-900 rounded-lg text-center">
                                     <div className="text-[8px] font-black text-slate-700 uppercase tracking-widest mb-1">{stat.label}</div>
                                     <div className="text-xs font-mono text-slate-300">{stat.val}</div>
                                 </div>
                             ))}
                        </div>
                    </div>

                    {/* Right: Output Monitor */}
                    <div className="space-y-6">
                        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl flex flex-col h-[550px] shadow-2xl relative">
                            {/* Terminal Header */}
                            <div className="px-6 py-4 border-b border-slate-900 flex justify-between items-center bg-slate-950/50 rounded-t-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="p-1.5 rounded bg-accent/10 border border-accent/20">
                                        <MessageSquare className="w-3 h-3 text-accent" />
                                    </div>
                                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Architect_Analysis_Output</span>
                                </div>
                                <div className="flex gap-2">
                                     {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-800"></div>)}
                                </div>
                            </div>

                            {/* Analysis Content */}
                            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                                {!analysis && !isAnalyzing ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                                        <ImageIcon className="w-12 h-12 mb-4" />
                                        <p className="text-xs font-mono tracking-widest uppercase italic">Waiting for visual ingress...</p>
                                    </div>
                                ) : isAnalyzing ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                                        <Loader2 className="w-8 h-8 text-accent animate-spin" />
                                        <div className="text-[10px] font-black text-accent uppercase tracking-[0.4em] animate-pulse">Deconstructing Neural Patterns</div>
                                    </div>
                                ) : (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="h-full flex flex-col"
                                    >
                                        <div className="font-mono text-xs text-slate-400 leading-relaxed whitespace-pre-wrap">
                                            {analysis?.split('\n').map((line, idx) => (
                                                <div key={idx} className="mb-2 group/line flex gap-4">
                                                    <span className="text-slate-800 w-8 shrink-0">{idx.toString().padStart(3, '0')}</span>
                                                    <span className={cn(
                                                        "flex-1",
                                                        line.startsWith('[') ? "text-accent font-bold" : "text-slate-300"
                                                    )}>
                                                        {line}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Scanline Overlay */}
                            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] rounded-2xl"></div>
                        </div>

                        {/* Footer Disclaimer */}
                        <div className="flex items-center gap-4 p-4 bg-red-400/5 border border-red-400/10 rounded-lg">
                            <Cpu className="w-4 h-4 text-red-400/50" />
                            <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest leading-relaxed">
                                Warning: Neural Probe v5 requires significant GPU cycles. Analysis context is redacted after session termination.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
