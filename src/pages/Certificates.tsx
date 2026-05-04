import React from 'react';
import { motion } from 'motion/react';
import { Award, ExternalLink, Calendar, ShieldCheck } from 'lucide-react';
import { certificates } from '../data/certificates';

export const Certificates: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-24 relative overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none z-10 opacity-20"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-20">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16"
            >
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-0.5 bg-accent"></div>
                    <span className="text-accent text-xs font-black uppercase tracking-[0.4em]">Credentials</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white font-mono tracking-tighter uppercase leading-[0.9]">
                    CERTIFICATE <br/>
                    <span className="text-accent underline decoration-accent/20 underline-offset-[12px]">VAULT</span>
                </h1>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {certificates.map((cert, idx) => (
                    <motion.div 
                        key={cert.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group relative bg-slate-900/40 border border-slate-900 hover:border-accent/30 rounded-lg overflow-hidden transition-all duration-500 flex flex-col"
                    >
                        {/* Image/Thumbnail Container */}
                        <div className="aspect-[4/3] relative overflow-hidden bg-slate-950">
                            <img 
                                src={cert.imageUrl} 
                                alt={cert.title}
                                className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 filter grayscale group-hover:grayscale-0"
                                referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
                            
                            {/* Floating Badge */}
                            <div className="absolute top-4 right-4 p-2 bg-accent/10 border border-accent/20 rounded-full text-accent backdrop-blur-sm">
                                <Award className="w-5 h-5" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 flex-grow flex flex-col">
                            <div className="flex items-center gap-2 mb-4">
                                <Calendar className="w-3 h-3 text-slate-600" />
                                <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">{cert.date}</span>
                            </div>
                            
                            <h3 className="text-xl font-bold text-white mb-2 font-mono group-hover:text-accent transition-colors leading-tight uppercase tracking-tighter">
                                {cert.title}
                            </h3>
                            <p className="text-slate-500 text-xs mb-6 font-mono leading-relaxed flex-grow">
                                {cert.description}
                            </p>

                            <div className="pt-6 border-t border-slate-800 flex justify-between items-center mt-auto">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center">
                                        <ShieldCheck className="w-3 h-3 text-slate-400" />
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{cert.issuer}</span>
                                </div>
                                
                                {cert.verifyLink && (
                                    <a 
                                        href={cert.verifyLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-accent hover:text-white transition-colors"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Scanline Effect Overlay */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
                    </motion.div>
                ))}
            </div>

            {/* Empty State / Add Suggestion */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-24 p-12 border border-dashed border-slate-800 rounded-lg text-center"
            >
                <p className="text-slate-600 font-mono text-xs uppercase tracking-[0.3em]">
                    System is ready for more credentials. <br/> 
                    Update <code className="text-accent bg-accent/5 px-2 py-0.5 rounded">src/data/certificates.ts</code> to modify records.
                </p>
            </motion.div>
        </div>
    </div>
  );
};
