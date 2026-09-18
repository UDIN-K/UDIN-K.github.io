import React from 'react';

export const KinematicBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
      {/* Dark overlay to ensure text remains readable */}
      <div className="absolute inset-0 bg-[#0C0C0C]/50 z-10" />
      
      {/* The GIF background requested by the user */}
      <img 
        src="https://media.giphy.com/media/l0HlUvsXh3w7w2PUk/giphy.gif" 
        alt="3D Animation Loop"
        className="w-full h-full object-cover opacity-80"
        loading="eager"
      />
    </div>
  );
};
