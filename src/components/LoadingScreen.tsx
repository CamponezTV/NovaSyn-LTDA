import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoNoBg from "@/assets/logos/Logo-x-bg.png";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const intervalTime = 16;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const raw = currentStep / steps;
      const eased = 1 - Math.pow(1 - raw, 2);
      setProgress(Math.min(eased * 100, 100));
      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => onLoadingComplete(), 300);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#080808] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(8px)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Diagonal magenta scan line */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          background:
            "repeating-linear-gradient(135deg, transparent 0px, transparent 60px, #E040FB 60px, #E040FB 61px)",
        }}
      />

      {/* Center */}
      <div className="relative z-10 flex flex-col items-center gap-10">
        {/* Logo with hard drop shadow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.7, type: "spring", stiffness: 80, damping: 15 }}
        >
          <img
            src={logoNoBg}
            alt="NovaSyn"
            className="w-16 h-16 md:w-20 md:h-20 object-contain"
            style={{
              filter: "drop-shadow(0 0 25px rgba(224, 64, 251, 0.45))",
            }}
          />
        </motion.div>

        {/* Progress */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span className="text-[10px] font-bold tracking-[0.4em] text-white/25 font-mono tabular-nums">
            {Math.floor(progress).toString().padStart(3, "0")}%
          </span>

          {/* Sharp progress bar — no rounding */}
          <div className="w-32 md:w-44 h-[2px] bg-white/[0.06]">
            <motion.div
              className="h-full"
              style={{ background: "#E040FB" }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.05 }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
