import React, { useEffect, useRef } from 'react';
import TerminalOutput from '../TerminalOutput';
import TerminalInput from '../TerminalInput';
import { config, TerminalLine } from '@/lib/config';

interface MultiPanelLayoutProps {
  history: TerminalLine[];
  command: string;
  promptString: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  addLineToHistory: (content: string, isHtml?: boolean) => void;
}

const MultiPanelLayout: React.FC<MultiPanelLayoutProps> = ({
  history,
  command,
  promptString,
  onChange,
  onKeyDown,
  addLineToHistory,
}) => {
  const staticPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (staticPanelRef.current) {
      staticPanelRef.current.innerHTML = `
        <div class="header-text mb-4">System Information</div>
        <div class="text-sm">
          <span class="header-text">${config.whoami.name}</span><br>
          ${config.whoami.bio.map(l => `<div>${l}</div>`).join('')}<br>
          <div>Status: ${config.whoami.status}</div>
          <hr class="my-2 border-[var(--prompt-color)]">
          <div><strong>Version:</strong> 1.0.0</div>
          <div><strong>Host:</strong> Singularity OS</div>
          <div><strong>Frontend:</strong> React/TypeScript</div>
          <div><strong>Backend:</strong> Tailwind CSS</div>
        </div>
      `;
    }
    addLineToHistory("Switched to multipanel. Terminal is live.");
  }, [addLineToHistory]);

  return (
    <div id="multipanel-container" className="flex flex-col md:flex-row w-full h-full p-4 gap-4 pointer-events-auto">
      <div
        id="multipanel-static"
        ref={staticPanelRef}
        className="w-full md:w-2/5 border-[var(--container-border)] p-4 rounded-lg bg-[var(--container-bg)] overflow-y-auto flex-shrink-0 shadow-[0_0_5px_var(--shadow-color)]"
      >
        {/* Content rendered via useEffect */}
      </div>
      <div
        id="multipanel-terminal"
        className="w-full md:w-3/5 border-[var(--container-border)] rounded-lg bg-[var(--container-bg)] overflow-y-auto flex flex-col shadow-[0_0_5px_var(--shadow-color)]"
      >
        <TerminalOutput history={history} />
        <TerminalInput
          prompt={promptString}
          value={command}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  );
};

export default MultiPanelLayout;