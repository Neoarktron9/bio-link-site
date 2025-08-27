import React, { useRef, useEffect } from 'react';

interface TerminalInputProps {
  prompt: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const TerminalInput: React.FC<TerminalInputProps> = ({
  prompt,
  value,
  onChange,
  onKeyDown,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div id="input-line" className="flex items-center flex-shrink-0 p-4">
      <span className="prompt-text" dangerouslySetInnerHTML={{ __html: prompt }} />
      <input
        ref={inputRef}
        type="text"
        id="input-field"
        className="bg-transparent border-none text-[var(--input-color)] font-fira-code text-base flex-grow focus:outline-none"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <div className="cursor"></div>
    </div>
  );
};

export default TerminalInput;