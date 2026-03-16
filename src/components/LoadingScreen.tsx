import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import novasynLogo from "@/assets/logos/logo_1.webp";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress over 2.5 seconds
    const duration = 2500;
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          onLoadingComplete();
        }, 400); // Wait a bit at 100% before triggering exit
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/95 backdrop-blur-2xl"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-col items-center space-y-8 absolute top-[45%] -translate-y-1/2">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 50 }}
        >
          <img
            src={novasynLogo}
            alt="NovaSyn"
            className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-[0_0_20px_rgba(109,40,217,0.3)] opacity-90"
          />
        </motion.div>
        
        <motion.div 
          className="flex flex-col items-center space-y-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {/* Progress number */}
          <div className="text-sm font-light tracking-[0.2em] text-muted-foreground tabular-nums">
            {Math.floor(progress).toString().padStart(3, '0')}%
          </div>
          
          {/* Progress bar container */}
          <div className="w-32 md:w-48 h-[2px] bg-white/10 dark:bg-white/[0.05] rounded-full overflow-hidden">
            {/* Progress fill line */}
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </div>
        </motion.div>
      </div>

      {/* Decorative ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none"></div>
    </motion.div>
  );
};

export default LoadingScreen;
