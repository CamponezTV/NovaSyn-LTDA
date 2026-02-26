import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import Logo3D from "./Logo3D";
import novasynLogoQuad from "@/assets/logos/logo_quad_fundo_branco.png";

const Hero = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <section className={`hero-section relative overflow-hidden transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} aria-label="Seção principal">
        {/* Modern gradient mesh background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-br from-secondary/20 via-transparent to-primary/10 rounded-full blur-3xl animate-blob animation-delay-300"></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/10 rounded-full blur-3xl animate-blob animation-delay-600"></div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(109,40,217,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(109,40,217,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-50"></div>
        </div>

        {/* Glow orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse animation-delay-300"></div>

        <div className="container mx-auto px-4 relative z-10 w-full flex items-center justify-center min-h-screen lg:h-full">
          <div className="max-w-6xl w-full h-full pt-36 pb-10 md:pt-40 md:pb-12 lg:py-0 flex items-center">
            {/* Main content with modern layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full h-full">
              {/* Left side - Text */}
              <div className="space-y-8 text-center lg:text-left">

                <div className="space-y-4 overflow-visible">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold text-brand-purple-dark dark:text-foreground leading-[1.1] opacity-0 animate-fade-up animation-delay-100">
                    {t("hero.title")}
                  </h1>
                  <div
                    className="h-2 w-20 bg-gradient-primary rounded-full mx-auto lg:mx-0 bar-slide-in origin-left opacity-0"
                  ></div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-[2] pb-4 animate-fade-up animation-delay-300">
                    {t("hero.titleHighlight")}
                  </h2>
                </div>

                <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-2xl opacity-0 animate-fade-up animation-delay-400">
                  {t("hero.subtitle")}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start opacity-0 animate-fade-up animation-delay-500">
                  <Button variant="hero" size="lg" className="group shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <a href="#contato" className="flex items-center">
                      {t("hero.cta")}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="group transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-background/50 border-primary/30 hover:border-primary/60 hover:shadow-md">
                    <a href="#portfolio" className="flex items-center text-primary">
                      {t("nav.portfolio")}
                    </a>
                  </Button>
                </div>

                <div className="flex items-center gap-3 pt-6 flex-wrap justify-center lg:justify-start opacity-0 animate-fade-up animation-delay-600">
                  <span className="text-xs font-medium text-foreground/50 uppercase tracking-wider">{t("hero.partners")}</span>
                  <div className="flex gap-1">
                    <div className="w-8 h-8 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:scale-110 transition-transform overflow-hidden">
                      <img src="/IncidenteLogo.webp" alt="Xmetal" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:scale-110 transition-transform overflow-hidden">
                      <img src={novasynLogoQuad} alt="NovaSyn" className="w-full h-full object-contain" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - 3D Logo */}
              <div className="flex justify-center items-center opacity-0 animate-fade-up animation-delay-500 h-64 md:h-80 lg:h-full w-full">
                <div className="relative w-full h-full">
                  <Logo3D />
                  <div className="absolute inset-0 rounded-2xl pointer-events-none">
                    <div className="absolute inset-0  rounded-2xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
