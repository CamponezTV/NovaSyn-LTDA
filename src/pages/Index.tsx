import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Products from "@/components/Products";
import Portfolio from "@/components/Portfolio";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Prevent scroll while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loading-screen" onLoadingComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <motion.div 
        className="min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <Header />
        <main id="main-content" role="main">
          <Hero />
          <Services />
          <About />
          <Portfolio />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </>
  );
};

export default Index;
