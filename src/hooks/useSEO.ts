import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  icon?: string;
}

export const useSEO = ({ title, description, keywords, icon }: SEOProps) => {
  useEffect(() => {
    // Store original values
    const originalTitle = document.title;
    const ogDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const ogKeywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content');
    
    // Store original favicon
    const faviconElement = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    const originalFavicon = faviconElement?.getAttribute('href');
    
    // Update title
    document.title = title;

    // Update description
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
      document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description);
    }
    
    // Update keywords
    if (keywords) {
      document.querySelector('meta[name="keywords"]')?.setAttribute('content', keywords);
    }
    
    // Update SVG favicon
    if (icon && faviconElement) {
      faviconElement.setAttribute('href', icon);
    }

    // Update OG Title & Twitter Title
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title);
    
    // Update URL to current
    const currentUrl = window.location.href;
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', currentUrl);

    return () => {
      // Revert on unmount
      document.title = originalTitle;
      
      if (ogDescription) {
        document.querySelector('meta[name="description"]')?.setAttribute('content', ogDescription);
        document.querySelector('meta[property="og:description"]')?.setAttribute('content', ogDescription);
        document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', ogDescription);
      }
      
      if (ogKeywords) {
        document.querySelector('meta[name="keywords"]')?.setAttribute('content', ogKeywords);
      }
      
      if (originalFavicon && faviconElement) {
        faviconElement.setAttribute('href', originalFavicon);
      }
    };
  }, [title, description, keywords, icon]);
};
