import { createContext, useContext, useState, ReactNode } from "react";

type Language = "pt" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  pt: {
    // Header
    "nav.services": "Serviços",
    "nav.about": "Sobre",
    "nav.products": "Produtos",
    "nav.portfolio": "Portfólio",
    "nav.contact": "Contato",
    "nav.cta": "Fale Conosco",
    
    // Hero
    "hero.badge": "Soluções em Tecnologia e IA",
    "hero.title": "Transforme seu negócio com",
    "hero.titleHighlight": "tecnologia inteligente",
    "hero.subtitle": "Desenvolvemos sites, sistemas e IAs de automação personalizadas para otimizar sua operação e impulsionar seus resultados",
    "hero.cta": "Iniciar Projeto",
    "hero.demo": "Ver Demonstração",
    
    // Services
    "services.title": "Nossos Serviços",
    "services.subtitle": "Soluções completas para o seu negócio digital",
    "services.web.title": "Sites & Sistemas",
    "services.web.description": "Desenvolvimento de sites modernos, responsivos e sistemas web sob medida para sua empresa",
    "services.ai.title": "IA & Automação",
    "services.ai.description": "Inteligência artificial personalizada para automatizar processos e otimizar sua operação",
    "services.management.title": "Gestão de Operações",
    "services.management.description": "Softwares completos para gerenciar e controlar toda sua operação de forma eficiente",
    
    // About
    "about.title": "Quem Somos",
    "about.subtitle": "Sua parceira em transformação digital",
    "about.description1": "A Nova Syn é uma empresa boutique especializada em criar soluções tecnológicas sob medida. Combinamos expertise técnica com visão estratégica para entregar projetos que realmente impactam o seu negócio.",
    "about.description2": "Nossa abordagem é hands-on e personalizada: trabalhamos próximos aos nossos clientes, entendendo profundamente seus desafios para criar soluções que não apenas funcionam, mas transformam.",
    "about.benefit1": "Desenvolvimento ágil e iterativo",
    "about.benefit2": "Tecnologias modernas e escaláveis",
    "about.benefit3": "Suporte contínuo e manutenção",
    "about.benefit4": "Foco em resultados mensuráveis",
    "about.benefit5": "Consultoria estratégica incluída",
    "about.benefit6": "Preços transparentes e justos",
    "about.cta": "Agendar Consultoria Gratuita",
    "about.stat1": "Projetos Entregues",
    "about.stat2": "Satisfação dos Clientes",
    "about.stat3": "Suporte Disponível",
    
    // Products
    "products.title": "Nossos Produtos",
    "products.subtitle": "Soluções prontas para acelerar seu negócio",
    
    // Portfolio
    "portfolio.title": "Portfólio",
    "portfolio.subtitle": "Conheça alguns dos projetos que desenvolvemos",
    "portfolio.viewProject": "Ver Projeto",
    
    // Contact
    "contact.title": "Vamos Conversar?",
    "contact.subtitle": "Entre em contato e descubra como podemos transformar seu negócio",
    "contact.name": "Nome",
    "contact.namePlaceholder": "Seu nome completo",
    "contact.email": "Email",
    "contact.emailPlaceholder": "seu@email.com",
    "contact.message": "Mensagem",
    "contact.messagePlaceholder": "Conte-nos sobre seu projeto...",
    "contact.send": "Enviar Mensagem",
    "contact.success": "Mensagem enviada com sucesso!",
    
    // Footer
    "footer.tagline": "Transformando ideias em soluções digitais",
    "footer.quickLinks": "Links Rápidos",
    "footer.contact": "Contato",
  },
  en: {
    // Header
    "nav.services": "Services",
    "nav.about": "About",
    "nav.products": "Products",
    "nav.portfolio": "Portfolio",
    "nav.contact": "Contact",
    "nav.cta": "Contact Us",
    
    // Hero
    "hero.badge": "Technology & AI Solutions",
    "hero.title": "Transform your business with",
    "hero.titleHighlight": "intelligent technology",
    "hero.subtitle": "We develop custom websites, systems, and AI automation to optimize your operations and boost your results",
    "hero.cta": "Start Project",
    "hero.demo": "View Demo",
    
    // Services
    "services.title": "Our Services",
    "services.subtitle": "Complete solutions for your digital business",
    "services.web.title": "Websites & Systems",
    "services.web.description": "Development of modern, responsive websites and custom web systems for your company",
    "services.ai.title": "AI & Automation",
    "services.ai.description": "Custom artificial intelligence to automate processes and optimize your operations",
    "services.management.title": "Operations Management",
    "services.management.description": "Complete software to manage and control your entire operation efficiently",
    
    // About
    "about.title": "Who We Are",
    "about.subtitle": "Your partner in digital transformation",
    "about.description1": "Nova Syn is a boutique company specialized in creating custom technology solutions. We combine technical expertise with strategic vision to deliver projects that truly impact your business.",
    "about.description2": "Our approach is hands-on and personalized: we work closely with our clients, deeply understanding their challenges to create solutions that not only work but transform.",
    "about.benefit1": "Agile and iterative development",
    "about.benefit2": "Modern and scalable technologies",
    "about.benefit3": "Continuous support and maintenance",
    "about.benefit4": "Focus on measurable results",
    "about.benefit5": "Strategic consulting included",
    "about.benefit6": "Transparent and fair pricing",
    "about.cta": "Schedule Free Consultation",
    "about.stat1": "Projects Delivered",
    "about.stat2": "Client Satisfaction",
    "about.stat3": "Support Available",
    
    // Products
    "products.title": "Our Products",
    "products.subtitle": "Ready-made solutions to accelerate your business",
    
    // Portfolio
    "portfolio.title": "Portfolio",
    "portfolio.subtitle": "Check out some of the projects we've developed",
    "portfolio.viewProject": "View Project",
    
    // Contact
    "contact.title": "Let's Talk?",
    "contact.subtitle": "Get in touch and discover how we can transform your business",
    "contact.name": "Name",
    "contact.namePlaceholder": "Your full name",
    "contact.email": "Email",
    "contact.emailPlaceholder": "your@email.com",
    "contact.message": "Message",
    "contact.messagePlaceholder": "Tell us about your project...",
    "contact.send": "Send Message",
    "contact.success": "Message sent successfully!",
    
    // Footer
    "footer.tagline": "Transforming ideas into digital solutions",
    "footer.quickLinks": "Quick Links",
    "footer.contact": "Contact",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.pt] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
