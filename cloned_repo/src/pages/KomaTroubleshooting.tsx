import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wrench, ShieldAlert, Globe, RefreshCw, AlertCircle } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { KomaDocsLayout } from '../components/KomaDocsLayout';

export const KomaTroubleshooting: React.FC = () => {
    const language = useLanguage();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const content = {
        en: {
            title: "Troubleshooting",
            subtitle: "Facing source or app issues? Here's how to troubleshoot common problems in Koma, Mihon, or Tachiyomi forks.",
            back: "Back to Koma",
            sections: [
                {
                    icon: <Globe className="w-6 h-6" />,
                    title: "WebView Issues",
                    desc: "Many extensions scrape websites directly. If the website requires Cloudflare protection or changes its layout, the extension might break.",
                    solutions: [
                        {
                            subTitle: "Verifying the website via WebView",
                            text: "Open the source in WebView (usually by tapping the Web icon or opening the extension settings and clicking 'Open in WebView'). Verify if the website is accessible, has changed its Domain, or requires human verification like Cloudflare."
                        },
                        {
                            subTitle: "Handling Cloudflare Loops",
                            text: "If you see a 'Checking your browser' Cloudflare screen in WebView, solve the captcha. If it keeps looping indefinitely, try changing your User-Agent in Settings -> Advanced -> Custom User-Agent to match your device's actual WebView User-Agent."
                        },
                        {
                            subTitle: "Update Android System WebView",
                            text: "Go to the Play Store and ensure 'Android System WebView' is updated to the latest version, as outdated WebViews commonly break modern Cloudflare protections."
                        }
                    ]
                },
                {
                    icon: <ShieldAlert className="w-6 h-6" />,
                    title: "App Not Installed Error",
                    desc: "When installing an extension APK, you get an 'App not installed' error or Google Play Protect blocks it.",
                    solutions: [
                        {
                            subTitle: "Conflicting Signatures",
                            text: "This usually happens when you already have an extension installed from a different repository or the old Tachiyomi repo. You must uninstall the old extension completely from inside your device's App Settings, and then reinstall it from our repo."
                        },
                        {
                            subTitle: "Play Protect Warning",
                            text: "Extensions are unsigned or self-signed APKs. Google Play Protect might flag them. You can click 'More details' and 'Install anyway' on the Play Protect popup."
                        }
                    ]
                },
                {
                    icon: <RefreshCw className="w-6 h-6" />,
                    title: "Obsolete Extensions",
                    desc: "An extension is marked as 'Obsolete'.",
                    solutions: [
                        {
                            subTitle: "Why it happens",
                            text: "It means the extension's original developer abandoned it, the source website shut down, or you are migrating to a new repository."
                        },
                        {
                            subTitle: "The Fix",
                            text: "Uninstall the 'Obsolete' extension. Refresh your extension list by pulling down. Search for it again and install the latest version from the new repository."
                        }
                    ]
                },
                {
                    icon: <AlertCircle className="w-6 h-6" />,
                    title: "Images not loading",
                    desc: "Chapters load but images show a retry button or broken icons.",
                    solutions: [
                        {
                            subTitle: "Clear Cookies and Cache",
                            text: "Go to More -> Settings -> Advanced -> Clear cookies and WebView data. Restart the app."
                        },
                        {
                            subTitle: "Check network connection",
                            text: "Some ISPs block adult or manga tracking domains. Try using a Custom DNS (Settings -> Advanced -> DNS over HTTPS) like Cloudflare or AdGuard, or try using a VPN."
                        }
                    ]
                }
            ]
        },
        id: {
            title: "Pemecahan Masalah",
            subtitle: "Menghadapi masalah dengan sumber atau aplikasi? Berikut cara memecahkan masalah umum di Koma, Mihon, atau Tachiyomi forks.",
            back: "Kembali ke Koma",
            sections: [
                {
                    icon: <Globe className="w-6 h-6" />,
                    title: "Masalah WebView",
                    desc: "Banyak ekstensi mengambil data langsung dari situs web. Jika situs web memerlukan perlindungan Cloudflare atau mengubah tata letaknya, ekstensi mungkin tidak berfungsi.",
                    solutions: [
                        {
                            subTitle: "Memverifikasi situs web melalui WebView",
                            text: "Buka sumber di WebView (biasanya dengan mengetuk ikon Web atau membuka pengaturan ekstensi dan mengklik 'Buka di WebView'). Verifikasi apakah situs web dapat diakses, telah mengubah Domainnya, atau memerlukan verifikasi manusia seperti Cloudflare."
                        },
                        {
                            subTitle: "Menangani Looping Cloudflare",
                            text: "Jika Anda melihat layar Cloudflare 'Checking your browser' di WebView, selesaikan captcha. Jika terus berulang tanpa batas, coba ubah User-Agent Anda di Pengaturan -> Lanjutan -> Custom User-Agent agar cocok dengan WebView User-Agent perangkat Anda yang sebenarnya."
                        },
                        {
                            subTitle: "Perbarui Android System WebView",
                            text: "Pergi ke Play Store dan pastikan 'Android System WebView' diperbarui ke versi terbaru, karena WebView yang kedaluwarsa sering kali merusak perlindungan Cloudflare modern."
                        }
                    ]
                },
                {
                    icon: <ShieldAlert className="w-6 h-6" />,
                    title: "Aplikasi Tidak Terinstal",
                    desc: "Saat menginstal ekstensi APK, Anda mendapatkan pesan error 'Aplikasi tidak terinstal' atau Google Play Protect memblokirnya.",
                    solutions: [
                        {
                            subTitle: "Konflik Tanda Tangan",
                            text: "Ini biasanya terjadi saat Anda sudah menginstal ekstensi dari repositori yang berbeda atau repo Tachiyomi lama. Anda harus mencopot ekstensi lama sepenuhnya dari dalam Pengaturan Aplikasi perangkat Anda, lalu instal ulang dari repo kami."
                        },
                        {
                            subTitle: "Peringatan Play Protect",
                            text: "Ekstensi adalah file APK yang tidak ditandatangani atau ditandatangani sendiri. Google Play Protect mungkin menandainya. Anda dapat mengklik 'Detail lainnya' dan 'Tetap instal' pada popup Play Protect."
                        }
                    ]
                },
                {
                    icon: <RefreshCw className="w-6 h-6" />,
                    title: "Ekstensi Usang (Obsolete)",
                    desc: "Sebuah ekstensi ditandai sebagai 'Usang'.",
                    solutions: [
                        {
                            subTitle: "Mengapa itu terjadi",
                            text: "Artinya pengembang awal ekstensi tersebut mengabaikannya, situs web sumbernya ditutup, atau Anda sedang bermigrasi ke repositori baru."
                        },
                        {
                            subTitle: "Solusi",
                            text: "Copot pemasangan ekstensi yang 'Usang' tersebut. Segarkan daftar ekstensi Anda dengan menariknya ke bawah. Cari lagi dan instal versi terbaru dari repositori baru."
                        }
                    ]
                },
                {
                    icon: <AlertCircle className="w-6 h-6" />,
                    title: "Gambar Tidak Memuat",
                    desc: "Bab terbuka, tetapi gambar menampilkan tombol coba lagi atau ikon rusak.",
                    solutions: [
                        {
                            subTitle: "Hapus Cookie dan Cache",
                            text: "Pergi ke Lainnya (More) -> Pengaturan (Settings) -> Lanjutan (Advanced) -> Hapus cookie dan data WebView. Mulai ulang aplikasi."
                        },
                        {
                            subTitle: "Periksa koneksi jaringan",
                            text: "Beberapa penyedia internet memblokir domain tertentu. Coba gunakan DNS Kustom (Pengaturan -> Lanjutan -> DNS over HTTPS) seperti Cloudflare atau AdGuard, atau coba menggunakan VPN."
                        }
                    ]
                }
            ]
        },
        es: {
            title: "Solución de Problemas",
            subtitle: "¿Tus extensiones fallan? Aprende a solucionar problemas comunes en Koma, Mihon o Tachiyomi.",
            back: "Volver a Koma",
            sections: [
                {
                    icon: <Globe className="w-6 h-6" />,
                    title: "Problemas con WebView",
                    desc: "Las extensiones obtienen datos de las webs. Si hay Cloudflare, fallan.",
                    solutions: [
                        { subTitle: "Verificar en WebView", text: "Abre la fuente en WebView y verifica si pide captcha de Cloudflare." },
                        { subTitle: "Bucle infinito Cloudflare", text: "Resuelve el captcha. Si sigue en bucle, ajusta el User-Agent en Ajustes -> Avanzado." },
                        { subTitle: "Actualizar Android WebView", text: "Actualiza 'Android System WebView' en la Play Store." }
                    ]
                },
                {
                    icon: <ShieldAlert className="w-6 h-6" />,
                    title: "Error App no Instalada",
                    desc: "Fallo al instalar APKs o bloqueo de Play Protect.",
                    solutions: [
                        { subTitle: "Conflicto de Firmas", text: "Desinstala completamente la extensión antigua desde los ajustes de Android antes de instalarla." },
                        { subTitle: "Play Protect", text: "Toca 'Más detalles' e 'Instalar de todas formas'." }
                    ]
                },
                {
                    icon: <RefreshCw className="w-6 h-6" />,
                    title: "Extensiones Obsoletas",
                    desc: "Extensiones marcadas como 'Obsoletas'.",
                    solutions: [
                        { subTitle: "Por qué pasa", text: "El desarrollador abandonó la extensión o la web cerró." },
                        { subTitle: "Solución", text: "Desinstálala, actualiza la lista y vuelve a buscar." }
                    ]
                },
                {
                    icon: <AlertCircle className="w-6 h-6" />,
                    title: "Las Imágenes no cargan",
                    desc: "Icono de error o botón de reintentar.",
                    solutions: [
                        { subTitle: "Borrar Cookies y Caché", text: "Ve a Ajustes -> Avanzado -> Borrar cookies y datos de WebView." },
                        { subTitle: "Conexión de Red", text: "Prueba a cambiar a un DNS como Cloudflare (DNS over HTTPS) o usa una VPN." }
                    ]
                }
            ]
        },
        ja: {
            title: "トラブルシューティング",
            subtitle: "アプリやソースで問題が発生していますか？よくある問題の解決策です。",
            back: "Komaに戻る",
            sections: [
                {
                    icon: <Globe className="w-6 h-6" />,
                    title: "WebViewの問題",
                    desc: "WebサイトがCloudflareなどの保護を必要とする場合、拡張機能が動かなくなります。",
                    solutions: [
                        { subTitle: "WebViewから検証する", text: "WebViewでソースを開き、Cloudflareなどの認証が必要か確認してください。" },
                        { subTitle: "Cloudflareループの修正", text: "WebViewでキャプチャを解きます。設定 -> 詳細 -> カスタムUser-Agent を変更する必要があるかもしれません。" },
                        { subTitle: "Android WebViewの更新", text: "Playストアで 'Android System WebView' が最新であることを確認してください。" }
                    ]
                },
                {
                    icon: <ShieldAlert className="w-6 h-6" />,
                    title: "アプリがインストールされない",
                    desc: "APKのインストールエラーまたはPlay Protectによるブロック。",
                    solutions: [
                        { subTitle: "署名の競合", text: "デバイスのアプリ設定から古い拡張機能を完全にアンインストールし、再度インストールします。" },
                        { subTitle: "Play Protectの警告", text: "ポップアップの '詳細' を押し、'インストールする' を選択します。" }
                    ]
                },
                {
                    icon: <RefreshCw className="w-6 h-6" />,
                    title: "廃止された拡張機能",
                    desc: "拡張機能が 'Obsolete' と表示される場合。",
                    solutions: [
                        { subTitle: "原因", text: "ウェブサイトが閉鎖されたか、開発が中止されました。" },
                        { subTitle: "修正", text: "アンインストールして、リストを更新後、もう一度検索してインストールしてください。" }
                    ]
                },
                {
                    icon: <AlertCircle className="w-6 h-6" />,
                    title: "画像が読み込まれない",
                    desc: "壊れた画像アイコンやリトライボタンが表示される場合。",
                    solutions: [
                        { subTitle: "Cookieとキャッシュの消去", text: "設定 -> 詳細設定 -> CookieとWebViewデータを消去 してアプリを再起動します。" },
                        { subTitle: "ネットワーク接続の確認", text: "設定からカスタムDNS (Cloudflareなど) を使用するか、VPNをお試しください。" }
                    ]
                }
            ]
        },
        ko: {
            title: "문제 해결",
            subtitle: "소스나 앱에 문제가 있나요? 가장 일반적인 문제 해결 방법을 확인하세요.",
            back: "Koma로 돌아가기",
            sections: [
                {
                    icon: <Globe className="w-6 h-6" />,
                    title: "WebView 문제",
                    desc: "웹사이트에서 Cloudflare 보호를 필요로 하거나 레이아웃을 변경하면 확장 프로그램이 중단될 수 있습니다.",
                    solutions: [
                        { subTitle: "WebView를 통해 확인", text: "WebView에서 소스를 열어 사람 인증(Cloudflare)이 필요한지 확인하세요." },
                        { subTitle: "Cloudflare 루프 처리", text: "WebView에서 캡차를 해결하세요. 설정 -> 고급의 User-Agent를 변경해야 할 수 있습니다." },
                        { subTitle: "Android 시스템 WebView 업데이트", text: "Play 스토어에서 최신 버전의 'Android 시스템 WebView'인지 확인하세요." }
                    ]
                },
                {
                    icon: <ShieldAlert className="w-6 h-6" />,
                    title: "앱 설치되지 않음 오류",
                    desc: "오류가 발생하거나 Play Protect가 차단하는 경우.",
                    solutions: [
                        { subTitle: "서명 충돌", text: "안드로이드 설정에서 이전 확장 프로그램을 완전히 삭제한 후 새 저장소에서 다시 설치하세요." },
                        { subTitle: "Play Protect 경고", text: "'세부정보 보기'를 클릭하고 '무시하고 설치'를 선택하세요." }
                    ]
                },
                {
                    icon: <RefreshCw className="w-6 h-6" />,
                    title: "Obsolete (더 이상 사용되지 않는) 확장",
                    desc: "확장 프로그램이 'Obsolete'로 표시됨.",
                    solutions: [
                        { subTitle: "발생 원인", text: "개발자가 포기했거나 원본 웹사이트가 폐쇄되었습니다." },
                        { subTitle: "해결 방법", text: "Obsolete 확장을 제거하고 확장 목록을 새로고침한 후 다시 설치하세요." }
                    ]
                },
                {
                    icon: <AlertCircle className="w-6 h-6" />,
                    title: "이미지가 로드되지 않음",
                    desc: "챕터는 열리지만 이미지가 보이지 않는 경우.",
                    solutions: [
                        { subTitle: "쿠키 및 캐시 삭제", text: "설정 -> 고급 -> 쿠키 및 WebView 데이터 지우기를 수행하고 재시작하세요." },
                        { subTitle: "네트워크 확인", text: "커스텀 DNS (Cloudflare 등) 사용 또는 VPN을 시도해 보세요." }
                    ]
                }
            ]
        },
        zh: {
            title: "故障排除",
            subtitle: "遇到扩展源或应用问题？了解如何解决Koma、Mihon或Tachiyomi中的常见问题。",
            back: "返回 Koma",
            sections: [
                {
                    icon: <Globe className="w-6 h-6" />,
                    title: "WebView 问题",
                    desc: "许多扩展会直接抓取网页。如果该网站开启了Cloudflare等盾，扩展可能会失效。",
                    solutions: [
                        { subTitle: "使用 WebView 验证", text: "在WebView中打开该源，检查是否需要完成Cloudflare人机验证。" },
                        { subTitle: "处理 Cloudflare 循环验证", text: "如果在WebView中卡验证，请在 设置 -> 高级 中修改自定 User-Agent 以匹配您设备的系统 WebView。" },
                        { subTitle: "更新 Android System WebView", text: "前往Play商店确认 'Android System WebView' 已更新至最新版。" }
                    ]
                },
                {
                    icon: <ShieldAlert className="w-6 h-6" />,
                    title: "应用未安装 / 安装失败",
                    desc: "安装APK时提示失败或被Play Protect阻挡。",
                    solutions: [
                        { subTitle: "签名冲突", text: "您必须先从系统设置中彻底卸载旧版扩展应用，然后从我们的仓库重新安装。" },
                        { subTitle: "Play Protect 警告", text: "扩展是无签名的，您可以点击 '更多详细信息' -> '仍然安装'。" }
                    ]
                },
                {
                    icon: <RefreshCw className="w-6 h-6" />,
                    title: "已废弃 (Obsolete) 的扩展",
                    desc: "有些扩展上面会显示 'Obsolete' 的标签。",
                    solutions: [
                        { subTitle: "发生原因", text: "源网站倒闭了，或者原作者不再维护。" },
                        { subTitle: "修复", text: "卸载 '已废弃' 的扩展，下拉刷新扩展列表，并重新搜索安装。" }
                    ]
                },
                {
                    icon: <AlertCircle className="w-6 h-6" />,
                    title: "图片无法加载",
                    desc: "显示加载失败图标或重试按钮。",
                    solutions: [
                        { subTitle: "清除 Cookie 和缓存", text: "前往 设置 -> 高级 -> 清除 Cookie 和 WebView 数据，重启App。" },
                        { subTitle: "检查网络连接", text: "尝试使用自定义 DNS (设置 -> 高级 -> DNS over HTTPS) 如 Cloudflare，或切换梯子。" }
                    ]
                }
            ]
        },
        fr: {
            title: "Dépannage",
            subtitle: "Des problèmes avec l'app ? Voici comment résoudre les erreurs courantes.",
            back: "Retour à Koma",
            sections: [
                {
                    icon: <Globe className="w-6 h-6" />,
                    title: "Problèmes WebView",
                    desc: "Si un site internet demande une vérification Cloudflare, l'extension risque de se casser.",
                    solutions: [
                        { subTitle: "Vérifier via WebView", text: "Ouvrez WebView et passez la sécurité anti-bot manuellement." },
                        { subTitle: "Boucle Cloudflare", text: "Si Cloudflare tourne en boucle, modifiez le User-Agent dans Paramètres -> Avancé." },
                        { subTitle: "Mettre à jour Android WebView", text: "Mettez à jour 'Android System WebView' depuis le Play Store." }
                    ]
                },
                {
                    icon: <ShieldAlert className="w-6 h-6" />,
                    title: "Erreur 'Application Non Installée'",
                    desc: "Google Play Protect bloque l'APK.",
                    solutions: [
                        { subTitle: "Conflit de Signatures", text: "Désinstallez complètement l'ancienne extension depuis les Paramètres du téléphone avant d'installer la nouvelle." },
                        { subTitle: "Alerte Play Protect", text: "Appuyez sur 'Détails' puis 'Installer quand même'." }
                    ]
                },
                {
                    icon: <RefreshCw className="w-6 h-6" />,
                    title: "Extensions Obsolètes",
                    desc: "Une extension est marquée 'Obsolète'.",
                    solutions: [
                        { subTitle: "Pourquoi", text: "Le développeur a arrêté ou le site source a fermé." },
                        { subTitle: "Solution", text: "Désinstallez l'obsolète, rafraîchissez la liste et réinstallez." }
                    ]
                },
                {
                    icon: <AlertCircle className="w-6 h-6" />,
                    title: "Images non chargées",
                    desc: "Icones cassées ou bouton 'Réessayer'.",
                    solutions: [
                        { subTitle: "Effacer Cookies/Cache", text: "Paramètres -> Avancé -> Effacer les cookies et Données WebView." },
                        { subTitle: "Vérifier la connexion", text: "Utilisez un DNS personnalisé via Paramètres ou activez un VPN." }
                    ]
                }
            ]
        },
        ar: {
            title: "استكشاف الأخطاء وإصلاحها",
            subtitle: "هل تواجه مشاكل؟ إليك كيفية حل المشاكل الشائعة في Koma أو Tachiyomi.",
            back: "العودة إلى Koma",
            sections: [
                {
                    icon: <Globe className="w-6 h-6" />,
                    title: "مشاكل WebView",
                    desc: "إذا كان الموقع يتطلب حماية Cloudflare، فقد تتوقف الإضافة.",
                    solutions: [
                        { subTitle: "تحقق من الموقع في WebView", text: "افتح الرابط في WebView وتحقق من إمكانية الوصول إلى الموقع وقم بحل التحقق البشري." },
                        { subTitle: "مشكلة تكرار Cloudflare", text: "إذا علقت في شاشة Cloudflare، قم بتغيير User-Agent الخاص بك في إعدادات التطبيق المتقدمة." },
                        { subTitle: "تحديث WebView", text: "قم بتحديث 'Android System WebView' من متجر جوجل بلاي." }
                    ]
                },
                {
                    icon: <ShieldAlert className="w-6 h-6" />,
                    title: "خطأ التطبيق غير مثبت",
                    desc: "يفشل تثبيت APK أو يحظره Play Protect.",
                    solutions: [
                        { subTitle: "تعارض التوقيعات", text: "احذف الإضافة القديمة تماماً من إعدادات الهاتف قبل تثبيت الجديدة من المستودع." },
                        { subTitle: "تحذير Play Protect", text: "اضغط على المزيد من التفاصيل ثم 'تثبيت على أي حال'." }
                    ]
                },
                {
                    icon: <RefreshCw className="w-6 h-6" />,
                    title: "إضافات قديمة (Obsolete)",
                    desc: "إضافة تُظهر تنبيه 'Obsolete'.",
                    solutions: [
                        { subTitle: "السبب", text: "تم إغلاق الموقع أو تخلى المطور عنها." },
                        { subTitle: "الحل", text: "ألغِ التثبيت وحدث قائمة التنزيل قبل البحث مجدداً." }
                    ]
                },
                {
                    icon: <AlertCircle className="w-6 h-6" />,
                    title: "الصور لا تظهر",
                    desc: "المجلدات تفتح ولكن الصور تالفة.",
                    solutions: [
                        { subTitle: "مسح الكوكيز", text: "اذهب إلى الإعدادات المتقدمة وامسح كوكيز WebView." },
                        { subTitle: "مشاكل الإنترنت", text: "استخدم DNS مخصص مثل Cloudflare من إعدادات التطبيق أو جرب تفعيل VPN." }
                    ]
                }
            ]
        }
    };

    const text = content[language as keyof typeof content] || content.en;

    return (
        <KomaDocsLayout>
            <div className="flex items-center gap-4 mb-2">
                <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400">
                    <Wrench className="w-6 h-6" />
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-white font-heading m-0">
                    {text.title}
                </h1>
            </div>
            <p className="text-slate-400 text-lg mb-12">
                {text.subtitle}
            </p>

            <div className="space-y-12">
                {text.sections.map((section, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 md:p-8"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
                                {section.icon}
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-white font-heading m-0">{section.title}</h2>
                        </div>
                        <p className="text-slate-400 mb-8">{section.desc}</p>
                        
                        <div className="grid md:grid-cols-2 gap-6 p-0 m-0">
                            {section.solutions.map((solution, idx) => (
                                <div key={idx} className="bg-slate-900 border border-slate-800/80 p-6 rounded-lg m-0">
                                    <h3 className="text-lg font-bold text-slate-200 mb-3 mt-0">{solution.subTitle}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed m-0">{solution.text}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </KomaDocsLayout>
    );
};
