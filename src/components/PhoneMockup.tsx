import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
    Search, Filter, MoreVertical, Calendar, RotateCw, 
    Trash2, Globe, Settings, EyeOff, LayoutTemplate, 
    Database, FileDown, Pin, CloudOff, BookHeart, List, Activity, Settings2, PlusSquare
} from 'lucide-react';

export default function PhoneMockup() {
    const tabs = ['library', 'updates', 'history', 'browse', 'more'];
    const [activeTab, setActiveTab] = useState('library');

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTab(prev => {
                const idx = tabs.indexOf(prev);
                return tabs[(idx + 1) % tabs.length];
            });
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const renderTabContent = () => {
        switch (activeTab) {
            case 'library':
                return (
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="flex flex-col h-full text-white font-sans"
                    >
                        <div className="flex justify-between items-center pb-3">
                            <div className="font-medium text-lg tracking-wide text-gray-100">Library</div>
                            <div className="flex gap-3">
                                <Search className="w-[18px] h-[18px] opacity-70" />
                                <Filter className="w-[18px] h-[18px] opacity-70" />
                                <MoreVertical className="w-[18px] h-[18px] opacity-70" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 pb-4 overflow-hidden">
                            <div className="aspect-[2/3] bg-gradient-to-br from-slate-700 to-slate-800 rounded flex flex-col relative overflow-hidden group shadow-lg">
                                <div className="absolute inset-0 opacity-40 bg-[url('/img/koma.png')] bg-cover bg-center mix-blend-overlay"></div>
                                <div className="h-12 bg-gradient-to-t from-[#14151a] to-transparent p-1.5 text-[9px] text-white absolute bottom-0 left-0 right-0 leading-tight flex items-end">Kidnapped Dragons</div>
                                <div className="absolute top-1 left-1 bg-teal-500 text-white text-[9px] px-1 rounded-sm font-semibold">14</div>
                            </div>
                            <div className="aspect-[2/3] bg-gradient-to-br from-slate-700 to-slate-800 rounded flex flex-col relative overflow-hidden group shadow-lg">
                                <div className="absolute inset-0 opacity-40 bg-[url('/img/koma.png')] bg-cover bg-center mix-blend-overlay"></div>
                                <div className="h-12 bg-gradient-to-t from-[#14151a] to-transparent p-1.5 text-[9px] text-white absolute bottom-0 left-0 right-0 leading-tight flex items-end">The Baby Raises a Villain</div>
                            </div>
                            <div className="aspect-[2/3] bg-gradient-to-br from-slate-700 to-slate-800 rounded flex flex-col relative overflow-hidden group shadow-lg">
                                <div className="absolute inset-0 opacity-40 bg-[url('/img/koma.png')] bg-cover bg-center mix-blend-overlay"></div>
                                <div className="h-12 bg-gradient-to-t from-[#14151a] to-transparent p-1.5 text-[9px] text-white absolute bottom-0 left-0 right-0 leading-tight flex items-end">Tsue to Tsurugi no Wistoria</div>
                                <div className="absolute top-1 left-1 bg-teal-500 text-white text-[9px] px-1 rounded-sm font-semibold">14</div>
                            </div>
                            <div className="aspect-[2/3] bg-gradient-to-br from-slate-700 to-slate-800 rounded flex flex-col relative overflow-hidden group shadow-lg">
                                <div className="absolute inset-0 opacity-40 bg-[url('/img/koma.png')] bg-cover bg-center mix-blend-overlay"></div>
                                <div className="h-12 bg-gradient-to-t from-[#14151a] to-transparent p-1.5 text-[9px] text-white absolute bottom-0 left-0 right-0 leading-tight flex items-end">Eiyuu to Majo no Tensei...</div>
                            </div>
                        </div>
                    </motion.div>
                );
            case 'updates':
                return (
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="flex flex-col h-full text-white font-sans"
                    >
                        <div className="flex justify-between items-center pb-3">
                            <div className="font-medium text-lg tracking-wide text-gray-100">Updates</div>
                            <div className="flex gap-3">
                                <Filter className="w-[18px] h-[18px] opacity-70" />
                                <Calendar className="w-[18px] h-[18px] opacity-70" />
                                <RotateCw className="w-[18px] h-[18px] opacity-70" />
                            </div>
                        </div>
                        <div className="text-[10px] text-slate-400 mb-2 font-medium">April 2026</div>
                        <div className="grid grid-cols-7 gap-1 text-center text-[8px] text-slate-500 mb-3 font-semibold">
                            <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                            <span></span><span></span><span></span><span>1</span><span>2</span><span>3</span><span>4</span>
                        </div>
                        <div className="text-[9px] text-slate-500 italic mb-3">Library last updated: 10 hours ago</div>
                        
                        <div className="text-[10px] font-bold text-gray-200 mb-2">Today</div>
                        <div className="flex gap-2 items-center mb-3">
                            <div className="w-8 h-10 bg-slate-700 rounded-sm shrink-0"></div>
                            <div className="flex-1">
                                <div className="text-[10px] text-slate-200">The Novel Extra</div>
                                <div className="text-[9px] text-slate-400">Chapter 155</div>
                            </div>
                            <FileDown className="w-4 h-4 text-slate-500" />
                        </div>
                        
                        <div className="text-[10px] font-bold text-gray-200 mb-2">Yesterday</div>
                        <div className="flex gap-2 items-center mb-2">
                            <div className="w-8 h-10 bg-slate-700 rounded-sm shrink-0"></div>
                            <div className="flex-1">
                                <div className="text-[10px] text-slate-200">Bocil Pembuat Ulah</div>
                                <div className="text-[9px] text-blue-400">● Chapter 42</div>
                            </div>
                            <FileDown className="w-4 h-4 text-slate-500" />
                        </div>
                    </motion.div>
                );
            case 'history':
                return (
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="flex flex-col h-full text-white font-sans"
                    >
                        <div className="flex justify-between items-center pb-3">
                            <div className="font-medium text-lg tracking-wide text-gray-100">History</div>
                            <div className="flex gap-3">
                                <Search className="w-[18px] h-[18px] opacity-70" />
                                <Trash2 className="w-[18px] h-[18px] opacity-70" />
                            </div>
                        </div>
                        
                        <div className="text-[10px] font-bold text-gray-200 mb-2">Today</div>
                        <div className="flex gap-2 items-center mb-3">
                            <div className="w-8 h-10 bg-slate-700 rounded-sm shrink-0"></div>
                            <div className="flex-1">
                                <div className="text-[10px] text-slate-200 font-medium">Bocil Pembuat Ulah</div>
                                <div className="text-[9px] text-slate-400">Ch. 38 - 1:08 PM</div>
                            </div>
                            <Trash2 className="w-[14px] h-[14px] text-slate-500" />
                        </div>
                        <div className="flex gap-2 items-center mb-3">
                            <div className="w-8 h-10 bg-slate-700 rounded-sm shrink-0"></div>
                            <div className="flex-1">
                                <div className="text-[10px] text-slate-200 font-medium">The Novel Extra</div>
                                <div className="text-[9px] text-slate-400">Ch. 155 - 3:36 AM</div>
                            </div>
                            <Trash2 className="w-[14px] h-[14px] text-slate-500" />
                        </div>
                        <div className="flex gap-2 items-center mb-3">
                            <div className="w-8 h-10 bg-slate-700 rounded-sm shrink-0"></div>
                            <div className="flex-1">
                                <div className="text-[10px] text-slate-200 font-medium">From Pauper to Prince</div>
                                <div className="text-[9px] text-slate-400">Ch. 7 - 3:30 AM</div>
                            </div>
                            <div className="flex gap-2">
                                <BookHeart className="w-[14px] h-[14px] text-slate-300" />
                                <Trash2 className="w-[14px] h-[14px] text-slate-500" />
                            </div>
                        </div>
                    </motion.div>
                );
            case 'browse':
                return (
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="flex flex-col h-full text-white font-sans"
                    >
                        <div className="flex justify-between items-center pb-2">
                            <div className="font-medium text-lg tracking-wide text-gray-100">Browse</div>
                            <div className="flex gap-3">
                                <Globe className="w-[18px] h-[18px] opacity-70" />
                                <Filter className="w-[18px] h-[18px] opacity-70" />
                            </div>
                        </div>
                        <div className="flex gap-3 text-[10px] font-semibold text-slate-400 border-b border-slate-700 pb-2 mb-3">
                            <span className="text-teal-400">Sources</span>
                            <span>Feed</span>
                            <span>Extensions</span>
                            <span>Migrate</span>
                        </div>
                        
                        <div className="text-[10px] font-bold text-gray-200 mb-2">Last used</div>
                        <div className="flex justify-between items-center mb-3">
                            <div className="flex gap-2 items-center">
                                <div className="w-6 h-6 bg-blue-500 rounded flex justify-center items-center font-bold text-white text-[10px]">K</div>
                                <div>
                                    <div className="text-[10px] font-medium text-slate-200">Kiryuu</div>
                                    <div className="text-[8px] text-slate-400">Indonesia</div>
                                </div>
                            </div>
                            <Pin className="w-[12px] h-[12px] text-slate-400 rotate-45" />
                        </div>

                        <div className="text-[10px] font-bold text-gray-200 mb-2">Pinned</div>
                        <div className="flex justify-between items-center mb-3">
                            <div className="flex gap-2 items-center">
                                <div className="w-6 h-6 bg-slate-800 rounded flex justify-center items-center font-bold text-white text-[10px]">S</div>
                                <div>
                                    <div className="text-[10px] font-medium text-slate-200">Shinigami</div>
                                    <div className="text-[8px] text-slate-400">Indonesia</div>
                                </div>
                            </div>
                            <Pin className="w-[12px] h-[12px] text-teal-400 rotate-45 fill-current" />
                        </div>
                    </motion.div>
                );
            case 'more':
                return (
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="flex flex-col h-full text-white font-sans"
                    >
                        <div className="flex flex-col items-center py-4 border-b border-slate-800 mb-2">
                            <div className="text-2xl font-bold tracking-widest text-white">KOMA</div>
                            <div className="text-[8px] text-slate-400 italic mt-1 relative">
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-blue-400 font-sans not-italic">コマ</span>
                                Every chapter. Everywhere.
                            </div>
                        </div>

                        <div className="flex items-center gap-3 py-2">
                            <CloudOff className="w-[18px] h-[18px] text-teal-400" />
                            <div className="flex-1">
                                <div className="text-[10px] font-medium text-slate-200">Downloaded only</div>
                                <div className="text-[8px] text-slate-400">Filters all entries in your library</div>
                            </div>
                            <div className="w-6 h-3 bg-slate-600 rounded-full relative"><div className="w-2.5 h-2.5 bg-slate-400 rounded-full absolute top-[1px] left-[1px]"></div></div>
                        </div>
                        <div className="flex items-center gap-3 py-2 border-b border-slate-800 mb-1">
                            <EyeOff className="w-[18px] h-[18px] text-teal-400" />
                            <div className="flex-1">
                                <div className="text-[10px] font-medium text-slate-200">Incognito mode</div>
                                <div className="text-[8px] text-slate-400">Pauses reading history</div>
                            </div>
                            <div className="w-6 h-3 bg-slate-600 rounded-full relative"><div className="w-2.5 h-2.5 bg-slate-400 rounded-full absolute top-[1px] left-[1px]"></div></div>
                        </div>
                        
                        <div className="flex items-center gap-3 py-2">
                            <FileDown className="w-[16px] h-[16px] text-teal-400" />
                            <span className="text-[10px] text-slate-200">Download queue</span>
                        </div>
                        <div className="flex items-center gap-3 py-2">
                            <LayoutTemplate className="w-[16px] h-[16px] text-teal-400" />
                            <span className="text-[10px] text-slate-200">Categories</span>
                        </div>
                        <div className="flex items-center gap-3 py-2">
                            <Activity className="w-[16px] h-[16px] text-teal-400" />
                            <span className="text-[10px] text-slate-200">Statistics</span>
                        </div>
                    </motion.div>
                );
        }
    };

    return (
        <div className="relative w-full max-w-[280px] aspect-[1/2.15] bg-[#121319] rounded-[3rem] border-[4px] border-[#2a2c36] overflow-hidden shadow-[0_0_80px_rgba(255,121,198,0.15)] flex flex-col ring-8 ring-[#1A1C23]">
            {/* Top status bar area */}
            <div className="h-7 w-full bg-[#121319] flex justify-between items-center px-4 pt-1 shrink-0 relative z-20 text-[8px] text-white/80 font-sans">
                <span>22:35</span>
                <div className="absolute left-1/2 -ml-12 w-24 h-5 bg-[#0a0a0d] rounded-full top-1.5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]"></div>
                <div className="flex gap-1">
                    <span>5G</span>
                    <span className="w-3 h-2 border border-white/80 rounded-[2px] relative"><span className="absolute inset-px bg-white/80 rounded-[1px]"></span></span>
                </div>
            </div>
            
            {/* Mockup content */}
            <div className="flex-1 min-h-0 bg-[#121319] px-4 pt-1 overflow-hidden relative">
                <AnimatePresence mode="wait">
                    <motion.div key={activeTab} className="h-full w-full overflow-y-auto overflow-x-hidden no-scrollbar">
                        {renderTabContent()}
                    </motion.div>
                </AnimatePresence>
            </div>
            
            {/* Bottom navbar area */}
            <div className="h-14 bg-[#121319] border-t border-[#2a2c36]/40 shrink-0 flex justify-around items-center px-2 pb-2 pt-1 font-sans relative z-20">
                <button onClick={() => setActiveTab('library')} className={`flex flex-col items-center gap-1 w-12 justify-center transition-opacity ${activeTab === 'library' ? 'opacity-100 text-teal-400' : 'opacity-80 text-slate-200'}`}>
                    <div className={`w-10 h-6 flex items-center justify-center rounded-full transition-colors ${activeTab === 'library' ? 'bg-teal-400/20' : ''}`}>
                        <LayoutTemplate className={`w-4 h-4 ${activeTab === 'library' ? 'fill-current' : ''}`} />
                    </div>
                    <span className="text-[8px] font-semibold tracking-wider">Library</span>
                </button>
                <button onClick={() => setActiveTab('updates')} className={`flex flex-col items-center gap-1 w-12 justify-center transition-opacity ${activeTab === 'updates' ? 'opacity-100 text-teal-400' : 'opacity-80 text-slate-200'}`}>
                    <div className={`w-10 h-6 flex items-center justify-center rounded-full transition-colors ${activeTab === 'updates' ? 'bg-teal-400/20' : ''}`}>
                        <svg className={`w-4 h-4 ${activeTab === 'updates' ? 'fill-current' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    </div>
                    <span className="text-[8px] font-semibold tracking-wider">Updates</span>
                </button>
                <button onClick={() => setActiveTab('history')} className={`flex flex-col items-center gap-1 w-12 justify-center transition-opacity ${activeTab === 'history' ? 'opacity-100 text-teal-400' : 'opacity-80 text-slate-200'}`}>
                    <div className={`w-10 h-6 flex items-center justify-center rounded-full transition-colors ${activeTab === 'history' ? 'bg-teal-400/20' : ''}`}>
                        <RotateCw className="w-4 h-4" />
                    </div>
                    <span className="text-[8px] font-semibold tracking-wider">History</span>
                </button>
                <button onClick={() => setActiveTab('browse')} className={`flex flex-col items-center gap-1 w-12 justify-center relative transition-opacity ${activeTab === 'browse' ? 'opacity-100 text-teal-400' : 'opacity-80 text-slate-200'}`}>
                    <div className="absolute -top-1 right-2 w-3 h-3 bg-red-400 rounded-full text-[6px] text-white flex items-center justify-center font-bold z-10 border border-[#121319]">1</div>
                    <div className={`w-10 h-6 flex items-center justify-center rounded-full transition-colors ${activeTab === 'browse' ? 'bg-teal-400/20' : ''}`}>
                        <Globe className="w-4 h-4" />
                    </div>
                    <span className="text-[8px] font-semibold tracking-wider">Browse</span>
                </button>
                <button onClick={() => setActiveTab('more')} className={`flex flex-col items-center gap-1 w-12 justify-center transition-opacity ${activeTab === 'more' ? 'opacity-100 text-teal-400' : 'opacity-80 text-slate-200'}`}>
                    <div className={`w-10 h-6 flex items-center justify-center rounded-full transition-colors ${activeTab === 'more' ? 'bg-teal-400/20' : ''}`}>
                        <MoreHorizontal className="w-4 h-4" />
                    </div>
                    <span className="text-[8px] font-semibold tracking-wider">More</span>
                </button>
            </div>
            
            {/* Navigation pill */}
            <div className="absolute bottom-1 w-full flex justify-center z-30">
                <div className="w-20 h-1 bg-white/20 rounded-full"></div>
            </div>
        </div>
    );
}

// Inline fallback for MoreHorizontal since it wasn't imported
const MoreHorizontal = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
);
