import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { KomaDocsLayout } from '../components/KomaDocsLayout';
import { GitCommitVertical, Calendar, Tag, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Release {
  id: number;
  name: string;
  tag_name: string;
  published_at: string;
  body: string;
  html_url: string;
}

export const KomaChangelog: React.FC = () => {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchReleases = async () => {
      try {
        // Try local cached releases first (synced by GitHub Actions bot)
        let res = await fetch(`${window.location.origin}/repo/releases.json`);
        if (!res.ok) {
          // Fallback to GitHub API if local file doesn't exist yet
          res = await fetch('https://api.github.com/repos/UDIN-K/KOMA/releases');
        }
        if (res.ok) {
          const data = await res.json();
          setReleases(data);
        }
      } catch (err) {
        console.error('Failed to fetch Koma releases', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReleases();
  }, []);

  return (
    <KomaDocsLayout>
      <div className="flex items-center gap-4 mb-2">
        <div className="p-3 rounded-lg bg-accent/10 border border-accent/20 text-accent">
          <GitCommitVertical className="w-6 h-6" />
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-white font-heading m-0">
          Changelogs
        </h1>
      </div>
      <p className="text-slate-400 text-lg mb-12">
        Recent updates and release notes for the Koma application.
      </p>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-10 h-10 border-4 border-slate-800 border-t-accent rounded-full"
          />
        </div>
      ) : releases.length === 0 ? (
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-8 text-center text-slate-400">
          No releases found or API limit exceeded.
        </div>
      ) : (
        <div className="space-y-12">
          {releases.map((release, index) => (
            <motion.div
              key={release.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-slate-900 border-b border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white font-heading m-0 flex items-center gap-3">
                    {release.name || release.tag_name}
                    {index === 0 && (
                      <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-accent/20 text-accent rounded-full border border-accent/30">
                        Latest
                      </span>
                    )}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-slate-400 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-4 h-4" />
                      {release.tag_name}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {new Date(release.published_at).toLocaleDateString(undefined, {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                <a
                  href={release.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-lg text-xs uppercase tracking-widest transition-colors shrink-0 max-w-fit"
                >
                  GitHub <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 markdown-body">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{release.body}</ReactMarkdown>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </KomaDocsLayout>
  );
};
