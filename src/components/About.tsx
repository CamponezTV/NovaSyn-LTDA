import { CheckCircle2, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { type: "spring", stiffness: 80, damping: 18 },
  },
};

const About = () => {
  const { t } = useLanguage();

  const benefits = [
    t("about.benefit1"), t("about.benefit2"), t("about.benefit3"),
    t("about.benefit4"), t("about.benefit5"), t("about.benefit6"),
  ];

  return (
    <section id="sobre" className="py-16 md:py-32 lg:py-48 bg-background relative overflow-hidden">


      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* ── Text Content ── */}
          <motion.div
            className="col-span-1 lg:col-span-6 space-y-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="space-y-4">
              <motion.div variants={itemVariants}>
                <span className="ns-label">Sobre nós</span>
              </motion.div>
              <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tighter text-foreground leading-[1.05] font-display"
              >
                {t("about.title")}
              </motion.h2>
              <motion.div variants={itemVariants}>
                <div className="ns-line-left" />
              </motion.div>
              <motion.p variants={itemVariants} className="text-xl md:text-2xl font-light text-muted-foreground leading-relaxed">
                {t("about.subtitle")}
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="space-y-5 text-base font-light text-muted-foreground/80 leading-loose">
              <p>{t("about.description1")}</p>
              <p>{t("about.description2")}</p>
            </motion.div>

            {/* Benefits grid — sharp chips */}
            <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="ns-chip flex items-center gap-3 p-4 bg-card border border-border/40 group transition-all duration-300 hover:border-primary/40"
                  style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)" }}
                >
                  {/* Diamond bullet instead of rounded circle */}
                  <div
                    className="w-3 h-3 bg-primary flex-shrink-0 group-hover:scale-110 transition-transform"
                    style={{ transform: "rotate(45deg)", flexShrink: 0 }}
                  />
                  <span className="text-sm font-medium text-foreground/75">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <a
                href="#contato"
                className="magnetic-button ns-btn-primary h-12 px-8 text-sm font-bold tracking-wide inline-flex items-center gap-3"
              >
                {t("about.cta")}
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>

          {/* ── Stats Card — angular ── */}
          <motion.div
            className="col-span-1 lg:col-span-6 relative h-full"
            initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.15 }}
          >
            {/* Hard magenta offset shadow beneath the card */}
            <div
              className="absolute inset-0 translate-x-[6px] translate-y-[6px] bg-primary/30 pointer-events-none"
              style={{ clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)" }}
            />

            <div
              className="relative w-full h-full min-h-[360px] md:aspect-[4/3] lg:aspect-square flex flex-col justify-center p-8 md:p-14 lg:p-16 bg-card border border-border/50 group transition-all duration-500 hover:border-primary/50"
              style={{ clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)" }}
            >
              {/* Corner notch accent */}
              <div className="absolute top-0 right-0 w-6 h-6 bg-primary/70 pointer-events-none"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
              />

              <div className="space-y-10 md:space-y-14 relative z-10">
                {[
                  { value: "10+", label: t("about.stat1") },
                  { value: "98%", label: t("about.stat2") },
                  { value: "24/7", label: t("about.stat3") },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className={`flex flex-col md:flex-row justify-between items-start md:items-end gap-2 md:gap-4 ${i < 2 ? "border-b border-border/30 pb-8 md:pb-10" : ""
                      }`}
                  >
                    <p
                      className="text-5xl md:text-6xl lg:text-[5rem] font-bold text-foreground tracking-tighter leading-none group-hover:text-primary transition-colors duration-500 font-display"
                      style={{ transitionDelay: `${i * 80}ms` }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-[11px] text-muted-foreground uppercase tracking-[0.2em] font-medium md:mb-2 max-w-[140px] text-right">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
