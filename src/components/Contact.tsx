import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { validateFormData, checkHoneypot } from "@/lib/security";
import { rateLimiter, getClientIdentifier } from "@/lib/rate-limit";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Honeypot check
      const honeypotEnabled = import.meta.env.VITE_ENABLE_HONEYPOT !== 'false';
      if (honeypotEnabled && !checkHoneypot(honeypot)) {
        console.warn('Honeypot triggered - potential bot detected');
        setTimeout(() => {
          toast({
            title: t("contact.success"),
            description: "Entraremos em contato em breve.",
          });
          setIsLoading(false);
        }, 2000);
        return;
      }

      // Rate limiting
      const rateLimitEnabled = import.meta.env.VITE_ENABLE_RATE_LIMIT !== 'false';
      if (rateLimitEnabled) {
        const clientId = getClientIdentifier();
        if (!rateLimiter.isAllowed(clientId)) {
          const resetTime = rateLimiter.getTimeUntilReset(clientId);
          const minutes = Math.ceil(resetTime / 60000);
          toast({
            title: "Muitas requisições",
            description: `Por favor, aguarde ${minutes} minuto(s) antes de tentar novamente.`,
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        rateLimiter.recordRequest(clientId);
      }

      // Validate and sanitize
      const validation = validateFormData(formData);
      if (!validation.isValid) {
        toast({
          title: "Dados inválidos",
          description: Object.values(validation.errors).join(', '),
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Send via Brevo
      const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY;
      const RECIPIENT_EMAIL = import.meta.env.VITE_RECIPIENT_EMAIL || "contato@novasyn.com.br";
      const SENDER_EMAIL = import.meta.env.VITE_SENDER_EMAIL || "noreply@novasyn.com.br";

      if (!BREVO_API_KEY) {
        console.error("Brevo API key not configured");
        toast({
          title: t("contact.success"),
          description: "Entraremos em contato em breve.",
        });
        (e.target as HTMLFormElement).reset();
        setFormData({ name: "", email: "", message: "" });
        setHoneypot("");
        setIsLoading(false);
        return;
      }

      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "api-key": BREVO_API_KEY,
        },
        body: JSON.stringify({
          sender: {
            name: "NovaSyn - Contato",
            email: SENDER_EMAIL
          },
          to: [{
            email: RECIPIENT_EMAIL,
            name: "NovaSyn Team"
          }],
          subject: `Novo contato: ${validation.sanitized.name}`,
          htmlContent: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #6D28D9 0%, #8B5CF6 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
                .field { margin-bottom: 15px; padding: 10px; background: white; border-radius: 4px; }
                .label { font-weight: bold; color: #6D28D9; }
                .value { margin-top: 5px; }
                .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2 style="margin: 0;">📧 Novo Contato pelo Site!</h2>
                </div>
                <div class="content">
                  <div class="field">
                    <div class="label">👤 Nome:</div>
                    <div class="value">${validation.sanitized.name}</div>
                  </div>
                  <div class="field">
                    <div class="label">📧 Email:</div>
                    <div class="value">${validation.sanitized.email}</div>
                  </div>
                  <div class="field">
                    <div class="label">💬 Mensagem:</div>
                    <div class="value">${validation.sanitized.message}</div>
                  </div>
                  <div class="footer">
                    <p>Enviado em: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</p>
                    <p>Sistema de Contato - NovaSyn</p>
                  </div>
                </div>
              </div>
            </body>
            </html>
          `
        })
      });

      if (!response.ok) {
        throw new Error("Falha ao enviar email");
      }

      toast({
        title: t("contact.success"),
        description: "Entraremos em contato em breve.",
      });
      
      (e.target as HTMLFormElement).reset();
      setFormData({ name: "", email: "", message: "" });
      setHoneypot("");

      // Track conversion in Google Analytics
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', 'form_submit', {
          event_category: 'engagement',
          event_label: 'contact_form'
        });
      }

    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: "Erro ao enviar",
        description: "Por favor, tente novamente ou entre em contato por email.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contato" className="py-32 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold text-brand-purple-dark dark:text-foreground">
              {t("contact.title")}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t("contact.subtitle")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 bg-background border border-border/50 rounded-lg p-8 shadow-md hover:shadow-lg transition-all">
            <div className="space-y-2 animate-fade-up animation-delay-300">
              <Label htmlFor="name" className="text-foreground font-medium text-sm">
                {t("contact.name")}
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t("contact.namePlaceholder")}
                required
                className="h-10 border-border/50 focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2 animate-fade-up animation-delay-400">
              <Label htmlFor="email" className="text-foreground font-medium text-sm">
                {t("contact.email")}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={t("contact.emailPlaceholder")}
                required
                className="h-10 border-border/50 focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2 animate-fade-up animation-delay-500">
              <Label htmlFor="message" className="text-foreground font-medium text-sm">
                {t("contact.message")}
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={t("contact.messagePlaceholder")}
                required
                className="min-h-[120px] border-border/50 focus:border-primary transition-colors resize-none"
              />
            </div>

            {/* Honeypot field - hidden from users, visible to bots */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website (don't fill)</label>
              <Input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
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
                {isLoading ? "Enviando..." : t("contact.send")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
