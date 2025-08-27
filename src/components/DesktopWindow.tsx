import React, { ReactNode } from 'react';

interface DesktopWindowProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const DesktopWindow: React.FC<DesktopWindowProps> = ({ title, children, className }) => {
  return (
    <div
      className={`bg-[var(--container-bg)] border-[var(--container-border)] rounded-lg shadow-[0_0_15px_var(--shadow-color)] flex flex-col overflow-hidden ${className}`}
      style={{ backdropFilter: 'blur(8px)' }}
    >
      <div className="flex items-center justify-between p-2 bg-[var(--window-header-bg)] text-[var(--window-header-text)] font-bold text-sm rounded-t-lg">
        <span>{title}</span>
        <div className="flex space-x-1">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        </div>
      </div>
      <div className="flex-grow overflow-auto p-4">
        {children}
      </div>
    </div>
  );
};

export default DesktopWindow;