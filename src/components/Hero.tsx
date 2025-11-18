import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-hero pt-24 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float animation-delay-300"></div>
      </div>

      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium animate-fade-down animate-glow-pulse">
            <Sparkles className="w-4 h-4" />
            <span>{t("hero.badge")}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-brand-purple-dark dark:text-foreground leading-tight animate-fade-up animation-delay-100">
            {t("hero.title")}{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent animate-gradient">
              {t("hero.titleHighlight")}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed animate-fade-up animation-delay-200">
            {t("hero.subtitle")}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-fade-up animation-delay-300">
            <Button variant="hero" size="lg" className="group transition-smooth hover:scale-105">
              {t("hero.cta")}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="glow" size="lg" className="transition-smooth hover:scale-105">
              {t("hero.demo")}
            </Button>
          </div>

          <div className="pt-12 flex items-center justify-center gap-2 text-sm text-muted-foreground animate-fade-up animation-delay-400">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-secondary border-2 border-background transition-transform hover:scale-110 hover:-translate-y-1"
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
            <span>Mais de 50 empresas transformadas</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
