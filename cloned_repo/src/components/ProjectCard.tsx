import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Play, Code2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const isInternalLink = project.link?.startsWith('#');

  // Shared content logic
  const content = (
      <div className="flex flex-col h-full bg-slate-950/50 rounded-lg overflow-hidden border border-slate-900 hover:border-accent/40 transition-all duration-500 group relative">
        
        {/* Image Container */}
        <div className="aspect-[16/10] w-full overflow-hidden bg-slate-900 relative">
            <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none"></div>
            <img
                src={project.imageUrl}
                alt={`Thumbnail for ${project.title}`}
                className="w-full h-full object-cover transition-transform duration-1000 scale-110 group-hover:scale-100 opacity-60 group-hover:opacity-100 filter grayscale group-hover:grayscale-0"
                loading="lazy"
                referrerPolicy="no-referrer"
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-slate-950/40 backdrop-blur-[4px]">
                <div className="flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="p-3 bg-accent text-slate-950 rounded-full shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)]">
                        {isInternalLink ? <Play className="w-5 h-5 fill-current" /> : <ExternalLink className="w-5 h-5" />}
                    </div>
                </div>
            </div>

            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-30 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
        </div>
        
        {/* Content Container */}
        <div className="p-6 flex flex-col flex-grow relative">
            <div className="flex justify-between items-center mb-4">
                <span className="inline-block px-3 py-1 bg-slate-900 rounded text-[9px] font-black text-accent uppercase tracking-[0.2em] border border-slate-800 shadow-inner">
                    {project.category}
                </span>
                <Code2 className="w-4 h-4 text-slate-700 group-hover:text-accent transition-colors" />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors font-mono uppercase tracking-tighter">
                {project.title}
            </h3>
            
            <p className="text-slate-500 text-xs mb-8 leading-loose font-mono opacity-80 line-clamp-3 flex-grow">
                {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-900 mt-auto">
                {project.techStack.map((tech) => (
                    <span
                        key={tech}
                        className="px-2 py-0.5 bg-slate-900/50 rounded text-[8px] font-bold text-slate-600 border border-slate-900 uppercase tracking-widest"
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </div>
      </div>
  );

  return (
    <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="h-full"
    >
        {project.link ? (
            <a 
              href={project.link}
              target={isInternalLink ? "_self" : "_blank"}
              rel={isInternalLink ? undefined : "noopener noreferrer"}
              className="block h-full group focus:outline-none"
            >
              {content}
            </a>
        ) : (
            <div className="h-full">{content}</div>
        )}
    </motion.div>
  );
};
