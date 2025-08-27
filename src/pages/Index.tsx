import React from 'react';
import Splash from '@/components/Splash';
import TerminalCore from '@/components/TerminalCore';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Splash />
      <TerminalCore />
    </div>
  );
};

export default Index;