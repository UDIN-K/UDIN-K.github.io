import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import matter from 'gray-matter';
import { KomaDocsLayout } from '../components/KomaDocsLayout';

// Gather all markdown files at build time as raw strings
const docsGlob = import.meta.glob('/src/koma-docs/**/*.md', { query: '?raw', eager: true, import: 'default' });

export const KomaDocPage: React.FC = () => {
    const { "*": docsPath } = useParams();
    const [markdownContent, setMarkdownContent] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    useEffect(() => {
        if (!docsPath) return;
        
        let targetPath = `/src/koma-docs/${docsPath}.md`;
        
        // Sometimes path might be an index, e.g. /guides/troubleshooting
        // We'll try index.md if it fails, or just default to exact match
        let rawContent = docsGlob[targetPath] as string | undefined;

        if (!rawContent) {
            // Check if there is an index inside that directory
            const dirPath = `/src/koma-docs/${docsPath}/index.md`;
            rawContent = docsGlob[dirPath] as string | undefined;
        }

        if (rawContent) {
            try {
                // Parse frontmatter
                const parsed = matter(rawContent);
                setMarkdownContent(parsed.content || '');
                if (parsed.data.title) {
                    setTitle(parsed.data.title);
                } else {
                    setTitle(''); 
                }
            } catch(e) {
                // Fallback if parsing fails
                setMarkdownContent(rawContent);
            }
        } else {
            setMarkdownContent('# 404 NOT FOUND\nOops, we could not find that document.\n\nPath requested: `' + docsPath + '`');
        }
        
        // Scroll to top
        window.scrollTo(0, 0);

    }, [docsPath]);

    // Cleanup some vitepress specific syntaxes:
    // e.g. ::: warning CAUTION ... :::
    // or ::: danger ... :::
    const cleanMarkdown = markdownContent
        .replace(/::: warning/g, '> **WARNING**\n>')
        .replace(/::: danger/g, '> **DANGER**\n>')
        .replace(/::: info/g, '> **INFO**\n>')
        .replace(/:::/g, ''); // Remove closing block tags

    return (
        <KomaDocsLayout>
            <div className="w-full">
                {title && <h1 className="text-3xl font-black mb-8 text-white">{title}</h1>}
                <div className="markdown-body">
                    <Markdown 
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            h1: ({node, ...props}) => <h1 className="text-2xl mt-8 font-bold border-b border-white/20 pb-2 mb-4" {...props}/>,
                            h2: ({node, ...props}) => <h2 className="text-xl mt-6 font-bold mb-3 border-b border-white/10 pb-1" {...props}/>,
                            h3: ({node, ...props}) => <h3 className="text-lg mt-5 font-bold mb-2" {...props}/>,
                            p: ({node, ...props}) => <p className="mb-4 text-slate-300 leading-relaxed" {...props}/>,
                            a: ({node, ...props}) => <a className="text-accent underline hover:text-accent-light" {...props}/>,
                            ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 space-y-1 text-slate-300" {...props}/>,
                            ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 space-y-1 text-slate-300" {...props}/>,
                            li: ({node, ...props}) => <li className="" {...props}/>,
                            blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-accent pl-4 italic bg-accent/5 p-3 rounded" {...props}/>,
                            code: ({node, ...props}) => <code className="bg-slate-800 text-accent px-1.5 py-0.5 rounded text-sm font-mono" {...props}/>,
                            pre: ({node, ...props}) => <pre className="bg-slate-900 border border-slate-800 p-4 rounded overflow-auto mb-4" {...props}/>,
                            img: ({node, className, ...props}) => {
                                if (className && className.includes('tree-icon')) {
                                    return <img className={className} {...props} />;
                                }
                                return <img className={`rounded-lg max-w-full my-4 shadow-lg border border-slate-800 ${className || ''}`} {...props}/>;
                            },
                            table: ({node, ...props}) => <table className="w-full text-left border-collapse my-4" {...props} />,
                            th: ({node, ...props}) => <th className="border-b border-white/20 pb-2 text-white font-bold" {...props} />,
                            td: ({node, ...props}) => <td className="border-b border-white/10 py-2 text-slate-300" {...props} />
                        }}
                    >
                        {cleanMarkdown}
                    </Markdown>
                </div>
            </div>
        </KomaDocsLayout>
    );
};
