"use client";
import { motion } from 'framer-motion';
import { useRouter } from "next/navigation";
import TerminalText from "./Terminal";

interface HeroProps {
  setLivemodal: (value: boolean) => void;
}

const Hero = ({ setLivemodal }: HeroProps) => {
  const router = useRouter();

  return (
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
            A powerful open-source platform {'that\'s'} completely free, featuring collaborative coding, real-time pair programming, and JSON tools for everyone to use and contribute.
          </p>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/monaco")}
              className="cursor-pointer px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-mono"
            >
              Start Coding
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLivemodal(true)}
              className="cursor-pointer px-8 py-3 glass-card text-blue-500 rounded-lg font-mono border border-blue-500/30"
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
  );
};

export default Hero; 