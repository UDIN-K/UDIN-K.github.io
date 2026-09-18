import React from 'react';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';

export const App: React.FC = () => {
  return (
    <div 
      className="bg-[#0C0C0C] text-[#D7E2EA] font-sans antialiased relative w-full"
    >
      <main 
        className="relative z-10 w-full flex flex-col"
      >
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default App;
