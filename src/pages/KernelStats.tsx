import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    BarChart,
    Bar
} from 'recharts';
import { 
    Activity, 
    Cpu, 
    Database, 
    Zap, 
    ShieldCheck, 
    RefreshCw,
    Download,
    AlertTriangle
} from 'lucide-react';
import { cn } from '../lib/utils';

// Simulated data generation
const generateData = () => {
    return Array.from({ length: 20 }, (_, i) => ({
        time: i,
        cpu: Math.floor(Math.random() * 40) + 30,
        ram: Math.floor(Math.random() * 20) + 60,
        network: Math.floor(Math.random() * 100),
        temp: Math.floor(Math.random() * 10) + 40,
    }));
};

export const KernelStats: React.FC = () => {
    const [data, setData] = useState(generateData());
    const [uptime, setUptime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setData(prev => {
                const newData = [...prev.slice(1), {
                    time: prev[prev.length - 1].time + 1,
                    cpu: Math.floor(Math.random() * 40) + 30,
                    ram: Math.floor(Math.random() * 20) + 60,
                    network: Math.floor(Math.random() * 100),
                    temp: Math.floor(Math.random() * 10) + 40,
                }];
                return newData;
            });
            setUptime(prev => prev + 1);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const formatUptime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-12 font-mono text-slate-400 selection:bg-accent/30 selection:text-white overflow-x-hidden">
            {/* HUD Header */}
            <div className="container mx-auto px-4 md:px-8 mb-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-900">
                    <div>
                        <div className="flex items-center gap-3 text-accent mb-2">
                            <Activity className="w-5 h-5 animate-pulse" />
                            <span className="text-xs font-black uppercase tracking-[0.3em]">System Telemetry Active</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
                            KERNEL <span className="text-accent underline decoration-accent/20 underline-offset-8 font-mono">STATS</span>
                        </h1>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <div className="px-4 py-2 bg-slate-900 rounded border border-slate-800">
                            <div className="text-[9px] uppercase tracking-widest text-slate-600 mb-1">Session Uptime</div>
                            <div className="text-xl font-black text-white">{formatUptime(uptime)}</div>
                        </div>
                        <div className="px-4 py-2 bg-slate-900 rounded border border-slate-800">
                            <div className="text-[9px] uppercase tracking-widest text-slate-600 mb-1">Encrypted Node</div>
                            <div className="text-xl font-black text-accent">UDIN_GATE_01</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'CPU LOAD', val: `${data[data.length-1].cpu}%`, icon: <Cpu />, color: 'text-blue-400' },
                    { label: 'MEM USAGE', val: `${data[data.length-1].ram}%`, icon: <Database />, color: 'text-purple-400' },
                    { label: 'NETWORK', val: `${data[data.length-1].network} MBPS`, icon: <RefreshCw className="animate-spin-slow" />, color: 'text-green-400' },
                    { label: 'TEMP', val: `${data[data.length-1].temp}°C`, icon: <Zap />, color: 'text-orange-400' },
                ].map((stat, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-slate-900/40 p-6 rounded-lg border border-slate-900 hover:border-slate-800 transition-all flex justify-between items-center group"
                    >
                        <div>
                            <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">{stat.label}</div>
                            <div className={cn("text-2xl font-black font-mono", stat.color)}>{stat.val}</div>
                        </div>
                        <div className={cn("w-10 h-10 rounded bg-slate-950 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity", stat.color)}>
                            {React.cloneElement(stat.icon as React.ReactElement, { className: 'w-5 h-5' })}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Main CPU & RAM Chart */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="lg:col-span-2 bg-slate-900/40 p-8 rounded-lg border border-slate-900 h-[400px] relative overflow-hidden"
                >
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                             <Activity className="w-4 h-4 text-accent" />
                             Neural Processing Load (Real-time)
                        </h3>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2 text-[10px] text-blue-400">
                                <div className="w-2 h-2 rounded-full bg-blue-400"></div> CPU
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-purple-400">
                                <div className="w-2 h-2 rounded-full bg-purple-400"></div> MEM
                            </div>
                        </div>
                    </div>
                    
                    <div className="h-[280px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorRam" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="time" hide />
                                <YAxis domain={[0, 100]} hide />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '4px', fontSize: '10px' }}
                                    itemStyle={{ fontSize: '10px' }}
                                />
                                <Area type="monotone" dataKey="cpu" stroke="#60a5fa" fillOpacity={1} fill="url(#colorCpu)" strokeWidth={2} isAnimationActive={false} />
                                <Area type="monotone" dataKey="ram" stroke="#a855f7" fillOpacity={1} fill="url(#colorRam)" strokeWidth={2} isAnimationActive={false} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Network Distribution */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-slate-900/40 p-8 rounded-lg border border-slate-900 h-[400px]"
                >
                    <h3 className="text-xs font-black text-white uppercase tracking-widest mb-8 flex items-center gap-2">
                        <Download className="w-4 h-4 text-green-400" />
                        Network Throughput
                    </h3>
                    <div className="h-[280px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="time" hide />
                                <YAxis hide />
                                <Bar dataKey="network" fill="#22c55e" radius={[2, 2, 0, 0]} isAnimationActive={false} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Security Log */}
                <div className="bg-slate-900/40 p-6 rounded-lg border border-slate-900">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-accent" />
                            System Firewall Logs
                        </h3>
                        <span className="text-[8px] bg-accent/10 pr-2 pl-6 py-1 rounded-full text-accent font-black tracking-widest uppercase relative overflow-hidden">
                            <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>
                             Defensive Active
                        </span>
                    </div>
                    <div className="space-y-3 font-mono text-[10px]">
                        {[
                            { time: '12:44:02', event: 'SSH Attempt Refused', ip: '192.168.1.1', status: 'Blocked' },
                            { time: '12:45:10', event: 'Module Integrity Verified', ip: 'Localhost', status: 'Pass' },
                            { time: '12:48:33', event: 'Kernel Rebuild Initiated', ip: 'Admin', status: 'Running' },
                            { time: '12:50:01', event: 'Neural weights re-synced', ip: 'U-Chat', status: 'Success' },
                        ].map((log, i) => (
                            <div key={i} className="flex justify-between items-center py-2 border-b border-slate-800/40 opacity-70 hover:opacity-100 transition-opacity">
                                <div className="flex gap-4">
                                    <span className="text-slate-600">{log.time}</span>
                                    <span className="text-white">{log.event}</span>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <span className="text-slate-700 hidden sm:inline">{log.ip}</span>
                                    <span className={cn("px-2 py-0.5 rounded-[2px]", 
                                        log.status === 'Blocked' ? "bg-red-500/10 text-red-500" : 
                                        log.status === 'Success' ? "bg-green-500/10 text-green-500" :
                                        "bg-accent/10 text-accent"
                                    )}>{log.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Hardware Alerts */}
                <div className="bg-slate-900/40 p-6 rounded-lg border border-slate-900">
                    <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-orange-400" />
                        Infrastructure Health
                    </h3>
                    <div className="space-y-6">
                        {[
                            { label: 'Primary Node', health: 98, status: 'Stable' },
                            { label: 'Neural Core (Gemini)', health: 100, status: 'Synced' },
                            { label: 'Persistent Database', health: 94, status: 'Optimizing' },
                        ].map((node, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">{node.label}</span>
                                    <span className="text-[10px] text-accent font-mono">{node.status}</span>
                                </div>
                                <div className="h-1 bg-slate-950 rounded-full overflow-hidden">
                                     <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${node.health}%` }}
                                        className="h-full bg-accent"
                                     ></motion.div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Matrix Scanlines */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
        </div>
    );
};
