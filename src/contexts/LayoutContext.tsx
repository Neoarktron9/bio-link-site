import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { config, LayoutKey } from '@/lib/config';

interface LayoutContextType {
  layout: LayoutKey;
  setLayout: (layoutKey: LayoutKey) => void;
  availableLayouts: LayoutKey[];
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [layout, setLayout] = useState<LayoutKey>(() => {
    if (typeof window !== 'undefined') {
      const savedLayout = localStorage.getItem('singularity_layout') as LayoutKey;
      return savedLayout && config.layouts[savedLayout] ? savedLayout : 'terminal';
    }
    return 'terminal';
  });

  useEffect(() => {
    document.body.className = document.body.className.replace(/layout-\w+/g, ''); // Clear existing layout classes
    document.body.classList.add(config.layouts[layout]);
    localStorage.setItem('singularity_layout', layout);
  }, [layout]);

  const availableLayouts = Object.keys(config.layouts).filter(key => key !== 'default') as LayoutKey[];

  return (
    <LayoutContext.Provider value={{ layout, setLayout, availableLayouts }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};