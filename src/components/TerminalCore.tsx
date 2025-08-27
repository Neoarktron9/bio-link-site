import React, { useState, useEffect, useCallback } from 'react';
import TerminalOutput from './TerminalOutput';
import TerminalInput from './TerminalInput';
import MultiPanelLayout from './layouts/MultiPanelLayout'; // Import the new layout component
import { config, ThemeKey, LayoutKey, TerminalLine } from '@/lib/config';
import { useTheme } from '@/contexts/ThemeContext';
import { useLayout } from '@/contexts/LayoutContext';

const TerminalCore: React.FC = () => {
  const { theme, setTheme, availableThemes } = useTheme();
  const { layout, setLayout, availableLayouts } = useLayout();

  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [command, setCommand] = useState<string>('');
  const [sessionHistory, setSessionHistory] = useState<string[]>([]);
  const [commandHistoryIndex, setCommandHistoryIndex] = useState<number>(-1);
  const [promptString, setPromptString] = useState<string>(config.terminal.prompt_string());
  const [uptime, setUptime] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime((prevUptime) => prevUptime + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? `${h}h ` : ''}${m > 0 ? `${m}m ` : ''}${s}s`;
  };

  const addLineToHistory = useCallback((content: string, isHtml: boolean = false) => {
    setHistory((prevHistory) => [...prevHistory, { type: 'output', content, isHtml }]);
  }, []);

  useEffect(() => {
    // Load state from localStorage
    const savedPrompt = localStorage.getItem('singularity_prompt');
    if (savedPrompt) {
      setPromptString(savedPrompt);
    }

    // Display MOTD
    config.motd.forEach((line) => addLineToHistory(line));
  }, [addLineToHistory]);

  const processCommand = useCallback(
    (input: string) => {
      const trimmedInput = input.trim();
      if (!trimmedInput) return;

      setHistory((prevHistory) => [
        ...prevHistory,
        { type: 'input', content: `${promptString}${trimmedInput}` },
      ]);
      setSessionHistory((prev) => [...prev, trimmedInput]);
      setCommandHistoryIndex(-1); // Reset history index after new command

      const [cmd, ...args] = trimmedInput.toLowerCase().split(' ');
      let output = '';
      let isHtml = false;

      switch (cmd) {
        case 'help':
          output = `<b>Commands:</b> 'neofetch', 'whoami', 'links', 'history', 'prompt', 'theme', 'layout', 'clear', 'reset'<br><b>Themes:</b> ${availableThemes.join(', ')}<br><b>Layouts:</b> ${availableLayouts.join(', ')}`;
          isHtml = true;
          break;
        case 'whoami':
          output = `<span class="header-text">${config.whoami.name}</span>${config.whoami.bio.map(l => `<div>${l}</div>`).join('')}<br><div>Status: ${config.whoami.status}</div>`;
          isHtml = true;
          break;
        case 'neofetch':
          output = `
            <div class="flex items-start gap-8 flex-wrap">
              <div class="flex-none">
                <img src="https://i.ibb.co/CpwqKz5n/download.jpg" 
                     class="max-w-[220px] h-auto rounded-lg border-2 border-[var(--prompt-color)] shadow-[0_0_10px_var(--shadow-color)]" />
              </div>
              <div class="flex-1 min-w-[250px]">
                <div class="text-2xl font-bold">${config.whoami.name}</div>
                <div>A digital artisan.</div>
                <div>Specializing in full-stack development & creative coding.</div>
                <div>Status: ${config.whoami.status}</div>
                <hr class="my-2 border-[var(--prompt-color)]">
                <div><strong>Version:</strong> 1.0.0</div>
                <div><strong>Theme:</strong> ${theme.replace('theme-', '') || 'default'}</div>
                <div><strong>Host:</strong> Singularity OS</div>
                <div><strong>Frontend:</strong> React/TypeScript</div>
                <div><strong>Backend:</strong> Tailwind CSS</div>
                <div><strong>Uptime:</strong> ${formatUptime(uptime)}</div>
              </div>
            </div>
          `;
          isHtml = true;
          break;
        case 'links':
          output = config.links.map((l) => `<a href="${l.url}" target="_blank">${l.title}</a>`).join('<br>');
          isHtml = true;
          break;
        case 'history':
          output = sessionHistory.map((cmd, i) => `<span>${i}</span>&nbsp;&nbsp;${cmd}`).join('<br>');
          isHtml = true;
          break;
        case 'prompt':
          const newPrompt = args.join(' ');
          if (newPrompt) {
            setPromptString(newPrompt);
            localStorage.setItem('singularity_prompt', newPrompt);
            output = `Prompt set to: ${newPrompt}`;
          } else {
            setPromptString(config.terminal.prompt_string());
            localStorage.removeItem('singularity_prompt');
            output = "Prompt reset to default.";
          }
          break;
        case 'theme':
          const themeName = args[0] as ThemeKey;
          if (themeName && availableThemes.includes(themeName)) {
            setTheme(themeName);
            output = `Theme set to: ${themeName}`;
          } else {
            output = `Error: Invalid theme. Available themes: ${availableThemes.join(', ')}`;
          }
          break;
        case 'layout':
          const layoutName = args[0] as LayoutKey;
          if (layoutName && availableLayouts.includes(layoutName)) {
            setLayout(layoutName);
            output = `Layout set to: ${layoutName}`;
          } else {
            output = `Error: Invalid layout. Available layouts: ${availableLayouts.join(', ')}`;
          }
          break;
        case 'clear':
          setHistory([]);
          return; // Don't add "command not found"
        case 'reset':
          localStorage.clear();
          window.location.reload();
          return; // Don't add "command not found"
        default:
          output = `command not found: ${trimmedInput}`;
          break;
      }
      addLineToHistory(output, isHtml);
    },
    [promptString, availableThemes, availableLayouts, setTheme, setLayout, sessionHistory, addLineToHistory, uptime, theme]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      processCommand(command);
      setCommand('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (sessionHistory.length > 0 && commandHistoryIndex < sessionHistory.length - 1) {
        const newIndex = commandHistoryIndex + 1;
        setCommandHistoryIndex(newIndex);
        setCommand(sessionHistory[sessionHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistoryIndex > 0) {
        const newIndex = commandHistoryIndex - 1;
        setCommandHistoryIndex(newIndex);
        setCommand(sessionHistory[sessionHistory.length - 1 - newIndex]);
      } else if (commandHistoryIndex === 0) {
        setCommandHistoryIndex(-1);
        setCommand('');
      }
    } else if (e.key === 'Escape') {
      setLayout('terminal'); // Reset layout to terminal on Escape
    }
  };

  const terminalContent = (
    <>
      <TerminalOutput history={history} />
      <TerminalInput
        prompt={promptString}
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </>
  );

  return (
    <div id="app" className="flex flex-col h-full text-[var(--output-color)] shadow-[0_0_5px_var(--shadow-color)]">
      <div id="output-wrapper" className="flex-grow relative flex flex-col">
        {layout === 'centered' && (
          <div id="terminal-output" className="h-[90vh] max-h-[800px] bg-[var(--container-bg)] backdrop-blur-md border-[var(--container-border)] rounded-lg animate-fade p-4 overflow-y-auto">
            <TerminalOutput history={history} />
          </div>
        )}
        {layout === 'multipanel' && (
          <MultiPanelLayout
            history={history}
            command={command}
            promptString={promptString}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            addLineToHistory={addLineToHistory}
          />
        )}
        {(layout === 'terminal' || layout === 'minimal' || layout === 'default') && terminalContent}
      </div>
      {/* The input line is only rendered outside the output-wrapper for 'terminal' and 'minimal' layouts */}
      {(layout === 'terminal' || layout === 'minimal' || layout === 'default') && (
        <div id="input-line" className="flex items-center flex-shrink-0 p-4">
          <TerminalInput
            prompt={promptString}
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      )}
      {/* Placeholder for layout-space, will be managed by specific layout components later */}
      <div id="layout-space" className="absolute inset-0 pointer-events-none z-10 perspective-1200px"></div>
    </div>
  );
};

export default TerminalCore;