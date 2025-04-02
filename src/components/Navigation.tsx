"use client";
import { motion } from 'framer-motion';
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import JuniorPNG from "../../public/JUNIOR.png";

interface NavigationProps {
  setLivemodal: (value: boolean) => void;
}

const Navigation = ({ setLivemodal }: NavigationProps) => {
  const router = useRouter();

  return (
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
                  className="cursor-pointer px-4 py-2 text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  Editor
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/jsonParser")}
                  className="cursor-pointer px-4 py-2 text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  JSON Parser
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setLivemodal(true)}
                  className="cursor-pointer px-4 py-2 text-white hover:bg-white/10 rounded-full transition-colors"
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
              className="hidden md:flex px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-mono items-center space-x-2 hover:shadow-lg hover:shadow-blue-500/20 transition-shadow cursor-pointer"
            >
              <span>Start Coding</span>
              <FontAwesomeIcon icon={faCode} className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation; 