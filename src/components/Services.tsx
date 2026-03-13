import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Bot, BarChart3, Package } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, Variants } from "framer-motion";

const services = [
  {
    icon: Globe,
    titleKey: "services.web.title",
    descriptionKey: "services.web.description",
  },
  {
    icon: Bot,
    titleKey: "services.ai.title",
    descriptionKey: "services.ai.description",
  },
  {
    icon: BarChart3,
    titleKey: "services.management.title",
    descriptionKey: "services.management.description",
  },
  {
    icon: Package,
    titleKey: "services.software.title",
    descriptionKey: "services.software.description",
  },
];

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

const Services = () => {
  const { t } = useLanguage();

  return (
    <section id="servicos" className="py-16 md:py-32 lg:py-48 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <motion.div 
          className="flex flex-col items-center max-w-3xl mx-auto mb-12 md:mb-24 space-y-6 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-[4rem] font-bold tracking-tighter text-foreground leading-tight">
            {t("services.title")}
          </motion.h2>
          <motion.div variants={itemVariants} className="h-[1px] w-16 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></motion.div>
          <motion.p variants={itemVariants} className="text-lg md:text-xl font-light text-muted-foreground">
            {t("services.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="glass-card group flex flex-col justify-between p-8 md:p-12 h-full hover:border-primary/20 hover:shadow-glow"
            >
              <div className="space-y-8">
                <div className="w-14 h-14 rounded-full bg-primary/5 dark:bg-primary/[0.05] border border-border/50 group-hover:border-primary/30 flex items-center justify-center shadow-soft group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(109,40,217,0.2)] transition-all duration-500">
                  <service.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-base font-light leading-relaxed text-muted-foreground/90">
                    {t(service.descriptionKey)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
