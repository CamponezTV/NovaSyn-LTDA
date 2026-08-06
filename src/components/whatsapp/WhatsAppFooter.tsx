import novasynLogo from '@/assets/logos/Logo-x-bg.png';

const WhatsAppFooter = () => {
  return (
    <footer className="bg-background py-8 border-t border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Logo */}
          <div className="flex items-center justify-center">
            <div className="w-14 h-14 flex items-center justify-center">
              <img
                src={novasynLogo}
                alt="NovaSyn Logo"
                className="w-full h-full object-contain"
                style={{ filter: "drop-shadow(0 0 12px rgba(224, 64, 251, 0.35))" }}
              />
            </div>
          </div>

          {/* Copyright and Links */}
          <div className="text-center">
            <p className="text-foreground/50 text-sm font-light">
              © {new Date().getFullYear()} — NovaSyn LTDA
            </p>
            <div className="flex items-center justify-center gap-2 mt-2 text-xs text-foreground/40">
              <span>Todos os direitos reservados</span>
              <span>·</span>
              <a href="/privacy" className="hover:text-primary transition-colors duration-300">
                Política de Privacidade
              </a>
              <span>·</span>
              <a href="/terms" className="hover:text-primary transition-colors duration-300">
                Termos de Serviço
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default WhatsAppFooter;
