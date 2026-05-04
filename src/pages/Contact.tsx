import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Cpu, ChevronRight, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

export const Contact: React.FC = () => {
    const [lines, setLines] = useState<string[]>(['[SYSTEM] Initializing secure handshake...', '[SYSTEM] Cryptography layers established.', '[USER] Connection requested via safrisam.id09@gmail.com']);
    const [input, setInput] = useState('');
    const [step, setStep] = useState<'IDLE' | 'NAMING' | 'MESSAGE' | 'SENDING' | 'SUCCESS'>('NAMING');
    const [, setFormData] = useState({ name: '', message: '' });
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [lines, step]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const currentInput = input;
        setInput('');

        if (step === 'NAMING') {
            setFormData(prev => ({ ...prev, name: currentInput }));
            setLines(prev => [...prev, `> USER_ID: ${currentInput}`, '[SYSTEM] ID accepted. Enter encrypted payload content (message):']);
            setStep('MESSAGE');
        } else if (step === 'MESSAGE') {
            setFormData(prev => ({ ...prev, message: currentInput }));
            setLines(prev => [...prev, `> PAYLOAD: ${currentInput}`, '[SYSTEM] Payload ready. Execute transmission? (type "yes" or "y")']);
            setStep('SENDING');
        } else if (step === 'SENDING') {
            if (currentInput.toLowerCase() === 'yes' || currentInput.toLowerCase() === 'y') {
                transmit();
            } else {
                setLines(prev => [...prev, '[SYSTEM] Transmission aborted. Enter message again:']);
                setStep('MESSAGE');
            }
        }
    };

    const transmit = () => {
        setStep('SENDING');
        setLines(prev => [...prev, '[EXEC] Encrypting using 4096-bit AES...', '[EXEC] Routing through anonymized relays...', '[EXEC] Transmitting packet to UDIN_K...']);
        
        // Simulated sending
        setTimeout(() => {
            setLines(prev => [...prev, '[DONE] Packet delivered successfully.', '[DONE] Acknowledgment received.']);
            setStep('SUCCESS');
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-24 font-mono text-slate-400 selection:bg-accent/30 selection:text-white relative overflow-hidden">
             {/* Background Matrix Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none opacity-20"></div>
            
            <div className="container mx-auto px-4 md:px-8 relative z-20">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                     <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-0.5 bg-red-500"></div>
                        <span className="text-red-500 text-xs font-black uppercase tracking-[0.4em]">Secure Channel: 0xCC</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-white leading-none tracking-tighter uppercase font-mono italic">
                        SECURE <br/>
                        <span className="text-accent underline decoration-accent/10 underline-offset-[16px]">COMMS</span>
                    </h1>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    <div className="bg-black/80 border border-slate-900 rounded-lg shadow-2xl overflow-hidden flex flex-col h-[500px]">
                        {/* Terminal ToolBar */}
                        <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex justify-between items-center shrink-0">
                            <div className="flex gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                            </div>
                            <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                <ShieldAlert className="w-3 h-3" />
                                End-to-End Encryption Active
                            </div>
                        </div>

                        {/* Output area */}
                        <div className="flex-1 overflow-y-auto p-6 scroll-smooth custom-scrollbar bg-slate-950/50" ref={scrollRef}>
                            {lines.map((line, i) => (
                                <div key={i} className={cn(
                                    "mb-2 text-xs leading-relaxed",
                                    line.startsWith('[SYSTEM]') ? "text-accent" : 
                                    line.startsWith('>') ? "text-white font-bold" :
                                    line.startsWith('[EXEC]') ? "text-yellow-500 animate-pulse" :
                                    line.startsWith('[DONE]') ? "text-green-500" :
                                    "text-slate-500"
                                )}>
                                    {line}
                                </div>
                            ))}
                            
                            {step === 'SUCCESS' && (
                                <motion.div 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="p-6 bg-green-500/10 border border-green-500/20 rounded-sm mt-8 flex flex-col items-center text-center gap-4"
                                >
                                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                                    <div>
                                        <div className="text-white font-black uppercase tracking-widest text-sm mb-1">Transmission Success</div>
                                        <div className="text-[10px] text-slate-500">I will review your packet data and respond shortly.</div>
                                    </div>
                                    <button 
                                        onClick={() => location.href = '/'}
                                        className="mt-2 px-6 py-2 bg-green-500 text-black text-[9px] font-black uppercase tracking-widest hover:brightness-110"
                                    >
                                        Return to Core
                                    </button>
                                </motion.div>
                            )}
                        </div>

                        {/* Input line */}
                        {step !== 'SUCCESS' && (
                            <form onSubmit={handleCommand} className="p-4 bg-slate-900/50 border-t border-slate-800 flex items-center gap-3">
                                <span className="text-accent font-bold">$</span>
                                <input 
                                    type="text" 
                                    autoFocus
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={step === 'NAMING' ? "Enter your name/ID..." : step === 'MESSAGE' ? "Type your message..." : "Confirm? (y/n)"}
                                    className="flex-1 bg-transparent border-none outline-none text-white text-xs font-mono placeholder:text-slate-700"
                                />
                                <button type="submit" className="p-2 text-slate-600 hover:text-white transition-colors">
                                    {step === 'SENDING' ? <Loader2 className="w-4 h-4 animate-spin" /> : <ChevronRight className="w-4 h-4" />}
                                </button>
                            </form>
                        )}
                    </div>
                    
                    {/* Security Accents */}
                    <div className="mt-8 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                             <Cpu className="w-4 h-4 text-slate-700" />
                             <span className="text-[8px] text-slate-700 font-mono tracking-widest uppercase">AES_4096_ACTIVE</span>
                        </div>
                        <div className="flex gap-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-8 h-0.5 bg-slate-900"></div>
                            ))}
                        </div>
                        <span className="text-[8px] text-slate-700 font-mono tracking-widest uppercase">UDIN_GATE_PORT_0x80</span>
                    </div>
                </div>
            </div>
            
            {/* Peripheral Scanlines */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
        </div>
    );
};
