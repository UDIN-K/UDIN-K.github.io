import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
    Layers,
    BookOpen,
    ArrowRight
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useSEO } from '../hooks/useSEO';

export const Home: React.FC = () => {
  const language = useLanguage();

    useSEO({
      title: "UDINK — Software Engineer & Open Source",
      description: "UDINK (UDIN-K) is a software engineer focused on modern web interfaces, backend systems, and open-source projects.",
      keywords: "UDINK, UDIN-K, software engineer, backend developer, web developer, open source, portfolio, TypeScript, React"
    });

  const t = {
    en: {
      avail: 'Available for new projects',
      craft1: 'Crafting',
      craft2: 'Digital',
      craft3: 'Experiences',
      desc: "I'm UDIN-K, a developer focused on modern web interfaces, backend systems, and open-source tooling.",
      portTitle: 'Portfolio Archives',
      portDesc: 'Explore my open-source projects and creative work.',
      viewProj: 'View Projects',
      labTitle: 'Koma (コマ)\nReader App',
      labDesc: 'Looking for Koma Manga Reader?',
      openLabs: 'Explore Now!'
    },
    id: {
      avail: 'Tersedia untuk proyek baru',
      craft1: 'Membangun',
      craft2: 'Pengalaman',
      craft3: 'Digital',
      desc: 'Saya UDIN-K, developer yang fokus pada antarmuka web modern, backend system, dan tooling open-source.',
      portTitle: 'Arsip Portofolio',
      portDesc: 'Jelajahi proyek open-source dan karya saya.',
      viewProj: 'Lihat Proyek',
      labTitle: 'Koma (コマ)\nReader App',
      labDesc: 'Looking for Koma Manga Reader?',
      openLabs: 'Explore Now!'
    },
    es: {
      avail: 'Disponible para nuevos proyectos',
      craft1: 'Creando',
      craft2: 'Experiencias',
      craft3: 'Digitales',
      desc: 'Soy UDIN-K, desarrollador enfocado en interfaces web modernas, sistemas backend y tooling open-source.',
      portTitle: 'Archivo de Portafolio',
      portDesc: 'Explora mis proyectos de código abierto y trabajo creativo.',
      viewProj: 'Ver Proyectos',
      labTitle: 'Koma (コマ)\nReader App',
      labDesc: 'Looking for Koma Manga Reader?',
      openLabs: 'Explore Now!'
    },
    ja: {
      avail: '新しいプロジェクトで利用可能',
      craft1: 'デジタル',
      craft2: '体験を',
      craft3: '構築する',
      desc: '私はUDIN-K。モダンなWeb UI、バックエンド、オープンソースの開発に注力しています。',
      portTitle: 'ポートフォリオ',
      portDesc: 'オープンソースや制作物をチェックできます。',
      viewProj: 'プロジェクトを見る',
      labTitle: 'Koma (コマ)\nReader App',
      labDesc: 'Looking for Koma Manga Reader?',
      openLabs: 'Explore Now!'
    },
    ko: {
      avail: '새 프로젝트 참여 가능',
      craft1: '디지털',
      craft2: '경험',
      craft3: '제작',
      desc: '저는 UDIN-K이며, 모던 웹 인터페이스와 백엔드, 오픈소스 툴링에 집중합니다.',
      portTitle: '포트폴리오 보관소',
      portDesc: '오픈소스 프로젝트와 작업물을 둘러보세요.',
      viewProj: '프로젝트 보기',
      labTitle: 'Koma (コマ)\nReader App',
      labDesc: 'Looking for Koma Manga Reader?',
      openLabs: 'Explore Now!'
    },
    zh: {
      avail: '可接受新项目',
      craft1: '打造',
      craft2: '数字',
      craft3: '体验',
      desc: '我是 UDIN-K，专注于现代 Web 界面、后端系统与开源工具。',
      portTitle: '作品集档案',
      portDesc: '探索我的开源项目和创意作品。',
      viewProj: '查看项目',
      labTitle: 'Koma (コマ)\nReader App',
      labDesc: 'Looking for Koma Manga Reader?',
      openLabs: 'Explore Now!'
    },
    fr: {
      avail: 'Disponible pour de nouveaux projets',
      craft1: 'Création',
      craft2: 'Expériences',
      craft3: 'Numériques',
      desc: 'Je suis UDIN-K, développeur axé sur les interfaces web modernes, les backends et l’open source.',
      portTitle: 'Archives du Portfolio',
      portDesc: 'Explorez mes projets open-source et travaux créatifs.',
      viewProj: 'Voir les Projets',
      labTitle: 'Koma (コマ)\nReader App',
      labDesc: 'Looking for Koma Manga Reader?',
      openLabs: 'Explore Now!'
    },
    ar: {
      avail: 'متاح لمشاريع جديدة',
      craft1: 'صناعة',
      craft2: 'تجارب',
      craft3: 'رقمية',
      desc: 'أنا UDIN-K، مطور أركز على واجهات ويب حديثة وأنظمة خلفية وأدوات مفتوحة المصدر.',
      portTitle: 'أرشيف الأعمال',
      portDesc: 'استكشف مشاريعي مفتوحة المصدر وأعمالي الإبداعية.',
      viewProj: 'عرض المشاريع',
      labTitle: 'Koma (コマ)\nReader App',
      labDesc: 'Looking for Koma Manga Reader?',
      openLabs: 'Explore Now!'
    }
  };

  const text = t[language as keyof typeof t] || t.en;

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden font-sans bg-slate-950">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-800/20 via-slate-950 to-slate-950"></div>
        <div className="absolute top-40 -left-20 w-96 h-96 bg-blue-500/10 blur-[128px] rounded-full"></div>
        <div className="absolute bottom-40 right-[-10%] w-96 h-96 bg-accent/10 blur-[128px] rounded-full"></div>
      </div>
      
      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col items-center justify-center pt-32 pb-24 px-4 text-center z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12 flex flex-col items-center w-full max-w-4xl mx-auto"
          >
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 border border-white/10 bg-white/5 rounded-full backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                  <span className="text-white/70 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em]">
                      {text.avail}
                  </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-[1.1] tracking-tight">
                  {text.craft1}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-white to-slate-400 italic font-normal pr-2">
                      {text.craft2}
                  </span>{language !== 'ja' && language !== 'ko' && language !== 'zh' ? <br /> : ' '}
                  {text.craft3}
              </h1>

              <p className="text-slate-400 text-sm md:text-base font-mono tracking-wide max-w-2xl leading-relaxed px-4 mt-6">
                  {text.desc}
              </p>
          </motion.div>

          {/* Action Cards Grid */}
          <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="w-full max-w-4xl mx-auto grid md:grid-cols-2 gap-4 md:gap-6 px-6 md:px-8"
          >
              <Link 
                  to="/projects" 
                  className="group relative flex flex-col text-left p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 overflow-hidden"
              >
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
                      <Layers className="w-24 h-24 text-white" />
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mb-16 group-hover:scale-110 transition-transform duration-300">
                      <Layers className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-2">
                      {text.portTitle}
                  </h3>
                  <p className="text-slate-400 text-xs font-mono mb-6">
                      {text.portDesc}
                  </p>
                  <div className="mt-auto flex items-center text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                      {text.viewProj} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
              </Link>

                <a
                  href="https://koma.udink.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col text-left p-8 rounded-2xl border border-accent/10 bg-accent/[0.02] hover:bg-accent/[0.05] hover:border-accent/20 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
                    <BookOpen className="w-24 h-24 text-accent" />
                  </div>
                  <div className="w-12 h-12 rounded-full border border-accent/20 bg-accent/10 flex items-center justify-center mb-16 group-hover:scale-110 transition-transform duration-300">
                     <BookOpen className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-2 group-hover:text-accent transition-colors whitespace-pre-line">
                    {text.labTitle}
                  </h3>
                  <p className="text-slate-400 text-xs font-mono mb-6">
                    {text.labDesc}
                  </p>
                  <div className="mt-auto flex items-center text-xs font-bold uppercase tracking-widest text-accent/50 group-hover:text-accent transition-colors">
                    {text.openLabs} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
          </motion.div>
      </section>
    </div>
  );
};

