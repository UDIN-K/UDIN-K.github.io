import React from 'react';

export const getArchitectureText = (currentTheme: string) => {
    switch (currentTheme) {
        case 'dracula':
            return <span>Digital Architecture by <span className="text-white font-bold">UDINK (UDIN-K)</span>.</span>;
        case 'rosepine':
            return <span className="text-rose-300">Aesthetic Architecture crafted by <span className="text-rose-200 font-bold italic">UDIN-K</span>.</span>;
        case 'terminal':
            return <span className="text-green-500 font-bold drop-shadow-[0_0_5px_rgba(0,255,0,0.8)]">ARCHITECTURE DIBUAT OLEH UDINK [ADMIN]</span>;
        case 'catppuccin':
            return <span className="text-indigo-400 capitalize">Architecture built with love by <span className="font-bold">Udin-K</span>.</span>;
        case 'synthwave':
            return <span className="text-pink-500 font-bold tracking-[0.3em] uppercase drop-shadow-[0_0_8px_rgba(255,42,109,0.8)]">CYBER-ARCHITECTURE BY UDINK_</span>;
        default:
            return <span>Digital Architecture by <span className="text-white font-bold">UDINK (UDIN-K)</span>.</span>;
    }
};

export const getFooterText = (currentTheme: string) => {
    switch (currentTheme) {
        case 'dracula':
            return "Professional Software Engineer specializing in backend architecture, full-stack development, and embedded systems. Creating scalable, high-performance web applications.";
        case 'rosepine':
            return "Aesthetic front-end development, robust back-end engineering, and elegant code architecture. Building beautiful and functional web applications.";
        case 'terminal':
            return "SOFTWARE ENGINEER. LOW-LEVEL SYSTEM OPTIMIZATION, BACKEND ARCHITECTURE, AND SECURE WEB DEVELOPMENT.";
        case 'catppuccin':
            return "Clean UI/UX design, robust full-stack web development, and efficient code. Building friendly and fast digital experiences.";
        case 'synthwave':
            return "CYBER-ENGINEER. ADVANCED SYSTEM ARCHITECTURE, MODERN WEB DEV, AND NEXT-GEN SOFTWARE SOLUTIONS.";
        default:
            return "Professional Software Engineer specializing in backend architecture, full-stack development, and embedded systems. Creating scalable, high-performance web applications.";
    }
};

export const getCopyrightText = (currentTheme: string, year: number) => {
    switch (currentTheme) {
        case 'dracula':
            return `© ${year} UDINK (UDIN-K). ALL SYSTEMS NOMINAL.`;
        case 'rosepine':
            return `✧ ${year} UDIN-K. CRAFTED WITH ELEGANCE ✧`;
        case 'terminal':
            return `[${year}] SYS_ADMIN: UDINK. CONNECTION SECURE.`;
        case 'catppuccin':
            return `♡ ${year} UDIN-K. PURR-FECT LOGIC. ♡`;
        case 'synthwave':
            return `© ${year} UDINK_CORP. GRID RUNNERS.`;
        default:
            return `© ${year} UDINK (UDIN-K). ALL SYSTEMS NOMINAL.`;
    }
};
