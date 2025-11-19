import { CheckCircle2, MessageCircle, Package, TrendingUp, CreditCard, MapPin, Heart, Rocket } from "lucide-react";
import { useWhatsAppTranslation } from "@/hooks/use-whatsapp-translation";

const WhatsAppSolution = () => {
  const { t } = useWhatsAppTranslation();

  const features = [
    { icon: MessageCircle, text: t("solution.features.1"), color: "from-[hsl(25_95%_53%)] to-[hsl(25_95%_53%_/_0.7)]" },
    { icon: Package, text: t("solution.features.2"), color: "from-[hsl(142_70%_45%)] to-[hsl(142_70%_45%_/_0.7)]" },
    { icon: TrendingUp, text: t("solution.features.3"), color: "from-[hsl(25_95%_53%)] to-[hsl(142_70%_45%)]" },
    { icon: MapPin, text: t("solution.features.4"), color: "from-[hsl(142_70%_45%)] to-[hsl(25_95%_53%)]" },
    { icon: CreditCard, text: t("solution.features.5"), color: "from-[hsl(25_95%_53%)] to-[hsl(142_70%_45%)]" },
    { icon: Heart, text: t("solution.features.7"), color: "from-[hsl(142_70%_45%)] to-[hsl(25_95%_53%)]" }
  ];

  return (
    <section className="py-32 px-4 bg-gradient-to-b from-[hsl(142_70%_45%_/_0.04)] via-[hsl(25_95%_53%_/_0.05)] to-[hsl(142_70%_45%_/_0.05)] relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[hsl(25_95%_53%_/_0.12)] rounded-full blur-3xl animate-float -z-10" 
           style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-[hsl(142_70%_45%_/_0.1)] rounded-full blur-3xl animate-float -z-10" 
           style={{ animationDelay: '3s' }} />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-5">
          <div className="inline-block text-6xl">
            <Rocket className="w-20 h-20 animate-float text-[hsl(142_70%_45%)]"/>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight">
            {t("solution.title")}
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium">
            <span className="font-black text-transparent bg-gradient-to-r from-[hsl(25_95%_53%)] to-[hsl(142_70%_45%)] bg-clip-text">{t("solution.subtitle.highlight")}</span> 
            {t("solution.subtitle")}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="group relative p-8 bg-card rounded-3xl border-2 border-border hover:border-[hsl(25_95%_53%_/_0.5)] transition-all duration-500 hover:shadow-2xl hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`} />
                <div className="relative flex items-start gap-4">
                  <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </div>
                  <p className="text-base font-bold leading-relaxed pt-3">{feature.text}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        <p className="text-center text-2xl md:text-3xl font-black bg-gradient-to-r from-[hsl(25_95%_53%)] via-[hsl(142_70%_45%)] to-[hsl(25_95%_53%)] bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
          {t("solution.conclusion")}
        </p>
      </div>
    </section>
  );
};

export default WhatsAppSolution;
