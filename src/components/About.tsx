import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  const benefits = [
    t("about.benefit1"),
    t("about.benefit2"),
    t("about.benefit3"),
    t("about.benefit4"),
    t("about.benefit5"),
    t("about.benefit6"),
  ];

  return (
    <section id="sobre" className="py-32 bg-gradient-to-b from-background via-primary/3 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <h2 className="text-5xl md:text-6xl font-bold text-brand-purple-dark dark:text-foreground">
            {t("about.title")}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t("about.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-6xl mx-auto">
          <div className="space-y-8 animate-fade-right">
            <p className="text-base text-foreground/70 leading-relaxed">
              {t("about.description1")}
            </p>
            <p className="text-base text-foreground/70 leading-relaxed">
              {t("about.description2")}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 p-3 rounded-lg bg-background/50 hover:bg-background transition-colors animate-fade-up"
                  style={{ animationDelay: `${200 + index * 100}ms` }}
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/70">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 animate-fade-up animation-delay-400">
              <Button variant="hero" size="lg" className="shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg" asChild>
                <a href="#contato">{t("about.cta")}</a>
              </Button>
            </div>
          </div>

          <div className="relative animate-fade-left">
            <div className="aspect-square rounded-2xl bg-gradient-primary/5 border border-primary/20 p-8 flex items-center justify-center backdrop-blur-sm hover:shadow-lg transition-all">
              <div className="text-center space-y-8">
                <div className="space-y-2 animate-scale-in">
                  <p className="text-5xl font-bold text-brand-purple-dark dark:text-foreground transition-colors">10+</p>
                  <p className="text-base text-foreground/70">{t("about.stat1")}</p>
                </div>
                <div className="space-y-2 animate-scale-in animation-delay-200">
                  <p className="text-5xl font-bold text-primary">98%</p>
                  <p className="text-base text-foreground/70">{t("about.stat2")}</p>
                </div>
                <div className="space-y-2 animate-scale-in animation-delay-400">
                  <p className="text-5xl font-bold text-secondary">24/7</p>
                  <p className="text-base text-foreground/70">{t("about.stat3")}</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl animate-float"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/20 rounded-full blur-2xl animate-float animation-delay-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
