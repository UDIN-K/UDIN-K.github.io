import React, { useState } from 'react';

const FAQS = [
  {
    q: "What stack do you use for new projects?",
    a: "React (Vite/Next.js) for frontend, Node.js or Kotlin for backend. I rely heavily on Tailwind for styling and Appwrite/Firebase for BaaS when building fast."
  },
  {
    q: "Do you take freelance work?",
    a: "Yes, I am currently open for freelance projects and contract roles. Specifically interested in fullstack web architecture and Android engineering."
  },
  {
    q: "How does the SiLATORJANA system work?",
    a: "It's built on Appwrite for real-time database and auth. It replaces manual proposal workflows with an automated, trackable digital pipeline."
  }
];

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="w-full py-24 bg-[var(--cta-ground)] text-white px-[var(--box-pad)]">
      <div className="max-w-[800px] mx-auto">
        <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-16 text-center" data-reveal>Frequently Asked</h2>
        
        <div className="flex flex-col border-t border-white/20" data-reveal>
          {FAQS.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} className="border-b border-white/20 overflow-hidden">
                <button 
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-xl md:text-2xl font-medium text-white/90">{faq.q}</span>
                  <span className={`text-2xl font-light transition-transform duration-500 ${isOpen ? 'rotate-45 text-[var(--accent)]' : 'text-white/50'}`}>+</span>
                </button>
                <div 
                  className="grid transition-all duration-500 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-8 text-white/50 text-base md:text-lg leading-relaxed max-w-[90%]">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};