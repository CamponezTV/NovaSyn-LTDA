import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Logo3D from "./Logo3D";
import novasynLogoQuad from "@/assets/logos/logo_quad_fundo_branco.png";

const Hero = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const { scrollY } = useScroll();

  // Parallax transforms based on scroll behavior
  const textY = useTransform(scrollY, [0, 1000], [0, 200]);
  const logoY = useTransform(scrollY, [0, 1000], [0, -100]);
  const opacityFade = useTransform(scrollY, [0, 800], [1, 0]);

  useEffect(() => {
    setIsLoaded(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Framer motion variants configuration
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2, // Gives time to avoid initial flash
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        mass: 1,
      },
    },
  };

  return (
    <>
      <section 
        className={`hero-section relative overflow-hidden bg-background min-h-screen transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} 
        aria-label="Seção principal"
      >
        {/* Premium Ethereal Background with Brand Colors - Hidden in Dark Mode */}
        <div className="absolute inset-0 bg-background overflow-hidden flex items-center justify-center pointer-events-none dark:hidden">
          {/* Subtle central glow - secondary (green) and primary (purple) */}
          <div className="absolute top-[20%] w-[800px] h-[800px] bg-secondary/[0.03] rounded-full blur-[120px] animate-pulse delay-700"></div>
          {/* Top subtle light leak - primary (purple) */}
          <div className="absolute -top-[20%] left-[20%] w-[600px] h-[400px] bg-primary/[0.05] rounded-[100%] blur-[120px] transform -rotate-12"></div>
        </div>

        <motion.div 
          className="container mx-auto px-6 relative z-10 w-full flex items-center justify-center min-h-screen"
          style={{ opacity: isMobile ? 1 : opacityFade }}
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          <div className="max-w-7xl w-full pt-16 pb-8 md:pt-40 md:pb-24 flex items-center h-full">
            {/* Main content with massive typography and negative space */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 lg:gap-8 items-center w-full">
              
              {/* Left side - Text (Spans 7 columns on large screens) */}
              <motion.div 
                className="col-span-1 lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 lg:space-y-10 order-2 lg:order-1"
                style={{ y: isMobile ? 0 : textY }}
              >
                <div className="space-y-4 lg:space-y-6 overflow-visible w-full">
                  <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] tracking-tighter font-extrabold text-foreground leading-[1.05]">
                    {t("hero.title")}
                  </motion.h1>
                  
                  <motion.div variants={itemVariants} className="h-[1px] w-24 bg-gradient-to-r from-primary/50 to-transparent mx-auto lg:mx-0"></motion.div>
                  
                  <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl md:text-5xl lg:text-[3.5rem] font-semibold tracking-tight text-foreground/80 leading-[1.2]">
                    {t("hero.titleHighlight")}
                  </motion.h2>
                </div>

                <motion.p variants={itemVariants} className="text-base md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl text-balance">
                  {t("hero.subtitle")}
                </motion.p>

                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4 lg:pt-8 w-full justify-center lg:justify-start">
                  <Button 
                    size="lg" 
                    className="magnetic-button relative group h-12 lg:h-14 px-6 lg:px-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-glow transition-all font-medium text-base lg:text-lg overflow-hidden border border-transparent dark:border-white/10"
                  >
                    <a href="#contato" className="flex items-center gap-3 relative z-10">
                      {t("hero.cta")}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                    {/* Inner subtle glow ray */}
                    <div className="absolute inset-0 bg-white/20 dark:bg-black/10 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500 rounded-full"></div>
                  </Button>
                  
                  <Button 
                    asChild 
                    variant="outline" 
                    size="lg" 
                    className="magnetic-button h-12 lg:h-14 px-6 lg:px-8 rounded-full backdrop-blur-md bg-transparent border-border hover:bg-secondary/10 hover:text-secondary hover:border-secondary/30 transition-all font-medium text-base lg:text-lg"
                  >
                    <a href="#portfolio" className="flex items-center text-foreground/80 hover:text-foreground">
                      {t("nav.portfolio")}
                    </a>
                  </Button>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6 pt-6 lg:pt-12 border-t border-border/50 lg:border-t-0 w-full lg:w-auto">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em]">{t("hero.partners")}</span>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:scale-110 hover:border-primary/50 transition-transform overflow-hidden p-1">
                      <img src="/IncidenteLogo.webp" alt="Xmetal" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:scale-110 hover:border-secondary/50 transition-transform overflow-hidden p-1">
                      <img src={novasynLogoQuad} alt="NovaSyn" className="w-full h-full object-contain rounded-full" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right side - 3D Logo (Spans 5 columns) */}
              <motion.div 
                variants={itemVariants} 
                className="col-span-1 lg:col-span-5 flex justify-center items-center h-[260px] md:h-[400px] lg:h-[600px] w-full relative order-1 lg:order-2"
                style={{ y: isMobile ? 0 : logoY }}
              >
                <div className="relative w-full h-full animate-drift">
                  {/* Subtle backdrop glow behind the 3D element (Light mode only) */}
                  <div className="absolute inset-0 bg-primary/[0.03] rounded-full blur-[100px] scale-90 dark:hidden"></div>
                  <Logo3D />
                </div>
              </motion.div>
              
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Hero;
