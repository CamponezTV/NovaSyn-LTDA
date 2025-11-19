import { Clock, Smartphone, Award, Package, Heart } from "lucide-react";
import { useWhatsAppTranslation } from "@/hooks/use-whatsapp-translation";

const WhatsAppCustomerLove = () => {
  const { t } = useWhatsAppTranslation();
  
  const reasons = [
    {
      icon: Clock,
      title: t("customerLove.reasons.1.title"),
      description: t("customerLove.reasons.1.description"),
      color: "from-[hsl(25_95%_53%)] to-[hsl(142_70%_45%)]"
    },
    {
      icon: Smartphone,
      title: t("customerLove.reasons.2.title"),
      description: t("customerLove.reasons.2.description"),
      color: "from-[hsl(142_70%_45%)] to-[hsl(25_95%_53%)]"
    },
    {
      icon: Award,
      title: t("customerLove.reasons.3.title"),
      description: t("customerLove.reasons.3.description"),
      color: "from-[hsl(25_95%_53%)] to-[hsl(142_70%_45%)]"
    },
    {
      icon: Package,
      title: t("customerLove.reasons.4.title"),
      description: t("customerLove.reasons.4.description"),
      color: "from-[hsl(25_95%_53%)] via-[hsl(142_70%_45%)] to-[hsl(25_95%_53%)]"
    }
  ];

  return (
    <section className="py-32 px-4 bg-gradient-to-b from-[hsl(142_70%_45%_/_0.06)] via-[hsl(142_70%_45%_/_0.08)] to-[hsl(25_95%_53%_/_0.05)] relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-[hsl(25_95%_53%_/_0.08)] via-[hsl(142_70%_45%_/_0.08)] to-[hsl(25_95%_53%_/_0.08)] rounded-full blur-3xl animate-pulse-glow -z-10" />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-5">
          <div className="inline-block text-6xl mb-4 animate-bounce-in">
            <Heart className="w-20 h-20 animate-pulse-glow text-[hsl(142_70%_45%)]"/>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight">
            {t("customerLove.title")}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div 
                key={index}
                className="group relative p-10 bg-card rounded-3xl border-2 border-border hover:border-[hsl(142_70%_45%)] transition-all duration-500 hover:shadow-2xl text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s`, opacity: 0, animationFillMode: 'forwards' }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`} />
                
                <div className="relative">
                  <div className={`inline-flex w-20 h-20 rounded-3xl bg-gradient-to-br ${reason.color} items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                    <Icon className="w-10 h-10 text-white" strokeWidth={2.5} />
                  </div>
                  
                  <h3 className="text-2xl font-black mb-3">{reason.title}</h3>
                  <p className="text-muted-foreground font-medium leading-relaxed">{reason.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        <p className="text-center text-2xl md:text-3xl font-black bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
          {t("customerLove.conclusion")}
        </p>
      </div>
    </section>
  );
};

export default WhatsAppCustomerLove;
