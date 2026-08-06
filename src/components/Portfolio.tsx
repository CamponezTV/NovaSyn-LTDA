import { useLanguage } from "@/contexts/LanguageContext";
import { ExternalLink } from "lucide-react";
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
      title: t("portfolio.item2.title"),
      description: t("portfolio.item2.description"),
      image: "/logo_quad_fundo_branco.webp",
      link: "https://sartoretto.novasyn.com.br/",
      tags: [t("portfolio.item2.tag1"), t("portfolio.item2.tag2"), t("portfolio.item2.tag3")],
      inDevelopment: false,
    },
    {
      title: t("portfolio.item3.title"),
      description: t("portfolio.item3.description"),
      image: "/logo-ocl.png",
      link: "https://ocladvogados.adv.br/",
      tags: [t("portfolio.item3.tag1"), t("portfolio.item3.tag2"), t("portfolio.item3.tag3")],
      inDevelopment: false,
    },
  ];

  return (
    <section id="portfolio" className="py-16 md:py-32 lg:py-48 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          className="flex flex-col items-center max-w-3xl mx-auto mb-14 md:mb-20 space-y-5 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants}>
            <span className="ns-label">Portfólio</span>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-[4rem] font-bold tracking-tighter text-foreground leading-tight font-display"
          >
            {t("portfolio.title")}
          </motion.h2>
          <motion.div variants={itemVariants}>
            <div className="ns-line w-16" />
          </motion.div>
          <motion.p variants={itemVariants} className="text-lg md:text-xl font-light text-muted-foreground">
            {t("portfolio.subtitle")}
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {portfolioItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group flex flex-col overflow-hidden h-full bg-card border border-border/40 transition-all duration-300 hover:border-primary/50 relative"
              style={{ clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)" }}
            >
              {/* Corner notch */}
              <div
                className="absolute top-0 right-0 w-[20px] h-[20px] bg-border/60 group-hover:bg-primary/60 transition-colors duration-300 z-20 pointer-events-none"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
              />

              {/* Image area */}
              <div className="aspect-[4/3] w-full overflow-hidden relative bg-[#0a0a0a] flex items-center justify-center p-8">
                {item.inDevelopment && (
                  <div className="absolute top-4 left-4 z-20">
                    <span
                      className="px-3 py-1 text-[9px] font-bold tracking-widest uppercase border border-primary/40 bg-primary/10 text-primary"
                      style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)" }}
                    >
                      {t("portfolio.inDevelopment")}
                    </span>
                  </div>
                )}

                {/* Hard offset glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(circle at center, rgba(224,64,251,0.08) 0%, transparent 70%)" }}
                />

                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-3/4 max-h-[110px] object-contain transition-all duration-500 ease-out z-10 ${item.inDevelopment
                    ? "opacity-25 grayscale"
                    : "group-hover:scale-105"
                    }`}
                  style={!item.inDevelopment ? {
                    filter: "drop-shadow(0 0 0px transparent)",
                  } : undefined}
                />
              </div>

              {/* Content */}
              <div className="p-7 md:p-8 flex flex-col flex-grow justify-between border-t border-border/30">
                <div className="space-y-3 mb-7">
                  <h3 className="text-xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300 font-display">
                    {item.title}
                  </h3>
                  <p className="text-sm font-light leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>

                <div className="space-y-5 mt-auto">
                  {/* Tags — sharp */}
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2.5 py-1 text-[11px] font-medium tracking-wide bg-white/[0.04] text-muted-foreground border border-border/40 group-hover:border-primary/25 transition-colors duration-300"
                        style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action */}
                  {item.inDevelopment ? (
                    <button
                      disabled
                      className="w-full h-10 border border-border/30 text-muted-foreground/30 text-sm font-medium cursor-not-allowed"
                    >
                      {t("portfolio.comingSoon")}
                    </button>
                  ) : (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="magnetic-button ns-btn-outline w-full h-10 text-sm font-bold tracking-wide inline-flex items-center justify-center gap-2"
                    >
                      {t("portfolio.viewProject")}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-primary"
                style={{ transform: "skewX(-15deg)", transformOrigin: "left" }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
