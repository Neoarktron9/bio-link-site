import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { config, ThemeKey } from '@/lib/config';

interface ThemeContextType {
  theme: ThemeKey;
  setTheme: (themeKey: ThemeKey) => void;
  availableThemes: ThemeKey[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeKey>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('singularity_theme') as ThemeKey;
      return savedTheme && config.themes[savedTheme] ? savedTheme : 'matrix';
    }
    return 'matrix';
  });

  useEffect(() => {
    document.body.className = ''; // Clear existing theme classes
    document.body.classList.add(config.themes[theme]);
    localStorage.setItem('singularity_theme', theme);
  }, [theme]);

  const availableThemes = Object.keys(config.themes) as ThemeKey[];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, availableThemes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};