import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useWhatsAppTranslation } from "@/hooks/use-whatsapp-translation";
import WhatsAppHero from "@/components/whatsapp/WhatsAppHero";
import WhatsAppProblem from "@/components/whatsapp/WhatsAppProblem";
import WhatsAppSolution from "@/components/whatsapp/WhatsAppSolution";
import WhatsAppBenefits from "@/components/whatsapp/WhatsAppBenefits";
import WhatsAppTargetAudience from "@/components/whatsapp/WhatsAppTargetAudience";
import WhatsAppResults from "@/components/whatsapp/WhatsAppResults";
import WhatsAppCustomerLove from "@/components/whatsapp/WhatsAppCustomerLove";
import WhatsAppWaitlist from "@/components/whatsapp/WhatsAppWaitlist";
import WhatsAppFooter from "@/components/whatsapp/WhatsAppFooter";

const WhatsProduct = () => {
  const { t } = useWhatsAppTranslation();
  
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-4 left-0 right-0 z-50 mx-auto w-[95%] max-w-7xl animate-fade-down">
        <div className="bg-[hsl(25_95%_53%_/_0.1)] backdrop-blur-[40px] border border-[hsl(142_70%_45%_/_0.3)] rounded-3xl shadow-soft px-6 py-4 transition-smooth hover:shadow-[0_0_30px_rgba(255,127,39,0.3)] hover:bg-[hsl(25_95%_53%_/_0.15)]">
          <div className="flex items-center justify-between">
            {/* Logo - Esquerda */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="rounded-full text-[hsl(25_95%_53%)] hover:bg-[hsl(25_95%_53%_/_0.2)]" asChild>
                <a href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </a>
              </Button>
              <div className="flex items-center gap-2 group cursor-pointer">
                <img 
                  src="/vendeai-icon.svg" 
                  alt="VendeAI" 
                  className="w-10 h-10 group-hover:scale-110 transition-transform drop-shadow-lg"
                />
              </div>
            </div>

            {/* Actions - Direita */}
            <div className="flex items-center gap-2">
              <div className="[&_button]:text-[hsl(25_95%_53%)] [&_button]:hover:bg-[hsl(25_95%_53%_/_0.2)] [&_button]:hover:text-[hsl(25_95%_53%)]">
                <LanguageToggle />
              </div>
              <div className="[&_button]:text-[hsl(142_70%_45%)] [&_button]:hover:bg-[hsl(142_70%_45%_/_0.2)] [&_button]:hover:text-[hsl(142_70%_45%)]">
                <ThemeToggle />
              </div>
              <Button 
                variant="default" 
                size="sm" 
                className="hidden md:flex rounded-full transition-smooth hover:scale-105 bg-[hsl(25_95%_53%)] hover:bg-[hsl(25_95%_48%)] text-white shadow-[0_0_20px_rgba(255,127,39,0.5)] hover:shadow-[0_0_30px_rgba(255,127,39,0.7)]"
                onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t("hero.cta")}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <WhatsAppHero />
      <WhatsAppProblem />
      <WhatsAppSolution />
      <WhatsAppBenefits />
      <WhatsAppTargetAudience />
      <WhatsAppResults />
      <WhatsAppCustomerLove />
      <WhatsAppWaitlist />
      <WhatsAppFooter />
    </div>
  );
};

export default WhatsProduct;
