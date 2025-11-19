import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrafficCone } from "lucide-react";
import { useWhatsAppTranslation } from "@/hooks/use-whatsapp-translation";
import logoQuadBranco from '@/assets/logos/logo_quad_fundo_branco.png';
import { useEffect, useState } from "react";

const WhatsAppHero = () => {
  const { t } = useWhatsAppTranslation();
  const [isLoaded, setIsLoaded] = useState(false);
  
  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className={`min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-[hsl(25_95%_53%_/_0.03)] to-[hsl(25_95%_53%_/_0.06)] pt-24 relative overflow-hidden transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-[hsl(25_95%_53%_/_0.08)] rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-[hsl(142_70%_45%_/_0.06)] rounded-full blur-3xl animate-float animation-delay-300"></div>
      </div>
      
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge with shimmer effect */}
          
          {/* Main headline with stagger animation */}
          <h1 className="text-5xl md:text-7xl font-bold text-brand-purple-dark dark:text-foreground leading-tight animate-fade-up animation-delay-100">
            {t("hero.title")}{" "}
            <span className="bg-gradient-to-r from-[hsl(25_95%_53%)] to-[hsl(142_70%_45%)] bg-clip-text text-transparent animate-gradient">
              {t("hero.whatsapp")}
            </span>
          </h1>
          
          {/* Subtitle with delay */}
          <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed animate-fade-up animation-delay-200">
            {t("hero.description")} <span className="text-[hsl(25_95%_53%)] font-bold">{t("hero.description.highlight")}</span> {t("hero.description.suffix")}
          </p>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-up animation-delay-200">
            {t("hero.opacity")} <span className="font-semibold bg-gradient-to-r from-[hsl(25_95%_53%)] to-[hsl(142_70%_45%)] bg-clip-text text-transparent">{t("hero.opacity.highlight")}</span>
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-fade-up animation-delay-300">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={scrollToWaitlist}
              className="group transition-smooth hover:scale-105 bg-gradient-to-r from-[hsl(25_95%_53%)] to-[hsl(142_70%_45%)] shadow-[0_0_20px_rgba(255,127,39,0.5)] hover:shadow-[0_0_30px_rgba(255,127,39,0.7)]"
            >
              {t("hero.cta")}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="glow" 
              size="lg"
              onClick={() => {
                document.getElementById('target-audience')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="transition-smooth hover:scale-105 border-[hsl(142_70%_45%)] text-[hsl(142_70%_45%)] hover:bg-[hsl(142_70%_45%)] hover:text-white"
            >
              {t("hero.more") || 'Saiba mais'}
            </Button>
          </div>

          {/* Trust badge */}
          <div className="pt-12 flex items-center justify-center gap-2 text-sm text-muted-foreground animate-fade-up animation-delay-400">
            <div className="flex -space-x-2">
              {[logoQuadBranco].slice(0, 1).map((logo, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-[hsl(142_70%_45%)] to-[hsl(25_95%_53%)] border-2 border-background transition-transform hover:scale-110 hover:-translate-y-1"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <img 
                    src={logo} 
                    alt={`Logo ${i + 1}`}
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
              ))}
            </div>
            <TrafficCone className="w-5 h-5 animate-bounce"/>
            <span className="font-medium">{t("hero.spots")}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppHero;