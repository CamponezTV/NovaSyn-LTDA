import novasynLogo from '@/assets/logos/logo_1.png';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background dark:bg-background py-8 border-t border-[#6D28D9]/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Logo */}
          <div className="flex items-center justify-center">
            <div className="w-20 h-20 flex items-center justify-center">
              <img 
                src={novasynLogo} 
                alt="NovaSyn Logo" 
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
          </div>

          {/* Copyright and Links */}
          <div className="text-center">
            <p className="text-foreground/60 text-sm">
              {t("footer.copyright").replace("{year}", currentYear.toString())}
            </p>
            <div className="flex items-center justify-center gap-2 mt-2 text-xs text-foreground/50">
              <span>{t("footer.rights")}</span>
              <span>·</span>
              <a href="/privacy" className="hover:text-[#6D28D9] transition-colors">
                {t("footer.privacy")}
              </a>
              <span>·</span>
              <a href="/terms" className="hover:text-[#6D28D9] transition-colors">
                {t("footer.terms")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
