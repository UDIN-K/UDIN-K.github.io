import React from 'react';
import { FadeIn } from './FadeIn';

interface ServiceItem {
  num: string;
  name: string;
  description: string;
  technologies: string[];
}

const SERVICES: ServiceItem[] = [
  {
    num: "01",
    name: "Fullstack Web Apps",
    description: "End-to-end web applications built with TypeScript, React, Next.js, and Node.js. Delivering lightning-fast load times, responsive layouts, and robust client-server architectures.",
    technologies: ["React", "TypeScript", "Next.js", "Node.js"]
  },
  {
    num: "02",
    name: "Mobile App Engineering",
    description: "High-performance native Android and cross-platform apps using Kotlin, Jetpack Compose, React Native, and Expo with offline caching and background synchronization.",
    technologies: ["Kotlin", "Android", "React Native", "Expo"]
  },
  {
    num: "03",
    name: "Backend & Cloud Architecture",
    description: "Resilient backend services, RESTful and GraphQL APIs, and scalable cloud databases leveraging Appwrite, Firebase, PostgreSQL, and serverless runtimes.",
    technologies: ["Appwrite", "PostgreSQL", "Firebase", "Express"]
  },
  {
    num: "04",
    name: "P2P & Distributed Protocols",
    description: "Specialized low-latency peer-to-peer data synchronization, Wi-Fi Direct and Bluetooth BLE file transfer engines, and decentralized client protocols.",
    technologies: ["Wi-Fi Direct", "BLE", "WebSockets", "P2P"]
  },
  {
    num: "05",
    name: "Frontend Craft & UI Systems",
    description: "Precision user interfaces crafted with obsessive attention to typography, spatial balance, fluid Framer Motion animations, and accessible design systems.",
    technologies: ["Tailwind CSS", "Framer Motion", "Design Systems"]
  }
];

export const ServicesSection: React.FC = () => {
  return (
    <section 
      id="services"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10 select-none"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Heading: "Services" in #0C0C0C */}
        <FadeIn delay={0} y={30}>
          <h2 
            className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28 leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Services
          </h2>
        </FadeIn>

        {/* 5 service items in a vertical list */}
        <div className="flex flex-col border-t border-[rgba(12,12,12,0.15)]">
          {SERVICES.map((item, index) => (
            <FadeIn 
              key={item.num}
              delay={index * 0.08}
              y={25}
              className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 sm:gap-10 md:gap-16 py-8 sm:py-10 md:py-12 border-b border-[rgba(12,12,12,0.15)] transition-colors duration-300 hover:bg-neutral-50/80 -mx-4 px-4 rounded-2xl"
            >
              {/* Number on left */}
              <div 
                className="font-black text-[#0C0C0C] leading-none shrink-0 tracking-tighter transition-transform duration-300 group-hover:scale-105"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {item.num}
              </div>

              {/* Name + description + tech tags stacked vertically on right */}
              <div className="flex flex-col gap-2.5 sm:gap-3.5 flex-1">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <h3 
                    className="font-medium uppercase text-[#0C0C0C] tracking-wide group-hover:text-black transition-colors"
                    style={{ fontSize: 'clamp(1.1rem, 2.2vw, 2.1rem)' }}
                  >
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {item.technologies.map(tech => (
                      <span 
                        key={tech}
                        className="text-[10px] sm:text-xs font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-black/10 bg-black/[0.03] text-black/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <p 
                  className="font-light leading-relaxed max-w-2xl text-[#0C0C0C]"
                  style={{ 
                    fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                    opacity: 0.65 
                  }}
                >
                  {item.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Action CTA to Contact */}
        <FadeIn delay={0.3} y={20}>
          <div className="mt-14 sm:mt-18 mb-10 sm:mb-16 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-black/[0.03] border border-black/10">
            <div className="flex flex-col gap-1 text-center sm:text-left">
              <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">
                Ready to Start?
              </span>
              <p className="text-sm sm:text-base text-neutral-800 font-medium">
                Need fullstack development, mobile architecture, or cloud systems for your team?
              </p>
            </div>

            <a
              href="#contact"
              className="shrink-0 px-8 py-3.5 rounded-full bg-[#0C0C0C] text-white hover:bg-[#222] transition-colors text-xs uppercase tracking-widest font-semibold"
            >
              Discuss Your Project
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
