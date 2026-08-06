import bannerNoBg from '@/assets/logos/logotipo-x-bg.png';
import { useLanguage } from '@/contexts/LanguageContext';
import { Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background relative overflow-hidden border-t border-border/30 pt-24 pb-12 md:pt-40 md:pb-20">
      {/* Top gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(224,64,251,0.3), transparent)" }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top center, rgba(224,64,251,0.05) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16 opacity-0 animate-premium-fade">

          {/* ── Logo & Tagline ── */}
          <div className="col-span-1 md:col-span-5 flex flex-col items-center md:items-start space-y-7">
            <div className="transition-all duration-300 hover:opacity-100 opacity-90 hover:drop-shadow-[0_0_20px_rgba(224,64,251,0.35)] cursor-pointer">
              <img
                src={bannerNoBg}
                alt="NovaSyn"
                className="h-20 w-auto object-cover"
              />
            </div>
            <p className="text-sm md:text-base font-light text-muted-foreground/80 text-center md:text-left max-w-xs leading-relaxed">
              Transformamos desafios em crescimento com tecnologia de ponta e design focado no usuário.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.instagram.com/novasyn.ltda/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              >
                <Instagram className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <a
                href="https://www.linkedin.com/company/novasyn/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* ── Menu links ── */}
          <div className="col-span-1 md:col-span-3 text-center md:text-left md:pl-8 opacity-0 animate-premium-fade delay-100">
            <h3 className="font-semibold text-foreground/60 tracking-[0.2em] mb-7 text-[10px] uppercase">Menu</h3>
            <ul className="space-y-5 text-sm font-light text-muted-foreground">
              {[
                { label: "Sites & Sistemas", href: "#servicos" },
                { label: "IA & Automação", href: "#servicos" },
                { label: "Gestão de Operações", href: "#servicos" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="group flex items-center md:justify-start justify-center gap-2 hover:text-primary transition-colors duration-300">
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Institutional links ── */}
          <div className="col-span-1 md:col-span-4 text-center md:text-right opacity-0 animate-premium-fade delay-200">
            <h3 className="font-semibold text-foreground/60 tracking-[0.2em] mb-7 text-[10px] uppercase">Institucional</h3>
            <ul className="space-y-5 text-sm font-light text-muted-foreground flex flex-col items-center md:items-end">
              {[
                { label: "Sobre nós", href: "#sobre" },
                { label: "Política de Privacidade", href: "/privacy" },
                { label: "Termos de Serviço", href: "/terms" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="group flex items-center gap-2 hover:text-primary transition-colors duration-300">
                    <span className="group-hover:-translate-x-1 transition-transform duration-300">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Copyright ── */}
        <div className="border-t border-border/25 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 opacity-0 animate-premium-fade delay-300">
          <p className="text-muted-foreground/50 font-light text-xs tracking-wide">
            {t("footer.copyright").replace("{year}", currentYear.toString())}
          </p>
          <p className="text-muted-foreground/35 font-light text-xs tracking-wider uppercase">
            {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
