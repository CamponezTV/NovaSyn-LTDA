import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const portfolioItems = [
  {
    title: "WhatsApp Automation Platform",
    description: "Plataforma de automação de vendas no WhatsApp com IA",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
    link: "https://projeto-whats.vercel.app/",
    tags: ["IA", "Automação", "WhatsApp"],
  },
  {
    title: "E-commerce Management System",
    description: "Sistema completo de gestão para lojas online",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    link: "#",
    tags: ["E-commerce", "Dashboard", "Analytics"],
  },
  {
    title: "Corporate Website",
    description: "Site institucional moderno e responsivo",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    link: "#",
    tags: ["Website", "Design", "Responsivo"],
  },
];

const Portfolio = () => {
  const { t } = useLanguage();

  return (
    <section id="portfolio" className="py-24 bg-gradient-hero relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-purple-dark dark:text-foreground animate-fade-up">
            {t("portfolio.title")}
          </h2>
          <p className="text-lg text-muted-foreground animate-fade-up animation-delay-100">
            {t("portfolio.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {portfolioItems.map((item, index) => (
            <Card 
              key={index} 
              className="group overflow-hidden hover-lift border-2 hover:border-primary transition-smooth animate-scale-up bg-card/50 backdrop-blur-sm"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="aspect-video overflow-hidden relative">
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-all duration-700"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {item.title}
                </CardTitle>
                <CardDescription className="leading-relaxed">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20 transition-smooth hover:bg-primary/20 hover:scale-105"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button variant="outline" className="w-full group/btn transition-smooth hover:bg-primary hover:text-primary-foreground" asChild>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {t("portfolio.viewProject")}
                    <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
