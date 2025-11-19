import { TrendingUp, ShoppingCart, Users, Heart, ChartNoAxesCombined } from "lucide-react";
import { useWhatsAppTranslation } from "@/hooks/use-whatsapp-translation";

const WhatsAppResults = () => {
  const { t } = useWhatsAppTranslation();
  
  const results = [
    {
      icon: TrendingUp,
      metric: t("results.metrics.1.value"),
      description: t("results.metrics.1.description"),
      color: "from-[hsl(25_95%_53%)] to-[hsl(142_70%_45%)]"
    },
    {
      icon: ShoppingCart,
      metric: t("results.metrics.2.value"),
      description: t("results.metrics.2.description"),
      color: "from-[hsl(142_70%_45%)] to-[hsl(25_95%_53%)]"
    },
    {
      icon: Users,
      metric: t("results.metrics.3.value"),
      description: t("results.metrics.3.description"),
      color: "from-[hsl(25_95%_53%)] to-[hsl(142_70%_45%)]"
    },
    {
      icon: Heart,
      metric: t("results.metrics.4.value"),
      description: t("results.metrics.4.description"),
      color: "from-[hsl(25_95%_53%)] via-[hsl(142_70%_45%)] to-[hsl(25_95%_53%)]"
    }
  ];

  return (
    <section className="py-32 px-4 bg-gradient-to-b from-[hsl(25_95%_53%_/_0.05)] to-[hsl(142_70%_45%_/_0.06)] relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[hsl(25_95%_53%_/_0.08)] via-[hsl(142_70%_45%_/_0.08)] to-[hsl(25_95%_53%_/_0.08)] rounded-full blur-3xl animate-pulse-glow -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-5">
          <div className="inline-block text-6xl animate-bounce-in">
            <ChartNoAxesCombined className="w-20 h-20 animate-pulse-glow text-[hsl(25_95%_53%)]"/>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight">
            {t("results.title")}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {results.map((result, index) => {
            const Icon = result.icon;
            return (
              <div 
                key={index}
                className="group text-center p-10 bg-card rounded-3xl border-2 border-border hover:border-[hsl(25_95%_53%)] transition-all duration-500 hover:shadow-2xl hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s`, opacity: 0, animationFillMode: 'forwards' }}
              >
                <div className="relative">
                  <div className={`inline-flex w-20 h-20 rounded-3xl bg-gradient-to-br ${result.color} items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                    <Icon className="w-10 h-10 text-white" strokeWidth={2.5} />
                  </div>
                  
                  <div className="text-5xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
                    {result.metric}
                  </div>
                  
                  <p className="text-sm font-bold text-muted-foreground leading-relaxed">
                    {result.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        <p className="text-center text-sm text-muted-foreground italic font-medium max-w-2xl mx-auto">
          {t("results.footnote")}
        </p>
      </div>
    </section>
  );
};

export default WhatsAppResults;
