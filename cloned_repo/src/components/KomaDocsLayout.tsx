import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Wrench, Menu, X, Clock, Compass, ArrowLeft } from 'lucide-react';

interface KomaDocsLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { path: '/koma', label: 'Overview', icon: <Compass className="w-4 h-4" /> },
  { path: '/koma/guide', label: 'Getting Started', icon: <BookOpen className="w-4 h-4" /> },
  { path: '/koma/troubleshooting', label: 'Troubleshooting', icon: <Wrench className="w-4 h-4" /> },
  { path: '/koma/changelog', label: 'Changelogs', icon: <Clock className="w-4 h-4" /> },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full w-full bg-[#1e2028] border-r border-[#2a2c36] p-6 min-h-[calc(100vh-80px)]">
      <Link to="/koma" className="flex items-center gap-3 mb-10 text-white font-bold hover:text-white transition-colors text-lg font-mono">
         <ArrowLeft className="w-5 h-5"/> Back to Koma Hub
      </Link>
      <nav className="flex flex-col gap-2">
        <div className="text-xs font-bold text-accent uppercase tracking-[0.15em] px-3 mb-3 font-mono">Documentation</div>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl font-mono text-[15px] transition-colors ${
                isActive 
                ? 'bg-[#3b2a3a] text-accent font-bold pb-3 opacity-100 border border-[#4d324b]' 
                : 'text-[#d6d6d8] hover:text-white hover:bg-[#2a2c36]'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export const KomaDocsLayout: React.FC<KomaDocsLayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-slate-950 font-sans pt-20">
      {/* Mobile nav toggle */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950 sticky top-20 z-40">
        <span className="text-white font-bold tracking-widest font-mono text-sm uppercase">Navigation Docs</span>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 bg-slate-800 rounded text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
        </button>
      </div>

      {mobileMenuOpen && (
        <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden border-b border-slate-800"
        >
            <Sidebar />
        </motion.div>
      )}

      <div className="container mx-auto flex flex-col md:flex-row min-h-screen relative">
        <aside className="hidden md:block w-72 shrink-0 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto">
          <Sidebar />
        </aside>

        <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-12 lg:px-12 prose prose-invert prose-slate prose-a:text-accent hover:prose-a:text-accent-light prose-headings:font-black prose-headings:font-heading prose-code:text-accent prose-code:bg-accent/10 prose-code:px-1 prose-code:rounded">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {children}
            </motion.div>
        </main>
      </div>
    </div>
  );
};
