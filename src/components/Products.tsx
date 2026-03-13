import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Bot, MessageSquare, ShoppingCart, ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";

//aqui é onde eu paro de ser low budget né mano, absurdo... -guisso
const products = [
  {
    icon: MessageSquare,
    titleKey: "WhatsApp Copilot",
    descriptionKey: "Automação inteligente para vendas no WhatsApp 24/7",
    link: "/whatsapp",
  },
  {
    icon: Bot,
    titleKey: "AI Assistant",
    descriptionKey: "Assistente de IA personalizado para sua empresa",
    link: "#",
  },
  {
    icon: ShoppingCart,
    titleKey: "E-commerce Manager",
    descriptionKey: "Sistema completo de gestão para lojas online",
    link: "#",
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

const Products = () => {
  const { t } = useLanguage();

  return (
    <section id="produtos" className="py-16 md:py-32 lg:py-48 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50 dark:hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/[0.03] rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div 
          className="flex flex-col items-center max-w-3xl mx-auto mb-12 md:mb-24 space-y-6 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-[4.5rem] font-bold tracking-tighter text-foreground leading-[1.1]">
            {t("products.title")}
          </motion.h2>
          <motion.div variants={itemVariants} className="h-[1px] w-16 bg-gradient-to-r from-transparent via-secondary/50 to-transparent"></motion.div>
          <motion.p variants={itemVariants} className="text-lg md:text-xl font-light text-muted-foreground">
            {t("products.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {products.map((product, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="glass-card group flex flex-col justify-between p-8 md:p-12 h-full hover:border-secondary/20 hover:shadow-[0_0_40px_rgba(3,179,143,0.1)] transition-all duration-700"
            >
              <div className="space-y-8">
                {/* Icon wrapper */}
                <div className="w-16 h-16 rounded-2xl bg-secondary/5 dark:bg-secondary/[0.05] border border-border/50 group-hover:border-secondary/30 flex items-center justify-center shadow-soft group-hover:shadow-[0_0_20px_rgba(3,179,143,0.2)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative z-10">
                  <product.icon className="w-8 h-8 text-secondary group-hover:text-secondary" strokeWidth={1.5} />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold tracking-tight text-foreground group-hover:text-secondary transition-colors duration-300">
                    {product.titleKey}
                  </h3>
                  <p className="text-[15px] font-light leading-relaxed text-muted-foreground/90">
                    {product.descriptionKey}
                  </p>
                </div>
              </div>
              
              <div className="mt-12 pt-6 border-t border-border/40">
                <Button variant="link" className="p-0 h-auto font-medium tracking-wide text-foreground group/btn transition-smooth" asChild>
                  {product.link.startsWith('/') ? (
                    <a href={product.link} className="flex items-center group-hover:text-secondary transition-colors">
                      Saiba mais
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                    </a>
                  ) : (
                    <a href={product.link} target="_blank" rel="noopener noreferrer" className="flex items-center group-hover:text-secondary transition-colors">
                      Saiba mais
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                    </a>
                  )}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
