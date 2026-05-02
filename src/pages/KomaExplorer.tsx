import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Plug, Download, Search, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useSEO } from '../hooks/useSEO';

interface Extension {
    name: string;
    pkg: string;
    apk: string;
    lang: string;
    code: number;
    version: string;
    nsfw: number;
    sources: { name: string; lang: string; baseUrl: string; id: string }[];
}

const REPO_BASE = `${window.location.origin}/repo`;
const KEIYOUSHI_RAW = 'https://raw.githubusercontent.com/keiyoushi/extensions/repo';

export const KomaExplorer: React.FC = () => {
    const language = useLanguage();

    useSEO({
        title: 'Koma Extensions Explorer — UDINK',
        description: 'Browse and search Koma extensions. Download APKs or use the repository link.'
    });
    const [extensions, setExtensions] = useState<Extension[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    
    // Pagination
    const [page, setPage] = useState(1);
    const itemsPerPage = 24;

    const [filterLang, setFilterLang] = useState('all');
    const [filterNsfw, setFilterNsfw] = useState<'all' | 'sfw' | 'nsfw'>('all');

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchExtensions = async () => {
            try {
                const res = await fetch(`${REPO_BASE}/index.min.json`);
                const data = await res.json();
                setExtensions(data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to load extensions', err);
                setLoading(false);
            }
        };
        fetchExtensions();
    }, []);

    const t = {
        en: {
            title: "Koma Extensions Explorer",
            subtitle: "Browse and search through all available extensions. Download APKs directly or use the repository link.",
            back: "Back to Dashboard",
            searchPlaceholder: "Search extensions by name...",
            downloadTag: "DOWNLOAD",
            nsfw: "NSFW",
            sfw: "SFW",
            allLang: "All Languages",
            allType: "All Content",
            loadMore: "Load More",
            noResult: "No extensions found matching"
        },
        id: {
            title: "Penjelajah Ekstensi Koma",
            subtitle: "Jelajahi dan cari semua ekstensi yang tersedia. Unduh APK secara langsung atau gunakan tautan repositori.",
            back: "Kembali ke Beranda",
            searchPlaceholder: "Cari ekstensi berdasarkan nama...",
            downloadTag: "UNDUH",
            nsfw: "NSFW",
            sfw: "SFW",
            allLang: "Semua Bahasa",
            allType: "Semua Konten",
            loadMore: "Muat Lebih Banyak",
            noResult: "Tidak ada ekstensi yang cocok dengan"
        },
        es: {
            title: "Explorador de Extensiones",
            subtitle: "Navega y busca en todas las extensiones. Descarga APKs directamente o usa el repositorio.",
            back: "Volver al Inicio",
            searchPlaceholder: "Buscar por nombre...",
            downloadTag: "DESCARGAR",
            nsfw: "NSFW",
            sfw: "SFW",
            allLang: "Todos los Idiomas",
            allType: "Todo el Contenido",
            loadMore: "Cargar Más",
            noResult: "No se encontraron extensiones para"
        },
        ja: {
            title: "拡張機能エクスプローラー",
            subtitle: "利用可能なすべての拡張機能を検索して閲覧。APKを直接ダウンロード。",
            back: "ダッシュボードに戻る",
            searchPlaceholder: "名前で拡張機能を検索...",
            downloadTag: "ダウンロード",
            nsfw: "NSFW",
            sfw: "SFW",
            allLang: "すべての言語",
            allType: "すべてのコンテンツ",
            loadMore: "さらに読み込む",
            noResult: "一致する拡張機能が見つかりません"
        },
        ko: {
            title: "확장 프로그램 탐색기",
            subtitle: "가능한 모든 확장 프로그램을 찾아 탐색합니다. APK를 직접 다운로드하세요.",
            back: "대시보드로 돌아가기",
            searchPlaceholder: "이름으로 확장 프로그램 검색...",
            downloadTag: "다운로드",
            nsfw: "NSFW",
            sfw: "SFW",
            allLang: "모든 언어",
            allType: "모든 콘텐츠",
            loadMore: "더 보기",
            noResult: "일치하는 확장 프로그램을 찾을 수 없습니다"
        },
        zh: {
            title: "扩展探索器",
            subtitle: "浏览和搜索所有可用扩展。直接下载APK或使用仓库链接。",
            back: "返回主页",
            searchPlaceholder: "按名称搜索扩展...",
            downloadTag: "下载",
            nsfw: "NSFW",
            sfw: "SFW",
            allLang: "所有语言",
            allType: "所有内容",
            loadMore: "加载更多",
            noResult: "没有找到匹配的扩展"
        },
        fr: {
            title: "Explorateur d'Extensions",
            subtitle: "Parcourez et recherchez toutes les extensions disponibles. Téléchargez les APK directement.",
            back: "Retour au Tableau de Bord",
            searchPlaceholder: "Rechercher par nom...",
            downloadTag: "TÉLÉCHARGER",
            nsfw: "NSFW",
            sfw: "SFW",
            allLang: "Toutes les Langues",
            allType: "Tout le Contenu",
            loadMore: "Charger Plus",
            noResult: "Aucune extension ne correspond à"
        },
        ar: {
            title: "مستكشف الإضافات",
            subtitle: "تصفح وابحث في جميع الإضافات المتاحة. حمل ملفات APK مباشرة.",
            back: "العودة للوحة القيادة",
            searchPlaceholder: "البحث عن إضافات بالاسم...",
            downloadTag: "تحميل",
            nsfw: "غير لائق",
            sfw: "لائق",
            allLang: "جميع اللغات",
            allType: "كل المحتوى",
            loadMore: "تحميل المزيد",
            noResult: "لم يتم العثور على إضافات تطابق"
        }
    };

    const text = t[language as keyof typeof t] || t.en;

    const getLangName = (code: string, displayLang: string) => {
        try {
            const displayNames = new Intl.DisplayNames([displayLang], { type: 'language' });
            const name = displayNames.of(code);
            return name ? name.charAt(0).toUpperCase() + name.slice(1) : code.toUpperCase();
        } catch {
            return code.toUpperCase();
        }
    };

    const uniqueLangs = Array.from(new Set(extensions.map(e => e.lang)))
        .filter(lang => lang.toLowerCase() !== 'all')
        .sort((a, b) => getLangName(a, language).localeCompare(getLangName(b, language)));

    const filteredExtensions = extensions.filter(ext => {
        const matchSearch = ext.name.toLowerCase().includes(search.toLowerCase());
        const matchLang = filterLang === 'all' || ext.lang === filterLang;
        const matchNsfw = filterNsfw === 'all' || (filterNsfw === 'nsfw' ? ext.nsfw === 1 : ext.nsfw === 0);
        return matchSearch && matchLang && matchNsfw;
    });

    const paginatedExtensions = filteredExtensions.slice(0, page * itemsPerPage);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const handleFilterLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterLang(e.target.value);
        setPage(1);
    };

    const handleFilterNsfw = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterNsfw(e.target.value as 'all' | 'sfw' | 'nsfw');
        setPage(1);
    };

    return (
        <div className="min-h-screen bg-slate-950 pt-32 pb-24 relative overflow-hidden font-sans">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none"></div>
            
            <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
                <div className="max-w-6xl mx-auto mb-12">
                     <Link 
                        to="/koma" 
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-accent transition-colors font-mono text-sm mb-8 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        {text.back}
                    </Link>

                    <h1 className="text-4xl font-black text-white font-mono tracking-tighter mb-4">{text.title}</h1>
                    <p className="text-slate-400 font-mono text-sm max-w-2xl">{text.subtitle}</p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-[#1A1C23]/80 p-4 rounded-xl border border-slate-800/60">
                        <div className="relative flex-1 md:max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="w-4 h-4 text-slate-500" />
                            </div>
                            <input 
                                type="text" 
                                value={search}
                                onChange={handleSearch}
                                placeholder={text.searchPlaceholder}
                                className="w-full bg-slate-950/80 border border-slate-700/60 text-white pl-10 pr-4 py-3 rounded-lg outline-none focus:border-accent font-mono text-sm transition-colors"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <select 
                                value={filterLang}
                                onChange={handleFilterLang}
                                className="bg-slate-950/80 border border-slate-700/60 text-white rounded-lg outline-none focus:border-accent font-mono text-sm transition-colors py-3 px-4 min-w-[200px]"
                            >
                                <option value="all">{text.allLang}</option>
                                {uniqueLangs.map(l => (
                                    <option key={l} value={l}>{l.toUpperCase()} - {getLangName(l, language)}</option>
                                ))}
                            </select>
                            
                            <select 
                                value={filterNsfw}
                                onChange={handleFilterNsfw}
                                className="bg-slate-950/80 border border-slate-700/60 text-white rounded-lg outline-none focus:border-accent font-mono text-sm transition-colors py-3 px-4"
                            >
                                <option value="all">{text.allType}</option>
                                <option value="sfw">{text.sfw}</option>
                                <option value="nsfw">{text.nsfw}</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                className="w-12 h-12 border-4 border-slate-800 border-t-accent rounded-full"
                            />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {paginatedExtensions.map((ext, i) => (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    key={i} 
                                    className="bg-[#1A1C23]/60 border border-slate-800/60 hover:border-slate-700 rounded-xl p-5 flex flex-col transition-colors group"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="w-10 h-10 rounded bg-slate-800/50 flex items-center justify-center overflow-hidden shrink-0">
                                            <img 
                                                src={`${KEIYOUSHI_RAW}/icon/${ext.pkg}.png`} 
                                                alt={ext.name} 
                                                className="w-full h-full object-cover" 
                                                onError={(e) => { 
                                                    e.currentTarget.style.display = 'none'; 
                                                    e.currentTarget.nextElementSibling?.classList.remove('hidden'); 
                                                }} 
                                            />
                                            <Plug className="w-5 h-5 text-accent hidden" />
                                        </div>
                                        <div className="flex gap-2 text-[10px] font-black font-mono">
                                            {ext.nsfw === 1 && (
                                                <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">{text.nsfw}</span>
                                            )}
                                            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 uppercase">{ext.lang}</span>
                                        </div>
                                    </div>
                                    <h3 className="text-white font-bold mb-1 truncate" title={ext.name}>{ext.name.replace('Tachiyomi: ', '')}</h3>
                                    <p className="text-slate-500 text-xs font-mono mb-4 truncate">v{ext.version} • {ext.sources.length} sources</p>
                                    
                                    <a 
                                        href={`${KEIYOUSHI_RAW}/apk/${ext.apk}`}
                                        className="mt-auto flex items-center justify-between p-3 bg-slate-950/50 rounded border border-slate-800/50 group-hover:bg-accent/10 group-hover:border-accent/30 transition-colors"
                                    >
                                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 group-hover:text-accent transition-colors">
                                            {text.downloadTag}
                                        </span>
                                        <Download className="w-3 h-3 text-slate-500 group-hover:text-accent" />
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    )}
                    
                    {!loading && paginatedExtensions.length < filteredExtensions.length && (
                        <div className="mt-12 flex justify-center">
                            <button 
                                onClick={() => setPage(p => p + 1)}
                                className="px-10 py-4 bg-slate-900 border border-slate-700 text-white font-bold rounded-full hover:bg-slate-800 hover:border-slate-600 transition-all text-xs uppercase tracking-widest hover:scale-105 active:scale-95"
                            >
                                {text.loadMore}
                            </button>
                        </div>
                    )}

                    {!loading && filteredExtensions.length === 0 && (
                        <div className="text-center py-20 text-slate-500 font-mono text-sm border border-dashed border-slate-800 rounded mt-8">
                            {text.noResult} "{search}"
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
