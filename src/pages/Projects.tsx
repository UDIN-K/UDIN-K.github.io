import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Code, Star, GitFork, ExternalLink, GitBranch, FolderGit2, TestTube, Zap, Shield, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useLanguage } from '../hooks/useLanguage';
import { useSEO } from '../hooks/useSEO';

interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
    topics: string[];
    homepage: string | null;
    fork: boolean;
}

export const Projects: React.FC = () => {
    const language = useLanguage();

    useSEO({
        title: 'Projects & Open-Source Portfolio — UDINK',
        description: 'Browse UDINK’s open-source projects, experiments, and repositories.'
    });
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'github' | 'labs'>('github');

    const t = {
        en: {
            archiveTitle: "Repository Archive",
            portfolio: "PORTFOLIO",
            headerDesc: "A dynamic feed of open-source contributions, structural codebases, and experimental lab modules.",
            tabGithub: "GitHub Archive",
            tabLabs: "Labs Archive",
            errSync: "[ERR] FAILED_TO_SYNC_GITHUB_REPOS:",
            noDesc: "No description provided.",
            accessModule: "ACCESS MODULE"
        },
        id: {
            archiveTitle: "Arsip Repositori",
            portfolio: "PORTOFOLIO",
            headerDesc: "Umpan dinamis kontribusi open-source, basis kode struktural, dan modul lab eksperimental.",
            tabGithub: "Arsip GitHub",
            tabLabs: "Arsip Labs",
            errSync: "[ERR] GAGAL_SINKRONISASI_REPOS_GITHUB:",
            noDesc: "Tidak ada deskripsi.",
            accessModule: "AKSES MODUL"
        },
        es: {
            archiveTitle: "Archivo de Repositorios",
            portfolio: "PORTAFOLIO",
            headerDesc: "Un feed dinámico de contribuciones de código abierto, bases de código estructurales y módulos de laboratorio experiementales.",
            tabGithub: "Archivo GitHub",
            tabLabs: "Archivo Labs",
            errSync: "[ERR] FALLO_SINCRONIZACION_GITHUB:",
            noDesc: "Sin descripción.",
            accessModule: "ACCEDER AL MÓDULO"
        },
        ja: {
            archiveTitle: "リポジトリアーカイブ",
            portfolio: "ポートフォリオ",
            headerDesc: "オープンソースへの貢献、構造化されたコードベース、実験的なラボモジュールのダイナミックなフィード。",
            tabGithub: "GitHub アーカイブ",
            tabLabs: "Labs アーカイブ",
            errSync: "[ERR] GITHUB_同期_失敗:",
            noDesc: "説明がありません。",
            accessModule: "モジュールにアクセス"
        },
        ko: {
            archiveTitle: "저장소 보관소",
            portfolio: "포트폴리오",
            headerDesc: "오픈소스 기여, 구조적 코드베이스 및 실험적 랩 모듈의 동적 피드.",
            tabGithub: "GitHub 보관소",
            tabLabs: "Labs 보관소",
            errSync: "[ERR] GITHUB_동기화_실패:",
            noDesc: "제공된 설명이 없습니다.",
            accessModule: "모듈 접근"
        },
        zh: {
            archiveTitle: "仓库档案",
            portfolio: "作品集",
            headerDesc: "开源贡献、结构化代码库和实验性实验室模块的动态源。",
            tabGithub: "GitHub 档案",
            tabLabs: "Labs 档案",
            errSync: "[ERR] 同步_GITHUB_失败:",
            noDesc: "未提供描述。",
            accessModule: "访问模块"
        },
        fr: {
            archiveTitle: "Archive des Dépôts",
            portfolio: "PORTFOLIO",
            headerDesc: "Un flux dynamique de contributions open-source, de bases de code structurelles et de modules de laboratoire.",
            tabGithub: "Archive GitHub",
            tabLabs: "Archive Labs",
            errSync: "[ERR] ECHEC_SYNCHRO_GITHUB:",
            noDesc: "Aucune description fournie.",
            accessModule: "ACCÉDER AU MODULE"
        },
        ar: {
            archiveTitle: "أرشيف المستودعات",
            portfolio: "معرض الأعمال",
            headerDesc: "تغذية ديناميكية للمساهمات مفتوحة المصدر وقواعد الأكواد البرمجية والمختبرات التجريبية.",
            tabGithub: "أرشيف GitHub",
            tabLabs: "أرشيف المختبرات",
            errSync: "[ERR] فشل_مزامنة_الريبو:",
            noDesc: "لا يوجد وصف.",
            accessModule: "دخول الوحدة"
        }
    };
    
    // Default to EN if not found
    const text = t[language as keyof typeof t] || t.en;

    const getLabModules = () => {
        const i18nLabs = {
            en: [
                { title: "VIEW EXPERIENCE", desc: "Complete telemetry on stack & backend logic." },
                { title: "LAUNCH THE ENGINE", desc: "Experience real-time Three.js rendering." },
                { title: "LUA SCRIPTING", desc: "Explore high-level scripting patterns." },
                { title: "EXPERIMENTAL LABS", desc: "Where AI meets architectural abstraction." },
                { title: "UDIN IDE", desc: "The professional cloud workspace UI." },
                { title: "CREDENTIAL VAULT", desc: "Industry-standard certification records." }
            ],
            id: [
                { title: "LIHAT PENGALAMAN", desc: "Telemetri lengkap logika stack & backend." },
                { title: "JALANKAN MESIN", desc: "Rasakan rendering grafis Three.js real-time." },
                { title: "SCRIPTING LUA", desc: "Eksplorasi pola-pola scripting." },
                { title: "LABS EKSPERIMENTAL", desc: "Tempat AI bertemu abstraksi arsitektural." },
                { title: "UDIN IDE", desc: "UI ruang kerja cloud profesional." },
                { title: "BRANKAS KREDENSIAL", desc: "Catatan sertifikasi standar industri." }
            ]
        };

        const defaultLabs = i18nLabs.en;
        const currentLabs = i18nLabs[language as keyof typeof i18nLabs] || defaultLabs;

        return [
            {
                title: currentLabs[0].title,
                desc: currentLabs[0].desc,
                link: "/experience",
                icon: <Target className="w-5 h-5" />,
                color: "border-blue-500/20 hover:border-blue-500/50"
            },
            {
                title: currentLabs[1].title,
                desc: currentLabs[1].desc,
                link: "/play",
                icon: <Zap className="w-5 h-5" />,
                color: "border-accent/20 hover:border-accent/50"
            },
            {
                title: currentLabs[2].title,
                desc: currentLabs[2].desc,
                link: "/scripting",
                icon: <Code className="w-5 h-5" />,
                color: "border-purple-500/20 hover:border-purple-500/50"
            },
            {
                title: currentLabs[3].title,
                desc: currentLabs[3].desc,
                link: "/labs",
                icon: <TestTube className="w-5 h-5" />,
                color: "border-green-500/20 hover:border-green-500/50"
            },
            {
                title: currentLabs[4].title,
                desc: currentLabs[4].desc,
                link: "/ide",
                icon: <FolderGit2 className="w-5 h-5" />,
                color: "border-white/20 hover:border-white/50"
            },
            {
                title: currentLabs[5].title,
                desc: currentLabs[5].desc,
                link: "/certificates",
                icon: <Shield className="w-5 h-5" />,
                color: "border-slate-500/40 hover:border-slate-400"
            }
        ];
    };

    const labModules = getLabModules();

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                // Fetch user's repos from GitHub API
                const response = await fetch('https://api.github.com/users/UDIN-K/repos?per_page=100&sort=updated');
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
                const data = await response.json();
                // Filter out forks or keep them, maybe just sort by stars and recent
                const filtered = data.filter((m: Repo) => !m.fork).sort((a: Repo, b: Repo) => b.stargazers_count - a.stargazers_count);
                setRepos(filtered); // Display all for their portfolio, but sort them nicely
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
                setLoading(false);
            }
        };

        fetchRepos();
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 pt-32 pb-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none"></div>
            
            <div className="container mx-auto px-6 md:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-0.5 bg-accent"></div>
                        <span className="text-accent text-xs font-black uppercase tracking-[0.4em]">{text.archiveTitle}</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-white font-mono tracking-tighter uppercase leading-[0.9]">
                        UDINK <br/>
                        <span className="text-accent underline decoration-accent/20 underline-offset-[12px]">{text.portfolio}</span>
                    </h1>
                    <p className="mt-8 text-slate-400 font-mono text-sm max-w-xl leading-relaxed">
                        {text.headerDesc}
                    </p>
                </motion.div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8 font-mono text-sm border-b border-slate-800 pb-4 overflow-x-auto">
                    <button 
                        onClick={() => setActiveTab('github')}
                        className={cn(
                            "px-6 py-2 rounded-full border transition-all whitespace-nowrap",
                            activeTab === 'github' ? "border-accent text-accent bg-accent/10" : "border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-700"
                        )}
                    >
                        {text.tabGithub}
                    </button>
                    <button 
                        onClick={() => setActiveTab('labs')}
                        className={cn(
                            "px-6 py-2 rounded-full border transition-all whitespace-nowrap",
                            activeTab === 'labs' ? "border-accent text-accent bg-accent/10" : "border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-700"
                        )}
                    >
                        {text.tabLabs}
                    </button>
                </div>

                {activeTab === 'github' && (
                    loading ? (
                        <div className="flex justify-center items-center py-20">
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                className="w-12 h-12 border-4 border-slate-800 border-t-accent rounded-full"
                            />
                        </div>
                    ) : error ? (
                        <div className="text-red-400 font-mono text-center p-10 bg-red-950/20 rounded border border-red-900/50">
                            {text.errSync} {error}
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {repos.map((repo, i) => (
                                <motion.div 
                                    key={repo.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    whileHover={{ y: -5 }}
                                    className="group bg-slate-900/40 border border-slate-800 hover:border-accent/40 rounded-xl p-6 transition-all flex flex-col relative overflow-hidden"
                                >
                                    {/* Decorative background */}
                                    <div className="absolute -right-6 -top-6 opacity-[0.02] group-hover:opacity-10 transition-opacity">
                                        <FolderGit2 className="w-32 h-32 text-accent" />
                                    </div>

                                    <div className="flex justify-between items-start mb-4 relative z-10">
                                        <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-white border border-white/10 group-hover:border-accent/30 group-hover:text-accent transition-colors">
                                            <GitBranch className="w-5 h-5" />
                                        </div>
                                        <div className="flex gap-2">
                                            {repo.homepage && (
                                                <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-accent transition-colors" title="Live Demo">
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            )}
                                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors" title="Source Code">
                                                <Code className="w-4 h-4" />
                                            </a>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2 font-mono group-hover:text-accent transition-colors truncate relative z-10" title={repo.name}>
                                        {repo.name}
                                    </h3>
                                    
                                    <p className="text-slate-400 text-xs font-mono mb-6 line-clamp-3 flex-grow relative z-10 leading-relaxed">
                                        {repo.description || text.noDesc}
                                    </p>

                                    <div className="flex flex-wrap items-center justify-between gap-2 mt-auto pt-4 border-t border-slate-800/50 relative z-10">
                                        <div className="flex items-center gap-4">
                                            {repo.language && (
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-2 h-2 rounded-full bg-accent" />
                                                    <span className="text-[10px] text-slate-300 font-mono">{repo.language}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-500 text-[10px] font-mono font-bold">
                                            <div className="flex items-center gap-1 font-bold">
                                                <Star className="w-3 h-3 fill-current" />
                                                {repo.stargazers_count}
                                            </div>
                                            <div className="flex items-center gap-1 font-bold">
                                                <GitFork className="w-3 h-3 fill-current" />
                                                {repo.forks_count}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )
                )}

                {activeTab === 'labs' && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {labModules.map((card, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <Link 
                                    to={card.link}
                                    className={cn(
                                        "group block p-6 bg-slate-900/40 border rounded-xl transition-all hover:-translate-y-1 relative overflow-hidden h-full flex flex-col",
                                        card.color
                                    )}
                                >
                                    <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                                        {card.icon}
                                    </div>
                                    
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors z-10">
                                            {card.icon}
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-white mb-2 font-mono group-hover:text-accent transition-colors tracking-tight z-10">
                                        {card.title}
                                    </h3>
                                    <p className="text-slate-400 text-xs font-mono leading-relaxed flex-grow z-10">
                                        {card.desc}
                                    </p>
                                    
                                    <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-white transition-colors z-10">
                                        {text.accessModule} <ExternalLink className="w-3 h-3 text-accent opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

