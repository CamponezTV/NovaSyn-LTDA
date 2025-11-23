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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`fixed left-0 right-0 z-50 mx-auto w-[95%] max-w-7xl transition-all duration-500 animate-fade-down ${isVisible ? 'top-4' : '-top-24'}`}>
      <div className="bg-[#6D28D9]/10 backdrop-blur-[40px] border border-[#6D28D9]/30 rounded-3xl shadow-soft px-6 py-4 transition-smooth hover:shadow-[0_0_30px_rgba(109,40,217,0.3)] hover:bg-[#6D28D9]/15">
        <div className="flex items-center justify-between relative">
          {/* Logo - Esquerda */}
          <div className="flex items-center group cursor-pointer">
            <div className="w-12 h-12 flex items-center justify-center">
              <img 
                src={novasynLogo} 
                alt="NovaSyn Logo" 
                className="w-full h-full object-contain group-hover:scale-110 transition-transform drop-shadow-md"
              />
            </div>
          </div>
          
          {/* Nav - Centro Absoluto */}
          <nav className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            <a href="#servicos" className="text-sm font-medium text-brand-purple-dark dark:text-foreground/80 hover:text-[#6D28D9] transition-smooth hover:scale-110 relative group whitespace-nowrap">
              {t("nav.services")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#6D28D9] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#sobre" className="text-sm font-medium text-brand-purple-dark dark:text-foreground/80 hover:text-[#6D28D9] transition-smooth hover:scale-110 relative group whitespace-nowrap">
              {t("nav.about")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#6D28D9] group-hover:w-full transition-all duration-300"></span>
            </a>
            {/* <a href="#produtos" className="text-sm font-medium text-brand-purple-dark dark:text-foreground/80 hover:text-[#6D28D9] transition-smooth hover:scale-110 relative group whitespace-nowrap">
              {t("nav.products")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#6D28D9] group-hover:w-full transition-all duration-300"></span>
            </a> */}
            <a href="#portfolio" className="text-sm font-medium text-brand-purple-dark dark:text-foreground/80 hover:text-[#6D28D9] transition-smooth hover:scale-110 relative group whitespace-nowrap">
              {t("nav.portfolio")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#6D28D9] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#contato" className="text-sm font-medium text-brand-purple-dark dark:text-foreground/80 hover:text-[#6D28D9] transition-smooth hover:scale-110 relative group whitespace-nowrap">
              {t("nav.contact")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#6D28D9] group-hover:w-full transition-all duration-300"></span>
            </a>
          </nav>

          {/* Actions - Direita */}
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <Button variant="default" size="sm" className="hidden md:flex rounded-full transition-smooth hover:scale-105 bg-[#6D28D9] hover:bg-[#5B21B6] text-white shadow-[0_0_20px_rgba(109,40,217,0.5)] hover:shadow-[0_0_30px_rgba(109,40,217,0.7)]" asChild>
              <a href="#contato">{t("nav.cta")}</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
