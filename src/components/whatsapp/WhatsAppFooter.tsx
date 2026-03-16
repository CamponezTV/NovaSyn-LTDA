import novasynLogo from '@/assets/logos/logo_1.webp';

const WhatsAppFooter = () => {
  return (
    <footer className="bg-background dark:bg-background py-8 border-t border-[hsl(25_95%_53%_/_0.2)]">
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
              ©️ {new Date().getFullYear()} — Novasyn LTDA
            </p>
            <div className="flex items-center justify-center gap-2 mt-2 text-xs text-foreground/50">
              <span>Todos os direitos reservados</span>
              <span>·</span>
              <a href="#" className="hover:text-[hsl(25_95%_53%)] transition-colors">
                Política de Privacidade
              </a>
              <span>·</span>
              <a href="#" className="hover:text-[hsl(25_95%_53%)] transition-colors">
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
