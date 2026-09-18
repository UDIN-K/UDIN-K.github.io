import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FadeIn } from './FadeIn';

const GithubIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    aria-hidden="true"
  >
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" 
    />
  </svg>
);

interface ProjectItem {
  num: string;
  category: string;
  name: string;
  description: string;
  language: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
}

const PROJECTS: ProjectItem[] = [
  {
    num: "01",
    category: "Android • Kotlin • FOSS",
    name: "KOMA Manga Reader",
    description: "Free and open-source manga reader for Android. Built with Kotlin featuring offline download engine and catalog browser.",
    language: "Kotlin",
    tags: ["Kotlin", "Jetpack Compose", "Android", "Manga Engine", "Room DB"],
    githubUrl: "https://github.com/UDIN-K/KOMA",
    liveUrl: "https://koma.udink.me/",
  },
  {
    num: "02",
    category: "AI • React Native • Expo",
    name: "OpenKoma AI",
    description: "The open-source AI chatbot built with React Native & Expo. Fast, FOSS, with pre-built UI and plug-and-play OpenAI integration.",
    language: "TypeScript",
    tags: ["React Native", "Expo", "TypeScript", "AI Agents", "LLMs"],
    githubUrl: "https://github.com/UDIN-K/OpenKoma",
    liveUrl: "https://github.com/UDIN-K/OpenKoma",
  },
  {
    num: "03",
    category: "Web Platform • Appwrite",
    name: "SiLATORJANA",
    description: "Sistem Pengajuan TOR (Terms of Reference) - Institutional workflow management system for streamlined proposal review and document tracking.",
    language: "TypeScript",
    tags: ["TypeScript", "Appwrite", "Web App", "Governance", "Tailwind CSS"],
    githubUrl: "https://github.com/UDIN-K/SiLATORJANA",
    liveUrl: "https://silatorjana.appwrite.network/",
  },
  {
    num: "04",
    category: "Android • Wi-Fi Direct • P2P",
    name: "P2P Share",
    description: "High-performance peer-to-peer file transfer engine on Android leveraging Wi-Fi Direct and Bluetooth BLE for zero-data sharing.",
    language: "Kotlin",
    tags: ["Kotlin", "Wi-Fi Direct", "Bluetooth", "P2P", "Android SDK"],
    githubUrl: "https://github.com/UDIN-K/p2p",
    liveUrl: "https://github.com/UDIN-K/p2p",
  }
];

const ProjectCard: React.FC<{ project: ProjectItem }> = ({ project }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1200 }} className="h-full w-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="flex flex-col h-full bg-[#121212] border border-white/10 hover:border-white/30 rounded-3xl p-6 sm:p-8 md:p-10 transition-colors duration-500 group relative"
      >
        {/* Background Subtle Gradient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/[0.05] transition-colors duration-500" />

        {/* 3D Content Container */}
        <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="flex flex-col h-full relative z-10 pointer-events-none">
          
          {/* Top Header */}
          <div className="flex items-start justify-between gap-4 mb-6 sm:mb-8 pointer-events-auto">
            <span 
              style={{ transform: "translateZ(20px)" }} 
              className="text-3xl sm:text-4xl font-black text-white/10 group-hover:text-white/20 transition-colors duration-500 select-none leading-none drop-shadow-lg"
            >
              {project.num}
            </span>
            <div className="flex items-center justify-end">
              <span 
                style={{ transform: "translateZ(10px)" }}
                className="text-[10px] sm:text-xs font-medium uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 shadow-xl"
              >
                {project.language}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-3 flex-grow mb-8">
            <h3 
              style={{ transform: "translateZ(40px)" }}
              className="text-xl sm:text-2xl md:text-3xl font-bold text-[#D7E2EA] tracking-tight drop-shadow-2xl"
            >
              {project.name}
            </h3>
            <span 
              style={{ transform: "translateZ(20px)" }}
              className="text-[11px] sm:text-xs font-medium uppercase tracking-widest text-white/40"
            >
              {project.category}
            </span>
            <p 
              style={{ transform: "translateZ(10px)" }}
              className="text-sm sm:text-base text-white/60 font-light leading-relaxed mt-2"
            >
              {project.description}
            </p>
          </div>

          {/* Tech Stack Grid */}
          <div 
            style={{ transform: "translateZ(20px)" }}
            className="flex flex-wrap gap-2 mb-8 mt-auto"
          >
            {project.tags.map(tag => (
              <span 
                key={tag} 
                className="text-[11px] sm:text-xs px-3 py-1.5 rounded-lg border border-white/5 bg-white/5 text-white/70 font-medium whitespace-nowrap shadow-md"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer / Links */}
          <div 
            style={{ transform: "translateZ(30px)" }}
            className="flex items-center gap-4 pt-6 border-t border-white/10 pointer-events-auto"
          >
            <a 
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium uppercase tracking-widest text-[#D7E2EA] hover:text-white transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Repository</span>
            </a>
            {project.liveUrl && project.liveUrl !== project.githubUrl && (
              <>
                <span className="text-white/20">•</span>
                <a 
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  return (
    <section 
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] relative z-10 pt-20 sm:pt-24 md:pt-32 pb-32 sm:pb-40 px-4 sm:px-6 md:px-10 select-none"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Heading */}
        <FadeIn delay={0} y={30}>
          <div className="flex flex-col items-center mb-16 sm:mb-20">
            <h2 
              className="text-5xl sm:text-7xl md:text-[90px] font-medium tracking-tight leading-none text-[#D7E2EA]"
            >
              Selected Works.
            </h2>
            <p className="mt-6 text-[#D7E2EA]/40 uppercase tracking-widest text-xs font-medium flex items-center gap-2">
              <GithubIcon className="w-4 h-4 text-[#D7E2EA]/40" />
              <span>Sourced from github.com/UDIN-K</span>
            </p>
          </div>
        </FadeIn>

        {/* Data-Dense Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full pb-16">
          {PROJECTS.map((project, index) => (
            <FadeIn key={project.num} delay={index * 0.1} y={20} className="h-full">
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>

        {/* GitHub Repositories Link Callout */}
        <FadeIn delay={0.2} y={20}>
          <div className="mt-4 flex justify-center">
            <a
              href="https://github.com/UDIN-K?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 hover:border-white/40 bg-transparent transition-all duration-300 text-sm font-semibold uppercase tracking-widest text-[#D7E2EA]"
            >
              <GithubIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 text-white" />
              <span>Explore All Repositories on GitHub</span>
              <ExternalLink className="w-4 h-4 text-white/40 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
