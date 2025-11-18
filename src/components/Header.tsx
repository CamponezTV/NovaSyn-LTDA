import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const { t } = useLanguage();

  return (
    <header className="fixed top-4 left-0 right-0 z-50 mx-auto w-[95%] max-w-7xl animate-fade-down">
      <div className="bg-background/60 backdrop-blur-[40px] border border-border/40 rounded-3xl shadow-soft px-6 py-4 transition-smooth hover:shadow-glow hover:bg-background/70">
        <div className="flex items-center justify-between relative">
          {/* Logo - Esquerda */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <Sparkles className="w-7 h-7 text-primary group-hover:rotate-12 transition-transform" />
            <span className="text-xl font-bold bg-gradient-secondary bg-clip-text text-transparent animate-gradient">
              Nova Syn
            </span>
          </div>
          
          {/* Nav - Centro Absoluto */}
          <nav className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            <a href="#servicos" className="text-sm font-medium text-foreground/80 hover:text-primary transition-smooth hover:scale-110 relative group whitespace-nowrap">
              {t("nav.services")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#sobre" className="text-sm font-medium text-foreground/80 hover:text-primary transition-smooth hover:scale-110 relative group whitespace-nowrap">
              {t("nav.about")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#produtos" className="text-sm font-medium text-foreground/80 hover:text-primary transition-smooth hover:scale-110 relative group whitespace-nowrap">
              {t("nav.products")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#portfolio" className="text-sm font-medium text-foreground/80 hover:text-primary transition-smooth hover:scale-110 relative group whitespace-nowrap">
              {t("nav.portfolio")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#contato" className="text-sm font-medium text-foreground/80 hover:text-primary transition-smooth hover:scale-110 relative group whitespace-nowrap">
              {t("nav.contact")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
          </nav>

          {/* Actions - Direita */}
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <Button variant="default" size="sm" className="hidden md:flex rounded-full transition-smooth hover:scale-105" asChild>
              <a href="#contato">{t("nav.cta")}</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
