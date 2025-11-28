import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectCard } from './components/ProjectCard';
import { AIPlayground } from './components/AIPlayground';
import { Footer } from './components/Footer';
import { Project, ProjectCategory } from './types';

// Personal portfolio data
const projects: Project[] = [
  {
    id: '1',
    title: 'UDINK Portfolio',
    description: 'My personal portfolio website featuring a real-time AI Playground. Built to share my work and experiments with React and Gemini.',
    category: ProjectCategory.WEB,
    imageUrl: 'https://picsum.photos/seed/portfolio12/800/600',
    techStack: ['React', 'TypeScript', 'Gemini API', 'Tailwind'],
    link: '#'
  },
  {
    id: '2',
    title: 'Data Dashboard',
    description: 'A visual dashboard project to practice data visualization and state management techniques.',
    category: ProjectCategory.DESIGN,
    imageUrl: 'https://picsum.photos/seed/data/800/600',
    techStack: ['React', 'Recharts', 'Figma'],
    link: '#'
  },
  {
    id: '3',
    title: 'Generative Art Experiment',
    description: 'An experiment in combining text prompts with creative coding to generate unique visual styles.',
    category: ProjectCategory.AI,
    imageUrl: 'https://picsum.photos/seed/art/800/600',
    techStack: ['Node.js', 'AI Models', 'Canvas'],
    link: '#'
  }
];

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-primary text-text font-sans antialiased selection:bg-accent selection:text-primary">
      <Header />
      
      <main>
        <Hero />

        <section id="about" className="py-24 bg-secondary/30 relative border-t border-slate-800/50">
            <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">About <span className="text-accent">Me</span></h2>
                    <p className="text-lg text-text-muted leading-relaxed">
                        I am a developer who loves to code and create. 
                        My journey involves exploring modern web technologies and the fascinating world of Artificial Intelligence.
                        This portfolio is a collection of what I've learned and built along the way.
                    </p>
                </div>
            </div>
        </section>

        <section id="portfolio" className="py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                <div className="max-w-xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">My <span className="text-accent">Projects</span></h2>
                    <p className="text-text-muted text-lg">
                        A selection of my personal projects and experiments.
                    </p>
                </div>
                <a href="https://github.com/UDIN-K" target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex items-center text-white hover:text-accent transition-colors font-medium group mt-6 md:mt-0">
                    Visit My GitHub 
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </a>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            
            <div className="mt-12 text-center md:hidden">
                <a href="https://github.com/UDIN-K" target="_blank" className="inline-block px-6 py-3 border border-slate-700 rounded-lg text-white font-medium hover:bg-slate-800 transition-colors">
                    Visit GitHub
                </a>
            </div>
          </div>
        </section>

        <AIPlayground />
      </main>

      <Footer />
    </div>
  );
};

export default App;