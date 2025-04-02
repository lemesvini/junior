"use client";
import Image from "next/image";
import Header from "@/components/header";
import JuniorPNG from "../../public/JUNIOR.png";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCode,
  faSatelliteDish,
  faCode,
  faRocket,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from 'framer-motion';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';

const testimonials = [
  {
    name: "João Vitor",
    role: "Web Developer",
    image: "https://i.imgur.com/LgSv1pz.jpeg",
    text: "The real-time collaboration feature has transformed how i code myself and with my team."
  },
  {
    name: "Mike Johnson",
    role: "Tech Lead",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    text: "The integrated JSON tools save me time every day. It's become an essential part of my workflow."
  },
  {
    name: "Alex Rivera",
    role: "Full Stack Developer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    text: "Clean interface, powerful features, and great performance. Exactly what I needed."
  }
];

// Update the terminal section with a sequential typing effect
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
          }, lines[currentLine].type === "command" ? 500 : 300); // Longer pause after commands
        }
      }, lines[currentLine].type === "command" ? 70 : 40); // Slower typing for commands

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
            <span className="ml-1 animate-cursor">█</span>
          )}
        </p>
      ))}
    </div>
  );
};

export default function Home() {
  const router = useRouter();
  const [liveModal, setLivemodal] = useState(false);
  const LiveModal = () => {
    const [selectedOption, setSelectedOption] = useState("button1");
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const routeCollaboration = (type: string, code: string) => {
      if (type === 'new') {
        // logic for new collab
        console.log(type)
        router.push(`/liveCode?type=${type}`)
      }
      if (type === 'join') {
        // logic for join here
        router.push(`/liveCode?type=${type}&code=${code}`)
        console.log(code)
      }
    }
    return (
      <div
        className="fixed flex z-[100] w-full h-[100dvh] items-center justify-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      >
        <div className="relative w-3/5 h-2/5 min-h-[400px] min-w-[600px] glass-effect rounded-lg flex flex-col items-center justify-center border border-white/10">
          <div className="border flex flex-col w-full h-full p-4 font-mono">
            <div className="w-full flex flex-row justify-between px-2">
              <div className="font-black text-white">Live Code Options:</div>
              <div
                onClick={() => setLivemodal(false)}
                className="hover:font-black text-red-600 hover:cursor-pointer hover:text-red-400"
              >
                &times;
              </div>
            </div>
            <div className="h-full mt-4 flex flex-row">
              <div className="h-full w-1/2 flex flex-col space-y-2">
                <div
                  className={`w-full bg-black p-4 text-white flex flex-col rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${
                    selectedOption === "button1" ? "flex-grow" : ""
                  }`}
                  onClick={() => setSelectedOption("button1")}
                >
                  <div className="font-black">Collaboration</div>
                  {selectedOption === "button1" && (
                    <div className="mt-2 flex flex-grow">
                      <div className="flex flex-col items-center h-full w-full justify-center space-y-2">
                        <FontAwesomeIcon icon={faSatelliteDish} className="text-5xl " />
                        <div>Live Coding</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="h-full w-1/2 p-4 text-white flex flex-col">
                {selectedOption === "button1" && (
                  <div className="border-l border-black pl-4 flex flex-col flex-grow justify-center space-y-3 items-center w-full">
                    <div>Code together in realtime.</div>
                    <br />
                    <button 
                    className="hover:text-lg cursor-pointer bg-white w-full p-3 text-black font-medium text-center rounded-lg shadow-sm transition-all hover:bg-gray-50 hover:shadow-md active:scale-98"
                    onClick={() => routeCollaboration('new', '')}
                    >
                      New Collaboration
                    </button>
                    <div className="flex items-center w-full my-2">
                      <hr className="flex-grow border-t border-gray-300" />
                      <span className="px-3 text-sm text-gray-300">or</span>
                      <hr className="flex-grow border-t border-gray-300" />
                    </div>
                    <div className="text-sm font-medium mb-1 self-start">
                      Join an ongoing collaboration:
                    </div>
                    <div></div>
                    <div className="relative w-full mt-2">
                      <input
                        className="border border-gray-300 w-full p-3 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                        placeholder="Enter collaboration code..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                      />
                      {inputValue && (
                        <button 
                        className="absolute right-3 top-1/2 hover:cursor-pointer -translate-y-1/2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm hover:shadow-md transition-all"
                        onClick={() =>  routeCollaboration('join', `${inputValue}`)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 font-black"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] overflow-x-hidden">
      {liveModal && <LiveModal />}
      
      <div className="relative">
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 z-50"
        >
          <div className="absolute inset-0 bg-black/20 backdrop-blur-xl border-b border-white/10"></div>
          <div className="container mx-auto px-4 py-4 relative">
            <div className="flex items-center justify-between">
              <motion.div 
                className="flex items-center space-x-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Image
                  src={JuniorPNG}
                  alt="Junior"
                  width={100}
                  height={40}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => router.push("/")}
                />
                <div className="hidden md:flex space-x-6">
                  <motion.div className="flex space-x-2 items-center bg-white/5 rounded-full p-1">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => router.push("/monaco")}
                      className="px-4 py-2 text-white hover:bg-white/10 rounded-full transition-colors"
                    >
                      Editor
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => router.push("/jsonParser")}
                      className="px-4 py-2 text-white hover:bg-white/10 rounded-full transition-colors"
                    >
                      JSON Tools
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setLivemodal(true)}
                      className="px-4 py-2 text-white hover:bg-white/10 rounded-full transition-colors"
                    >
                      Collaborate
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/monaco")}
                  className="hidden md:flex px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-mono items-center space-x-2 hover:shadow-lg hover:shadow-blue-500/20 transition-shadow"
                >
                  <span>Start Coding</span>
                  <FontAwesomeIcon icon={faCode} className="w-4 h-4" />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.nav>

        <section className="relative min-h-screen pt-24 flex items-center justify-center px-4">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-full overflow-hidden">
            <div className="absolute inset-0 grid-pattern pointer-events-none z-0 opacity-30"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A] z-[1]"></div>
          </div>
          
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="md:w-1/2 text-left space-y-6"
            >
              <h1 className="text-5xl md:text-7xl font-bold">
                <span className="text-white">Modern</span>
                <br />
                <span className="gradient-text">Development</span>
                <br />
                <span className="text-white">Tools</span>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl font-mono max-w-lg">
                A powerful platform for collaborative coding, real-time pair programming, and instant JSON parsing.
              </p>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/monaco")}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-mono"
                >
                  Start Coding
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setLivemodal(true)}
                  className="px-8 py-3 glass-card text-blue-500 rounded-lg font-mono border border-blue-500/30"
                >
                  Collaborate
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="md:w-1/2 mt-8 md:mt-0"
            >
              <div className="glass-effect p-6 rounded-xl">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <TerminalText />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-4 bg-black/30">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
              Powerful Features for Modern Development
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card p-6 rounded-xl cursor-pointer group hover:border-blue-500/50 transition-all relative overflow-hidden"
                onClick={() => router.push("/monaco")}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none"></div>
                
                <FontAwesomeIcon icon={faCode} className="text-blue-500 text-3xl mb-4 group-hover:scale-110 transition-transform relative z-10" />
                <h3 className="text-white text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors relative z-10">Code Editor</h3>
                <p className="text-gray-400 mb-4 relative z-10">
                  Feature-rich Monaco editor with syntax highlighting and intelligent completions.
                </p>
                <div className="flex items-center text-blue-500 relative z-10">
                  <span>Try it now</span>
                  <FontAwesomeIcon icon={faCode} className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card p-6 rounded-xl cursor-pointer group hover:border-purple-500/50 transition-all relative overflow-hidden"
                onClick={() => router.push("/jsonParser")}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none"></div>
                
                <FontAwesomeIcon icon={faRocket} className="text-purple-500 text-3xl mb-4 group-hover:scale-110 transition-transform relative z-10" />
                <h3 className="text-white text-xl font-bold mb-2 group-hover:text-purple-500 transition-colors relative z-10">JSON Tools</h3>
                <p className="text-gray-400 mb-4 relative z-10">
                  Powerful JSON validation and formatting tools at your fingertips.
                </p>
                <div className="flex items-center text-purple-500 relative z-10">
                  <span>Try it now</span>
                  <FontAwesomeIcon icon={faRocket} className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card p-6 rounded-xl cursor-pointer group hover:border-blue-500/50 transition-all relative overflow-hidden"
                onClick={() => setLivemodal(true)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none"></div>
                
                <FontAwesomeIcon icon={faBolt} className="text-blue-500 text-3xl mb-4 group-hover:scale-110 transition-transform relative z-10" />
                <h3 className="text-white text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors relative z-10">Live Collaboration</h3>
                <p className="text-gray-400 mb-4 relative z-10">
                  Real-time coding sessions with team members anywhere in the world.
                </p>
                <div className="flex items-center text-blue-500 relative z-10">
                  <span>Try it now</span>
                  <FontAwesomeIcon icon={faBolt} className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
              Trusted by Developers
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="glass-card p-6 rounded-xl"
                >
                  <div className="flex items-center mb-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <h3 className="text-white font-bold">{testimonial.name}</h3>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">&quot;{testimonial.text}&quot;</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-black/30">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <h3 className="text-4xl font-bold gradient-text">10k+</h3>
                <p className="text-gray-400 mt-2">Active Users</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold gradient-text">1M+</h3>
                <p className="text-gray-400 mt-2">Lines of Code</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold gradient-text">50k+</h3>
                <p className="text-gray-400 mt-2">Collaborations</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold gradient-text">99.9%</h3>
                <p className="text-gray-400 mt-2">Uptime</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-8">
              Ready to Transform Your Development Workflow?
            </h2>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/monaco")}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-mono text-lg w-full md:w-auto"
              >
                Start Coding Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLivemodal(true)}
                className="px-8 py-4 glass-card text-blue-500 rounded-lg font-mono text-lg border border-blue-500/30 w-full md:w-auto"
              >
                Try Collaboration
              </motion.button>
            </div>
          </div>
        </section>

        <footer className="py-12 px-4 border-t border-white/10">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <Image
                  src={JuniorPNG}
                  alt="Junior"
                  width={80}
                  height={30}
                />
                <p className="text-gray-400">© 2024 Junior. All rights reserved.</p>
              </div>
              <div className="flex space-x-6">
                <FontAwesomeIcon icon={faGithub} className="text-gray-400 hover:text-white cursor-pointer text-xl" />
                <FontAwesomeIcon icon={faTwitter} className="text-gray-400 hover:text-white cursor-pointer text-xl" />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
