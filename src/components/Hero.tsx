import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Logo3D from "./Logo3D";

const Hero = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const { scrollY } = useScroll();

  const textY = useTransform(scrollY, [0, 1000], [0, 160]);
  const logoY = useTransform(scrollY, [0, 1000], [0, -80]);
  const opacityFade = useTransform(scrollY, [0, 700], [1, 0]);

  useEffect(() => {
    setIsLoaded(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.10, delayChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: {
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: { type: "spring", stiffness: 80, damping: 18 },
    },
  };

  return (
    <section
      className={`hero-section relative overflow-hidden bg-background transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"
        }`}
      aria-label="Seção principal"
    >
      {/* ── Diagonal grid overlay — like the logo geometry ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top radial glow */}
        <div
          className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[1000px] h-[700px]"
          style={{
            background: "radial-gradient(ellipse at center, rgba(224,64,251,0.14) 0%, transparent 62%)",
          }}
        />
        {/* Diagonal line accents — mimicking the N slashes */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#E040FB 1px, transparent 1px), linear-gradient(90deg, #E040FB 1px, transparent 1px)",
            backgroundSize: "90px 90px",
          }}
        />
      </div>

      <motion.div
        className="container mx-auto px-6 relative z-10 w-full flex items-center justify-center min-h-screen"
        style={{ opacity: isMobile ? 1 : opacityFade }}
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        <div className="max-w-7xl w-full pt-20 pb-10 md:pt-40 md:pb-24 flex items-center h-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 lg:gap-8 items-center w-full">

            {/* ── Left: Text content ── */}
            <motion.div
              className="col-span-1 lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 lg:space-y-10 order-2 lg:order-1"
              style={{ y: isMobile ? 0 : textY }}
            >

              <div className="space-y-4 lg:space-y-5 overflow-visible w-full">
                <motion.h1
                  variants={itemVariants}
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tighter font-extrabold text-foreground leading-[1.0] font-display"
                >
                  {t("hero.title")}
                </motion.h1>

                {/* Sharp skewed divider */}
                <motion.div variants={itemVariants}>
                  <div className="ns-line-left mx-auto lg:mx-0" />
                </motion.div>

                <motion.h2
                  variants={itemVariants}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] font-semibold tracking-tight leading-[1.15]"
                >
                  <span className="text-foreground/65">{t("hero.titleHighlight")}</span>
                </motion.h2>
              </div>

              <motion.p
                variants={itemVariants}
                className="text-base md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl text-balance"
              >
                {t("hero.subtitle")}
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 sm:gap-5 pt-2 lg:pt-4 w-full justify-center lg:justify-start"
              >
                {/* Primary CTA — full angular clip-path */}
                <a
                  href="#contato"
                  className="magnetic-button ns-btn-primary h-12 lg:h-14 px-8 lg:px-10 text-sm font-bold tracking-wide inline-flex items-center gap-3"
                >
                  {t("hero.cta")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Secondary CTA — outline version */}
                <a
                  href="#portfolio"
                  className="magnetic-button ns-btn-outline h-12 lg:h-14 px-8 lg:px-10 text-sm font-bold tracking-wide inline-flex items-center justify-center"
                >
                  {t("nav.portfolio")}
                </a>
              </motion.div>

              {/* Partners strip */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6 pt-4 lg:pt-8 border-t border-border/30 w-full lg:w-auto"
              >
                <span className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-[0.25em]">
                  {t("hero.partners")}
                </span>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 border border-border/50 flex items-center justify-center hover:border-primary/50 transition-all overflow-hidden p-1"
                    style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)" }}
                  >
                    <img src="/IncidenteLogo.webp" alt="Incidente" className="w-full h-full object-cover" />
                  </div>
                  <div
                    className="w-9 h-9 border border-border/50 flex items-center justify-center hover:border-primary/50 transition-all overflow-hidden p-1"
                    style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)" }}
                  >
                    <img src="/logo_quad_fundo_branco.webp" alt="Sartoretto" className="w-full h-full object-cover" />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* ── Right: Logo 3D ── */}
            <motion.div
              variants={itemVariants}
              className="col-span-1 lg:col-span-5 flex justify-center items-center h-[260px] md:h-[380px] lg:h-[580px] w-full relative order-1 lg:order-2"
              style={{ y: isMobile ? 0 : logoY }}
            >
              <div className="relative w-full h-full animate-drift">
                {/* Hard offset magenta shadow behind logo area */}
                <div
                  className="absolute inset-4 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle, rgba(224,64,251,0.12) 0%, transparent 70%)",
                  }}
                />
                <Logo3D />
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
