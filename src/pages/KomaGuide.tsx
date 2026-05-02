import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Settings, Search, Download, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { KomaDocsLayout } from '../components/KomaDocsLayout';
import { useSEO } from '../hooks/useSEO';

export const KomaGuide: React.FC = () => {
    const language = useLanguage();

    useSEO({
        title: 'Koma Installation Guide — UDINK',
        description: 'Step-by-step guide to set up Koma on Android and add the extension repository in Koma, Mihon, or Tachiyomi forks.'
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const content = {
        en: {
            title: "Koma Installation Guide",
            subtitle: "Essential information to help you set up the extension repo in your app.",
            back: "Back to Koma",
            steps: [
                {
                    icon: <Settings className="w-6 h-6" />,
                    title: "1. Adding the repository",
                    desc: "To access extensions, you need to add the repository directly from the app.",
                    details: [
                        "Open your App (Koma, Mihon, or Tachiyomi fork) on your Android device.",
                        "Go to More -> Settings -> Browse.",
                        "Find the Extension repos section and tap on Add.",
                        "Enter the repository URL: " + window.location.origin + "/api/koma/repo/index.min.json",
                        "Tap Add or Confirm to add the repository."
                    ]
                },
                {
                    icon: <AlertTriangle className="w-6 h-6" />,
                    title: "2. Approve permissions (If required)",
                    desc: "In newer versions of Android or specific apps, you may need to grant trust.",
                    details: [
                        "It will say 'Untrusted' under the repo name.",
                        "Tap on the Repository name to approve it.",
                        "Accept the warning to allow the extensions to run."
                    ]
                },
                {
                    icon: <Download className="w-6 h-6" />,
                    title: "3. Install & Update Extensions",
                    desc: "You can now install extensions from the Browse tab.",
                    details: [
                        "Go to the Browse -> Extensions tab in your app.",
                        "Pull down to refresh the list.",
                        "You should see the extensions from the repo. Tap Install on the ones you want.",
                        "If you had older extensions installed, you might need to uninstall and reinstall them to link them to the new repo."
                    ]
                },
                {
                    icon: <Search className="w-6 h-6" />,
                    title: "4. Troubleshooting",
                    desc: "If you can't find a specific series:",
                    details: [
                        "Check if the extension is installed and up to date.",
                        "Make sure to bypass Cloudflare if the extension requires it (Open in WebView).",
                        "If the extension says 'Obsolete', completely uninstall it, refresh your extensions list, and install it again from our repository."
                    ]
                }
            ]
        },
        id: {
            title: "Panduan Instalasi Koma",
            subtitle: "Informasi penting untuk membantu Anda mengatur repositori ekstensi di aplikasi Anda.",
            back: "Kembali ke Koma",
            steps: [
                {
                    icon: <Settings className="w-6 h-6" />,
                    title: "1. Menambahkan repositori",
                    desc: "Untuk mengakses ekstensi, Anda perlu menambahkan repositori langsung dari aplikasi.",
                    details: [
                        "Buka Aplikasi Anda (Koma, Mihon, atau Tachiyomi fork) di perangkat Android Anda.",
                        "Pergi ke Lainnya (More) -> Pengaturan (Settings) -> Telusuri (Browse).",
                        "Temukan bagian Repositori Ekstensi (Extension repos) dan ketuk Tambah (Add).",
                        "Masukkan URL repositori: " + window.location.origin + "/api/koma/repo/index.min.json",
                        "Ketuk Tambah (Add) atau Konfirmasi untuk menambahkan repositori."
                    ]
                },
                {
                    icon: <AlertTriangle className="w-6 h-6" />,
                    title: "2. Setujui izin (Jika diperlukan)",
                    desc: "Pada versi Android terbaru atau aplikasi spesifik, Anda mungkin perlu memberikan izin kepercayaan.",
                    details: [
                        "Akan tertulis 'Tidak dipercaya' (Untrusted) di bawah nama repo.",
                        "Ketuk nama Repositori untuk menyetujuinya.",
                        "Terima peringatan untuk mengizinkan ekstensi berjalan."
                    ]
                },
                {
                    icon: <Download className="w-6 h-6" />,
                    title: "3. Instal & Perbarui Ekstensi",
                    desc: "Anda sekarang dapat menginstal ekstensi dari tab Telusuri (Browse).",
                    details: [
                        "Pergi ke tab Telusuri (Browse) -> Ekstensi (Extensions) di aplikasi Anda.",
                        "Tarik ke bawah untuk menyegarkan daftar.",
                        "Anda seharusnya melihat ekstensi dari repo. Ketuk Instal pada ekstensi yang Anda inginkan.",
                        "Jika Anda memiliki ekstensi lama, Anda mungkin perlu mencopot dan menginstalnya kembali agar terhubung dengan repo baru."
                    ]
                },
                {
                    icon: <Search className="w-6 h-6" />,
                    title: "4. Pemecahan Masalah",
                    desc: "Jika Anda tidak dapat menemukan seri tertentu:",
                    details: [
                        "Periksa apakah ekstensi sudah terinstal dan versi terbaru.",
                        "Pastikan untuk melewati Cloudflare jika ekstensi membutuhkannya (Buka di WebView).",
                        "Jika ekstensi mengatakan 'Usang' (Obsolete), copot pemasangannya sepenuhnya, segarkan daftar ekstensi Anda, dan instal kembali dari repositori kami."
                    ]
                }
            ]
        },
        es: {
            title: "Guía de Instalación",
            subtitle: "Información esencial para ayudarte a configurar el repositorio de extensiones.",
            back: "Volver a Koma",
            steps: [
                {
                    icon: <Settings className="w-6 h-6" />,
                    title: "1. Añadir el repositorio",
                    desc: "Añade el repositorio directamente desde la app para acceder a las extensiones.",
                    details: [
                        "Abre tu App (Koma, Mihon, o fork de Tachiyomi) en tu Android.",
                        "Ve a Más -> Ajustes -> Explorar.",
                        "Busca Repositorios de extensiones y pulsa en Añadir.",
                        "Introduce la URL: " + window.location.origin + "/api/koma/repo/index.min.json",
                        "Pulsa Añadir o Confirmar."
                    ]
                },
                {
                    icon: <AlertTriangle className="w-6 h-6" />,
                    title: "2. Aprobar permisos",
                    desc: "En Android reciente o ciertas apps, debes confiar en el repositorio.",
                    details: [
                        "Dirá 'No confiable' o 'Untrusted'.",
                        "Toca el nombre del Repositorio para aprobarlo.",
                        "Acepta la advertencia para permitir que funcionen."
                    ]
                },
                {
                    icon: <Download className="w-6 h-6" />,
                    title: "3. Instalar Extensiones",
                    desc: "Ahora puedes instalar las extensiones.",
                    details: [
                        "Ve a Explorar -> Extensiones en la app.",
                        "Desliza hacia abajo para actualizar la lista.",
                        "Pulsa Instalar en las que desees.",
                        "Si tenías extensiones viejas, tal vez debas desinstalarlas y reinstalarlas."
                    ]
                },
                {
                    icon: <Search className="w-6 h-6" />,
                    title: "4. Solución de Problemas",
                    desc: "Si no encuentras lo que buscas:",
                    details: [
                        "Verifica que la extensión esté actualizada.",
                        "Pásate por el WebView si pide Cloudflare.",
                        "Si dice 'Obsoleto', desinstálalo completamente y vuélvelo a instalar desde el repo."
                    ]
                }
            ]
        },
        ja: {
            title: "インストールガイド",
            subtitle: "アプリで拡張機能リポジトリを設定するための重要情報。",
            back: "Komaに戻る",
            steps: [
                {
                    icon: <Settings className="w-6 h-6" />,
                    title: "1. リポジトリの追加",
                    desc: "拡張機能にアクセスするには、アプリから直接リポジトリを追加する必要があります。",
                    details: [
                        "Android端末でアプリ（Koma, Mihon, または Tachiyomi）を開きます。",
                        "その他 -> 設定 -> ブラウズ の順に進みます。",
                        "拡張機能リポジトリ のセクションを探し、追加 をタップします。",
                        "リポジトリURLを入力: " + window.location.origin + "/api/koma/repo/index.min.json",
                        "追加 または 確認 をタップします。"
                    ]
                },
                {
                    icon: <AlertTriangle className="w-6 h-6" />,
                    title: "2. 権限の承認（必要な場合）",
                    desc: "新しいAndroidまたは特定のアプリでは、信頼を付与する必要があります。",
                    details: [
                        "リポジトリ名の下に 'Untrusted (未信頼)' と表示されます。",
                        "リポジトリ名をタップして承認します。",
                        "警告に同意して拡張機能の実行を許可します。"
                    ]
                },
                {
                    icon: <Download className="w-6 h-6" />,
                    title: "3. 拡張機能のインストールと更新",
                    desc: "これでブラウザタブから拡張機能をインストールできます。",
                    details: [
                        "アプリ内の ブラウズ -> 拡張機能 タブに進みます。",
                        "下にスワイプしてリストを更新します。",
                        "欲しい拡張機能の インストール をタップします。",
                        "古い拡張機能がある場合は、アンインストールして再インストールする必要がある場合があります。"
                    ]
                },
                {
                    icon: <Search className="w-6 h-6" />,
                    title: "4. トラブルシューティング",
                    desc: "特定のシリーズが見つからない場合:",
                    details: [
                        "拡張機能がインストールされ、最新であることを確認します。",
                        "拡張機能が必要とする場合はCloudflareをバイパス（WebViewで開く）してください。",
                        "拡張機能が 'Obsolete (廃止)' と表示される場合は、完全にアンインストールし、再インストールしてください。"
                    ]
                }
            ]
        },
        ko: {
            title: "설치 가이드",
            subtitle: "앱에서 확장 프로그램 저장소를 설정하는 데 필요한 정보입니다.",
            back: "Koma로 돌아가기",
            steps: [
                {
                    icon: <Settings className="w-6 h-6" />,
                    title: "1. 저장소 추가하기",
                    desc: "확장 프로그램에 접근하려면 앱에서 직접 저장소를 추가해야 합니다.",
                    details: [
                        "Android 기기에서 앱(Koma, Mihon 또는 Tachiyomi)을 엽니다.",
                        "더보기 -> 설정 -> 탐색으로 이동합니다.",
                        "확장 저장소 섹션을 찾아 추가를 탭합니다.",
                        "저장소 URL 입력: " + window.location.origin + "/api/koma/repo/index.min.json",
                        "추가 또는 확인을 탭하여 저장소를 추가합니다."
                    ]
                },
                {
                    icon: <AlertTriangle className="w-6 h-6" />,
                    title: "2. 권한 승인 (필요한 경우)",
                    desc: "최신 Android 또는 특정 앱에서는 신뢰를 부여해야 할 수도 있습니다.",
                    details: [
                        "저장소 이름 아래에 '신뢰할 수 없음'이라고 표시됩니다.",
                        "저장소 이름을 탭하여 승인하세요.",
                        "경고를 수락하여 실행을 허용합니다."
                    ]
                },
                {
                    icon: <Download className="w-6 h-6" />,
                    title: "3. 확장 프로그램 설치 및 업데이트",
                    desc: "이제 탐색 탭에서 확장 프로그램을 설치할 수 있습니다.",
                    details: [
                        "앱의 탐색 -> 확장 프로그램 탭으로 이동합니다.",
                        "아래로 당겨서 목록을 새로 고침합니다.",
                        "원하는 항목의 설치를 탭합니다.",
                        "오래된 확장 프로그램이 설치되어 있는 경우 제거하고 다시 설치해야 할 수 있습니다."
                    ]
                },
                {
                    icon: <Search className="w-6 h-6" />,
                    title: "4. 문제 해결",
                    desc: "특정 시리즈를 찾을 수 없는 경우:",
                    details: [
                        "확장 프로그램이 설치되어 있고 최신 버전인지 확인합니다.",
                        "확장 프로그램에서 요구하는 경우 Cloudflare를 우회합니다(WebView에서 열기).",
                        "확장 프로그램에 'Obsolete'라고 표시되면 완전히 제거한 후 저장소에서 다시 설치합니다."
                    ]
                }
            ]
        },
        zh: {
            title: "安装指南",
            subtitle: "在应用中设置扩展仓库的基本信息。",
            back: "返回 Koma",
            steps: [
                {
                    icon: <Settings className="w-6 h-6" />,
                    title: "1. 添加仓库",
                    desc: "要访问扩展，您需要直接从应用中添加仓库。",
                    details: [
                        "在您的 Android 设备上打开应用 (Koma, Mihon, 或 Tachiyomi 分支)。",
                        "转到 更多 -> 设置 -> 浏览。",
                        "找到 扩展仓库 部分并点击 添加。",
                        "输入仓库 URL: " + window.location.origin + "/api/koma/repo/index.min.json",
                        "点击 添加 或 确认 以添加仓库。"
                    ]
                },
                {
                    icon: <AlertTriangle className="w-6 h-6" />,
                    title: "2. 批准权限 (如果需要)",
                    desc: "在较新的 Android 版本或特定应用中，您可能需要授予信任。",
                    details: [
                        "仓库名称下会显示 '不受信任 (Untrusted)'。",
                        "点击仓库名称以批准它。",
                        "接受警告以允许扩展运行。"
                    ]
                },
                {
                    icon: <Download className="w-6 h-6" />,
                    title: "3. 安装与更新扩展",
                    desc: "您现在可以从 浏览 选项卡安装扩展。",
                    details: [
                        "转到应用中的 浏览 -> 扩展 选项卡。",
                        "下拉以刷新列表。",
                        "您应该能看到仓库中的扩展。点击您想要的扩展上的 安装。",
                        "如果您安装了旧版扩展，您可能需要卸载并重新安装它们以链接到新仓库。"
                    ]
                },
                {
                    icon: <Search className="w-6 h-6" />,
                    title: "4. 故障排除",
                    desc: "如果您找不到特定系列：",
                    details: [
                        "检查扩展是否已安装且为最新版本。",
                        "如果扩展需要，请确保绕过 Cloudflare (在 WebView 中打开)。",
                        "如果扩展显示 '已废弃 (Obsolete)'，请完全卸载它，刷新扩展列表，然后从我们的仓库再次安装。"
                    ]
                }
            ]
        },
        fr: {
            title: "Guide d'Installation",
            subtitle: "Informations essentielles pour configurer le dépôt.",
            back: "Retour à Koma",
            steps: [
                {
                    icon: <Settings className="w-6 h-6" />,
                    title: "1. Ajouter le dépôt",
                    desc: "Ajoutez le dépôt depuis l'app pour accéder aux extensions.",
                    details: [
                        "Ouvrez votre App (Koma, Mihon) sur Android.",
                        "Allez dans Plus -> Paramètres -> Parcourir.",
                        "Trouvez Dépôts d'extensions et appuyez sur Ajouter.",
                        "Entrez l'URL : " + window.location.origin + "/api/koma/repo/index.min.json",
                        "Appuyez sur Ajouter ou Confirmer."
                    ]
                },
                {
                    icon: <AlertTriangle className="w-6 h-6" />,
                    title: "2. Approuver (Si nécessaire)",
                    desc: "Vous devrez peut-être faire confiance au dépôt.",
                    details: [
                        "Il sera indiqué 'Non approuvé'.",
                        "Appuyez sur le nom du dépôt pour l'approuver.",
                        "Acceptez l'avertissement."
                    ]
                },
                {
                    icon: <Download className="w-6 h-6" />,
                    title: "3. Installer les Extensions",
                    desc: "Vous pouvez maintenant installer des extensions.",
                    details: [
                        "Allez dans Parcourir -> Extensions.",
                        "Glissez vers le bas pour actualiser.",
                        "Appuyez sur Installer pour les extensions voulues.",
                        "Désinstallez/réinstallez les anciennes extensions si besoin."
                    ]
                },
                {
                    icon: <Search className="w-6 h-6" />,
                    title: "4. Dépannage",
                    desc: "Si vous ne trouvez pas une série :",
                    details: [
                        "Vérifiez que l'extension est à jour.",
                        "Contournez Cloudflare si nécessaire (Ouvrir dans WebView).",
                        "Si l'extension est 'Obsolète', désinstallez-la complètement et réinstallez-la."
                    ]
                }
            ]
        },
        ar: {
            title: "دليل التثبيت",
            subtitle: "المعلومات الأساسية لمساعدتك في إعداد المستودع.",
            back: "العودة إلى Koma",
            steps: [
                {
                    icon: <Settings className="w-6 h-6" />,
                    title: "1. إضافة المستودع",
                    desc: "للوصول إلى الإضافات، يجب إضافة المستودع مباشرة من التطبيق.",
                    details: [
                        "افتح التطبيق في جهاز Android.",
                        "اذهب إلى المزيد -> الإعدادات -> تصفح.",
                        "ابحث عن مستودعات الإضافات واضغط على إضافة.",
                        "أدخل رابط المستودع: " + window.location.origin + "/api/koma/repo/index.min.json",
                        "اضغط إضافة أو تأكيد."
                    ]
                },
                {
                    icon: <AlertTriangle className="w-6 h-6" />,
                    title: "2. الموافقة على الأذونات",
                    desc: "في أجهزة الأندرويد الحديثة، قد تحتاج إلى الموافقة.",
                    details: [
                        "سيكون مكتوباً 'غير موثوق' تحت اسم المستودع.",
                        "اضغط على اسم المستودع للموافقة عليه.",
                        "اقبل التحذير للسماح بتشغيل الإضافات."
                    ]
                },
                {
                    icon: <Download className="w-6 h-6" />,
                    title: "3. تثبيت وتحديث الإضافات",
                    desc: "يمكنك الآن تثبيت الإضافات من علامة التبويب تصفح.",
                    details: [
                        "اذهب إلى تصفح -> الإضافات في التطبيق.",
                        "اسحب لأسفل لتحديث القائمة.",
                        "اضغط تثبيت على الإضافات التي تريدها.",
                        "قد تحتاج لإلغاء تثبيت الإضافات القديمة وتثبيتها من جديد لربطها بالمستودع الجديد."
                    ]
                },
                {
                    icon: <Search className="w-6 h-6" />,
                    title: "4. استكشاف الأخطاء",
                    desc: "إذا لم تتمكن من العثور على سلسلة معينة:",
                    details: [
                        "تأكد من أن الإضافة مثبتة ومحدثة.",
                        "تأكد من تجاوز Cloudflare إذا لزم الأمر (فتح في WebView).",
                        "إذا كُتب 'قديمة (Obsolete)'، قم بإلغاء تثبيتها تماماً وحملها من المستودع الجديد."
                    ]
                }
            ]
        }
    };

    const text = content[language as keyof typeof content] || content.en;

    return (
        <KomaDocsLayout>
            <div className="flex items-center gap-4 mb-2">
                <div className="p-3 rounded-lg bg-accent/10 border border-accent/20 text-accent">
                    <BookOpen className="w-6 h-6" />
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-white font-heading m-0">
                    {text.title}
                </h1>
            </div>
            <p className="text-slate-400 text-lg mb-12">
                {text.subtitle}
            </p>

            <div className="space-y-8">
                {text.steps.map((step, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 md:p-8"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
                                {step.icon}
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-white font-heading m-0">{step.title}</h2>
                        </div>
                        <p className="text-slate-400 mb-6 text-lg">{step.desc}</p>
                        <ul className="space-y-4 m-0 p-0 list-none">
                            {step.details.map((detail, idx) => (
                                <li key={idx} className="flex gap-4 text-slate-300 m-0">
                                    <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono text-slate-400 shrink-0 mt-0.5">
                                        {idx + 1}
                                    </span>
                                    <span className="leading-relaxed">{detail}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </KomaDocsLayout>
    );
};
