import { Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-brand-purple-dark dark:bg-card text-white dark:text-foreground py-8 border-t border-white/10 dark:border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-secondary bg-clip-text text-transparent">
              Nova Syn
            </span>
          </div>

          {/* Copyright and Links */}
          <div className="text-center">
            <p className="text-white/60 dark:text-muted-foreground text-sm">
              ©️ {new Date().getFullYear()} — Novasyn LTDA
            </p>
            <div className="flex items-center justify-center gap-2 mt-2 text-xs text-white/50 dark:text-muted-foreground/70">
              <span>Todos os direitos reservados</span>
              <span>·</span>
              <a href="#" className="hover:text-primary transition-colors">
                Política de Privacidade
              </a>
              <span>·</span>
              <a href="#" className="hover:text-primary transition-colors">
                Termos de Serviço
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
