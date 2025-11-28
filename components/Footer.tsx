import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-secondary border-t border-slate-800 py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">UDIN<span className="text-accent">K</span></h3>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              Portfolio & AI Experiment Lab. <br/>
              Built with React, TypeScript, Tailwind, and Google Gemini.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>
                <a href="mailto:safrisam.id09@gmail.com" className="hover:text-accent transition-colors flex items-center">
                  <span className="mr-2">📧</span> safrisam.id09@gmail.com
                </a>
              </li>
              <li>
                <a href="https://github.com/UDIN-K" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center">
                  <span className="mr-2">🐙</span> GitHub: UDIN-K
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Links</h4>
             <ul className="space-y-2 text-sm text-text-muted">
              <li><a href="#home" className="hover:text-accent">Home</a></li>
              <li><a href="#portfolio" className="hover:text-accent">Portfolio</a></li>
              <li><a href="#ai-lab" className="hover:text-accent">AI Playground</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Muhammad Syafri Syamsudin Syah. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};