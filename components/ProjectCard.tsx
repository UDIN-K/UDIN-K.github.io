import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const isInternalLink = project.link?.startsWith('#');

  // Shared content logic
  const content = (
      <div className="flex flex-col h-full bg-secondary rounded-2xl overflow-hidden border border-slate-700/50 hover:border-accent/40 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 group">
        
        {/* Image Container */}
        <div className="aspect-video w-full overflow-hidden bg-slate-900 relative">
            <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
            <img
                src={project.imageUrl}
                alt={`Thumbnail for ${project.title}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                loading="lazy"
            />
            {project.link && (
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900/60 backdrop-blur-[2px]">
                    <span className="px-5 py-2.5 bg-accent text-slate-900 font-bold text-sm rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                        {isInternalLink ? 'Try Interactive Demo' : 'View on GitHub'}
                    </span>
                </div>
            )}
        </div>
        
        {/* Content Container */}
        <div className="p-6 flex flex-col flex-grow">
            <div className="flex justify-between items-center mb-3">
                <span className="inline-block px-2 py-0.5 bg-slate-800 rounded text-[10px] font-bold text-accent uppercase tracking-wider border border-slate-700">
                {project.category}
                </span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                {project.title}
            </h3>
            
            <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-3 flex-grow">
            {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800 mt-auto">
            {project.techStack.map((tech) => (
                <span
                key={tech}
                className="px-2 py-1 bg-slate-900 rounded text-[10px] font-medium text-slate-500 border border-slate-800"
                >
                {tech}
                </span>
            ))}
            </div>
        </div>
      </div>
  );

  if (project.link) {
    return (
        <a 
          href={project.link}
          target={isInternalLink ? "_self" : "_blank"}
          rel={isInternalLink ? undefined : "noopener noreferrer"}
          className="block h-full focus:outline-none focus:ring-2 focus:ring-accent rounded-2xl"
        >
          {content}
        </a>
    );
  }

  return <div className="h-full">{content}</div>;
};