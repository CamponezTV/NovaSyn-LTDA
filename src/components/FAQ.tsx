import { useLanguage } from "@/contexts/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle } from "lucide-react";
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

const FAQ = () => {
  const { t } = useLanguage();

  const faqItems = [
    {
      question: t("faq.q1.question"),
      answer: t("faq.q1.answer"),
    },
    {
      question: t("faq.q2.question"),
      answer: t("faq.q2.answer"),
    },
    {
      question: t("faq.q3.question"),
      answer: t("faq.q3.answer"),
    },
    {
      question: t("faq.q4.question"),
      answer: t("faq.q4.answer"),
    },
    {
      question: t("faq.q5.question"),
      answer: t("faq.q5.answer"),
    },
    {
      question: t("faq.q6.question"),
      answer: t("faq.q6.answer"),
    },
    {
      question: t("faq.q7.question"),
      answer: t("faq.q7.answer"),
    },
    {
      question: t("faq.q8.question"),
      answer: t("faq.q8.answer"),
    },
  ];

  return (
    <section id="faq" className="py-16 md:py-32 lg:py-48 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.03] dark:bg-white/[0.02] rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div 
          className="flex flex-col items-center max-w-3xl mx-auto mb-16 md:mb-20 space-y-6 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-[4.5rem] font-bold tracking-tighter text-foreground leading-[1.1]">
            {t("faq.title")}
          </motion.h2>
          <motion.div variants={itemVariants} className="h-[1px] w-16 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></motion.div>
          <motion.p variants={itemVariants} className="text-lg md:text-xl font-light text-muted-foreground">
            {t("faq.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AccordionItem 
                  value={`item-${index}`}
                  className="glass-card px-6 md:px-8 py-2 md:py-4 transition-all duration-300 border-border/40 hover:border-primary/30 hover:shadow-glow [&[data-state=open]]:border-primary/50 [&[data-state=open]]:bg-primary/[0.03]"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4 text-base md:text-lg font-medium tracking-tight text-foreground transition-colors group">
                    <span className="group-hover:translate-x-1 group-hover:text-primary transition-all duration-300">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 text-[15px] font-light leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <motion.div 
          className="text-center mt-16 md:mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", delay: 0.6 }}
        >
          <p className="text-muted-foreground mb-4 font-light">
            {t("faq.cta")}
          </p>
          <a 
            href="#contato" 
            className="magnetic-button inline-flex items-center gap-2 text-primary-foreground font-medium transition-colors group tracking-wide bg-primary px-8 py-4 rounded-full hover:bg-primary/90 hover:shadow-glow"
          >
            {t("faq.contactLink")}
            <MessageCircle className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
