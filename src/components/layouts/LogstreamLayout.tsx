import React, { useEffect, useState, useRef } from 'react';

interface LogstreamLayoutProps {
  addLineToHistory: (content: string, isHtml?: boolean) => void;
}

const LogstreamLayout: React.FC<LogstreamLayoutProps> = ({ addLineToHistory }) => {
  const [logEntries, setLogEntries] = useState<string[]>([]);
  const logOutputRef = useRef<HTMLDivElement>(null);
  const logIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    addLineToHistory("Switched to logstream. Monitoring system activity...");

    logIntervalRef.current = setInterval(() => {
      const timestamp = new Date().toISOString();
      const messages = [
        "KERNEL: System check... OK",
        "NETWORK: Interface eth0 up. IP: 192.168.1.100",
        "STORAGE: Disk usage 45%. Free space: 550GB",
        "PROCESS: PID 1234 started: 'nginx'",
        "SECURITY: Firewall rules loaded successfully",
        "CPU: Load average: 0.5, 0.3, 0.1",
        "MEMORY: Usage 2.5GB / 8GB",
        "USER: 'guest' logged in from 127.0.0.1",
        "SERVICE: 'sshd' running on port 22",
        "UPDATE: Checking for new packages...",
      ];
      const newMessage = `[${timestamp}] ${messages[Math.floor(Math.random() * messages.length)]}`;
      setLogEntries((prev) => [...prev, newMessage]);
    }, 1000) as unknown as number; // Cast to number for clearInterval

    return () => {
      if (logIntervalRef.current) {
        clearInterval(logIntervalRef.current);
      }
    };
  }, [addLineToHistory]);

  useEffect(() => {
    if (logOutputRef.current) {
      logOutputRef.current.scrollTop = logOutputRef.current.scrollHeight;
    }
  }, [logEntries]);

  return (
    <div id="logstream-container" className="flex flex-col w-full h-full p-4 pointer-events-auto">
      <div
        id="logstream-output"
        ref={logOutputRef}
        className="flex-grow overflow-y-auto border-[var(--container-border)] rounded-lg bg-[var(--container-bg)] p-4 mb-4 shadow-[0_0_5px_var(--shadow-color)]"
      >
        {logEntries.map((log, index) => (
          <div key={index} className="terminal-line text-sm">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogstreamLayout;