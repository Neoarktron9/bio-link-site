import React, { useRef, useEffect } from 'react';
import { TerminalLine } from '@/lib/config';

interface TerminalOutputProps {
  history: TerminalLine[];
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({ history }) => {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div
      id="terminal-output"
      ref={terminalRef}
      className="flex-grow overflow-y-auto word-wrap break-words p-4"
    >
      {history.map((line, index) => (
        <div key={index} className="terminal-line">
          {line.isHtml ? (
            <span dangerouslySetInnerHTML={{ __html: line.content }} />
          ) : (
            <span>{line.content}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default TerminalOutput;