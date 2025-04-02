"use client";
import { motion } from 'framer-motion';
import { useRouter } from "next/navigation";

interface CTAProps {
  setLivemodal: (value: boolean) => void;
}

const CTA = ({ setLivemodal }: CTAProps) => {
  const router = useRouter();

  return (
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
  );
};

export default CTA; 