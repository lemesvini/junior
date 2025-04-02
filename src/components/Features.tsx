"use client";
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faRocket, faBolt } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

interface FeaturesProps {
  setLivemodal: (value: boolean) => void;
}

const Features = ({ setLivemodal }: FeaturesProps) => {
  const router = useRouter();

  return (
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
  );
};

export default Features; 