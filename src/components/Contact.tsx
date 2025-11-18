import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: t("contact.success"),
      description: "Entraremos em contato em breve.",
    });
    
    setIsLoading(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contato" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-purple-dark dark:text-foreground animate-fade-up">
              {t("contact.title")}
            </h2>
            <p className="text-lg text-muted-foreground animate-fade-up animation-delay-100">
              {t("contact.subtitle")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 animate-scale-up animation-delay-200">
            <div className="space-y-2 animate-fade-up animation-delay-300">
              <Label htmlFor="name" className="text-foreground font-medium">
                {t("contact.name")}
              </Label>
              <Input
                id="name"
                placeholder={t("contact.namePlaceholder")}
                required
                className="h-12 transition-smooth focus:scale-[1.02] focus:shadow-glow"
              />
            </div>

            <div className="space-y-2 animate-fade-up animation-delay-400">
              <Label htmlFor="email" className="text-foreground font-medium">
                {t("contact.email")}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={t("contact.emailPlaceholder")}
                required
                className="h-12 transition-smooth focus:scale-[1.02] focus:shadow-glow"
              />
            </div>

            <div className="space-y-2 animate-fade-up animation-delay-500">
              <Label htmlFor="message" className="text-foreground font-medium">
                {t("contact.message")}
              </Label>
              <Textarea
                id="message"
                placeholder={t("contact.messagePlaceholder")}
                required
                className="min-h-[150px] transition-smooth focus:scale-[1.02] focus:shadow-glow"
              />
            </div>

            <div className="animate-fade-up animation-delay-600">
              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full transition-smooth hover:scale-105"
                disabled={isLoading}
              >
                {isLoading ? "..." : t("contact.send")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
