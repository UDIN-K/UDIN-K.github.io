import React from 'react';

interface ProjectSlide {
  num: string;
  name: string;
  category: string;
  description: string;
  image: string;
  url: string;
}

const PROJECTS: ProjectSlide[] = [
  {
    num: "01",
    name: "KOMA Manga Reader",
    category: "Android · Kotlin · FOSS",
    description: "Free and open-source manga reader for Android with offline download engine and catalog browser.",
    image: "https://opengraph.githubassets.com/1/UDIN-K/KOMA",
    url: "https://github.com/UDIN-K/KOMA",
  },
  {
    num: "02",
    name: "OpenKoma AI",
    category: "AI · React Native · Expo",
    description: "Open-source AI chatbot built with React Native & Expo. Fast, with plug-and-play OpenAI integration.",
    image: "https://opengraph.githubassets.com/1/UDIN-K/OpenKoma",
    url: "https://github.com/UDIN-K/OpenKoma",
  },
  {
    num: "03",
    name: "SiLATORJANA",
    category: "Web Platform · Appwrite",
    description: "Institutional workflow management system for streamlined proposal review and document tracking.",
    image: "https://opengraph.githubassets.com/1/UDIN-K/SiLATORJANA",
    url: "https://github.com/UDIN-K/SiLATORJANA",
  },
  {
    num: "04",
    name: "P2P Share",
    category: "Android · Wi-Fi Direct · P2P",
    description: "High-performance peer-to-peer file transfer engine on Android leveraging Wi-Fi Direct and BLE.",
    image: "https://opengraph.githubassets.com/1/UDIN-K/p2p",
    url: "https://github.com/UDIN-K/p2p",
  },
];

export const ProjectsRail: React.FC = () => {
  return (
    <section className="relative w-full py-32 px-[var(--box-pad)] bg-[var(--system-background-color)] overflow-hidden">
      <div className="max-w-[var(--box-max)] mx-auto mb-16" data-reveal>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <span className="uppercase tracking-widest text-[var(--eyebrow-size)] font-medium px-5 py-2 rounded-full border border-current/20 text-[var(--accent)] backdrop-blur-sm">Projects</span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-center w-full whitespace-nowrap leading-none">
            Selected Works
          </h2>
        </div>
      </div>

      {/* Horizontal scrolling rail */}
      <div className="overflow-x-auto scrollbar-none py-8 -my-8" data-reveal>
        <div className="flex gap-6 md:gap-10 pb-12 px-[var(--box-pad)]" style={{ width: 'max-content' }}>
          {PROJECTS.map(p => (
            <a
              key={p.num}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-[320px] md:w-[480px] lg:w-[600px] aspect-[4/5] md:aspect-[16/10] rounded-[2.5rem] overflow-hidden bg-[var(--ink)] flex-shrink-0 border border-black/5 hover:border-white/20 hover:shadow-[0_20px_60px_rgba(14,122,144,0.2)] transition-all duration-700 block"
            >
              {/* Background Image Container with Parallax Scale */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-[var(--ease-out-quart)] grayscale-[50%] group-hover:grayscale-0" 
                  loading="lazy" 
                />
              </div>

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-700" />

              {/* Card Content */}
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                {/* Project Number Watermark */}
                <div className="absolute top-8 left-8 md:top-10 md:left-10 overflow-hidden">
                  <span className="block text-white/30 font-bold text-3xl md:text-4xl tracking-tighter mix-blend-overlay transform -translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[var(--ease-out-quart)]">
                    {p.num}
                  </span>
                </div>

                {/* Animated Tags */}
                <div className="flex flex-wrap gap-2 mb-4 transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[var(--ease-out-quart)] delay-75">
                  <span className="px-4 py-1.5 text-[10px] md:text-xs uppercase tracking-widest font-medium bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-white/90 shadow-xl">
                    {p.category}
                  </span>
                </div>

                {/* Main Text Content */}
                <div className="transform translate-y-10 group-hover:translate-y-0 transition-all duration-700 ease-[var(--ease-out-quart)]">
                  <h3 className="text-3xl md:text-4xl font-medium text-white tracking-tight mb-3 drop-shadow-lg group-hover:text-[var(--accent)] transition-colors duration-500">
                    {p.name}
                  </h3>
                  
                  {/* Description fades in and slides up */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-[var(--ease-out-quart)]">
                    <div className="overflow-hidden">
                      <p className="text-sm md:text-base text-white/60 line-clamp-3 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-150 pt-2 pb-1">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hover Arrow Button */}
                <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center transform translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-hover:bg-white group-hover:text-black transition-all duration-700 ease-[var(--ease-out-quart)] delay-100 shadow-2xl">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};