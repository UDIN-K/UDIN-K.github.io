import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  url = window.location.href 
}) => {
  useEffect(() => {
    // Update Title
    const baseTitle = "UDINK";
    const fullTitle = title ? `${title} | ${baseTitle}` : `${baseTitle} — Koma Manga Reader (Android) & Software Engineer`;
    document.title = fullTitle;

    // Update Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const defaultDesc = "UDINK is a Software Engineer and creator of open-source projects including Koma.";
    if (metaDescription) {
      metaDescription.setAttribute('content', description || defaultDesc);
    }

    // Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', fullTitle);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', url);

  }, [title, description, url]);

  return null; // This component doesn't render anything
};
