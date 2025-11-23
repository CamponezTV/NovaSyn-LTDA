import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const Portfolio = () => {
  const { t } = useLanguage();

  const portfolioItems = [
    {
      title: t("portfolio.item1.title"),
      description: t("portfolio.item1.description"),
      image: "/vendeai-logo.svg",
      link: "https://projeto-whats.vercel.app/",
      tags: [t("portfolio.item1.tag1"), t("portfolio.item1.tag2"), t("portfolio.item1.tag3")],
      inDevelopment: true,
    },
    {
      title: t("portfolio.item2.title"),
      description: t("portfolio.item2.description"),
      image: "/xmetal-logo.jpeg",
      link: "#",
      tags: [t("portfolio.item2.tag1"), t("portfolio.item2.tag2"), t("portfolio.item2.tag3")],
    },
    {
      title: t("portfolio.item3.title"),
      description: t("portfolio.item3.description"),
      image: "/src/assets/logos/logo_1.png",
      link: "#",
      tags: [t("portfolio.item3.tag1"), t("portfolio.item3.tag2"), t("portfolio.item3.tag3")],
    },
  ];

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
                {/* Development badge */}
                {item.inDevelopment && (
                  <div className="absolute top-3 right-3 z-20">
                    <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-[hsl(25_95%_53%)] to-[hsl(142_70%_45%)] text-white shadow-lg animate-pulse">
                      {t("portfolio.inDevelopment")}
                    </span>
                  </div>
                )}
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full h-full object-cover transition-all duration-700 ${item.inDevelopment ? 'opacity-40 grayscale' : 'group-hover:scale-110 group-hover:rotate-2'}`}
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
                {item.inDevelopment ? (
                  <Button variant="outline" className="w-full transition-smooth cursor-not-allowed opacity-60" disabled>
                    {t("portfolio.comingSoon")}
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full group/btn transition-smooth hover:bg-primary hover:text-primary-foreground" asChild>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      {t("portfolio.viewProject")}
                      <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
