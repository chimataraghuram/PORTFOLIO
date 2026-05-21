import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X } from 'lucide-react';

interface CommandOutput {
  command: string;
  response: React.ReactNode;
}

const TerminalEasterEgg: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: '',
      response: (
        <div className="text-cyan-400">
          Welcome to TechBoy OS v2.4.9 <br />
          Type 'help' to see available commands.
        </div>
      )
    }
  ]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle on backtick or tilde
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    
    if (!cmd) return;

    let response: React.ReactNode = '';

    switch (cmd) {
      case 'help':
        response = (
          <div className="text-gray-300">
            Available commands:<br/>
            <span className="text-yellow-400">whoami</span> - Displays current user info<br/>
            <span className="text-yellow-400">projects</span> - Lists main projects<br/>
            <span className="text-yellow-400">skills</span> - Displays tech stack<br/>
            <span className="text-yellow-400">clear</span> - Clears the terminal<br/>
            <span className="text-yellow-400">sudo rm -rf /</span> - 🛑 DO NOT RUN 🛑<br/>
            <span className="text-yellow-400">exit</span> - Closes terminal
          </div>
        );
        break;
      case 'whoami':
        response = "visitor_guest_001. Location: Earth. Status: Exploring Portfolio.";
        break;
      case 'projects':
        response = "Loading secure files...\n1. Techboy Store (E-commerce)\n2. Project Finder\n3. AI Code Assistant\nType 'exit' and click the Projects tab for visuals.";
        break;
      case 'skills':
        response = "Python | React | TypeScript | TailwindCSS | Node.js | Next.js | AI | Prompt Engineering";
        break;
      case 'sudo rm -rf /':
        response = <span className="text-red-500 font-bold animate-pulse">ACCESS DENIED. THIS INCIDENT WILL BE REPORTED.</span>;
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'exit':
        setIsOpen(false);
        setInput('');
        return;
      default:
        response = <span className="text-red-400">Command not found: {cmd}. Type 'help' for a list of commands.</span>;
    }

    setHistory(prev => [...prev, { command: cmd, response }]);
    setInput('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed inset-x-0 top-4 md:top-20 mx-auto w-[95%] md:w-[600px] z-[99999] shadow-2xl"
        >
          <div className="bg-[#0a0a0a]/95 backdrop-blur-3xl border border-white/20 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)] flex flex-col font-mono text-sm h-[400px]">
            
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10 select-none">
              <div className="flex items-center gap-2 text-gray-400">
                <TerminalIcon size={14} />
                <span className="text-xs">techboy@portfolio:~</span>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-400" onClick={() => setIsOpen(false)} />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2" onClick={() => inputRef.current?.focus()}>
              {history.map((item, i) => (
                <div key={i} className="flex flex-col gap-1">
                  {item.command && (
                    <div className="flex items-center gap-2 text-green-400">
                      <span>➜</span>
                      <span className="text-cyan-400">~</span>
                      <span className="text-white">{item.command}</span>
                    </div>
                  )}
                  <div className="text-gray-300 whitespace-pre-wrap">{item.response}</div>
                </div>
              ))}
              
              <form onSubmit={handleCommand} className="flex items-center gap-2 text-green-400 mt-2">
                <span>➜</span>
                <span className="text-cyan-400">~</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder-gray-600"
                  spellCheck={false}
                  autoComplete="off"
                  autoFocus
                />
              </form>
              <div ref={bottomRef} />
            </div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TerminalEasterEgg;
