import React, { useEffect } from 'react';
import TerminalOutput from '../TerminalOutput';
import TerminalInput from '../TerminalInput';
import DesktopWindow from '../DesktopWindow';
import { TerminalLine } from '@/lib/config';
import { useLayout } from '@/contexts/LayoutContext';
import { Home, Terminal, Folder, Settings } from 'lucide-react';

interface DesktopLayoutProps {
  history: TerminalLine[];
  command: string;
  promptString:
  string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  addLineToHistory: (content: string, isHtml?: boolean) => void;
}

const DesktopLayout: React.FC<DesktopLayoutProps> = ({
  history,
  command,
  promptString,
  onChange,
  onKeyDown,
  addLineToHistory,
}) => {
  const { setLayout } = useLayout();

  useEffect(() => {
    addLineToHistory("Switched to desktop layout. Welcome to Singularity OS.");
  }, [addLineToHistory]);

  return (
    <div id="desktop-container" className="relative w-full h-full flex flex-col items-center justify-center p-4 pointer-events-auto">
      <DesktopWindow title="Terminal" className="w-full max-w-3xl h-3/4 max-h-[600px] flex-grow">
        <div className="flex flex-col h-full">
          <TerminalOutput history={history} />
          <TerminalInput
            prompt={promptString}
            value={command}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        </div>
      </DesktopWindow>

      <div id="desktop-dock" className="absolute bottom-4 flex space-x-4 p-3 bg-[var(--container-bg)] border-[var(--container-border)] rounded-full shadow-[0_0_10px_var(--shadow-color)]">
        <button
          className="p-2 rounded-full hover:bg-[var(--prompt-color)] hover:text-[var(--window-header-text)] transition-colors"
          onClick={() => setLayout('terminal')}
          title="Home Terminal"
        >
          <Home size={24} />
        </button>
        <button
          className="p-2 rounded-full hover:bg-[var(--prompt-color)] hover:text-[var(--window-header-text)] transition-colors"
          onClick={() => addLineToHistory("Opening Files... (Not implemented yet)")}
          title="Files"
        >
          <Folder size={24} />
        </button>
        <button
          className="p-2 rounded-full hover:bg-[var(--prompt-color)] hover:text-[var(--window-header-text)] transition-colors"
          onClick={() => addLineToHistory("Opening Settings... (Not implemented yet)")}
          title="Settings"
        >
          <Settings size={24} />
        </button>
        <button
          className="p-2 rounded-full hover:bg-[var(--prompt-color)] hover:text-[var(--window-header-text)] transition-colors"
          onClick={() => addLineToHistory("Opening another Terminal... (Not implemented yet)")}
          title="New Terminal"
        >
          <Terminal size={24} />
        </button>
      </div>
    </div>
  );
};

export default DesktopLayout;