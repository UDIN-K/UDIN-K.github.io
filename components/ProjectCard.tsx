import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <article className="group relative bg-secondary rounded-2xl overflow-hidden border border-slate-700/50 hover:border-accent/40 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 flex flex-col h-full focus-within:ring-2 focus-within:ring-accent">
      <div className="aspect-video w-full overflow-hidden bg-slate-900 relative">
        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
        <img
          src={project.imageUrl}
          alt={`Thumbnail for ${project.title}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        {project.link && (
            <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900/60 backdrop-blur-sm">
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-white text-primary font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-accent hover:text-white">
                    View Project
                </a>
            </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
            <span className="inline-block px-2 py-0.5 bg-slate-800 rounded text-[10px] font-bold text-accent uppercase tracking-wider border border-slate-700">
            {project.category}
            </span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        
        <p className="text-text-muted text-sm mb-6 leading-relaxed line-clamp-3 flex-grow">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800 mt-auto">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 bg-primary rounded-md text-xs font-medium text-slate-400 border border-slate-800 group-hover:border-slate-700 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};