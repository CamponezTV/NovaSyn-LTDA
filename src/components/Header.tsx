import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import novasynLogo from '@/assets/logos/logo_1.png';
import { useEffect, useState } from "react";

const Header = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mouseNearTop, setMouseNearTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Se está no topo, sempre mostrar
      if (currentScrollY < 10) {
        setIsVisible(true);
      }
      // Se scrollando para baixo, esconder
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      // Se scrollando para cima, mostrar
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Se o mouse está nos primeiros 80px do topo da página
      if (e.clientY < 80) {
        setMouseNearTop(true);
        // Mostrar a header se estiver escondida
        if (!isVisible && window.scrollY > 100) {
          setIsVisible(true);
        }
      } else {
        setMouseNearTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lastScrollY, isVisible]);

  return (
    <header className={`fixed left-0 right-0 z-50 mx-auto w-[95%] max-w-7xl transition-all duration-500 animate-fade-down ${isVisible ? 'top-4' : '-top-24'}`}>
      <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-xl shadow-md px-6 py-3 transition-smooth hover:shadow-lg hover:border-primary/30">
        <div className="flex items-center justify-between relative">
          {/* Logo - Esquerda */}
          <div className="flex items-center group cursor-pointer">
            <div className="w-10 h-10 flex items-center justify-center">
              <img 
                src={novasynLogo} 
                alt="NovaSyn Logo" 
                className="w-full h-full object-contain group-hover:scale-110 transition-transform drop-shadow-md"
              />
            </div>
          </div>
          
          {/* Nav - Centro Absoluto */}
          <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <a href="#servicos" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors relative group whitespace-nowrap">
              {t("nav.services")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#sobre" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors relative group whitespace-nowrap">
              {t("nav.about")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
            {/* <a href="#produtos" className="text-sm font-medium text-brand-purple-dark dark:text-foreground/80 hover:text-[#6D28D9] transition-smooth hover:scale-110 relative group whitespace-nowrap">
              {t("nav.products")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#6D28D9] group-hover:w-full transition-all duration-300"></span>
            </a> */}
            <a href="#portfolio" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors relative group whitespace-nowrap">
              {t("nav.portfolio")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#contato" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors relative group whitespace-nowrap">
              {t("nav.contact")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
          </nav>

          {/* Actions - Direita */}
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <Button variant="default" size="sm" className="hidden md:flex rounded-lg shadow-md transition-all duration-300 hover:scale-105 bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-lg" asChild>
              <a href="#contato">{t("nav.cta")}</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
