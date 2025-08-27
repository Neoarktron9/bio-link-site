import React, { useEffect } from 'react';
import { config } from '@/lib/config';

interface GridLayoutProps {
  addLineToHistory: (content: string, isHtml?: boolean) => void;
}

const GridLayout: React.FC<GridLayoutProps> = ({ addLineToHistory }) => {
  useEffect(() => {
    addLineToHistory("Switched to grid layout. Explore the links below.");
  }, [addLineToHistory]);

  return (
    <div
      id="grid-container"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 h-full overflow-y-auto pointer-events-auto"
    >
      {config.links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="grid-tile block bg-[var(--container-bg)] border-[var(--container-border)] p-6 rounded-lg text-center transition-transform duration-200 ease-in-out hover:scale-105 shadow-[0_0_5px_var(--shadow-color)]"
        >
          <h3 className="text-lg font-bold header-text mb-2">{link.title}</h3>
          <p className="text-sm text-[var(--output-color)]">Click to open</p>
        </a>
      ))}
    </div>
  );
};

export default GridLayout;