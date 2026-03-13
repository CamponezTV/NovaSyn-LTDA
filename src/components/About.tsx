import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
    },
  },
};

const About = () => {
  const { t } = useLanguage();

  const benefits = [
    t("about.benefit1"),
    t("about.benefit2"),
    t("about.benefit3"),
    t("about.benefit4"),
    t("about.benefit5"),
    t("about.benefit6"),
  ];

  return (
    <section id="sobre" className="py-16 md:py-32 lg:py-48 bg-background relative overflow-hidden">
      {/* Subtle glowing orbs */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none dark:hidden"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Text Content - spans 6 cols */}
          <motion.div 
            className="col-span-1 lg:col-span-6 space-y-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="space-y-4">
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-foreground leading-[1.1]">
                {t("about.title")}
              </motion.h2>
              <motion.div variants={itemVariants} className="h-[1px] w-16 bg-gradient-to-r from-primary/50 to-transparent"></motion.div>
              <motion.p variants={itemVariants} className="text-xl md:text-2xl font-light text-muted-foreground leading-relaxed">
                {t("about.subtitle")}
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="space-y-6 text-[15px] md:text-base font-light text-muted-foreground/80 leading-loose">
              <p>{t("about.description1")}</p>
              <p>{t("about.description2")}</p>
            </motion.div>
            
            <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants} 
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 dark:bg-white/[0.02] border border-border/40 transition-all duration-300 hover:border-primary/20 hover:shadow-glow group"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" strokeWidth={2} />
                  <span className="text-sm font-medium text-foreground/80">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="pt-8">
              <Button 
                size="lg" 
                className="magnetic-button relative group h-14 px-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-glow transition-all font-medium border border-transparent dark:border-white/10"
                asChild
              >
                <a href="#contato" className="flex items-center gap-3 relative z-10 w-full justify-center">
                  <span className="relative z-10">{t("about.cta")}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                  <div className="absolute inset-0 bg-white/20 dark:bg-black/10 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500 rounded-full"></div>
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats Bento Box - spans 6 cols */}
          <motion.div 
            className="col-span-1 lg:col-span-6 relative h-full"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.3 }}
          >
            <div className="glass-card w-full h-full min-h-[350px] md:aspect-[4/3] lg:aspect-square flex flex-col justify-center p-8 md:p-14 lg:p-16 relative overflow-hidden group hover:border-secondary/20 hover:shadow-[0_0_60px_rgba(3,179,143,0.1)] transition-all duration-700">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent dark:from-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <div className="space-y-8 md:space-y-12 lg:space-y-16 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-border/40 pb-6 md:pb-8 gap-2 md:gap-4">
                  <p className="text-5xl md:text-6xl lg:text-[5rem] font-bold text-foreground tracking-tighter leading-none group-hover:text-secondary transition-colors duration-500">10+</p>
                  <p className="text-[13px] md:text-sm lg:text-base text-muted-foreground uppercase tracking-widest font-medium md:mb-2">{t("about.stat1")}</p>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-border/40 pb-6 md:pb-8 gap-2 md:gap-4">
                  <p className="text-5xl md:text-6xl lg:text-[5rem] font-bold text-foreground tracking-tighter leading-none group-hover:text-secondary transition-colors duration-500 delay-100">98%</p>
                  <p className="text-[13px] md:text-sm lg:text-base text-muted-foreground uppercase tracking-widest font-medium md:mb-2">{t("about.stat2")}</p>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2 md:gap-4">
                  <p className="text-5xl md:text-6xl lg:text-[5rem] font-bold tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/40 group-hover:from-secondary group-hover:to-secondary/40 transition-all duration-500 delay-200">24/7</p>
                  <p className="text-[13px] md:text-sm lg:text-base text-muted-foreground uppercase tracking-widest font-medium md:mb-2">{t("about.stat3")}</p>
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default About;
