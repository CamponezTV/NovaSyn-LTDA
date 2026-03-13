import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { validateFormData, checkHoneypot } from "@/lib/security";
import { rateLimiter, getClientIdentifier } from "@/lib/rate-limit";
import { Send } from "lucide-react";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
    },
  },
};

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
    <section id="contato" className="py-16 md:py-32 lg:py-48 bg-background relative overflow-hidden flex items-center justify-center">
      {/* Absolute Minimalism Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none dark:hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-primary/[0.04] rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          <motion.div 
            className="space-y-8 lg:pr-12 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-[4.5rem] font-bold tracking-tighter text-foreground leading-[1.1]">
              {t("contact.title")}
            </motion.h2>
            <motion.div variants={itemVariants} className="h-[1px] w-16 bg-gradient-to-r from-primary/50 to-transparent mx-auto lg:mx-0"></motion.div>
            <motion.p variants={itemVariants} className="text-xl md:text-2xl font-light text-muted-foreground leading-relaxed md:leading-relaxed">
              {t("contact.subtitle")}
            </motion.p>
            <motion.div variants={itemVariants} className="pt-8 hidden lg:block">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-border/50 bg-white/5 dark:bg-white/[0.02] text-sm text-muted-foreground backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary/80"></span>
                </span>
                Disponível para novos projetos
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.2 }}
          >
            <div className="glass-card p-8 md:p-12 relative overflow-hidden group hover:border-primary/20 hover:shadow-glow transition-all duration-700">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10 w-full">
                <div className="space-y-4">
                  <div className="group/input relative">
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t("contact.namePlaceholder")}
                      required
                      className="h-14 bg-background/50 border-border/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-base px-6 rounded-2xl placeholder:font-light"
                    />
                  </div>

                  <div className="group/input relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t("contact.emailPlaceholder")}
                      required
                      className="h-14 bg-background/50 border-border/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-base px-6 rounded-2xl placeholder:font-light"
                    />
                  </div>

                  <div className="group/input relative">
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t("contact.messagePlaceholder")}
                      required
                      className="min-h-[160px] bg-background/50 border-border/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-base px-6 py-5 rounded-2xl resize-none placeholder:font-light"
                    />
                  </div>
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

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="magnetic-button w-full h-14 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-glow transition-all font-medium text-base tracking-wide flex items-center justify-center gap-3 group/submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Enviando..." : t("contact.send")}
                    {!isLoading && <Send className="w-4 h-4 group-hover/submit:translate-x-1 group-hover/submit:-translate-y-1 transition-transform" strokeWidth={2} />}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
