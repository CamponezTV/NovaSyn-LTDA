import { TrendingUp, RotateCcw, Repeat, Users, Palette, Medal, HandHeart } from "lucide-react";
import { useWhatsAppTranslation } from "@/hooks/use-whatsapp-translation";

const WhatsAppBenefits = () => {
  const { t } = useWhatsAppTranslation();
  
  const benefits = [
    {
      icon: HandHeart,
      title: t("benefits.productivity"),
      description: t("benefits.productivity.desc")
    },
    {
      icon: TrendingUp,
      title: t("benefits.quality"),
      description: t("benefits.quality.desc")
    },
    {
      icon: RotateCcw,
      title: t("benefits.learning"),
      description: t("benefits.learning.desc")
    },
    {
      icon: Repeat,
      title: t("benefits.sell"),
      description: t("benefits.sell.desc")
    },
    {
      icon: Users,
      title: t("benefits.track"),
      description: t("benefits.track.desc")
    },
    {
      icon: Palette,
      title: t("benefits.you"),
      description: t("benefits.you.desc")
    }
  ];

  return (
    <section className="py-32 px-4 bg-gradient-to-b from-[hsl(142_70%_45%_/_0.05)] via-[hsl(142_70%_45%_/_0.08)] to-[hsl(25_95%_53%_/_0.04)] relative overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[hsl(142_70%_45%_/_0.12)] rounded-full blur-3xl animate-float -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[hsl(25_95%_53%_/_0.08)] rounded-full blur-3xl animate-float -z-10" style={{ animationDelay: '2s' }} />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-5">
          <div className="inline-block text-6xl">
            <Medal className="w-20 h-20 animate-float text-[hsl(25_95%_53%)]" />
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight">
            {t("benefits.title")}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="group relative p-8 bg-card rounded-3xl border-2 border-border hover:border-[hsl(25_95%_53%)] transition-all duration-500 hover:shadow-2xl animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(25_95%_53%_/_0.05)] via-[hsl(142_70%_45%_/_0.05)] to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500" />
                
                <div className="relative space-y-4">
                  <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-[hsl(25_95%_53%)] to-[hsl(142_70%_45%)] items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-black">{item.title}</h3>
                    <p className="text-muted-foreground font-medium leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatsAppBenefits;
