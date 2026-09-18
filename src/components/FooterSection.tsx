import React from 'react';

export const FooterSection: React.FC = () => {
  return (
    <footer id="contact" className="w-full bg-[var(--cta-ground)] text-white/70 relative overflow-hidden">
      {/* Top Divider */}
      <div className="w-full h-px bg-white/10" />
      
      <div className="max-w-[var(--box-max)] mx-auto px-[var(--box-pad)] py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-white tracking-tighter">UDINK</span>
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            </div>
            <p className="text-sm leading-relaxed max-w-[340px] text-white/40">
              Fullstack Engineer crafting scalable web platforms, native Android apps, and distributed cloud architectures. Based in Indonesia.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 mt-2">
              <a href="https://github.com/UDIN-K" target="_blank" rel="noopener noreferrer" className="group w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 transition-all">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white/50 group-hover:text-white transition-colors">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a href="mailto:safrisam.id09@gmail.com" className="group w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 transition-all">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-white/50 group-hover:text-white transition-colors">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
              <a href="https://trakteer.id/ud1nk" target="_blank" rel="noopener noreferrer" className="group w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 transition-all">
                <span className="text-sm group-hover:text-white transition-colors">☕</span>
              </a>
            </div>
          </div>

          {/* Nav Columns */}
          <div className="md:col-span-2 md:col-start-7">
            <h4 className="text-xs uppercase tracking-widest font-medium text-white/30 mb-6">Navigate</h4>
            <ul className="flex flex-col gap-4">
              <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Home</a></li>
              <li><a href="#projects" className="text-sm text-white/50 hover:text-white transition-colors">Projects</a></li>
              <li><a href="#gallery" className="text-sm text-white/50 hover:text-white transition-colors">Gallery</a></li>
              <li><a href="#contact" className="text-sm text-white/50 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs uppercase tracking-widest font-medium text-white/30 mb-6">Projects</h4>
            <ul className="flex flex-col gap-4">
              <li><a href="https://github.com/UDIN-K/KOMA" target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-white transition-colors">KOMA</a></li>
              <li><a href="https://github.com/UDIN-K/OpenKoma" target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-white transition-colors">OpenKoma AI</a></li>
              <li><a href="https://github.com/UDIN-K/SiLATORJANA" target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-white transition-colors">SiLATORJANA</a></li>
              <li><a href="https://github.com/UDIN-K/p2p" target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-white transition-colors">P2P Share</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs uppercase tracking-widest font-medium text-white/30 mb-6">Connect</h4>
            <ul className="flex flex-col gap-4">
              <li><a href="mailto:safrisam.id09@gmail.com" className="text-sm text-white/50 hover:text-white transition-colors">Email</a></li>
              <li><a href="https://github.com/UDIN-K" target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-white transition-colors">GitHub</a></li>
              <li><a href="https://trakteer.id/ud1nk" target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-white transition-colors">Trakteer</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/20 uppercase tracking-widest">
            © {new Date().getFullYear()} UDINK. Designed & Built with precision.
          </p>
          <p className="text-xs text-white/20 uppercase tracking-widest">
            React · Vite · Tailwind · WebGL
          </p>
        </div>
      </div>
    </footer>
  );
};