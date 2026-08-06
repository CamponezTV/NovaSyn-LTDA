import { useLanguage } from "@/contexts/LanguageContext";
import { motion, Variants } from "framer-motion";
import { Quote } from "lucide-react";
import cereawImg from "@/assets/testimonials/LMK09623 (1).webp";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

const Testimonials = () => {
  const { t } = useLanguage();

  const testimonials = [
    {
      quote: t("testimonials.item1.quote"),
      author: t("testimonials.item1.author"),
      project: t("testimonials.item1.project"),
      image: cereawImg,
      link: "https://incidente.gg/",
    }
  ];

  return (
    <section id="depoimentos" className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(224,64,251,0.04) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div 
          className="flex flex-col items-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-4 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span variants={itemVariants} className="text-[10px] font-semibold text-primary/80 uppercase tracking-[0.25em]">
            Depoimentos
          </motion.span>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-foreground leading-tight font-display">
            {t("testimonials.title")}
          </motion.h2>
          <motion.div variants={itemVariants} className="h-[1px] w-16 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></motion.div>
          <motion.p variants={itemVariants} className="text-base md:text-lg font-light text-muted-foreground max-w-2xl">
            {t("testimonials.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div 
          className="max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {testimonials.map((item, index) => (
            <motion.a 
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className="block relative rounded-2xl border border-border/40 bg-card p-6 md:p-10 overflow-hidden group hover:border-primary/35 transition-all duration-700 no-underline"
            >
              <div className="absolute top-6 left-6 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity duration-700">
                <Quote size={60} className="text-primary rotate-180" />
              </div>

              <div className="relative z-10 space-y-6 md:space-y-8">
                <p className="text-base md:text-lg lg:text-xl font-light leading-relaxed text-foreground italic">
                  "{item.quote}"
                </p>
                
                <div className="flex items-center gap-4 border-t border-border/40 pt-6 md:pt-8">
                  {item.image ? (
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-border/50 group-hover:scale-110 transition-transform duration-700">
                      <img src={item.image} alt={item.author} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform duration-700">
                      <span className="text-xl font-bold text-primary">{item.author.charAt(0)}</span>
                    </div>
                  )}
                  <div className="space-y-0.5">
                    <h4 className="text-lg font-semibold text-foreground">{item.author}</h4>
                    <p className="text-xs tracking-widest uppercase text-muted-foreground font-medium">{item.project}</p>
                  </div>
                </div>
              </div>

              {/* Inner hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at top left, rgba(224,64,251,0.06) 0%, transparent 60%)" }}
              />
              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                style={{ background: "linear-gradient(90deg, #E040FB, transparent)" }}
              />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
