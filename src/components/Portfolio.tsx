import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import novasynLogo from "@/assets/logos/logo_1.png";

const Portfolio = () => {
  const { t } = useLanguage();

  const portfolioItems = [
    {
      title: t("portfolio.item1.title"),
      description: t("portfolio.item1.description"),
      image: "/vendeai-logo.svg",
      link: "#",
      tags: [t("portfolio.item1.tag1"), t("portfolio.item1.tag2"), t("portfolio.item1.tag3")],
      inDevelopment: true,
    },
    {
      title: "Novabuild",
      description: t("portfolio.item2.description"),
      image: "/Novabuild.png",
      link: "#",
      tags: [t("portfolio.item2.tag1"), t("portfolio.item2.tag2"), t("portfolio.item2.tag3")],
      inDevelopment: true,
    },
    {
      title: t("portfolio.item3.title"),
      description: t("portfolio.item3.description"),
      image: "/logo_NovaSystem1.png",
      link: "#",
      tags: [t("portfolio.item3.tag1"), t("portfolio.item3.tag2"), t("portfolio.item3.tag3")],
      inDevelopment: true,
    },
  ];

  return (
    <section id="portfolio" className="py-32 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <h2 className="text-5xl md:text-6xl font-bold text-brand-purple-dark dark:text-foreground">
            {t("portfolio.title")}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t("portfolio.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {portfolioItems.map((item, index) => (
            <Card 
              key={index} 
              className="group overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 animate-scale-up bg-background hover:shadow-lg"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="aspect-video overflow-hidden relative">
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                {/* Development badge */}
                {item.inDevelopment && (
                  <div className="absolute top-3 right-3 z-20">
                    <span className="px-3 py-1.5 text-xs font-bold rounded-lg bg-primary text-primary-foreground shadow-lg animate-pulse">
                      {t("portfolio.inDevelopment")}
                    </span>
                  </div>
                )}
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full h-full object-cover transition-all duration-500 ${item.inDevelopment ? 'opacity-40 grayscale' : 'group-hover:scale-105'}`}
                />
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2.5 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary border border-primary/20 transition-smooth hover:bg-primary/20"
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
