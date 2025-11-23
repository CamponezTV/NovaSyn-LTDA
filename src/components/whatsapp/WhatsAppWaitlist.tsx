import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Flame, Sparkles, ScrollText } from "lucide-react";
import { useWhatsAppTranslation } from "@/hooks/use-whatsapp-translation";
import { sendWaitlistEmail } from "@/services/email";
import { checkHoneypot } from "@/lib/security";
import type { WaitlistFormData } from "@/types/form";

const WhatsAppWaitlist = () => {
  const { toast } = useToast();
  const { t } = useWhatsAppTranslation();
  const [loading, setLoading] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [formData, setFormData] = useState<WaitlistFormData>({
    storeName: "",
    segment: "",
    whatsapp: "",
    email: "",
    location: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Honeypot check - bots will fill this hidden field
      const honeypotEnabled = import.meta.env.VITE_ENABLE_HONEYPOT !== 'false';
      if (honeypotEnabled && !checkHoneypot(honeypot)) {
        console.warn('Honeypot triggered - potential bot detected');
        // Silent fail for bots
        setTimeout(() => {
          toast({
            title: t("waitlist.toast.title"),
            description: t("waitlist.toast.description"),
          });
          setFormData({ storeName: "", segment: "", whatsapp: "", email:"", location: "" });
          setLoading(false);
        }, 2000);
        return;
      }

      const response = await sendWaitlistEmail(formData);
      
      if (response.success) {
        toast({
          title: t("waitlist.toast.title"),
          description: t("waitlist.toast.description"),
        });
        setFormData({ storeName: "", segment: "", whatsapp: "", email:"", location: "" });
        setHoneypot("");
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error('Failed to submit form:', error);
      toast({
        title: t("error"),
        description: error instanceof Error ? error.message : t("waitlist.toast.error"),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist" className="py-32 px-4 bg-gradient-to-b from-[hsl(25_95%_53%_/_0.05)] via-[hsl(25_95%_53%_/_0.08)] to-[hsl(142_70%_45%_/_0.06)] relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-[hsl(25_95%_53%_/_0.12)] rounded-full blur-3xl animate-float -z-10" />
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-[hsl(142_70%_45%_/_0.1)] rounded-full blur-3xl animate-float -z-10" 
           style={{ animationDelay: '2s' }} />
      
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 space-y-6">
          <div className="inline-block text-6xl">
            <ScrollText className="w-20 h-20 animate-float" />
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight">
            {t("waitlist.title")}
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium">
            {t("waitlist.subtitle")}
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-destructive/20 to-destructive/10 rounded-full border-2 border-destructive/30 animate-pulse-glow">
            <Flame className="w-5 h-5 text-destructive" />
            <span className="font-black text-destructive text-sm">{t("waitlist.spots")}</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="relative p-8 md:p-12 bg-card rounded-3xl border-2 border-border shadow-2xl space-y-6 animate-scale-in hover:border-[hsl(25_95%_53%)] transition-all duration-500">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(25_95%_53%_/_0.05)] via-[hsl(142_70%_45%_/_0.05)] to-[hsl(25_95%_53%_/_0.05)] rounded-3xl -z-10" />
          
          <div className="space-y-3">
            <label htmlFor="storeName" className="text-sm font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[hsl(25_95%_53%)]" />
              {t("waitlist.form.storeName.label")}
            </label>
            <Input
              id="storeName"
              required
              value={formData.storeName}
              onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
              placeholder={t("waitlist.form.storeName.placeholder")}
              className="h-14 text-base border-2 focus:border-[hsl(25_95%_53%)] rounded-xl transition-all duration-300"
            />
          </div>
          
          <div className="space-y-3">
            <label htmlFor="segment" className="text-sm font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[hsl(142_70%_45%)]" />
              {t("waitlist.form.segment.label")}
            </label>
            <Input
              id="segment"
              required
              value={formData.segment}
              onChange={(e) => setFormData({ ...formData, segment: e.target.value })}
              placeholder={t("waitlist.form.segment.placeholder")}
              className="h-14 text-base border-2 focus:border-[hsl(142_70%_45%)] rounded-xl transition-all duration-300"
            />
          </div>
          
          <div className="space-y-3">
            <label htmlFor="whatsapp" className="text-sm font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[hsl(25_95%_53%)]" />
              {t("waitlist.form.whatsapp.label")}
            </label>
            <Input
              id="whatsapp"
              type="tel"
              required
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              placeholder={t("waitlist.form.whatsapp.placeholder")}
              className="h-14 text-base border-2 focus:border-[hsl(25_95%_53%)] rounded-xl transition-all duration-300"
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="Email" className="text-sm font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[hsl(142_70%_45%)]" />
              {t("waitlist.form.email.label")}
            </label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder={t("waitlist.form.email.placeholder")}
              className="h-14 text-base border-2 focus:border-[hsl(142_70%_45%)] rounded-xl transition-all duration-300"
            />
          </div>
          
          <div className="space-y-3">
            <label htmlFor="location" className="text-sm font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              {t("waitlist.form.location.label")}
            </label>
            <Input
              id="location"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder={t("waitlist.form.location.placeholder")}
              className="h-14 text-base border-2 focus:border-primary rounded-xl transition-all duration-300"
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
          
          <Button
            type="submit"
            variant="hero"
            size="lg"
            className="w-full text-base sm:text-lg h-16 mt-8 rounded-xl flex items-center justify-center gap-3 px-4"
            disabled={loading}
          >
            <Flame className="flex-shrink-0 w-5 h-5 animate-pulse-glow" />
            <span className="whitespace-normal text-center leading-tight">
              {loading ? t("loading") : t("waitlist.cta")}
            </span>
          </Button>
        </form>
      </div>
    </section>
  );
};

export default WhatsAppWaitlist;
