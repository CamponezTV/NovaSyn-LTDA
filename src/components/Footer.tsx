import novasynLogo from '@/assets/logos/logo_1.png';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background dark:bg-background py-12 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="w-12 h-12 flex items-center justify-center">
              <img 
                src={novasynLogo} 
                alt="NovaSyn Logo" 
                className="w-full h-full object-contain drop-shadow-md"
              />
            </div>
            <p className="text-sm text-foreground/60 text-center md:text-left max-w-xs">
              Transformamos desafios em crescimento com tecnologia
            </p>
          </div>

          {/* Links Section */}
          <div className="text-center">
            <h3 className="font-semibold text-foreground mb-4 text-sm">Serviços</h3>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li><a href="#servicos" className="hover:text-primary transition-colors">Sites & Sistemas</a></li>
              <li><a href="#servicos" className="hover:text-primary transition-colors">IA & Automação</a></li>
              <li><a href="#servicos" className="hover:text-primary transition-colors">Gestão de Operações</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="text-center md:text-right">
            <h3 className="font-semibold text-foreground mb-4 text-sm">Institucional</h3>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li><a href="#sobre" className="hover:text-primary transition-colors">Sobre</a></li>
              <li><a href="/privacy" className="hover:text-primary transition-colors">Política de Privacidade</a></li>
              <li><a href="/terms" className="hover:text-primary transition-colors">Termos de Serviço</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/30 pt-8">
          <div className="text-center">
            <p className="text-foreground/60 text-xs mb-2">
              {t("footer.copyright").replace("{year}", currentYear.toString())}
            </p>
            <p className="text-foreground/50 text-xs">
              {t("footer.rights")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
