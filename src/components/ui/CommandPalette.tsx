"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Terminal, FileCode, X, Command, CornerDownLeft } from "lucide-react";

const commands = [
  { id: "home", label: "Go to Home", section: "#hero", shortcut: "G H" },
  { id: "about", label: "Go to About", section: "#about", shortcut: "G A" },
  { id: "skills", label: "Go to Skills", section: "#skills", shortcut: "G S" },
  { id: "projects", label: "Go to Projects", section: "#projects", shortcut: "G P" },
  { id: "experience", label: "Go to Experience", section: "#experience", shortcut: "G E" },
  { id: "certifications", label: "Go to Certifications", section: "#certifications", shortcut: "G C" },
  { id: "education", label: "Go to Education", section: "#education", shortcut: "G D" },
  { id: "blog", label: "Go to Blog", section: "#blog", shortcut: "G B" },
  { id: "testimonials", label: "Go to Testimonials", section: "#testimonials", shortcut: "G T" },
  { id: "contact", label: "Go to Contact", section: "#contact", shortcut: "G M" },
  { id: "resume", label: "Download Resume", href: "/resume.pdf", shortcut: "D R" },
  { id: "github", label: "Open GitHub", href: "https://github.com", shortcut: "O G" },
  { id: "linkedin", label: "Open LinkedIn", href: "https://linkedin.com", shortcut: "O L" },
  { id: "theme", label: "Toggle Theme", action: "toggle-theme", shortcut: "T" },
];

export function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  const executeCommand = useCallback((cmd: typeof commands[0]) => {
    if (cmd.section) {
      document.querySelector(cmd.section)?.scrollIntoView({ behavior: "smooth" });
    } else if (cmd.href) {
      if (cmd.href.startsWith("/")) {
        window.location.href = cmd.href;
      } else {
        window.open(cmd.href, "_blank");
      }
    } else if (cmd.action === "toggle-theme") {
      document.documentElement.classList.toggle("dark");
    }
    onClose();
    setSearch("");
    setSelectedIndex(0);
  }, [onClose]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => (i + 1) % filteredCommands.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => (i - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        executeCommand(filteredCommands[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  }, [filteredCommands, selectedIndex, executeCommand, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Palette */}
          <motion.div
            className="relative w-full max-w-xl bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-200 dark:border-zinc-700">
              <Search className="w-5 h-5 text-zinc-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent outline-none text-zinc-900 dark:text-zinc-100 placeholder-zinc-400"
                autoFocus
              />
              <button
                onClick={onClose}
                className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <X className="w-4 h-4 text-zinc-400" />
              </button>
            </div>

            {/* Commands list */}
            <div className="max-h-[50vh] overflow-y-auto p-2">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, i) => (
                  <button
                    key={cmd.id}
                    onClick={() => executeCommand(cmd)}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                      i === selectedIndex
                        ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        i === selectedIndex
                          ? "bg-blue-100 dark:bg-blue-500/20"
                          : "bg-zinc-100 dark:bg-zinc-800"
                      }`}>
                        <FileCode className="w-4 h-4" />
                      </div>
                      <span className="font-medium">{cmd.label}</span>
                    </div>
                    <kbd className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-500 font-mono">
                      {cmd.shortcut}
                    </kbd>
                  </button>
                ))
              ) : (
                <div className="py-8 text-center text-zinc-500">
                  No commands found
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-xs text-zinc-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 font-mono">↑↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 font-mono">↵</kbd>
                  Select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 font-mono">Esc</kbd>
                  Close
                </span>
              </div>
              <span className="flex items-center gap-1">
                <Command className="w-3 h-3" /> + K to open
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function CommandPaletteTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 flex items-center justify-center hover:scale-105 transition-transform"
      aria-label="Open command palette"
    >
      <Terminal className="w-5 h-5" />
    </button>
  );
}
