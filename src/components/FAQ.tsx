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
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 18,
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
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(224,64,251,0.04) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          className="flex flex-col items-center max-w-3xl mx-auto mb-16 md:mb-20 space-y-5 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants}>
            <span className="ns-label">FAQ</span>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-[4.5rem] font-bold tracking-tighter text-foreground leading-[1.1] font-display"
          >
            {t("faq.title")}
          </motion.h2>
          <motion.div variants={itemVariants}>
            <div className="ns-line w-16" />
          </motion.div>
          <motion.p variants={itemVariants} className="text-lg md:text-xl font-light text-muted-foreground">
            {t("faq.subtitle")}
          </motion.p>
        </motion.div>

        {/* Accordion */}
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
                  className="bg-card px-6 md:px-8 py-2 border border-border/40 transition-all duration-300 hover:border-primary/40 [&[data-state=open]]:border-primary/60 [&[data-state=open]]:bg-card"
                  style={{ clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)" }}
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4 text-base md:text-lg font-medium tracking-tight text-foreground transition-colors group font-display">
                    <span className="group-hover:translate-x-1 group-hover:text-primary transition-all duration-300">
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 text-[15px] font-light leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="text-center mt-16 md:mt-20 flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", delay: 0.4 }}
        >
          <p className="text-muted-foreground font-light text-base">
            {t("faq.cta")}
          </p>
          <a
            href="#contato"
            className="magnetic-button ns-btn-primary h-14 px-10 text-sm font-bold tracking-wide inline-flex items-center gap-3"
          >
            {t("faq.contactLink")}
            <MessageCircle className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
