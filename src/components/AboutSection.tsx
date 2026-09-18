import React from 'react';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { ContactButton } from './ContactButton';

export const AboutSection: React.FC = () => {
  const bioText = "Fullstack developer specialized in modern web architectures, native Android engineering, and cloud platforms. Driven by crafting clean systems, intuitive user experiences, and high-performance applications from concept to deployment. Let's build something remarkable together!";

  return (
    <section 
      id="about" 
      className="min-h-screen relative flex flex-col justify-center items-center px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C] overflow-hidden select-none"
    >
      {/* Decorative 3D Item: Top-Left Moon Icon */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none z-10"
      >
        <img 
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" 
          alt="3D Moon element"
          className="w-full h-auto object-contain drop-shadow-2xl"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </FadeIn>

      {/* Decorative 3D Item: Bottom-Left 3D Object */}
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px] pointer-events-none z-10"
      >
        <img 
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" 
          alt="3D Sphere abstract element"
          className="w-full h-auto object-contain drop-shadow-2xl"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </FadeIn>

      {/* Decorative 3D Item: Top-Right Lego Icon */}
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none z-10"
      >
        <img 
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png" 
          alt="3D Lego element"
          className="w-full h-auto object-contain drop-shadow-2xl"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </FadeIn>

      {/* Decorative 3D Item: Bottom-Right 3D Group */}
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px] pointer-events-none z-10"
      >
        <img 
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" 
          alt="3D Group element"
          className="w-full h-auto object-contain drop-shadow-2xl"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </FadeIn>

      {/* Main Content Flow */}
      <div className="flex flex-col items-center justify-center max-w-4xl mx-auto z-20 text-center">
        {/* Heading: "About me" using .hero-heading gradient text */}
        <FadeIn delay={0} y={40}>
          <h2 
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        {/* Gap between heading/text: gap-10 sm:gap-14 md:gap-16 */}
        <div className="mt-10 sm:mt-14 md:mt-16 w-full flex justify-center">
          <AnimatedText 
            text={bioText}
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' } as React.CSSProperties}
          />
        </div>

        {/* Gap between text block and button: gap-16 sm:gap-20 md:gap-24 */}
        <div className="mt-16 sm:mt-20 md:mt-24">
          <FadeIn delay={0.2} y={20}>
            <ContactButton href="#contact" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
