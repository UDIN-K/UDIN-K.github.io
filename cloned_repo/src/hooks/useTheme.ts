import { useEffect, useState } from 'react';

export const useTheme = () => {
    const [currentTheme, setCurrentTheme] = useState(() => {
        return localStorage.getItem('udink-theme') || 'dracula';
    });

    useEffect(() => {

        const handleThemeChange = (e: Event) => {
            const customEvent = e as CustomEvent;
            setCurrentTheme(customEvent.detail);
        };

        window.addEventListener('themeChanged', handleThemeChange);
        return () => window.removeEventListener('themeChanged', handleThemeChange);
    }, []);

    return currentTheme;
};
