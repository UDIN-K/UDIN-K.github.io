import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { BookOpen, Plug, Wrench, Download, GitBranch, MessageSquare, ArrowRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

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

export const Koma: React.FC = () => {
    const language = useLanguage();
    const [extensions, setExtensions] = useState<Extension[]>([]);
    const [loading, setLoading] = useState(true);

    const activeRepositories = [
        { name: "Koma (コマ)", url: `${window.location.origin}/api/koma/repo/index.min.json`, type: "Manga", desc: "Main proxy repository for Koma." },
        { name: "Keiyoushi (Raw)", url: "https://raw.githubusercontent.com/keiyoushi/extensions/repo/index.min.json", type: "Manga", desc: "Raw official repository." },
        { name: "Yūzōnō", url: "https://raw.githubusercontent.com/yuzono/manga-repo/repo/index.min.json", type: "Manga", desc: "Alternative Manga extensions" },
        { name: "Fucked by FAKKU", url: "https://raw.githubusercontent.com/Fucked-By-Fakku/extensions/repo/index.min.json", type: "Manga", desc: "NSFW extensions" },
        { name: "Kavita", url: "https://raw.githubusercontent.com/Kareadita/tach-extension/repo/index.min.json", type: "Manga", desc: "Kavita extensions" },
        { name: "Suwayomi", url: "https://raw.githubusercontent.com/suwayomi/tachiyomi-extension/repo/index.min.json", type: "Manga", desc: "Suwayomi extensions" },
        { name: "CopyManga", url: "https://raw.githubusercontent.com/stevenyomi/copymanga/repo/index.min.json", type: "Manga", desc: "Chinese manga extensions" },
        { name: "Kohi-den", url: "https://kohiden.xyz/Kohi-den/extensions/raw/branch/main/index.min.json", type: "Anime", desc: "Kohi-den anime extensions" },
        { name: "Secozzi", url: "https://raw.githubusercontent.com/Secozzi/aniyomi-extensions/refs/heads/repo/index.min.json", type: "Anime", desc: "Alternative Anime extensions" },
        { name: "Claudemirovsky", url: "https://raw.githubusercontent.com/Claudemirovsky/cursedyomi-extensions/repo/index.min.json", type: "Anime", desc: "CursedYomi Anime extensions" },
        { name: "Hollow", url: "https://codeberg.org/hollow/aniyomi-extensions-fr/media/branch/repo/index.min.json", type: "Anime", desc: "French Anime extensions" }
    ];

    useEffect(() => {
        const fetchExtensions = async () => {
            try {
                const res = await fetch('/api/koma/repo/index.min.json');
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
            title: "Koma (コマ)",
            subtitle: (
                <>
                    Extension Repositories for <strong className="text-white">Tachiyomi, Mihon, Koma</strong>, and other forks. Access thousands of comic and manga sources directly from your device.
                </>
            ),
            downloadKoma: "Download App",
            addRepo: "Add Repository",
            addRepoDesc: "Note: Use an Android device with Mihon, Koma, or a Tachiyomi fork installed to add this extension repo directly.",
            guide: "Installation Guide",
            troubleshooting: "Troubleshooting",
            sourceCode: "Source Code",
            communityTitle: "Communities",
            communityDesc: "Since Koma is maintained independently, there is no official community. You can fork it or join these other allied extension communities to discuss sources.",
            joinDiscord: "Join Discord",
            explorerTitle: "Extensions Explorer",
            explorerDesc: "Live feed from the Keiyoushi extensions repository. Search and download APKs directly.",
            downloadTag: "DOWNLOAD",
            nsfw: "NSFW",
            allType: "All Content",
            reposTitle: "Active Repositories",
            reposDesc: "Add these additional repositories to get more manga and anime extensions in your Koma app.",
            typeManga: "Manga",
            typeAnime: "Anime",
            copy: "Copy",
            copied: "Copied!",
            addApp: "Add to App",
            exploreAll: "Explore All Extensions",
            showingNum: "Showing sample of available extensions.",
            copyManually: "Or copy the repository URL manually:"
        },
        id: {
            title: "Koma (コマ)",
            subtitle: (
                <>
                    Repositori Ekstensi untuk <strong className="text-white">Tachiyomi, Mihon, Koma</strong>, dan fork lainnya. Akses ribuan sumber komik dan manga langsung dari perangkat Anda.
                </>
            ),
            downloadKoma: "Unduh Aplikasi",
            addRepo: "Tambah Repositori",
            addRepoDesc: "Catatan: Gunakan perangkat Android dengan Mihon, Koma, atau fork Tachiyomi terinstal untuk menambahkan repositori ekstensi ini secara langsung.",
            guide: "Panduan Instalasi",
            troubleshooting: "Pemecahan Masalah",
            sourceCode: "Kode Sumber",
            communityTitle: "Komunitas",
            communityDesc: "Karena Koma dikembangkan secara independen, tidak ada komunitas resmi. Namun, kamu bisa mem-fork proyek ini atau bergabung dengan komunitas ekstensi lain di bawah ini.",
            joinDiscord: "Bergabung Discord",
            explorerTitle: "Penjelajah Ekstensi",
            explorerDesc: "Umpan langsung dari repositori ekstensi Keiyoushi. Cari dan unduh APK secara langsung.",
            downloadTag: "UNDUH",
            nsfw: "NSFW",
            allType: "Semua Konten",
            reposTitle: "Repositori Aktif",
            reposDesc: "Tambahkan repositori tambahan ini ke aplikasi Koma Anda untuk variasi yang lebih banyak.",
            typeManga: "Manga",
            typeAnime: "Anime",
            copy: "Salin",
            copied: "Tersalin!",
            addApp: "Tambah ke App",
            exploreAll: "Jelajahi Semua Ekstensi",
            showingNum: "Menampilkan sampel ekstensi yang tersedia.",
            copyManually: "Atau salin URL repositori secara manual:"
        },
        es: {
            title: "Koma (コマ)",
            subtitle: (
                <>
                    Repositorios de extensiones para <strong className="text-white">Tachiyomi, Mihon, Koma</strong> y otros forks. Accede a miles de fuentes de cómics y manga.
                </>
            ),
            downloadKoma: "Descargar App",
            addRepo: "Añadir Repositorio",
            addRepoDesc: "Nota: Utiliza un dispositivo Android con Mihon, Koma o Tachiyomi instalado para añadir este repositorio.",
            guide: "Guía de Instalación",
            troubleshooting: "Solución de Problemas",
            sourceCode: "Código Fuente",
            communityTitle: "Únete a la Comunidad",
            communityDesc: "Discute actualizaciones, reporta errores o solicita nuevas fuentes en nuestro Discord.",
            joinDiscord: "Unirse a Discord",
            explorerTitle: "Explorador de Extensiones",
            explorerDesc: "Feed en vivo del repositorio de Keiyoushi. Busca y descarga APKs directamente.",
            downloadTag: "DESCARGAR",
            nsfw: "NSFW",
            allType: "Todo el Contenido",
            reposTitle: "Repositorios Activos",
            reposDesc: "Añade estos repositorios adicionales para obtener más extensiones en tu app Koma.",
            typeManga: "Manga",
            typeAnime: "Anime",
            copy: "Copiar",
            copied: "¡Copiado!",
            addApp: "Añadir a la App",
            exploreAll: "Explorar Todas las Extensiones",
            showingNum: "Mostrando una muestra de extensiones disponibles.",
            copyManually: "O copia la URL del repositorio manualmente:"
        },
        ja: {
            title: "Koma (コマ)",
            subtitle: (
                <>
                    <strong className="text-white">Tachiyomi, Mihon, Koma</strong> など向けの拡張機能リポジトリ。数千のコミックやマンガソースに直接アクセス。
                </>
            ),
            downloadKoma: "アプリをダウンロード",
            addRepo: "リポジトリを追加",
            addRepoDesc: "注: この拡張機能リポジトリを直接追加するには、Mihon、Koma、またはTachiyomiがインストールされたAndroidデバイスを使用してください。",
            guide: "インストールガイド",
            troubleshooting: "トラブルシューティング",
            sourceCode: "ソースコード",
            communityTitle: "コミュニティに参加",
            communityDesc: "Discordサーバーで拡張機能の更新、バグ報告、新しいソースの要望について議論しましょう。",
            joinDiscord: "Discordに参加",
            explorerTitle: "拡張機能エクスプローラー",
            explorerDesc: "Keiyoushi拡張機能リポジトリからの最新フィード。APKを直接検索してダウンロードできます。",
            downloadTag: "ダウンロード",
            nsfw: "NSFW",
            allType: "すべてのコンテンツ",
            reposTitle: "アクティブなリポジトリ",
            reposDesc: "Komaアプリでより多くのマンガとアニメ拡張機能を取得するための追加リポジトリ。",
            typeManga: "マンガ",
            typeAnime: "アニメ",
            copy: "コピー",
            copied: "コピーしました！",
            addApp: "アプリに追加",
            exploreAll: "すべての拡張機能を検索",
            showingNum: "利用可能な拡張機能のサンプルを表示。",
            copyManually: "または、リポジトリのURLを手動でコピーしてください："
        },
        ko: {
            title: "Koma (コマ)",
            subtitle: (
                <>
                    <strong className="text-white">Tachiyomi, Mihon, Koma</strong> 및 기타 포크를 위한 확장 프로그램 저장소입니다. 수천 개의 만화 소스에 직접 접근하세요.
                </>
            ),
            downloadKoma: "앱 다운로드",
            addRepo: "저장소 추가",
            addRepoDesc: "참고: 이 확장 저장소를 직접 추가하려면 Mihon, Koma 또는 Tachiyomi 포크가 설치된 Android 기기를 사용하세요.",
            guide: "설치 가이드",
            troubleshooting: "문제 해결",
            sourceCode: "소스 코드",
            communityTitle: "커뮤니티 참여",
            communityDesc: "공식 Discord 서버에서 확장 프로그램 업데이트 논의, 버그 신고, 새로운 소스 요청을 하세요.",
            joinDiscord: "Discord 참여",
            explorerTitle: "확장 프로그램 탐색기",
            explorerDesc: "Keiyoushi 확장 프로그램 저장소의 라이브 피드. APK를 직접 검색하고 다운로드하세요.",
            downloadTag: "다운로드",
            nsfw: "NSFW",
            allType: "모든 콘텐츠",
            reposTitle: "활성 저장소",
            reposDesc: "Koma 앱에서 더 많은 만화 및 애니메이션 확장 프로그램을 얻으려면 이 추가 저장소를 추가하세요.",
            typeManga: "만화",
            typeAnime: "애니메이션",
            copy: "복사",
            copied: "복사됨!",
            addApp: "앱에 추가",
            exploreAll: "모든 확장 프로그램 탐색",
            showingNum: "사용 가능한 확장 프로그램의 샘플을 표시합니다.",
            copyManually: "또는 저장소 URL을 수동으로 복사하세요:"
        },
        zh: {
            title: "Koma (コマ)",
            subtitle: (
                <>
                    为 <strong className="text-white">Tachiyomi, Mihon, Koma</strong> 及其他分支提供的扩展仓库。直接从您的设备访问数千个漫画源。
                </>
            ),
            downloadKoma: "下载应用",
            addRepo: "添加仓库",
            addRepoDesc: "注：请使用已安装 Mihon、Koma 或 Tachiyomi 分支的 Android 设备直接添加此扩展仓库。",
            guide: "安装指南",
            troubleshooting: "故障排除",
            sourceCode: "源代码",
            communityTitle: "加入社区",
            communityDesc: "在我们官方的 Discord 服务器中讨论扩展更新、报告错误或请求新源。",
            joinDiscord: "加入 Discord",
            explorerTitle: "扩展探索器",
            explorerDesc: "来自 Keiyoushi 扩展仓库的实时动态。直接搜索并下载 APK。",
            downloadTag: "下载",
            nsfw: "NSFW",
            allType: "所有内容",
            reposTitle: "活动仓库",
            reposDesc: "添加这些额外的仓库，以便在您的 Koma 应用中获取更多漫画和动画扩展。",
            typeManga: "漫画",
            typeAnime: "动画",
            copy: "复制",
            copied: "已复制！",
            addApp: "添加到应用",
            exploreAll: "探索所有扩展",
            showingNum: "显示可用扩展的示例。",
            copyManually: "或手动复制仓库 URL："
        },
        fr: {
            title: "Koma (コマ)",
            subtitle: (
                <>
                    Dépôts d'extensions pour <strong className="text-white">Tachiyomi, Mihon, Koma</strong>, et autres forks. Accédez à des milliers de sources.
                </>
            ),
            downloadKoma: "Télécharger l'App",
            addRepo: "Ajouter le Dépôt",
            addRepoDesc: "Note: Utilisez un appareil Android avec Mihon, Koma ou Tachiyomi installé pour ajouter ce dépôt directement.",
            guide: "Guide d'Installation",
            troubleshooting: "Dépannage",
            sourceCode: "Code Source",
            communityTitle: "Rejoindre la Communauté",
            communityDesc: "Discutez des mises à jour, signalez des bugs sur notre Discord officiel.",
            joinDiscord: "Rejoindre Discord",
            explorerTitle: "Explorateur d'Extensions",
            explorerDesc: "Flux en direct du dépôt Keiyoushi. Recherchez et téléchargez des APK directement.",
            downloadTag: "TÉLÉCHARGER",
            nsfw: "NSFW",
            allType: "Tout le Contenu",
            reposTitle: "Dépôts Actifs",
            reposDesc: "Ajoutez ces dépôts supplémentaires pour obtenir plus d'extensions.",
            typeManga: "Manga",
            typeAnime: "Anime",
            copy: "Copier",
            copied: "Copié !",
            addApp: "Ajouter à l'App",
            exploreAll: "Explorer Toutes les Extensions",
            showingNum: "Affichage d'un échantillon d'extensions disponibles.",
            copyManually: "Ou copiez manuellement l'URL du dépôt :"
        },
        ar: {
            title: "Koma (コマ)",
            subtitle: (
                <>
                    مستودعات الإضافات لـ <strong className="text-white">Tachiyomi, Mihon, Koma</strong>، وغيرها. الوصول إلى آلاف مصادر القصص المصورة والمانجا.
                </>
            ),
            downloadKoma: "تحميل التطبيق",
            addRepo: "إضافة المستودع",
            addRepoDesc: "ملاحظة: استخدم جهاز Android مثبت عليه Mihon أو Koma لإضافة هذا المستودع مباشرة.",
            guide: "دليل التثبيت",
            troubleshooting: "استكشاف الأخطاء",
            sourceCode: "كود المصدر",
            communityTitle: "انضم إلى المجتمع",
            communityDesc: "ناقش تحديثات الإضافات أو أبلغ عن الأخطاء في خادم ديسبورد الرسمي.",
            joinDiscord: "انضم إلى Discord",
            explorerTitle: "مستكشف الإضافات",
            explorerDesc: "بث مباشر من مستودع Keiyoushi. ابحث وقم بتنزيل ملفات APK مباشرة.",
            downloadTag: "تحميل",
            nsfw: "غير لائق",
            allType: "كل المحتوى",
            reposTitle: "المستودعات النشطة",
            reposDesc: "أضف هذه المستودعات الإضافية للحصول على المزيد من إضافات المانجا والأنمي.",
            typeManga: "مانجا",
            typeAnime: "أنمي",
            copy: "نسخ",
            copied: "تم النسخ!",
            addApp: "إضافة للتطبيق",
            exploreAll: "استكشاف جميع الإضافات",
            showingNum: "عرض عينة من الإضافات المتاحة.",
            copyManually: "أو انسخ رابط المستودع يدوياً:"
        }
    };

    const text = t[language as keyof typeof t] || t.en;

    // Show only a few extensions as preview
    const previewExtensions = extensions.slice(0, 12);

    return (
        <div className="min-h-screen bg-slate-950 pt-32 pb-24 relative overflow-hidden font-sans">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none"></div>
            
            <div className="container mx-auto px-6 md:px-8 relative z-10">
                {/* Hero Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <div className="w-20 h-20 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-8 mx-auto shadow-[0_0_30px_rgba(var(--theme-accent),0.2)]">
                        <BookOpen className="w-10 h-10 text-accent" />
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white font-heading tracking-tighter mb-6">
                        {text.title}
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl font-mono leading-relaxed mb-10 max-w-2xl mx-auto">
                        {text.subtitle}
                    </p>
                    
                    <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
                        <a 
                            href="https://github.com/UDIN-K/KOMA" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-8 py-4 bg-accent text-slate-950 font-bold rounded hover:brightness-110 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs border border-accent shadow-[0_0_15px_rgba(var(--theme-accent),0.4)]"
                        >
                            <Download className="w-4 h-4" />
                            {text.downloadKoma}
                        </a>
                        <a 
                            href={`koma://add-repo?url=${window.location.origin}/api/koma/repo/index.min.json`} 
                            className="w-full sm:w-auto px-8 py-4 bg-slate-900 border border-slate-700 text-white font-bold rounded hover:bg-slate-800 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                        >
                            <Plug className="w-4 h-4" />
                            {text.addRepo}
                        </a>
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
                        <Link 
                            to="/koma/guide"
                            className="w-full sm:w-auto px-6 py-4 bg-slate-900 border border-slate-800 text-white font-bold rounded hover:bg-slate-800 hover:border-slate-700 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                        >
                            <BookOpen className="w-4 h-4 text-slate-400" />
                            {text.guide}
                        </Link>
                        <Link 
                            to="/koma/troubleshooting"
                            className="w-full sm:w-auto px-6 py-4 bg-slate-900 border border-slate-800 text-white font-bold rounded hover:bg-slate-800 hover:border-slate-700 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                        >
                            <Wrench className="w-4 h-4 text-slate-400" />
                            {text.troubleshooting}
                        </Link>
                        <a 
                            href="https://github.com/keiyoushi/extensions" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-6 py-4 bg-slate-900 border border-slate-800 text-white font-bold rounded hover:bg-slate-800 hover:border-slate-700 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                        >
                            <GitBranch className="w-4 h-4 text-slate-400" />
                            {text.sourceCode}
                        </a>
                    </div>
                    
                    <div className="max-w-xl mx-auto flex flex-col items-center">
                        <p className="text-slate-400 font-mono text-xs mb-3">
                             {text.copyManually}
                        </p>
                        <div className="flex flex-col items-center w-full max-w-full bg-[#1A1C23] border border-slate-700 rounded-lg overflow-hidden p-1 sm:hidden">
                            <div className="w-full overflow-hidden mb-2">
                                <code className="text-xs text-slate-300 font-mono py-2 px-3 block truncate text-left">
                                    {`${window.location.origin}/api/koma/repo/index.min.json`}
                                </code>
                            </div>
                            <button 
                                onClick={(e) => {
                                    navigator.clipboard.writeText(`${window.location.origin}/api/koma/repo/index.min.json`);
                                    const btn = e.currentTarget;
                                    const originalText = btn.innerText;
                                    btn.innerText = text.copied;
                                    btn.classList.add('bg-green-600', 'text-white');
                                    btn.classList.remove('bg-slate-800', 'text-slate-300');
                                    setTimeout(() => {
                                        btn.innerText = originalText;
                                        btn.classList.remove('bg-green-600', 'text-white');
                                        btn.classList.add('bg-slate-800', 'text-slate-300');
                                    }, 2000);
                                }}
                                className="w-full px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded text-[10px] uppercase tracking-widest transition-colors flex-shrink-0"
                            >
                                {text.copy}
                            </button>
                        </div>
                        
                        <div className="hidden sm:flex items-center w-full max-w-full bg-[#1A1C23] border border-slate-700 rounded-lg overflow-hidden p-1">
                            <div className="flex-1 min-w-0 overflow-hidden">
                                <code className="text-xs text-slate-300 font-mono py-2 px-3 block truncate text-left">
                                    {`${window.location.origin}/api/koma/repo/index.min.json`}
                                </code>
                            </div>
                            <button 
                                onClick={(e) => {
                                    navigator.clipboard.writeText(`${window.location.origin}/api/koma/repo/index.min.json`);
                                    const btn = e.currentTarget;
                                    const originalText = btn.innerText;
                                    btn.innerText = text.copied;
                                    btn.classList.add('bg-green-600', 'text-white');
                                    btn.classList.remove('bg-slate-800', 'text-slate-300');
                                    setTimeout(() => {
                                        btn.innerText = originalText;
                                        btn.classList.remove('bg-green-600', 'text-white');
                                        btn.classList.add('bg-slate-800', 'text-slate-300');
                                    }, 2000);
                                }}
                                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded text-[10px] uppercase tracking-widest transition-colors flex-shrink-0"
                            >
                                {text.copy}
                            </button>
                        </div>
                        <p className="mt-4 text-xs font-mono text-slate-500 max-w-md text-center">
                            {text.addRepoDesc}
                        </p>
                    </div>
                </motion.div>

                {/* Active Repositories List */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto mb-24"
                >
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black text-white font-heading tracking-tighter mb-4">{text.reposTitle}</h2>
                        <p className="text-slate-400 font-mono text-sm max-w-2xl mx-auto">{text.reposDesc}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {activeRepositories.map((repo, i) => (
                            <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 flex flex-col transition-colors hover:border-slate-600">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-white font-bold text-xl">{repo.name}</h3>
                                    <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700 text-[10px] uppercase font-bold font-mono tracking-wider shrink-0">
                                        {repo.type === 'Manga' ? text.typeManga : text.typeAnime}
                                    </span>
                                </div>
                                <p className="text-slate-400 text-sm font-mono mb-6 flex-grow">{repo.desc}</p>
                                
                                <div className="mt-auto space-y-3">
                                    <div className="flex flex-col sm:hidden w-full bg-[#1A1C23] border border-slate-700/60 rounded-lg overflow-hidden p-1">
                                        <div className="w-full overflow-hidden py-2 px-2 relative mb-2">
                                            <code className="text-xs text-slate-300 font-mono block truncate">
                                                {repo.url}
                                            </code>
                                        </div>
                                        <button 
                                            onClick={(e) => {
                                                navigator.clipboard.writeText(repo.url);
                                                const btn = e.currentTarget;
                                                const originalText = btn.innerText;
                                                btn.innerText = text.copied;
                                                btn.classList.add('bg-green-600', 'text-white');
                                                btn.classList.remove('bg-slate-800', 'text-slate-300');
                                                setTimeout(() => {
                                                    btn.innerText = originalText;
                                                    btn.classList.remove('bg-green-600', 'text-white');
                                                    btn.classList.add('bg-slate-800', 'text-slate-300');
                                                }, 2000);
                                            }}
                                            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 font-bold text-[10px] rounded uppercase tracking-widest transition-colors flex-shrink-0"
                                        >
                                            {text.copy}
                                        </button>
                                    </div>
                                    
                                    <div className="hidden sm:flex items-center w-full bg-[#1A1C23] border border-slate-700/60 rounded-lg overflow-hidden">
                                        <div className="flex-1 min-w-0 overflow-hidden py-3 px-3 md:px-4 relative">
                                            <code className="text-xs text-slate-300 font-mono block truncate">
                                                {repo.url}
                                            </code>
                                        </div>
                                        <button 
                                            onClick={(e) => {
                                                navigator.clipboard.writeText(repo.url);
                                                const btn = e.currentTarget;
                                                const originalText = btn.innerText;
                                                btn.innerText = text.copied;
                                                btn.classList.add('bg-green-600', 'text-white');
                                                btn.classList.remove('bg-slate-800', 'text-slate-300');
                                                setTimeout(() => {
                                                    btn.innerText = originalText;
                                                    btn.classList.remove('bg-green-600', 'text-white');
                                                    btn.classList.add('bg-slate-800', 'text-slate-300');
                                                }, 2000);
                                            }}
                                            className="px-4 py-3 bg-slate-800 border-l border-slate-700 hover:bg-slate-700 text-slate-300 font-bold text-xs uppercase tracking-widest transition-colors shrink-0"
                                        >
                                            {text.copy}
                                        </button>
                                    </div>
                                    <a 
                                        href={`koma://add-repo?url=${repo.url}`}
                                        className="w-full py-3.5 bg-accent/10 border border-accent/20 text-accent hover:bg-accent hover:text-slate-950 font-bold rounded-lg text-xs uppercase tracking-widest transition-all text-center flex items-center justify-center gap-2 group/btn"
                                    >
                                        <Download className="w-4 h-4 group-hover/btn:-translate-y-0.5 transition-transform" />
                                        {text.addApp}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Live Extensions Explorer Preview */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    id="explorer"
                    className="max-w-6xl mx-auto"
                >
                    <div className="flex flex-col mb-8 text-center">
                        <h2 className="text-3xl font-black text-white font-heading tracking-tighter mb-2">{text.explorerTitle}</h2>
                        <p className="text-slate-400 font-mono text-sm">{text.explorerDesc}</p>
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
                        <div className="relative">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {previewExtensions.map((ext, i) => (
                                    <div key={i} className="bg-slate-900/40 border border-slate-800 rounded p-5 flex flex-col transition-colors group">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="w-10 h-10 rounded bg-slate-800/50 flex items-center justify-center overflow-hidden shrink-0">
                                                <img 
                                                    src={`/api/koma/repo/icon/${ext.pkg}.png`} 
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
                                        
                                        <div className="mt-auto flex items-center justify-between p-3 bg-slate-950/50 rounded border border-slate-800/50 opacity-50">
                                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                                                {text.downloadTag}
                                            </span>
                                            <Download className="w-3 h-3 text-slate-500" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] flex flex-col justify-center items-center z-10 p-4 rounded border border-slate-800/50">
                                <p className="text-white font-mono text-sm sm:text-base mb-6 max-w-md text-center bg-slate-900/80 px-4 py-2 rounded border border-slate-800 backdrop-blur-md">{text.showingNum}</p>
                                <Link 
                                    to="/koma/explorer"
                                    className="px-8 sm:px-12 py-5 sm:py-6 bg-accent text-slate-950 font-black rounded-xl hover:bg-white transition-all text-base sm:text-lg uppercase tracking-widest hover:-translate-y-1 inline-flex items-center gap-3 shadow-[0_0_50px_rgba(217,70,239,0.4)] hover:shadow-[0_0_80px_rgba(217,70,239,0.7)] scale-110"
                                >
                                    {text.exploreAll} <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    )}
                    
                </motion.div>

                {/* Community Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 max-w-5xl mx-auto rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 p-1 border border-slate-800"
                >
                    <div className="p-8 md:p-12 border border-slate-800 border-dashed rounded-xl flex flex-col md:flex-row items-start justify-between gap-8 text-left">
                        <div className="md:w-1/2">
                            <h2 className="text-2xl font-bold text-white mb-2 font-heading">{text.communityTitle}</h2>
                            <p className="text-slate-400 font-mono text-sm max-w-xl">
                                {text.communityDesc}
                            </p>
                        </div>
                        <div className="md:w-1/2 flex flex-col gap-3 w-full">
                            <a href="https://discord.gg/keiyoushi" target="_blank" rel="noopener noreferrer" className="px-6 py-4 bg-slate-900 border border-slate-800 rounded hover:border-[#5865F2]/50 hover:bg-[#5865F2]/5 transition-all flex items-center justify-between group">
                                <span className="font-bold text-slate-300 group-hover:text-[#5865F2] transition-colors">Keiyoushi</span>
                                <MessageSquare className="w-4 h-4 text-slate-500 group-hover:text-[#5865F2] transition-colors" />
                            </a>
                            <a href="https://discord.gg/mihon" target="_blank" rel="noopener noreferrer" className="px-6 py-4 bg-slate-900 border border-slate-800 rounded hover:border-[#5865F2]/50 hover:bg-[#5865F2]/5 transition-all flex items-center justify-between group">
                                <span className="font-bold text-slate-300 group-hover:text-[#5865F2] transition-colors">Mihon</span>
                                <MessageSquare className="w-4 h-4 text-slate-500 group-hover:text-[#5865F2] transition-colors" />
                            </a>
                            <a href="https://discord.gg/aniyomi" target="_blank" rel="noopener noreferrer" className="px-6 py-4 bg-slate-900 border border-slate-800 rounded hover:border-[#5865F2]/50 hover:bg-[#5865F2]/5 transition-all flex items-center justify-between group">
                                <span className="font-bold text-slate-300 group-hover:text-[#5865F2] transition-colors">Aniyomi</span>
                                <MessageSquare className="w-4 h-4 text-slate-500 group-hover:text-[#5865F2] transition-colors" />
                            </a>
                            <a href="https://discord.gg/suwayomi" target="_blank" rel="noopener noreferrer" className="px-6 py-4 bg-slate-900 border border-slate-800 rounded hover:border-[#5865F2]/50 hover:bg-[#5865F2]/5 transition-all flex items-center justify-between group">
                                <span className="font-bold text-slate-300 group-hover:text-[#5865F2] transition-colors">Suwayomi Server</span>
                                <MessageSquare className="w-4 h-4 text-slate-500 group-hover:text-[#5865F2] transition-colors" />
                            </a>
                            <a href="https://discord.gg/kavita" target="_blank" rel="noopener noreferrer" className="px-6 py-4 bg-slate-900 border border-slate-800 rounded hover:border-[#5865F2]/50 hover:bg-[#5865F2]/5 transition-all flex items-center justify-between group">
                                <span className="font-bold text-slate-300 group-hover:text-[#5865F2] transition-colors">Kavita</span>
                                <MessageSquare className="w-4 h-4 text-slate-500 group-hover:text-[#5865F2] transition-colors" />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

