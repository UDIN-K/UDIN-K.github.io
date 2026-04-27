import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { Koma } from './pages/Koma';
import { Experience } from './pages/Experience';
import { Play } from './pages/Play';
import { Scripting } from './pages/Scripting';
import { Labs } from './pages/Labs';
import { KernelStats } from './pages/KernelStats';
import { NeuralVision } from './pages/NeuralVision';
import { Certificates } from './pages/Certificates';
import { UdinIDE } from './pages/UdinIDE';
import { Contact } from './pages/Contact';
import { AIPlayground } from './components/AIPlayground';
import { Footer } from './components/Footer';
import { KomaGuide } from './pages/KomaGuide';
import { KomaTroubleshooting } from './pages/KomaTroubleshooting';
import { KomaExplorer } from './pages/KomaExplorer';
import { KomaChangelog } from './pages/KomaChangelog';

const App: React.FC = () => {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen bg-primary text-text font-sans antialiased selection:bg-accent selection:text-primary relative overflow-x-hidden">
        <Header />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/koma" element={<Koma />} />
            <Route path="/koma/guide" element={<KomaGuide />} />
            <Route path="/koma/troubleshooting" element={<KomaTroubleshooting />} />
            <Route path="/koma/changelog" element={<KomaChangelog />} />
            <Route path="/koma/explorer" element={<KomaExplorer />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/play" element={<Play />} />
            <Route path="/scripting" element={<Scripting />} />
            <Route path="/labs" element={<Labs />} />
            <Route path="/labs/kernel" element={<KernelStats />} />
            <Route path="/labs/vision" element={<NeuralVision />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/ide" element={<UdinIDE />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
        <AIPlayground />

        {/* Global Visual Scanline / CRT Effect */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[999] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"></div>
      </div>
    </Router>
  );
};

export default App;
