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
    "nav.back": "Voltar",

    // Hero
    "hero.badge": "Soluções em Tecnologia e IA",
    "hero.title": "Transforme seu negócio com",
    "hero.titleHighlight": "tecnologia inteligente",
    "hero.subtitle": "Desenvolvemos sites, sistemas e IAs de automação personalizadas para otimizar sua operação e impulsionar seus resultados",
    "hero.cta": "Quero Iniciar um Projeto",
    "hero.products": "Ver Produtos",
    "hero.companies": "Transformando o atendimento de lojas como a sua",
    "hero.partners": "Empresas parceiras",

    // Services
    "services.title": "Nossos Serviços",
    "services.subtitle": "Soluções completas para o seu negócio digital",
    "services.web.title": "Sites & Sistemas",
    "services.web.description": "Desenvolvimento de sites modernos, responsivos e sistemas web sob medida e personalizados para sua empresa",
    "services.ai.title": "IA & Automação",
    "services.ai.description": "Inteligência artificial personalizada para automatizar processos e otimizar sua operação",
    "services.management.title": "Gestão de Operações",
    "services.management.description": "Softwares completos para gerenciar e controlar toda sua operação de forma eficiente",
    "services.software.title": "Softwares e Sistemas por Assinatura",
    "services.software.description": "Soluções prontas e customizáveis para resolver problemas específicos do seu negócio",

    // About
    "about.title": "Quem Somos",
    "about.subtitle": "Sua parceira em transformação digital",
    "about.description1": "A NovaSyn é uma empresa boutique especializada em criar soluções tecnológicas sob medida. Combinamos expertise técnica com visão estratégica para entregar projetos que realmente impactam o seu negócio.",
    "about.description2": "Nossa abordagem é hands-on e personalizada: trabalhamos próximos aos nossos clientes, entendendo profundamente seus desafios para criar soluções que não apenas funcionam, mas transformam.",
    "about.benefit1": "Desenvolvimento ágil e iterativo",
    "about.benefit2": "Tecnologias modernas e escaláveis",
    "about.benefit3": "Suporte contínuo e manutenção",
    "about.benefit4": "Foco em resultados mensuráveis",
    "about.benefit5": "Consultoria estratégica incluída",
    "about.benefit6": "Preços transparentes e justos",
    "about.cta": "Agende uma call",
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
    "portfolio.comingSoon": "Em Breve",
    "portfolio.item1.title": "O Incidente",
    "portfolio.item1.description": "Site oficial do grupo O Incidente.",
    "portfolio.item1.tag1": "Gaming",
    "portfolio.item1.tag2": "Influencers",
    "portfolio.item1.tag3": "Comunidade",
    "portfolio.item2.title": "Grupo Sartoretto",
    "portfolio.item2.description": "Portal do Grupo Sartoretto",
    "portfolio.item2.tag1": "Representação Comercial",
    "portfolio.item2.tag2": "Produtos",
    "portfolio.item2.tag3": "Marketing",
    "portfolio.inDevelopment": "Em Desenvolvimento",
    "portfolio.item3.title": "OCL Advogados",
    "portfolio.item3.description": "Website institucional para escritório de advocacia OCL Advogados.",
    "portfolio.item3.tag1": "Institucional",
    "portfolio.item3.tag2": "Advocacia",
    "portfolio.item3.tag3": "Design",

    // Team
    "team.title": "Nossa Equipe",
    "team.subtitle": "Conheça os especialistas que tornam tudo isso possível",
    "team.arthur.name": "Arthur",
    "team.arthur.role": "Diretor de Tecnologia",
    "team.arthur.description": "Especialista em desenvolvimento de software e sistemas, responsável pela criação e manutenção.",
    "team.paulo.name": "Paulo",
    "team.paulo.role": "Líder Técnico",
    "team.paulo.description": "Especialista em automação e inteligência artificial, responsável pela criação de soluções personalizadas.",
    "team.giovanni.name": "Giovanni",
    "team.giovanni.role": "Diretor de Operações",
    "team.giovanni.description": "Especialista em vendas e marketing, responsável pela gestão de projetos e relacionamento com clientes.",
    "team.mission": "Vimos como a tecnologia pode transformar negócios. Então nos unimos para criar soluções que realmente fazem a diferença.",

    // FAQ
    "faq.badge": "Perguntas Frequentes",
    "faq.title": "Dúvidas Frequentes",
    "faq.subtitle": "Encontre respostas para as principais questões sobre nossos serviços",
    "faq.q1.question": "Quanto tempo leva para desenvolver um site ou sistema?",
    "faq.q1.answer": "O prazo varia de acordo com a complexidade do projeto. Um site institucional simples pode ficar pronto em 2-3 semanas, enquanto sistemas mais complexos podem levar de 2 a 4 meses. Durante a consultoria inicial, fornecemos um cronograma detalhado baseado nas suas necessidades específicas.",
    "faq.q2.question": "Vocês oferecem suporte após a entrega do projeto?",
    "faq.q2.answer": "Sim! Todos os nossos projetos incluem um período de garantia e suporte técnico. Além disso, oferecemos planos de manutenção contínua para garantir que seu site ou sistema esteja sempre atualizado, seguro e funcionando perfeitamente.",
    "faq.q3.question": "Como funciona o processo de desenvolvimento?",
    "faq.q3.answer": "Trabalhamos de forma ágil e iterativa: começamos com uma consultoria para entender suas necessidades, criamos protótipos e mockups para validação, desenvolvemos em sprints com entregas parciais, e mantemos comunicação constante para ajustes. Você acompanha o progresso em cada etapa.",
    "faq.q4.question": "Qual o investimento necessário para começar um projeto?",
    "faq.q4.answer": "O investimento varia conforme o escopo e complexidade do projeto. Oferecemos consultoria gratuita para entender suas necessidades e apresentar uma proposta personalizada com valores transparentes. Também oferecemos opções de pagamento parcelado para facilitar seu investimento.",
    "faq.q5.question": "Vocês desenvolvem apenas sites ou também apps mobile?",
    "faq.q5.answer": "Desenvolvemos sites, sistemas web, automações com IA e softwares de gestão. Para aplicativos mobile nativos, trabalhamos com parceiros especializados, mas podemos desenvolver Progressive Web Apps (PWA) que funcionam como apps em dispositivos móveis.",
    "faq.q6.question": "O que diferencia a NovaSyn de outras empresas de tecnologia?",
    "faq.q6.answer": "Somos uma empresa boutique focada em qualidade e personalização. Trabalhamos próximos aos nossos clientes, entendendo profundamente seus desafios. Combinamos expertise técnica com visão estratégica, entregando soluções que realmente impactam o negócio, não apenas produtos padronizados.",
    "faq.q7.question": "Posso ter acesso ao código-fonte do meu projeto?",
    "faq.q7.answer": "Sim! A propriedade intelectual dos projetos customizados é definida em contrato. Geralmente, você tem total acesso ao código-fonte após a entrega final e pagamento integral. Mantemos documentação completa para facilitar futuras manutenções.",
    "faq.q8.question": "Vocês trabalham com empresas de qualquer tamanho?",
    "faq.q8.answer": "Sim! Atendemos desde pequenos negócios até empresas de médio porte. Nossa abordagem boutique nos permite adaptar nossas soluções para diferentes realidades e orçamentos, sempre mantendo o mesmo nível de qualidade e comprometimento.",
    "faq.cta": "Não encontrou a resposta que procurava?",
    "faq.contactLink": "Entre em contato conosco",

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
    "footer.copyright": "©️ {year} — Novasyn LTDA",
    "footer.rights": "Todos os direitos reservados",
    "footer.privacy": "Política de Privacidade",
    "footer.terms": "Termos de Serviço",

    // Testimonials
    "testimonials.title": "O que dizem nossos clientes",
    "testimonials.subtitle": "Experiências reais de quem transformou sua ideia em realidade com a NovaSyn",
    "testimonials.item1.quote": "A equipe da NovaSyn fez um trabalho excepcional no desenvolvimento do nosso site. Todo o processo foi rápido, organizado e o resultado final ficou extremamente polido e profissional. O site não apenas ficou muito bonito, mas também recebeu diversos comentários positivos da nossa comunidade, o que mostra o cuidado e a qualidade do trabalho realizado. Foi uma ótima experiência trabalhar com a equipe e transformar uma ideia que tínhamos em um projeto real e bem executado. Recomendo fortemente a NovaSyn para quem busca qualidade, agilidade e profissionalismo.",
    "testimonials.item1.author": "Cassiano \"Cereaw\" Bopp",
    "testimonials.item1.project": "O Incidente",

    // Privacy Policy
    "privacy.title": "Política de Privacidade",
    "privacy.lastUpdated": "Última atualização",
    "privacy.section1.title": "1. Introdução",
    "privacy.section1.content": "A NovaSyn LTDA está comprometida em proteger sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações pessoais quando você utiliza nosso site e serviços.",
    "privacy.section2.title": "2. Informações que Coletamos",
    "privacy.section2.intro": "Coletamos diferentes tipos de informações para fornecer e melhorar nossos serviços:",
    "privacy.section2.item1": "Informações de contato: nome, e-mail, telefone",
    "privacy.section2.item2": "Informações da empresa: nome da empresa, segmento, tamanho",
    "privacy.section2.item3": "Dados de uso: como você interage com nosso site",
    "privacy.section2.item4": "Informações técnicas: endereço IP, tipo de navegador, sistema operacional",
    "privacy.section3.title": "3. Como Usamos Suas Informações",
    "privacy.section3.intro": "Utilizamos suas informações para:",
    "privacy.section3.item1": "Fornecer e manter nossos serviços",
    "privacy.section3.item2": "Responder às suas solicitações e consultas",
    "privacy.section3.item3": "Enviar atualizações sobre nossos produtos e serviços",
    "privacy.section3.item4": "Melhorar nosso site e experiência do usuário",
    "privacy.section4.title": "4. Cookies e Tecnologias Semelhantes",
    "privacy.section4.content": "Utilizamos cookies e tecnologias semelhantes para melhorar sua experiência em nosso site, analisar o tráfego e personalizar conteúdo. Você pode controlar o uso de cookies através das configurações do seu navegador.",
    "privacy.section5.title": "5. Compartilhamento de Informações",
    "privacy.section5.intro": "Não vendemos suas informações pessoais. Podemos compartilhar suas informações apenas em casos específicos:",
    "privacy.section5.item1": "Com prestadores de serviços que nos auxiliam nas operações",
    "privacy.section5.item2": "Quando exigido por lei ou autoridades governamentais",
    "privacy.section5.item3": "Para proteger nossos direitos legais e segurança",
    "privacy.section5.item4": "Com seu consentimento explícito",
    "privacy.section6.title": "6. Segurança dos Dados",
    "privacy.section6.content": "Implementamos medidas de segurança técnicas e organizacionais apropriadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.",
    "privacy.section7.title": "7. Seus Direitos",
    "privacy.section7.content": "Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Também pode solicitar a portabilidade de seus dados ou revogar seu consentimento a qualquer momento. Para exercer esses direitos, entre em contato conosco.",
    "privacy.section8.title": "8. Contato",
    "privacy.section8.content": "Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos seus dados pessoais, entre em contato através do formulário em nosso site ou pelo e-mail contato@novasyn.com.br",

    // Terms of Service
    "terms.title": "Termos de Serviço",
    "terms.lastUpdated": "Última atualização",
    "terms.section1.title": "1. Aceitação dos Termos",
    "terms.section1.content": "Ao acessar e usar os serviços da NovaSyn LTDA, você concorda em cumprir estes Termos de Serviço. Se você não concordar com algum destes termos, não utilize nossos serviços.",
    "terms.section2.title": "2. Descrição dos Serviços",
    "terms.section2.intro": "A NovaSyn oferece serviços de desenvolvimento e consultoria em tecnologia, incluindo:",
    "terms.section2.item1": "Desenvolvimento de sites e sistemas web personalizados",
    "terms.section2.item2": "Soluções de inteligência artificial e automação",
    "terms.section2.item3": "Softwares de gestão e operações empresariais",
    "terms.section2.item4": "Consultoria estratégica em tecnologia",
    "terms.section3.title": "3. Obrigações do Usuário",
    "terms.section3.intro": "Ao utilizar nossos serviços, você concorda em:",
    "terms.section3.item1": "Fornecer informações precisas e atualizadas",
    "terms.section3.item2": "Manter a confidencialidade de suas credenciais de acesso",
    "terms.section3.item3": "Usar os serviços de forma legal e ética",
    "terms.section3.item4": "Não tentar acessar sistemas ou dados não autorizados",
    "terms.section4.title": "4. Propriedade Intelectual",
    "terms.section4.content": "Todo o conteúdo, design, código e materiais fornecidos pela NovaSyn são protegidos por direitos autorais e outras leis de propriedade intelectual. Os direitos sobre trabalhos customizados serão definidos em contrato específico para cada projeto.",
    "terms.section5.title": "5. Limitação de Responsabilidade",
    "terms.section5.content": "A NovaSyn não se responsabiliza por danos indiretos, incidentais ou consequentes resultantes do uso ou incapacidade de usar nossos serviços. Nossa responsabilidade total não excederá o valor pago pelos serviços.",
    "terms.section6.title": "6. Modificações nos Termos",
    "terms.section6.content": "Reservamos o direito de modificar estes termos a qualquer momento. Notificaremos sobre alterações significativas através de nosso site ou por e-mail. O uso continuado dos serviços após as alterações constitui aceitação dos novos termos.",
    "terms.section7.title": "7. Rescisão",
    "terms.section7.content": "Podemos suspender ou encerrar seu acesso aos nossos serviços a qualquer momento, com ou sem aviso prévio, por violação destes termos ou por qualquer outro motivo legítimo.",
    "terms.section8.title": "8. Lei Aplicável",
    "terms.section8.content": "Estes termos são regidos pelas leis brasileiras. Quaisquer disputas serão resolvidas nos tribunais competentes do Brasil.",
  },
  en: {
    // Header
    "nav.services": "Services",
    "nav.about": "About",
    "nav.products": "Products",
    "nav.portfolio": "Portfolio",
    "nav.contact": "Contact",
    "nav.cta": "Contact Us",
    "nav.back": "Back",

    // Hero
    "hero.badge": "Technology & AI Solutions",
    "hero.title": "Transform your business with",
    "hero.titleHighlight": "intelligent technology",
    "hero.subtitle": "We develop custom websites, systems, and AI automation to optimize your operations and boost your results",
    "hero.cta": "I want to start a project",
    "hero.products": "View Products",
    "hero.companies": "Transforming the service of stores like yours",

    // Services
    "services.title": "Our Services",
    "services.subtitle": "Complete solutions for your digital business",
    "services.web.title": "Websites & Systems",
    "services.web.description": "Development of modern, responsive websites and custom and personalized web systems for your company",
    "services.ai.title": "AI & Automation",
    "services.ai.description": "Custom artificial intelligence to automate processes and optimize your operations",
    "services.management.title": "Operations Management",
    "services.management.description": "Complete software to manage and control your entire operation efficiently",
    "services.software.title": "Software & Systems by Subscription",
    "services.software.description": "Ready-made and customizable solutions to solve specific problems in your business",

    // About
    "about.title": "Who We Are",
    "about.subtitle": "Your partner in digital transformation",
    "about.description1": "NovaSyn is a boutique company specialized in creating custom technology solutions. We combine technical expertise with strategic vision to deliver projects that truly impact your business.",
    "about.description2": "Our approach is hands-on and personalized: we work closely with our clients, deeply understanding their challenges to create solutions that not only work but transform.",
    "about.benefit1": "Agile and iterative development",
    "about.benefit2": "Modern and scalable technologies",
    "about.benefit3": "Continuous support and maintenance",
    "about.benefit4": "Focus on measurable results",
    "about.benefit5": "Strategic consulting included",
    "about.benefit6": "Transparent and fair pricing",
    "about.cta": "Schedule a meeting",
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
    "portfolio.comingSoon": "Coming Soon",
    "portfolio.item1.title": "O Incidente",
    "portfolio.item1.description": "O Incidente Official Website.",
    "portfolio.item1.tag1": "Gaming",
    "portfolio.item1.tag2": "Influencers",
    "portfolio.item1.tag3": "Community",
    "portfolio.item2.title": "Grupo Sartoretto",
    "portfolio.item2.description": "Portal and comercial representation for Grupo Sartoretto",
    "portfolio.item2.tag1": "Comercial Representation",
    "portfolio.item2.tag2": "Portal",
    "portfolio.item2.tag3": "Marketing",
    "portfolio.inDevelopment": "In Development",
    "portfolio.item3.title": "OCL Advogados",
    "portfolio.item3.description": "Institutional website for law firm OCL Advogados.",
    "portfolio.item3.tag1": "Institutional",
    "portfolio.item3.tag2": "Law Firm",
    "portfolio.item3.tag3": "Design",

    // Team
    "team.title": "Our Team",
    "team.subtitle": "Meet the experts who make it all possible",
    "team.arthur.name": "Arthur",
    "team.arthur.role": "CTO",
    "team.arthur.description": "Specializes in web development and systems, responsible for the creation and maintenance of our products.",
    "team.paulo.name": "Paulo",
    "team.paulo.role": "Tech Lead",
    "team.paulo.description": "Specializes in automation and artificial intelligence, responsible for the creation of personalized solutions for our clients.",
    "team.giovanni.name": "Giovanni",
    "team.giovanni.role": "COO",
    "team.giovanni.description": "Specializes in sales, marketing and scalability, responsible for the growth of the company.",
    "team.mission": "We saw how technology can transform businesses. So we joined forces to create solutions that truly make a difference.",

    // FAQ
    "faq.badge": "FAQ",
    "faq.title": "Frequently Asked Questions",
    "faq.subtitle": "Find answers to the main questions about our services",
    "faq.q1.question": "How long does it take to develop a website or system?",
    "faq.q1.answer": "The timeline varies according to project complexity. A simple institutional website can be ready in 2-3 weeks, while more complex systems can take 2 to 4 months. During the initial consultation, we provide a detailed timeline based on your specific needs.",
    "faq.q2.question": "Do you offer support after project delivery?",
    "faq.q2.answer": "Yes! All our projects include a warranty period and technical support. Additionally, we offer continuous maintenance plans to ensure your website or system is always updated, secure, and running perfectly.",
    "faq.q3.question": "How does the development process work?",
    "faq.q3.answer": "We work in an agile and iterative way: we start with a consultation to understand your needs, create prototypes and mockups for validation, develop in sprints with partial deliveries, and maintain constant communication for adjustments. You follow the progress at each stage.",
    "faq.q4.question": "What investment is needed to start a project?",
    "faq.q4.answer": "The investment varies according to the scope and complexity of the project. We offer free consultation to understand your needs and present a personalized proposal with transparent values. We also offer installment payment options to facilitate your investment.",
    "faq.q5.question": "Do you only develop websites or also mobile apps?",
    "faq.q5.answer": "We develop websites, web systems, AI automation, and management software. For native mobile applications, we work with specialized partners, but we can develop Progressive Web Apps (PWA) that work like apps on mobile devices.",
    "faq.q6.question": "What sets NovaSyn apart from other technology companies?",
    "faq.q6.answer": "We are a boutique company focused on quality and customization. We work closely with our clients, deeply understanding their challenges. We combine technical expertise with strategic vision, delivering solutions that truly impact the business, not just standardized products.",
    "faq.q7.question": "Can I have access to the source code of my project?",
    "faq.q7.answer": "Yes! The intellectual property of custom projects is defined in the contract. Generally, you have full access to the source code after final delivery and full payment. We maintain complete documentation to facilitate future maintenance.",
    "faq.q8.question": "Do you work with companies of any size?",
    "faq.q8.answer": "Yes! We serve from small businesses to medium-sized companies. Our boutique approach allows us to adapt our solutions to different realities and budgets, always maintaining the same level of quality and commitment.",
    "faq.cta": "Didn't find the answer you were looking for?",
    "faq.contactLink": "Contact us",

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
    "footer.copyright": "©️ {year} — Novasyn LTDA",
    "footer.rights": "All rights reserved",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",

    // Testimonials
    "testimonials.title": "What our clients say",
    "testimonials.subtitle": "Real experiences from those who transformed their ideas into reality with NovaSyn",
    "testimonials.item1.quote": "The NovaSyn team did an exceptional job developing our website. The entire process was fast, organized, and the final result was extremely polished and professional. The site not only looked beautiful but also received several positive comments from our community, which shows the care and quality of the work performed. It was a great experience working with the team and transforming an idea we had into a real and well-executed project. I strongly recommend NovaSyn for those seeking quality, agility, and professionalism.",
    "testimonials.item1.author": "Cereaw",
    "testimonials.item1.project": "O Incidente",

    // Privacy Policy
    "privacy.title": "Privacy Policy",
    "privacy.lastUpdated": "Last updated",
    "privacy.section1.title": "1. Introduction",
    "privacy.section1.content": "NovaSyn LTDA is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our website and services.",
    "privacy.section2.title": "2. Information We Collect",
    "privacy.section2.intro": "We collect different types of information to provide and improve our services:",
    "privacy.section2.item1": "Contact information: name, email, phone",
    "privacy.section2.item2": "Company information: company name, industry, size",
    "privacy.section2.item3": "Usage data: how you interact with our website",
    "privacy.section2.item4": "Technical information: IP address, browser type, operating system",
    "privacy.section3.title": "3. How We Use Your Information",
    "privacy.section3.intro": "We use your information to:",
    "privacy.section3.item1": "Provide and maintain our services",
    "privacy.section3.item2": "Respond to your requests and inquiries",
    "privacy.section3.item3": "Send updates about our products and services",
    "privacy.section3.item4": "Improve our website and user experience",
    "privacy.section4.title": "4. Cookies and Similar Technologies",
    "privacy.section4.content": "We use cookies and similar technologies to improve your experience on our website, analyze traffic, and personalize content. You can control cookie usage through your browser settings.",
    "privacy.section5.title": "5. Information Sharing",
    "privacy.section5.intro": "We do not sell your personal information. We may share your information only in specific cases:",
    "privacy.section5.item1": "With service providers who assist us in operations",
    "privacy.section5.item2": "When required by law or government authorities",
    "privacy.section5.item3": "To protect our legal rights and safety",
    "privacy.section5.item4": "With your explicit consent",
    "privacy.section6.title": "6. Data Security",
    "privacy.section6.content": "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
    "privacy.section7.title": "7. Your Rights",
    "privacy.section7.content": "You have the right to access, correct, or delete your personal information. You can also request data portability or revoke your consent at any time. To exercise these rights, please contact us.",
    "privacy.section8.title": "8. Contact",
    "privacy.section8.content": "If you have questions about this Privacy Policy or how we handle your personal data, contact us through the form on our website or by email at contato@novasyn.com.br",

    // Terms of Service
    "terms.title": "Terms of Service",
    "terms.lastUpdated": "Last updated",
    "terms.section1.title": "1. Acceptance of Terms",
    "terms.section1.content": "By accessing and using NovaSyn LTDA's services, you agree to comply with these Terms of Service. If you do not agree with any of these terms, do not use our services.",
    "terms.section2.title": "2. Description of Services",
    "terms.section2.intro": "NovaSyn offers technology development and consulting services, including:",
    "terms.section2.item1": "Custom website and web system development",
    "terms.section2.item2": "Artificial intelligence and automation solutions",
    "terms.section2.item3": "Business management and operations software",
    "terms.section2.item4": "Strategic technology consulting",
    "terms.section3.title": "3. User Obligations",
    "terms.section3.intro": "By using our services, you agree to:",
    "terms.section3.item1": "Provide accurate and up-to-date information",
    "terms.section3.item2": "Maintain the confidentiality of your access credentials",
    "terms.section3.item3": "Use the services in a legal and ethical manner",
    "terms.section3.item4": "Not attempt to access unauthorized systems or data",
    "terms.section4.title": "4. Intellectual Property",
    "terms.section4.content": "All content, design, code, and materials provided by NovaSyn are protected by copyright and other intellectual property laws. Rights to custom work will be defined in specific contracts for each project.",
    "terms.section5.title": "5. Limitation of Liability",
    "terms.section5.content": "NovaSyn is not responsible for indirect, incidental, or consequential damages resulting from the use or inability to use our services. Our total liability will not exceed the amount paid for the services.",
    "terms.section6.title": "6. Modifications to Terms",
    "terms.section6.content": "We reserve the right to modify these terms at any time. We will notify you of significant changes through our website or by email. Continued use of the services after changes constitutes acceptance of the new terms.",
    "terms.section7.title": "7. Termination",
    "terms.section7.content": "We may suspend or terminate your access to our services at any time, with or without notice, for violation of these terms or for any other legitimate reason.",
    "terms.section8.title": "8. Applicable Law",
    "terms.section8.content": "These terms are governed by Brazilian laws. Any disputes will be resolved in the competent courts of Brazil.",
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
