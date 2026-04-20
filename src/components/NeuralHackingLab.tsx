import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  ShieldAlert, 
  ShieldCheck, 
  Zap, 
  Lock, 
  Unlock, 
  Cpu, 
  Skull,
  Play,
  RotateCcw,
  AlertTriangle,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Quest {
    id: string;
    title: string;
    objective: string;
    clue: string;
    targetPattern: RegExp;
    solution: string;
    difficulty: 'Low' | 'Medium' | 'Critical';
    reward: string;
}

const QUEST_POOL: Quest[] = [
    {
        id: 'q1',
        title: 'Bypass_Kernel_Auth',
        objective: 'Inject a master override into the global Authentication system.',
        clue: 'Look for the "AuthService" and invoke "SetMaster" with a true value.',
        targetPattern: /AuthService:SetMaster\(true\)/i,
        solution: 'AuthService:SetMaster(true)',
        difficulty: 'Low',
        reward: 'Access_Gained'
    },
    {
        id: 'q2',
        title: 'God_Mode_Sync',
        objective: 'Modify your character\'s Health attribute to exceed logical limits.',
        clue: 'Set LocalPlayer.Character.Humanoid.Health to math.huge.',
        targetPattern: /LocalPlayer\.Character\.Humanoid\.Health\s*=\s*math\.huge/i,
        solution: 'game.Players.LocalPlayer.Character.Humanoid.Health = math.huge',
        difficulty: 'Medium',
        reward: 'Invulnerability'
    },
    {
        id: 'q3',
        title: 'Data_Vault_Breach',
        objective: 'Intercept the Admin RemoteEvent to unlock all high-security vaults.',
        clue: 'Fire the "AdminRemote" in ReplicatedStorage with the string "UnlockAll".',
        targetPattern: /ReplicatedStorage\.AdminRemote:FireServer\("UnlockAll"\)/i,
        solution: 'game.ReplicatedStorage.AdminRemote:FireServer("UnlockAll")',
        difficulty: 'Critical',
        reward: 'Admin_Privileges'
    },
    {
        id: 'q4',
        title: 'Speed_Kernel_Patch',
        objective: 'Overclock the physics engine to increase WalkSpeed.',
        clue: 'Update the WalkSpeed property of the Humanoid to 100.',
        targetPattern: /Humanoid\.WalkSpeed\s*=\s*100/i,
        solution: 'game.Players.LocalPlayer.Character.Humanoid.WalkSpeed = 100',
        difficulty: 'Medium',
        reward: 'Transonic_Movement'
    },
    {
        id: 'q5',
        title: 'Ghost_Net_Injection',
        objective: 'Disable the high-level Anti-Cheat module.',
        clue: 'Find the object named "AntiCheat" and call its "Destroy" method.',
        targetPattern: /AntiCheat:Destroy\(\)/i,
        solution: 'workspace.AntiCheat:Destroy()',
        difficulty: 'Critical',
        reward: 'Stealth_Mode'
    },
    {
        id: 'q6',
        title: 'Neural_Memory_Leak',
        objective: 'Simulate a memory leak in the core system loop.',
        clue: 'Create a while true do loop that prints "Leak" and has a wait().',
        targetPattern: /while\s+true\s+do\s+print\("Leak"\)\s+wait\(\)\s+end/i,
        solution: 'while true do print("Leak") wait() end',
        difficulty: 'Critical',
        reward: 'Resource_Corruption'
    },
    {
        id: 'q7',
        title: 'Bank_Vault_Overflow',
        objective: 'Trigger a currency overflow in the transaction buffer.',
        clue: 'Use the "Transaction" service and call "Deposit" with 9999999.',
        targetPattern: /Transaction:Deposit\(9999999\)/i,
        solution: 'game.GetService("Transaction"):Deposit(9999999)',
        difficulty: 'Medium',
        reward: 'Infinite_Credits'
    }
];

export const NeuralHackingLab: React.FC = () => {
    const [currentQuest, setCurrentQuest] = useState<Quest | null>(null);
    const [code, setCode] = useState('-- INPUT LUA SCRIPT HERE\n\n');
    const [logs, setLogs] = useState<string[]>([]);
    const [status, setStatus] = useState<'idle' | 'hacking' | 'success' | 'fail'>('idle');
    const [progress, setProgress] = useState(0);
    const [showBackdoor, setShowBackdoor] = useState(false);
    const logEndRef = useRef<HTMLDivElement>(null);

    const generateQuest = (isInitial = false) => {
        const randomQuest = QUEST_POOL[Math.floor(Math.random() * QUEST_POOL.length)];
        setCurrentQuest(randomQuest);
        setCode(`-- MISSION: ${randomQuest.title}\n-- Objective: ${randomQuest.objective}\n\n`);
        setStatus('idle');
        setProgress(0);
        setShowBackdoor(false);
        
        const newLogs = isInitial 
            ? [`[SYSTEM] NEURAL LINK ESTABLISHED`, `[SYSTEM] INITIALIZING HACKING INTERFACE...`, `[NEW_MISSION] ${randomQuest.title} received.`, `[CLUE] ${randomQuest.clue}`]
            : [`[NEW_MISSION] ${randomQuest.title} received.`, `[CLUE] ${randomQuest.clue}`];
            
        setLogs(prev => isInitial ? newLogs : [...prev, ...newLogs]);
    };

    useEffect(() => {
        // Use a microtask to avoid synchronous setState warnings during initialization
        Promise.resolve().then(() => {
            generateQuest(true);
        });
    }, []);

    useEffect(() => {
        logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    const runExploit = () => {
        if (!currentQuest || status === 'hacking') return;
        
        setStatus('hacking');
        setLogs(prev => [...prev, '[HACK_START] Injecting packets...', '[HACK_START] Bypassing hash checks...']);
        
        let p = 0;
        const interval = setInterval(() => {
            p += Math.random() * 15;
            setProgress(Math.min(p, 100));
            
            if (p >= 100) {
                clearInterval(interval);
                
                // Robust verification: Ignores extra whitespaces and safely checks similarity
                const normalizedCode = code.replace(/[\s"']/g, '').toLowerCase();
                const normalizedSolution = currentQuest.solution.replace(/[\s"']/g, '').toLowerCase();
                const isSuccess = currentQuest.targetPattern.test(code) || normalizedCode.includes(normalizedSolution);
                
                if (isSuccess) {
                    setStatus('success');
                    setLogs(prev => [...prev, '[SUCCESS] AUTHENTICATION BYPASSED', `[SUCCESS] REWARD: ${currentQuest.reward}`]);
                } else {
                    setStatus('fail');
                    setLogs(prev => [...prev, '[FAILURE] TRACE DETECTED', '[FAILURE] SYSTEM LOCKDOWN INITIATED']);
                }
            }
        }, 200);
    };

    const resetQuest = () => {
        generateQuest(true); // pass true to fully clear logs and simulate initial boot
    };

    return (
        <div className="bg-slate-950/50 border border-slate-900 rounded-lg overflow-hidden flex flex-col md:flex-row h-[700px] shadow-2xl relative">
            {/* Left Side: Simulation View */}
            <div className="w-full md:w-1/2 p-8 border-r border-slate-900 flex flex-col relative overflow-hidden bg-slate-950">
                <div className="absolute top-0 left-0 w-full h-1 bg-[linear-gradient(90deg,transparent,rgba(56,189,248,0.5),transparent)] animate-scan"></div>
                
                <div className="flex justify-between items-center mb-8 shrink-0">
                    <div className="flex items-center gap-3">
                        <Skull className="w-6 h-6 text-red-500 animate-pulse" />
                        <span className="font-mono font-black text-xs text-white tracking-[0.3em] uppercase">NEURAL_HACKER_OS_V1.0</span>
                    </div>
                    <div className="flex gap-1">
                        {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 bg-slate-800 rounded-full"></div>)}
                    </div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center relative">
                    {/* Visualizer Core */}
                    <div className="relative w-80 h-80 flex items-center justify-center scale-90 md:scale-100">
                        {/* Outer Rotating Data Stream */}
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-0 border border-accent/10 rounded-full"
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-accent/30 rounded-full"></div>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-accent/30 rounded-full"></div>
                        </motion.div>

                        {/* Mid Rotating Ring */}
                        <motion.div 
                            animate={{ rotate: -360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-6 border-2 border-dashed border-accent/20 rounded-full"
                        />

                        {/* Inner Pulse Ring */}
                        <motion.div 
                            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute inset-16 bg-accent/5 rounded-full blur-xl"
                        />
                        
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-20 border border-accent/40 rounded-full opacity-50"
                        >
                           <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-accent rounded-full shadow-[0_0_15px_rgba(56,189,248,0.8)]"></div>
                        </motion.div>

                        {/* Core Label */}
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
                             <span className="text-[8px] font-black text-accent tracking-[0.4em] uppercase">Neural_Core</span>
                             <div className="flex gap-1">
                                 <div className="w-4 h-[1px] bg-accent"></div>
                                 <div className="w-1 h-[1px] bg-accent"></div>
                             </div>
                        </div>
                        
                        {/* Center Icon */}
                        <AnimatePresence mode="wait">
                            {status === 'idle' && (
                                <motion.div 
                                    key="idle"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="relative z-10"
                                >
                                    <Lock className="w-20 h-20 text-slate-700" />
                                </motion.div>
                            )}
                            {status === 'hacking' && (
                                <motion.div 
                                    key="hacking"
                                    initial={{ scale: 0, rotate: 0 }}
                                    animate={{ scale: [1, 1.15, 1], rotate: [0, 90, 180, 270, 360] }}
                                    exit={{ scale: 0 }}
                                    transition={{ 
                                        scale: { repeat: Infinity, duration: 1 },
                                        rotate: { repeat: Infinity, duration: 4, ease: 'linear' }
                                    }}
                                    className="relative z-10"
                                >
                                    <Cpu className="w-24 h-24 text-accent" />
                                </motion.div>
                            )}
                            {status === 'success' && (
                                <motion.div 
                                    key="success"
                                    initial={{ scale: 0, rotate: -90 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0 }}
                                    className="relative z-10 flex flex-col items-center gap-2"
                                >
                                    <Unlock className="w-20 h-20 text-green-500" />
                                    <span className="text-[10px] font-black text-green-500 uppercase tracking-widest animate-pulse">Access_Gained</span>
                                </motion.div>
                            )}
                            {status === 'fail' && (
                                <motion.div 
                                    key="fail"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="relative z-10 flex flex-col items-center gap-2"
                                >
                                    <ShieldAlert className="w-20 h-20 text-red-500" />
                                    <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Breach_Failed</span>
                                    <motion.div 
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ duration: 0.2, repeat: Infinity }}
                                        className="absolute inset-0 bg-red-500/10 blur-3xl rounded-full -z-10"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full max-w-xs mt-12 space-y-2">
                        <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-slate-500">
                            <span>Process_Progress</span>
                            <span>{Math.floor(progress)}%</span>
                        </div>
                        <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                className={cn(
                                    "h-full transition-colors",
                                    status === 'fail' ? 'bg-red-500' : 'bg-accent'
                                )}
                            />
                        </div>
                    </div>
                </div>

                {/* Console Output */}
                <div className="mt-8 bg-black/50 border border-slate-900 rounded p-4 h-32 overflow-y-auto custom-scrollbar font-mono text-[10px] space-y-1">
                    {logs.map((log, i) => (
                        <div key={i} className={cn(
                            "flex gap-2",
                            log.includes('SUCCESS') ? 'text-green-500' : 
                            log.includes('FAILURE') ? 'text-red-500' : 
                            log.includes('CLUE') ? 'text-accent italic' : 'text-slate-500'
                        )}>
                            <span className="shrink-0">{'>'}</span>
                            <span>{log}</span>
                        </div>
                    ))}
                    <div ref={logEndRef} />
                </div>
            </div>

            {/* Right Side: IDE/Input */}
            <div className="w-full md:w-1/2 flex flex-col bg-slate-900/50">
                <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Terminal className="w-4 h-4 text-accent" />
                        <span className="text-[10px] font-mono font-black text-white tracking-[0.2em] uppercase">
                            COMMAND_OVERRIDE.LUA
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        {currentQuest && (
                            <span className={cn(
                                "text-[8px] font-black px-2 py-0.5 rounded border uppercase",
                                currentQuest.difficulty === 'Low' ? 'border-green-500/20 text-green-500/60' :
                                currentQuest.difficulty === 'Medium' ? 'border-yellow-500/20 text-yellow-500/60' :
                                'border-red-500/20 text-red-500/60'
                            )}>
                                {currentQuest.difficulty}_Threat
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex-1 p-6 relative">
                    <textarea 
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        disabled={status === 'hacking' || status === 'success'}
                        spellCheck={false}
                        className="w-full h-full bg-transparent text-slate-100 font-mono text-xs leading-loose focus:outline-none resize-none custom-scrollbar relative z-10"
                    />
                    
                    {/* Syntax Highlight Overlay (Fake) */}
                    <div className="absolute inset-0 p-6 pointer-events-none opacity-10">
                        <div className="w-full h-full border border-accent/20 rounded bg-[repeating-linear-gradient(transparent,transparent_24px,rgba(56,189,248,0.05)_24px,rgba(56,189,248,0.05)_25px)]"></div>
                    </div>
                </div>

                <div className="p-6 bg-slate-950/80 border-t border-slate-900 flex justify-between items-center relative z-20">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-accent/20"></div>

                    <div className="flex gap-2 relative z-10">
                        <button 
                            onClick={resetQuest}
                            className="p-3 text-slate-500 hover:text-white hover:bg-white/5 transition-all rounded-sm border border-transparent hover:border-slate-800"
                            title="Generate New Quest"
                        >
                            <RotateCcw className="w-5 h-5" />
                        </button>
                        <button 
                            onClick={() => setShowBackdoor(!showBackdoor)}
                            className={cn(
                                "p-3 transition-all rounded-sm border",
                                showBackdoor ? "bg-accent/10 border-accent/40 text-accent" : "text-slate-600 border-transparent hover:border-slate-800 hover:text-slate-400"
                            )}
                            title="Unlock Neural Backdoor"
                        >
                            <Lock className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex gap-4 items-center relative z-10">
                        <div className="flex flex-col items-end mr-4">
                            <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none mb-1">{currentQuest?.title}</span>
                            <div className="flex items-center gap-2">
                                <div className={cn(
                                    "w-1.5 h-1.5 rounded-full",
                                    status === 'idle' ? 'bg-slate-700' :
                                    status === 'hacking' ? 'bg-accent animate-pulse' :
                                    status === 'success' ? 'bg-green-500' : 'bg-red-500'
                                )}></div>
                                <span className={cn(
                                    "text-[8px] font-mono uppercase tracking-[0.2em] transition-colors",
                                    status === 'fail' ? 'text-red-500' : 
                                    status === 'success' ? 'text-green-500' : 'text-slate-500'
                                )}>LINK: {status}</span>
                            </div>
                        </div>
                        
                        <motion.button 
                            onClick={runExploit}
                            disabled={status === 'hacking' || status === 'success'}
                            animate={
                                status === 'fail' ? { x: [-5, 5, -5, 5, 0] } : 
                                status === 'success' ? { scale: [1, 1.05, 1], boxShadow: ["0 0 0px rgba(34,197,94,0)", "0 0 20px rgba(34,197,94,0.5)", "0 0 0px rgba(34,197,94,0)"] } : {}
                            }
                            transition={{ duration: 0.4 }}
                            className={cn(
                                "text-slate-950 px-8 py-4 rounded-sm font-black tracking-[0.4em] flex items-center gap-3 transition-colors disabled:opacity-50 uppercase text-[10px] relative overflow-hidden group/btn",
                                status === 'fail' ? 'bg-red-500' : 
                                status === 'success' ? 'bg-green-400' : 'bg-white hover:bg-accent hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                            )}
                        >
                            {!['fail', 'success'].includes(status) && <div className="absolute inset-0 bg-accent translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>}
                            {status === 'hacking' ? (
                                <Zap className="w-4 h-4 animate-spin relative z-10" />
                            ) : status === 'success' ? (
                                <ShieldCheck className="w-4 h-4 relative z-10" />
                            ) : status === 'fail' ? (
                                <AlertTriangle className="w-4 h-4 relative z-10" />
                            ) : (
                                <Play className="w-4 h-4 fill-current relative z-10" />
                            )}
                            <span className="relative z-10">
                                {status === 'fail' ? 'RETRY_PATCH' : status === 'success' ? 'PATCH_SECURED' : 'EXECUTE_PATCH'}
                            </span>
                        </motion.button>
                    </div>

                    {/* High-Fidelity Backdoor UI */}
                    <AnimatePresence>
                        {showBackdoor && currentQuest && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="absolute bottom-full left-0 w-full bg-slate-950/95 backdrop-blur-xl border-t border-b border-accent/20 z-20 flex flex-col p-6 shadow-[0_-20px_40px_rgba(0,0,0,0.8)]"
                            >
                                <div className="flex justify-between items-center mb-4 text-accent border-b border-white/5 pb-2">
                                    <div className="flex items-center gap-2">
                                        <Unlock className="w-4 h-4" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] font-mono">Neural_Backdoor_Sequence</span>
                                    </div>
                                    <button onClick={() => setShowBackdoor(false)} className="text-slate-500 hover:text-white transition-colors bg-slate-900 border border-slate-800 p-1.5 rounded-sm">
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                                <div className="flex-1 bg-black border border-accent/10 rounded p-4 font-mono text-[11px] text-slate-300 relative group overflow-hidden">
                                     <pre className="select-all cursor-pointer" onClick={() => {
                                         setCode(prev => prev + '\n' + currentQuest.solution);
                                         setShowBackdoor(false);
                                     }}>
                                         <code className="text-green-400">{currentQuest.solution}</code>
                                     </pre>
                                     <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                                         <p className="text-[9px] text-slate-500 italic uppercase">Clue: {currentQuest.clue}</p>
                                         <div className="text-[8px] text-accent font-black uppercase tracking-widest bg-accent/10 px-2 py-1 rounded">Click Code to Inject</div>
                                     </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
