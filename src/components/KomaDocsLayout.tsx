import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Wrench, Menu, X, Clock, Compass, ArrowLeft, ChevronDown, ChevronRight } from 'lucide-react';

interface KomaDocsLayoutProps {
  children: React.ReactNode;
}

type NavItem = {
    path?: string;
    label: string;
    icon?: React.ReactNode;
    children?: NavItem[];
};

type NavGroup = {
    title: string;
    items: NavItem[];
};

const navItems: NavGroup[] = [
  {
    title: 'General',
    items: [
        { path: '/koma/docs/faq/library', label: 'Library' },
        { 
            label: 'Updates',
            children: [
                { path: '/koma/docs/faq/updates/smart-updates', label: 'Smart updates' },
                { path: '/koma/docs/faq/updates/upcoming', label: 'Upcoming' }
            ]
        },
        { 
            label: 'Browse', 
            children: [
                { path: '/koma/docs/faq/browse/extensions', label: 'Extensions' },
                { path: '/koma/docs/faq/browse/local-source', label: 'Local source' }
            ]
        },
        { path: '/koma/docs/faq/downloads', label: 'Downloads' },
        { path: '/koma/docs/faq/reader', label: 'Reader' },
        { path: '/koma/docs/faq/settings', label: 'Settings' },
        { path: '/koma/docs/faq/storage', label: 'Storage' }
    ]
  },
  {
    title: 'Guides',
    items: [
      { path: '/koma/docs/guides/getting-started', label: 'Getting started' },
      { 
          label: 'Troubleshooting',
          children: [
              { path: '/koma/docs/guides/troubleshooting/common-issues', label: 'Common issues' },
              { path: '/koma/docs/guides/troubleshooting/diagnosis', label: 'Diagnosis' }
          ]
      },
      { path: '/koma/docs/guides/source-migration', label: 'Source migration' },
      { path: '/koma/docs/guides/backups', label: 'Backups' },
      { path: '/koma/docs/guides/tracking', label: 'Tracking' },
      { path: '/koma/docs/guides/categories', label: 'Categories' },
      { 
          label: 'Local source',
          children: [
              { path: '/koma/docs/guides/local-source/advanced-editing', label: 'Advanced editing' }
          ]
      },
      { path: '/koma/docs/guides/reader-settings', label: 'Reader settings' },
      { path: '/koma/docs/guides/shizuku', label: 'Shizuku' },
      { path: '/koma/changelog', label: 'Changelogs' }
    ]
  }
];

const NavItemComponent = ({ item, level = 0, currentPath }: { item: NavItem, level?: number, currentPath: string }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isActive = item.path === currentPath || (hasChildren && item.children!.some(c => c.path === currentPath));
    const [isOpen, setIsOpen] = useState(isActive);

    const toggleOpen = (e: React.MouseEvent) => {
        if (hasChildren) {
            e.preventDefault();
            setIsOpen(!isOpen);
        }
    };

    const linkContent = (
        <>
            <span className="flex-1">{item.label}</span>
            {hasChildren && (
                <span className="ml-auto opacity-60">
                    {isOpen ? <ChevronDown className="w-4 h-4 ml-2" /> : <ChevronRight className="w-4 h-4 ml-2" />}
                </span>
            )}
        </>
    );

    const activeStyles = item.path === currentPath
        ? 'text-accent font-bold bg-[#3b2a3a]/40 border-l border-accent'
        : 'text-[#a0a0ab] hover:text-white hover:bg-[#2a2c36]';

    const paddingStyles = level === 0 ? 'px-4' : 'pl-8 pr-4';

    return (
        <div className="flex flex-col">
            {item.path ? (
                <Link
                    to={item.path}
                    className={`flex items-center gap-2 py-2.5 rounded-r-lg rounded-l-sm transition-colors text-[14px] ${activeStyles} ${paddingStyles}`}
                    onClick={hasChildren ? toggleOpen : undefined}
                >
                    {linkContent}
                </Link>
            ) : (
                <button
                    className={`flex items-center gap-2 py-2.5 rounded-r-lg rounded-l-sm transition-colors text-[14px] text-[#d6d6d8] hover:text-white hover:bg-[#2a2c36] ${paddingStyles}`}
                    onClick={toggleOpen}
                >
                    {linkContent}
                </button>
            )}

            {hasChildren && (
                <AnimatePresence initial={false}>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden flex flex-col border-l border-[#2a2c36] ml-4 mt-1"
                        >
                            {item.children!.map((child, idx) => (
                                <NavItemComponent key={idx} item={child} level={level + 1} currentPath={currentPath} />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </div>
    );
};

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full w-full bg-[#1e2028] border-r border-[#2a2c36] py-8 pr-4 min-h-[calc(100vh-80px)]">
      <Link to="/koma" className="flex items-center gap-3 mb-10 text-white font-bold hover:text-white transition-colors text-lg font-mono px-6">
         <ArrowLeft className="w-5 h-5"/> Back to Koma Hub
      </Link>
      
      <div className="flex flex-col gap-8 flex-1 overflow-y-auto no-scrollbar">
          {navItems.map((group, groupIdx) => (
              <div key={groupIdx}>
                  <h3 className="text-sm font-bold text-white px-6 mb-3">{group.title}</h3>
                  <div className="flex flex-col pl-2">
                      {group.items.map((item, itemIdx) => (
                          <NavItemComponent key={itemIdx} item={item} currentPath={location.pathname} />
                      ))}
                  </div>
              </div>
          ))}
      </div>
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
            className="md:hidden border-b border-slate-800 h-[calc(100vh-140px)] overflow-y-auto"
        >
            <Sidebar />
        </motion.div>
      )}

      <div className="container mx-auto flex flex-col md:flex-row min-h-[calc(100vh-80px)] relative">
        <aside className="hidden md:block w-72 shrink-0 sticky top-20 h-[calc(100vh-80px)] overflow-hidden">
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
