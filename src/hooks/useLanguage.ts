import { useEffect, useState } from 'react';

export type LanguageCode = 'en' | 'id' | 'es' | 'ja' | 'ko' | 'zh' | 'fr' | 'ar';

export const useLanguage = () => {
    const [language, setLanguage] = useState<LanguageCode>(() => {
        return (localStorage.getItem('udink-language') as LanguageCode) || 'en';
    });

    useEffect(() => {

        const handleLangChange = (e: Event) => {
            const customEvent = e as CustomEvent;
            setLanguage(customEvent.detail);
        };

        window.addEventListener('languageChanged', handleLangChange);
        return () => window.removeEventListener('languageChanged', handleLangChange);
    }, []);

    return language;
};
