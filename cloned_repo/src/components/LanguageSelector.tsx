import React, { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';
import { cn } from '../lib/utils';
import { LanguageCode } from '../hooks/useLanguage';

const LANGUAGES: { code: LanguageCode; name: string }[] = [
    { code: 'en', name: 'EN - English' },
    { code: 'id', name: 'ID - Indonesia' },
    { code: 'es', name: 'ES - Español' },
    { code: 'ja', name: 'JA - 日本語' },
    { code: 'ko', name: 'KO - 한국어' },
    { code: 'zh', name: 'ZH - 中文' },
    { code: 'fr', name: 'FR - Français' },
    { code: 'ar', name: 'AR - العربية' }
];

export const LanguageSelector: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState<LanguageCode>(() => {
        return (localStorage.getItem('udink-language') as LanguageCode) || 'en';
    });

    useEffect(() => {
        const handleLangChange = (e: Event) => {
            const customEvent = e as CustomEvent;
            setCurrentLang(customEvent.detail);
        };
        window.addEventListener('languageChanged', handleLangChange);
        return () => window.removeEventListener('languageChanged', handleLangChange);
    }, []);

    const setLanguage = (lang: LanguageCode) => {
        setCurrentLang(lang);
        localStorage.setItem('udink-language', lang);
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 flex items-center justify-center rounded border border-slate-800 text-slate-400 hover:text-accent hover:border-accent/40 bg-slate-900/50 transition-all active:scale-95 text-xs font-bold uppercase"
                title="Change Language"
            >
                {currentLang}
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute right-0 top-full mt-2 w-40 bg-slate-900 border border-slate-800 rounded-md shadow-2xl z-50 overflow-hidden flex flex-col py-1">
                        <div className="px-3 py-2 border-b border-slate-800 flex items-center gap-2">
                            <Globe className="w-3 h-3 text-slate-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Language</span>
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                            {LANGUAGES.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => setLanguage(lang.code)}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-3 py-2 text-xs font-mono transition-colors text-left",
                                        currentLang === lang.code ? "bg-slate-800 text-white" : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                                    )}
                                >
                                    {lang.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
