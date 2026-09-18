import React from 'react';

interface ContactButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({ 
  children = "Contact Me", 
  onClick, 
  className = '',
  href = "#contact"
}) => {
  const buttonStyles: React.CSSProperties = {
    background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
    boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
    outline: '2px solid rgba(255, 255, 255, 0.95)',
    outlineOffset: '-3px',
  };

  const buttonClasses = `relative inline-flex items-center justify-center rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base text-white font-medium uppercase tracking-widest transition-transform hover:scale-105 active:scale-95 cursor-pointer select-none ${className}`;

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    if (onClick) {
      onClick();
    }
  };

  if (href) {
    return (
      <a
        href={href}
        onClick={handleClick}
        style={buttonStyles}
        className={buttonClasses}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={handleClick}
      style={buttonStyles}
      className={buttonClasses}
    >
      {children}
    </button>
  );
};
