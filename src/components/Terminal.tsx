import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, Minus, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import useSoundEffects from "@/hooks/useSoundEffects";

interface TerminalLine {
  type: "input" | "output" | "error" | "success" | "info";
  content: string;
  timestamp?: Date;
}

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: string) => void;
}

const COMMANDS = {
  help: `
Available commands:
  about     - Learn about me
  skills    - View my tech stack
  projects  - Browse my work
  contact   - Get in touch
  clear     - Clear terminal
  home      - Go to top
  
Easter eggs:
  sudo hire-me   - You know what to do
  matrix         - Enter the matrix
  whoami         - Who am I?
`,
  about: "Navigating to About section...",
  skills: "Loading skills matrix...",
  projects: "Fetching project database...",
  contact: "Opening communication channel...",
  home: "Returning to base...",
  clear: "",
  whoami: "You are a visitor exploring an awesome portfolio. Welcome!",
  matrix: "Wake up, Neo... The Matrix has you...",
  "sudo hire-me": `
🎉 ACHIEVEMENT UNLOCKED: Persistence Level 100!

Sending hiring signal... ✓
Preparing resume download... ✓
Opening contact channel... ✓

Seriously though, I'd love to chat!
Run 'contact' to get in touch.
`,
};

const Terminal = ({ isOpen, onClose, onNavigate }: TerminalProps) => {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      type: "info",
      content: "Welcome to the Terminal v1.0.0",
    },
    {
      type: "info",
      content: "Type 'help' for available commands.",
    },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMinimized, setIsMinimized] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const { playSound } = useSoundEffects();

  const scrollToBottom = useCallback(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const executeCommand = useCallback(
    (cmd: string) => {
      const trimmedCmd = cmd.trim().toLowerCase();

      // Add input line
      setLines((prev) => [
        ...prev,
        { type: "input", content: `> ${cmd}`, timestamp: new Date() },
      ]);

      if (!trimmedCmd) return;

      // Add to history
      setCommandHistory((prev) => [...prev, trimmedCmd]);
      setHistoryIndex(-1);

      // Handle clear command
      if (trimmedCmd === "clear") {
        setLines([]);
        return;
      }

      // Check for command
      const response = COMMANDS[trimmedCmd as keyof typeof COMMANDS];

      if (response !== undefined) {
        // Navigation commands
        const navCommands = ["about", "skills", "projects", "contact", "home"];
        if (navCommands.includes(trimmedCmd)) {
          playSound("success");
          setLines((prev) => [
            ...prev,
            { type: "success", content: response },
          ]);
          setTimeout(() => {
            onNavigate(trimmedCmd);
          }, 500);
        } else if (trimmedCmd === "sudo hire-me") {
          playSound("achievement");
          setLines((prev) => [
            ...prev,
            { type: "success", content: response },
          ]);
        } else if (trimmedCmd === "matrix") {
          playSound("whoosh");
          setLines((prev) => [
            ...prev,
            { type: "info", content: response },
          ]);
        } else {
          setLines((prev) => [
            ...prev,
            { type: "output", content: response },
          ]);
        }
      } else {
        playSound("click");
        setLines((prev) => [
          ...prev,
          {
            type: "error",
            content: `Command not found: ${trimmedCmd}. Type 'help' for available commands.`,
          },
        ]);
      }
    },
    [onNavigate, playSound]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(currentInput);
      setCurrentInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      } else {
        setHistoryIndex(-1);
        setCurrentInput("");
      }
    } else {
      playSound("keypress");
    }
  };

  const getLineColor = (type: TerminalLine["type"]) => {
    switch (type) {
      case "input":
        return "text-primary";
      case "output":
        return "text-foreground";
      case "error":
        return "text-destructive";
      case "success":
        return "text-green-400";
      case "info":
        return "text-muted-foreground";
      default:
        return "text-foreground";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={
            isMinimized
              ? { opacity: 1, y: 0, scale: 1, height: "auto" }
              : { opacity: 1, y: 0, scale: 1 }
          }
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={cn(
            "fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-[600px] z-50",
            "bg-background/95 backdrop-blur-xl border border-primary/30 rounded-lg",
            "shadow-2xl shadow-primary/20",
            isMinimized ? "h-auto" : "h-[400px]"
          )}
        >
          {/* Title bar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-primary/20 bg-card/50 rounded-t-lg">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-4 h-4 text-primary" />
              <span className="font-mono text-sm text-primary">terminal</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 rounded hover:bg-primary/20 transition-colors"
              >
                {isMinimized ? (
                  <Maximize2 className="w-3 h-3 text-muted-foreground" />
                ) : (
                  <Minus className="w-3 h-3 text-muted-foreground" />
                )}
              </button>
              <button
                onClick={onClose}
                className="p-1 rounded hover:bg-destructive/20 transition-colors"
              >
                <X className="w-3 h-3 text-muted-foreground hover:text-destructive" />
              </button>
            </div>
          </div>

          {/* Terminal content */}
          {!isMinimized && (
            <div className="flex flex-col h-[calc(100%-40px)]">
              {/* Output area */}
              <div
                ref={outputRef}
                className="flex-1 p-4 overflow-y-auto font-mono text-sm space-y-1"
              >
                {lines.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={cn("whitespace-pre-wrap", getLineColor(line.type))}
                  >
                    {line.content}
                  </motion.div>
                ))}
              </div>

              {/* Input area */}
              <div className="flex items-center px-4 py-3 border-t border-primary/20 bg-card/30">
                <span className="text-primary font-mono mr-2">{">"}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none font-mono text-foreground placeholder:text-muted-foreground"
                  placeholder="Type a command..."
                  spellCheck={false}
                  autoComplete="off"
                />
                <span className="w-2 h-5 bg-primary cursor-blink" />
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Terminal;
