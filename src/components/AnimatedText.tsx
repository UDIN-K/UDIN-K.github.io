import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const Character: React.FC<{
  char: string;
  start: number;
  end: number;
  progress: MotionValue<number>;
}> = ({ char, start, end, progress }) => {
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="invisible select-none">{char}</span>
      <motion.span style={{ opacity }} className="absolute left-0 top-0">
        {char}
      </motion.span>
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '', style }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const { words, totalChars } = useMemo(() => {
    const wordList = text.split(' ');
    return {
      words: wordList,
      totalChars: text.length,
    };
  }, [text]);

  let runningCharIndex = 0;

  return (
    <p ref={containerRef} style={style} className={`${className} leading-relaxed text-center`}>
      {words.map((word, wordIdx) => {
        const wordChars = word.split('');
        const renderedWord = (
          <span key={wordIdx} className="inline-block whitespace-nowrap">
            {wordChars.map((char, charIdx) => {
              const charIndex = runningCharIndex++;
              const start = totalChars > 0 ? charIndex / totalChars : 0;
              const end = totalChars > 0 ? Math.min(1, (charIndex + 1) / totalChars) : 1;
              return (
                <Character
                  key={charIdx}
                  char={char}
                  start={start}
                  end={end}
                  progress={scrollYProgress}
                />
              );
            })}
          </span>
        );

        // Advance index for the space
        if (wordIdx < words.length - 1) {
          runningCharIndex++;
        }

        return (
          <React.Fragment key={wordIdx}>
            {renderedWord}
            {wordIdx < words.length - 1 && ' '}
          </React.Fragment>
        );
      })}
    </p>
  );
};
