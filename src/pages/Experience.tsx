import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Cpu, Briefcase, Network, Database, X, Globe, Shield } from 'lucide-react';

const EXPERIENCE_NODES = [
    {
        id: 'node-1',
        title: 'Lead System Architect',
        company: 'Global Tech Nexus',
        period: '2022 - PRESENT',
        icon: <Briefcase className="w-5 h-5" />,
        description: 'Architecting high-performance distributed systems and kernel-level optimizations. Orchestrating multi-region cloud clusters with focus on ultra-low latency execution.',
        tags: ['C++', 'Rust', 'Kubernetes', 'gRPC'],
        color: 'from-blue-500 to-cyan-500'
    },
    {
        id: 'node-2',
        title: 'AI Research Scientist',
        company: 'Neural Interface Lab',
        period: '2021 - 2022',
        icon: <Cpu className="w-5 h-5" />,
        description: 'Developed proprietary transformer architectures for real-time neural signal processing and biometric authentication bypass detection.',
        tags: ['Python', 'PyTorch', 'Cuda', 'MLOps'],
        color: 'from-indigo-500 to-purple-500'
    },
    {
        id: 'node-3',
        title: 'Sr. Backend Engineer',
        company: 'Quantum Logistics',
        period: '2020 - 2021',
        icon: <Database className="w-5 h-5" />,
        description: 'Engineered robust data pipelines and microservices for real-time supply chain telemetry. Optimized Postgres query performance by 40%.',
        tags: ['Java', 'Golang', 'PostgreSQL', 'Redis'],
        color: 'from-purple-500 to-pink-500'
    },
    {
        id: 'node-4',
        title: 'Cybersecurity Analyst',
        company: 'Zero-Day Defense',
        period: '2019 - 2020',
        icon: <Shield className="w-5 h-5" />,
        description: 'Conducted penetration testing on industrial SCADA systems and implemented hardware-level encryption protocols for high-security vaults.',
        tags: ['Ethical Hacking', 'Wireshark', 'Metasploit', 'Assembly'],
        color: 'from-red-500 to-orange-500'
    },
    {
        id: 'node-5',
        title: 'Infrastructure Specialist',
        company: 'Neural Networks Inc.',
        period: '2018 - 2019',
        icon: <Network className="w-5 h-5" />,
        description: 'Managed enterprise-scale hybrid cloud environments and secure networking protocols (CCNA/MikroTik). Built automated failover systems.',
        tags: ['Cisco', 'MikroTik', 'Terraform', 'Ansible'],
        color: 'from-emerald-500 to-teal-500'
    },
    {
        id: 'node-6',
        title: 'DevOps Architect',
        company: 'Cloud-Native Forge',
        period: '2017 - 2018',
        icon: <Globe className="w-5 h-5" />,
        description: 'Standardized CI/CD pipelines across 50+ microservices using GitOps methodologies. Reduced deployment time by 65% through containerization.',
        tags: ['Docker', 'Jenkins', 'Bash', 'AWS'],
        color: 'from-cyan-500 to-blue-500'
    },
    {
        id: 'node-7',
        title: 'Embedded Systems Dev',
        company: 'IOT Solutions',
        period: '2016 - 2017',
        icon: <Cpu className="w-5 h-5" />,
        description: 'Developed firmware for industrial sensory nodes and low-power mesh networks. Handled direct hardware interruptions and memory management.',
        tags: ['C', 'Assembly', 'RTOS', 'I2C'],
        color: 'from-orange-500 to-yellow-500'
    },
    {
        id: 'node-8',
        title: 'Game Engine Contributor',
        company: 'Open-Source Reality',
        period: '2015 - 2016',
        icon: <Briefcase className="w-5 h-5" />,
        description: 'Implemented spatial partitioning algorithms for a custom C++ game engine. Contributed to open-source Vulkan renderer modules.',
        tags: ['C++', 'Vulkan', 'GLSL', 'Linear Algebra'],
        color: 'from-yellow-500 to-red-500'
    }
];

export const Experience: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<typeof EXPERIENCE_NODES[0] | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-24 relative overflow-hidden">
        {/* Background FX */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.05)_0%,transparent_100%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none opacity-20"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-slate-100">
            <div className="max-w-4xl mb-24">
                <div className="flex items-center gap-3 mb-8">
                     <div className="w-10 h-px bg-accent"></div>
                     <span className="text-accent text-[10px] font-black uppercase tracking-[0.4em]">Historical_Logs</span>
                </div>
                <h1 className="text-6xl md:text-9xl font-black text-white font-mono tracking-tighter uppercase leading-[0.8] mb-12">
                    NEURAL <br/>
                    <span className="text-accent italic">NODES</span>
                </h1>
                <p className="text-slate-500 font-mono text-xs leading-loose max-w-lg uppercase tracking-widest opacity-60">
                    Interact with the system nodes to decrypt historical career achievements and architectural milestones. The map represents a non-linear progression of technical mastery.
                </p>
            </div>

            <div className="relative flex flex-col items-center justify-center py-12">
                 {/* Interactive Nodes */}
                 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16 relative w-full max-w-6xl z-10">
                    {EXPERIENCE_NODES.map((node, i) => (
                        <motion.button
                            key={node.id}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setSelectedNode(node)}
                            className="group relative flex flex-col items-center gap-6 p-4 rounded-xl border border-transparent hover:border-white/5 hover:bg-white/[0.02] transition-all"
                        >
                            <div className={cn(
                                "w-20 h-20 rounded-full flex items-center justify-center relative transition-all duration-500 border border-white/5",
                                "bg-slate-900/50 backdrop-blur-3xl group-hover:bg-gradient-to-br",
                                node.color
                            )}>
                                <div className="absolute inset-0 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity bg-white"></div>
                                <div className="text-white relative z-10 scale-110">
                                    {node.icon}
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="text-[10px] font-black text-white uppercase tracking-widest mb-1 group-hover:text-accent transition-colors truncate w-32">{node.title}</h3>
                                <div className="text-[8px] text-slate-500 font-mono tracking-widest uppercase">{node.period}</div>
                            </div>
                        </motion.button>
                    ))}
                 </div>

                 {/* Central Detail Overlay */}

                 <AnimatePresence>
                    {selectedNode && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute inset-0 z-20 flex items-center justify-center p-4"
                        >
                            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setSelectedNode(null)}></div>
                            <div className="bg-slate-900 border border-white/10 p-10 max-w-xl w-full rounded-2xl relative shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden">
                                <div className={cn("absolute top-0 left-0 w-full h-1 bg-gradient-to-r", selectedNode.color)}></div>
                                
                                <button 
                                    onClick={() => setSelectedNode(null)}
                                    className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                <div className="mb-10">
                                    <div className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-4">{selectedNode.company} // {selectedNode.period}</div>
                                    <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic">{selectedNode.title}</h2>
                                </div>

                                <p className="text-slate-400 font-mono text-sm leading-loose mb-10 border-l-2 border-accent/20 pl-6 italic">
                                    {selectedNode.description}
                                </p>

                                <div className="flex flex-wrap gap-3">
                                    {selectedNode.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[9px] font-black text-white uppercase tracking-widest">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                 </AnimatePresence>
            </div>

            {/* Specialized Competency Domains */}
            <div className="mt-40 grid md:grid-cols-3 gap-12">
                 {[
                     {
                         title: 'Kernel & Hardware',
                         desc: 'Direct interaction with low-level resources, interrupt handling, and memory-safe architecture in Rust and C++.',
                         status: 'ALPHA_ACCESS'
                     },
                     {
                         title: 'Neural Ops',
                         desc: 'Deployment and optimization of high-parameter AI models within constrained edge environments.',
                         status: 'BETA_STABLE'
                     },
                     {
                         title: 'Infrastructure Security',
                         desc: 'Hardening global enterprise networks through Zero-Trust protocols and automated auditing systems.',
                         status: 'ENCRYPTED'
                     }
                 ].map((spec, i) => (
                     <div key={i} className="p-8 bg-slate-900/40 border border-white/5 rounded-lg group hover:border-accent/30 transition-all">
                          <div className="flex justify-between items-center mb-6">
                               <div className="w-8 h-[1px] bg-accent/30"></div>
                               <span className="text-[8px] font-black text-accent uppercase tracking-widest opacity-50 group-hover:opacity-100">{spec.status}</span>
                          </div>
                          <h4 className="text-xl font-black text-white uppercase tracking-tighter mb-4 italic">{spec.title}</h4>
                          <p className="text-slate-500 font-mono text-xs leading-loose italic">{spec.desc}</p>
                     </div>
                 ))}
            </div>
            
            {/* Tech Stack Horizontal Scroll/Marquee Style */}
            <div className="mt-32 border-t border-slate-900 pt-16">
                 <div className="flex justify-between items-center mb-12">
                     <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">Verified_Tech_Stack</h3>
                     <span className="text-[9px] text-slate-700 font-mono tracking-widest uppercase">[Hardware_Sync: 99.8%]</span>
                 </div>
                 
                 <div className="flex flex-wrap gap-12 justify-center opacity-40 hover:opacity-100 transition-opacity duration-700 grayscale hover:grayscale-0">
                    {[
                        { name: 'C++', path: 'cplusplus/cplusplus-plain.svg' },
                        { name: 'CSharp', path: 'csharp/csharp-plain.svg' },
                        { name: 'Java', path: 'java/java-plain.svg' },
                        { name: 'Lua', path: 'lua/lua-plain.svg' },
                        { name: 'Rust', path: 'rust/rust-plain.svg' },
                        { name: 'PHP', path: 'php/php-plain.svg' },
                        { name: 'MySQL', path: 'mysql/mysql-plain.svg' },
                        { name: 'React', path: 'react/react-original.svg' },
                        { name: 'TypeScript', path: 'typescript/typescript-plain.svg' }
                    ].map((tech) => (
                        <div key={tech.name} className="flex flex-col items-center gap-3 group cursor-crosshair">
                             <img 
                                src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.path}`} 
                                className="w-8 h-8 filter invert group-hover:scale-125 transition-transform" 
                                alt={tech.name}
                             />
                             <span className="text-[7px] font-black text-slate-600 group-hover:text-white uppercase tracking-widest">{tech.name}</span>
                        </div>
                    ))}
                 </div>
            </div>
        </div>
    </div>
  );
};
