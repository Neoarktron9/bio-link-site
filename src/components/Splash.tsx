import React, { useEffect, useState } from 'react';
import { config } from '@/lib/config';

const Splash: React.FC = () => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHidden(true);
    }, config.splash.duration);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-[var(--bg-color)] transition-opacity duration-500 ease-out ${
        isHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ textShadow: `0 0 5px var(--shadow-color)` }}
    >
      <pre className="text-sm md:text-base lg:text-lg text-[var(--output-color)]">
        {config.splash.ascii}
      </pre>
    </div>
  );
};

export default Splash;