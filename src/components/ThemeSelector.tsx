import React, { useEffect, useState } from 'react';
import { Palette } from 'lucide-react';
import { cn } from '../lib/utils';

const themes = [
    { id: 'dracula', name: 'Dracula', accent: '#ff79c6', bg: '#282a36' },
    { id: 'rosepine', name: 'Rosé Pine', accent: '#f6c177', bg: '#191724' },
    { id: 'terminal', name: 'Terminal', accent: '#00ff00', bg: '#000000' },
    { id: 'catppuccin', name: 'Catppuccin', accent: '#7287fd', bg: '#eff1f5' },
    { id: 'synthwave', name: 'Synthwave \'84', accent: '#ff2a6d', bg: '#2b213a' },
];

export const ThemeSelector: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentTheme, setCurrentTheme] = useState(() => {
        return localStorage.getItem('udink-theme') || 'dracula';
    });

    useEffect(() => {
        const savedTheme = localStorage.getItem('udink-theme') || 'dracula';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    const setTheme = (themeId: string) => {
        setCurrentTheme(themeId);
        document.documentElement.setAttribute('data-theme', themeId);
        localStorage.setItem('udink-theme', themeId);
        setIsOpen(false);
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: themeId }));
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 flex items-center justify-center rounded border border-slate-800 text-slate-400 hover:text-accent hover:border-accent/40 bg-slate-900/50 transition-all active:scale-95"
                title="Change Theme"
            >
                <Palette className="w-4 h-4" />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute right-0 top-full mt-2 w-48 bg-slate-900 border border-slate-800 rounded-md shadow-2xl z-50 overflow-hidden flex flex-col py-1">
                        <div className="px-3 py-2 border-b border-slate-800">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">System Themes</span>
                        </div>
                        {themes.map(theme => (
                            <button
                                key={theme.id}
                                onClick={() => setTheme(theme.id)}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 text-xs font-mono transition-colors text-left",
                                    currentTheme === theme.id ? "bg-slate-800 text-white" : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                                )}
                            >
                                <div className="flex gap-1 border border-slate-800 rounded-full p-0.5" style={{ backgroundColor: theme.bg }}>
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.accent }}></div>
                                </div>
                                {theme.name}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
