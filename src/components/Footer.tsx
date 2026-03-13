import novasynLogo from '@/assets/logos/logo_1.png';
import { useLanguage } from '@/contexts/LanguageContext';
import { Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background relative overflow-hidden border-t border-border/50 pt-32 pb-16 md:pt-48 md:pb-24">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-12 mb-24 opacity-0 animate-premium-fade">
          {/* Logo Section */}
          <div className="col-span-1 md:col-span-5 flex flex-col items-center md:items-start space-y-8">
            <div className="w-14 h-14 flex items-center justify-center opacity-80 transition-all duration-300 hover:opacity-100 hover:scale-105 hover:drop-shadow-[0_0_15px_rgba(109,40,217,0.3)] cursor-pointer">
              <img 
                src={novasynLogo} 
                alt="NovaSyn Logo" 
                className="w-full h-full object-contain drop-shadow-sm"
              />
            </div>
            <p className="text-base md:text-lg font-light text-muted-foreground/90 text-center md:text-left max-w-sm leading-relaxed">
              Transformamos desafios em crescimento com tecnologia de ponta e design focado no usuário.
            </p>
            <div className="flex items-center gap-5 pt-2">
              <a href="https://www.instagram.com/novasyn.ltda/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full glass-card border-border/40 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 hover:scale-110">
                <Instagram className="w-5 h-5" strokeWidth={1.5} />
              </a>
              <a href="https://www.linkedin.com/company/novasyn/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full glass-card border-border/40 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 hover:scale-110">
                <Linkedin className="w-5 h-5" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="col-span-1 md:col-span-3 text-center md:text-left md:pl-12 opacity-0 animate-premium-fade delay-100">
            <h3 className="font-semibold text-foreground tracking-widest mb-8 text-xs uppercase">Menu</h3>
            <ul className="space-y-6 text-[15px] font-light text-muted-foreground">
              <li>
                <a href="#servicos" className="group hidden-arrow flex items-center md:justify-start justify-center gap-2 hover:text-primary transition-colors duration-300">
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Sites & Sistemas</span>
                </a>
              </li>
              <li>
                <a href="#servicos" className="group hidden-arrow flex items-center md:justify-start justify-center gap-2 hover:text-primary transition-colors duration-300">
                  <span className="group-hover:translate-x-1 transition-transform duration-300">IA & Automação</span>
                </a>
              </li>
              <li>
                <a href="#servicos" className="group hidden-arrow flex items-center md:justify-start justify-center gap-2 hover:text-primary transition-colors duration-300">
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Gestão de Operações</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-span-1 md:col-span-4 text-center md:text-right opacity-0 animate-premium-fade delay-200">
            <h3 className="font-semibold text-foreground tracking-widest mb-8 text-xs uppercase">Institucional</h3>
            <ul className="space-y-6 text-[15px] font-light text-muted-foreground flex flex-col items-center md:items-end">
              <li>
                <a href="#sobre" className="group hidden-arrow flex items-center gap-2 hover:text-primary transition-colors duration-300">
                  <span className="group-hover:-translate-x-1 md:group-hover:-translate-x-2 transition-transform duration-300">Sobre nós</span>
                </a>
              </li>
              <li>
                <a href="/privacy" className="group hidden-arrow flex items-center gap-2 hover:text-primary transition-colors duration-300">
                  <span className="group-hover:-translate-x-1 md:group-hover:-translate-x-2 transition-transform duration-300">Política de Privacidade</span>
                </a>
              </li>
              <li>
                <a href="/terms" className="group hidden-arrow flex items-center gap-2 hover:text-primary transition-colors duration-300">
                  <span className="group-hover:-translate-x-1 md:group-hover:-translate-x-2 transition-transform duration-300">Termos de Serviço</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-border/40 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 opacity-0 animate-premium-fade delay-300">
          <div className="text-center md:text-left">
            <p className="text-muted-foreground/60 font-light text-xs tracking-wide">
              {t("footer.copyright").replace("{year}", currentYear.toString())}
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-muted-foreground/50 font-light text-xs tracking-wider uppercase">
              {t("footer.rights")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
