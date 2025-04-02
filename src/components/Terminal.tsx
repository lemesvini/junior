"use client";
import { useState, useEffect } from "react";

const TerminalText = () => {
  const lines = [
    { text: "$ junior --init", type: "command" },
    { text: "Initializing development environment...", type: "output" },
    { text: "$ junior --features", type: "command" },
    { text: "→ Real-time collaboration", type: "output" },
    { text: "→ Monaco-based editor", type: "output" },
    { text: "→ JSON tools", type: "output" },
    { text: "$", type: "command" }
  ];

  const [currentLine, setCurrentLine] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentLine < lines.length) {
      const text = lines[currentLine].text;
      let charIndex = 0;
      
      const typeChar = setInterval(() => {
        if (charIndex < text.length) {
          setDisplayedLines(prev => {
            const newLines = [...prev];
            if (currentLine === newLines.length) {
              newLines.push(text.slice(0, charIndex + 1));
            } else {
              newLines[currentLine] = text.slice(0, charIndex + 1);
            }
            return newLines;
          });
          charIndex++;
        } else {
          clearInterval(typeChar);
          setTimeout(() => {
            setCurrentLine(prev => prev + 1);
          }, lines[currentLine].type === "command" ? 500 : 300);
        }
      }, lines[currentLine].type === "command" ? 70 : 40);

      return () => clearInterval(typeChar);
    } else {
      setIsTyping(false);
    }
  }, [currentLine]);

  return (
    <div className="font-mono space-y-2">
      {displayedLines.map((line, index) => (
        <p 
          key={index} 
          className={lines[index].type === "command" ? "text-green-500" : "text-white"}
        >
          {line}
          {index === displayedLines.length - 1 && !isTyping && (
            <span className="ml-1 animate-pulse">█</span>
          )}
        </p>
      ))}
    </div>
  );
};

export default TerminalText; 