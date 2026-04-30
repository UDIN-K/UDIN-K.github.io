import React, { useState, useEffect } from 'react';
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

const NavItemComponent = ({ item, level = 0, currentPath, onLinkClick }: { item: NavItem, level?: number, currentPath: string, onLinkClick?: () => void }) => {
    const hasChildren = item.children && item.children.length > 0;
    
    // Exactly matches the current path
    const isActive = item.path === currentPath;
    
    // Check if any child is active
    const isChildActive = (navItem: NavItem): boolean => {
        if (navItem.path === currentPath) return true;
        if (navItem.children) return navItem.children.some(isChildActive);
        return false;
    };
    
    const childActive = hasChildren && isChildActive(item);
    const [isOpen, setIsOpen] = useState(isActive || childActive);

    const toggleOpen = (e: React.MouseEvent) => {
        if (hasChildren) {
            e.preventDefault();
            setIsOpen(!isOpen);
        }
    };

    const linkContent = (
        <>
            <span className="flex-1 text-left">{item.label}</span>
            {hasChildren && (
                <span className="ml-auto flex items-center justify-center opacity-60">
                    <motion.div
                        initial={false}
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronDown className="w-4 h-4" />
                    </motion.div>
                </span>
            )}
        </>
    );

    const activeStyles = isActive
        ? 'text-accent font-semibold bg-accent/5 border-l-2 border-accent rounded-r-lg'
        : childActive && !item.path 
            ? 'text-slate-200 font-medium border-l-2 border-transparent' 
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border-l-2 border-transparent rounded-r-lg';

    // Different padding based on nesting level
    const paddingStyles = level === 0 ? 'px-6' : level === 1 ? 'pl-10 pr-6' : 'pl-14 pr-6';

    return (
        <div className="flex flex-col">
            {item.path ? (
                <Link
                    to={item.path}
                    className={`flex items-center gap-2 py-2 transition-colors text-sm ${activeStyles} ${paddingStyles}`}
                    onClick={(e) => {
                        if (hasChildren && !isOpen) {
                            setIsOpen(true);
                        }
                        if (onLinkClick) onLinkClick();
                    }}
                >
                    {linkContent}
                </Link>
            ) : (
                <button
                    className={`flex w-full items-center gap-2 py-2 transition-colors text-sm ${activeStyles} ${paddingStyles}`}
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
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="overflow-hidden flex flex-col"
                        >
                            {item.children!.map((child, idx) => (
                                <NavItemComponent 
                                    key={idx} 
                                    item={child} 
                                    level={level + 1} 
                                    currentPath={currentPath} 
                                    onLinkClick={onLinkClick} 
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </div>
    );
};

const Sidebar = ({ onLinkClick }: { onLinkClick?: () => void }) => {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full w-full py-6 md:py-10">
      <Link 
        to="/koma" 
        className="flex items-center gap-3 mb-10 text-white font-bold hover:text-accent transition-colors text-[17px] px-6"
      >
         <ArrowLeft className="w-5 h-5"/> Back to Koma Hub
      </Link>
      
      <div className="flex flex-col gap-10 flex-1 pb-20">
          {navItems.map((group, groupIdx) => (
              <div key={groupIdx}>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.1em] px-6 mb-3">
                      {group.title}
                  </h3>
                  <div className="flex flex-col pr-4">
                      {group.items.map((item, itemIdx) => (
                          <NavItemComponent 
                              key={itemIdx} 
                              item={item} 
                              currentPath={location.pathname} 
                              onLinkClick={onLinkClick} 
                          />
                      ))}
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
};

export const KomaDocsLayout: React.FC<KomaDocsLayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
     if (mobileMenuOpen) {
         document.body.style.overflow = 'hidden';
     } else {
         document.body.style.overflow = 'unset';
     }
     return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-slate-950 font-sans pt-20 flex flex-col">
      {/* Mobile nav toggle */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md sticky top-20 z-30">
        <span className="text-slate-300 font-semibold text-sm">Documentation Menu</span>
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 bg-slate-900 rounded-lg text-white border border-slate-800 hover:bg-slate-800 transition-colors"
        >
          <Menu className="w-5 h-5"/>
        </button>
      </div>

      <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Overlay */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 md:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
              
              {/* Menu Drawer */}
              <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                  className="fixed inset-y-0 left-0 w-[85%] max-w-[340px] bg-[#0A0D14] border-r border-slate-800 z-50 md:hidden shadow-2xl flex flex-col"
              >
                  <div className="flex justify-end p-4 pb-0">
                      <button 
                          onClick={() => setMobileMenuOpen(false)}
                          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      >
                          <X className="w-6 h-6"/>
                      </button>
                  </div>
                  <div className="flex-1 overflow-y-auto no-scrollbar w-full">
                     <Sidebar onLinkClick={() => setMobileMenuOpen(false)} />
                  </div>
              </motion.div>
            </>
          )}
      </AnimatePresence>

      <div className="container mx-auto flex flex-col md:flex-row flex-1 relative">
        <aside className="hidden md:block w-[280px] lg:w-[320px] shrink-0 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto no-scrollbar border-r border-slate-800/60 bg-[#0A0D14]">
          <Sidebar />
        </aside>

        <main className="flex-1 w-full min-w-0 max-w-4xl px-6 py-10 lg:px-16 lg:py-16 prose prose-invert prose-slate prose-a:text-accent hover:prose-a:text-accent-light prose-headings:font-bold prose-code:text-accent prose-code:bg-accent/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-[#0A0D14] prose-pre:border prose-pre:border-slate-800 prose-pre:shadow-sm">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </main>
      </div>
    </div>
  );
};

