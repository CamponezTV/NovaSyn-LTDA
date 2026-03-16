import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
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

const Portfolio = () => {
  const { t } = useLanguage();

  const portfolioItems = [
    {
      title: t("portfolio.item1.title"),
      description: t("portfolio.item1.description"),
      image: "/IncidenteLogo.webp",
      link: "https://incidente.gg/",
      tags: [t("portfolio.item1.tag1"), t("portfolio.item1.tag2"), t("portfolio.item1.tag3")],
      inDevelopment: false,
    },
    {
      title: "Novabuild",
      description: t("portfolio.item2.description"),
      image: "/Novabuild.webp",
      link: "#",
      tags: [t("portfolio.item2.tag1"), t("portfolio.item2.tag2"), t("portfolio.item2.tag3")],
      inDevelopment: true,
    },
    {
      title: t("portfolio.item3.title"),
      description: t("portfolio.item3.description"),
      image: "/logoNovaSystem1.webp",
      link: "#",
      tags: [t("portfolio.item3.tag1"), t("portfolio.item3.tag2"), t("portfolio.item3.tag3")],
      inDevelopment: true,
    },
  ];

  return (
    <section id="portfolio" className="py-16 md:py-32 lg:py-48 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <motion.div 
          className="flex flex-col items-center max-w-3xl mx-auto mb-12 md:mb-20 space-y-6 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-[4rem] font-bold tracking-tighter text-foreground leading-tight">
            {t("portfolio.title")}
          </motion.h2>
          <motion.div variants={itemVariants} className="h-[1px] w-16 bg-gradient-to-r from-transparent via-primary/50 to-transparent dark:hidden"></motion.div>
          <motion.p variants={itemVariants} className="text-lg md:text-xl font-light text-muted-foreground">
            {t("portfolio.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {portfolioItems.map((item, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="glass-card group flex flex-col overflow-hidden h-full hover:border-primary/20 hover:shadow-glow transition-all duration-700"
            >
              <div className="aspect-[4/3] w-full overflow-hidden relative bg-white/[0.02] dark:bg-black/20 flex items-center justify-center p-8">
                {/* Subtle radial glow behind image */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(109,40,217,0.08)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {item.inDevelopment && (
                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-3 py-1 text-[10px] font-medium tracking-widest uppercase rounded-full bg-secondary/10 text-secondary border border-secondary/20 shadow-[0_0_15px_rgba(3,179,143,0.15)] backdrop-blur-md">
                      {t("portfolio.inDevelopment")}
                    </span>
                  </div>
                )}
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-3/4 max-h-[120px] object-contain transition-all duration-700 ease-out z-10 ${item.inDevelopment ? 'opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-70' : 'group-hover:scale-105 drop-shadow-2xl'}`}
                />
              </div>

              <div className="p-8 md:p-10 flex flex-col flex-grow justify-between border-t border-border/40 relative z-20 bg-background/50 backdrop-blur-md">
                <div className="space-y-4 mb-8">
                  <h3 className="text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {item.title}
                  </h3>
                  <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>

                <div className="space-y-8 mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 text-xs font-medium tracking-wide rounded-full bg-white/5 dark:bg-white/[0.03] text-muted-foreground border border-border/50 group-hover:border-primary/30 group-hover:text-foreground/80 transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {item.inDevelopment ? (
                    <Button variant="outline" className="w-full h-12 rounded-full cursor-not-allowed opacity-40 font-medium tracking-wide bg-transparent border-border" disabled>
                      {t("portfolio.comingSoon")}
                    </Button>
                  ) : (
                    <Button variant="outline" className="magnetic-button w-full h-12 rounded-full group/btn transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-glow font-medium tracking-wide bg-transparent border-border" asChild>
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                        {t("portfolio.viewProject")}
                        <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
