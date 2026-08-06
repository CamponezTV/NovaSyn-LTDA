import { Globe, Bot, BarChart3, Package } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, Variants } from "framer-motion";

const services = [
  { icon: Globe, titleKey: "services.web.title", descriptionKey: "services.web.description" },
  { icon: Bot, titleKey: "services.ai.title", descriptionKey: "services.ai.description" },
  { icon: BarChart3, titleKey: "services.management.title", descriptionKey: "services.management.description" },
  { icon: Package, titleKey: "services.software.title", descriptionKey: "services.software.description" },
];

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

const Services = () => {
  const { t } = useLanguage();

  return (
    <section id="servicos" className="py-16 md:py-32 lg:py-48 bg-background relative overflow-hidden">

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          className="flex flex-col items-center max-w-3xl mx-auto mb-16 md:mb-24 space-y-5 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants}>
            <span className="ns-label">O que fazemos</span>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-[4rem] font-bold tracking-tighter text-foreground leading-tight font-display"
          >
            {t("services.title")}
          </motion.h2>
          <motion.div variants={itemVariants}>
            <div className="ns-line w-16" />
          </motion.div>
          <motion.p variants={itemVariants} className="text-lg md:text-xl font-light text-muted-foreground">
            {t("services.subtitle")}
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative flex flex-col justify-between p-8 md:p-10 h-full bg-card border border-border/40 transition-all duration-300 overflow-hidden hover:border-primary/50"
              style={{ clipPath: "polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 0 100%)" }}
            >
              {/* Corner triangle — magenta notch */}
              <div
                className="absolute top-0 right-0 w-[22px] h-[22px] bg-border/60 group-hover:bg-primary/70 transition-colors duration-300 pointer-events-none"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
              />

              {/* Hover offset shadow via pseudo-approach */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, rgba(224,64,251,0.04) 0%, transparent 60%)",
                }}
              />

              <div className="space-y-7 relative z-10">
                {/* Icon box — angular */}
                <div
                  className="w-12 h-12 border border-border/60 bg-background flex items-center justify-center group-hover:border-primary/60 transition-all duration-300"
                  style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)" }}
                >
                  <service.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl lg:text-2xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300 font-display">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-[15px] font-light leading-relaxed text-muted-foreground/90">
                    {t(service.descriptionKey)}
                  </p>
                </div>
              </div>

              {/* Bottom-left magenta slash on hover */}
              <div
                className="absolute bottom-0 left-0 w-0 group-hover:w-full transition-all duration-500 h-[2px] bg-primary"
                style={{ transform: "skewX(-20deg)", transformOrigin: "left" }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
