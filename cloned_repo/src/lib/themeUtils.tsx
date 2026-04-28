import React from 'react';

export const getArchitectureText = (currentTheme: string) => {
    switch (currentTheme) {
        case 'dracula':
            return <span>Digital Architecture by <span className="text-white font-bold">Muhammad Syafri (UDIN-K)</span>.</span>;
        case 'rosepine':
            return <span className="text-rose-300">Aesthetic Architecture crafted by <span className="text-rose-200 font-bold italic">UDIN-K</span>.</span>;
        case 'terminal':
            return <span className="text-green-500 font-bold drop-shadow-[0_0_5px_rgba(0,255,0,0.8)]">ARCHITECTURE DIBUAT OLEH UDINK [ADMIN]</span>;
        case 'catppuccin':
            return <span className="text-indigo-400 capitalize">Architecture built with love by <span className="font-bold">Udin-K</span>.</span>;
        case 'synthwave':
            return <span className="text-pink-500 font-bold tracking-[0.3em] uppercase drop-shadow-[0_0_8px_rgba(255,42,109,0.8)]">CYBER-ARCHITECTURE BY UDINK_</span>;
        default:
            return <span>Digital Architecture by <span className="text-white font-bold">Muhammad Syafri (UDIN-K)</span>.</span>;
    }
};

export const getFooterText = (currentTheme: string) => {
    switch (currentTheme) {
        case 'dracula':
            return "System architecture, low-level optimization, and neural experimentation. Bridging the gap between binary logic and creative expression.";
        case 'rosepine':
            return "Aesthetic engineering, smooth transitions, and elegant code. Weaving beauty into functional logic.";
        case 'terminal':
            return "ROOT ACCESS SECURED. LOW-LEVEL BINARY OPTIMIZATION AND KERNEL HACKING MODE INITIATED.";
        case 'catppuccin':
            return "Clean architecture, friendly UI design, and cozy coding environments. Making text pop and logic smooth.";
        case 'synthwave':
            return "NEON DREAMS AND RETRO FUTURISM. HACKING THE MAINFRAME SINCE '84.";
        default:
            return "System architecture, low-level optimization, and neural experimentation. Bridging the gap between binary logic and creative expression.";
    }
};

export const getCopyrightText = (currentTheme: string, year: number) => {
    switch (currentTheme) {
        case 'dracula':
            return `© ${year} MUHAMMAD SYAFRI (UDIN-K). ALL SYSTEMS NOMINAL.`;
        case 'rosepine':
            return `✧ ${year} UDIN-K. CRAFTED WITH ELEGANCE ✧`;
        case 'terminal':
            return `[${year}] SYS_ADMIN: UDINK. CONNECTION SECURE.`;
        case 'catppuccin':
            return `♡ ${year} UDIN-K. PURR-FECT LOGIC. ♡`;
        case 'synthwave':
            return `© ${year} UDINK_CORP. GRID RUNNERS.`;
        default:
            return `© ${year} MUHAMMAD SYAFRI (UDIN-K). ALL SYSTEMS NOMINAL.`;
    }
};
