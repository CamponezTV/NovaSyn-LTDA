import { Shirt, Dog, Sparkles, Dumbbell, BriefcaseBusiness, Gift, Package, X, SmilePlus, MousePointerClick } from "lucide-react";
import { useWhatsAppTranslation } from "@/hooks/use-whatsapp-translation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import logoQuadBranco from '@/assets/logos/logo_quad_fundo_branco.png';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const WhatsAppTargetAudience = () => {
  const { t } = useWhatsAppTranslation();
  const [selectedSegment, setSelectedSegment] = useState<number | null>(null);
  
  const segmentLogos: Record<number, string[]> = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [logoQuadBranco],
    5: [],
  };

  const segments = [
    { icon: Shirt, name: t("targetAudience.segments.1"), color: "from-[hsl(25_95%_53%)] to-[hsl(25_95%_53%_/_0.7)]" },
    { icon: Dog, name: t("targetAudience.segments.2"), color: "from-[hsl(142_70%_45%)] to-[hsl(142_70%_45%_/_0.7)]" },
    { icon: Sparkles, name: t("targetAudience.segments.3"), color: "from-[hsl(25_95%_53%)] to-[hsl(142_70%_45%)]" },
    { icon: Dumbbell, name: t("targetAudience.segments.4"), color: "from-[hsl(142_70%_45%)] to-[hsl(25_95%_53%)]" },
    { icon: BriefcaseBusiness, name: t("targetAudience.segments.5"), color: "from-[hsl(25_95%_53%)] to-[hsl(142_70%_45%)]" },
    { icon: Gift, name: t("targetAudience.segments.6"), color: "from-[hsl(142_70%_45%)] to-[hsl(25_95%_53%)]" }
  ];

  return (
    <section id="target-audience" className="py-32 px-4 bg-gradient-to-b from-[hsl(25_95%_53%_/_0.04)] via-[hsl(142_70%_45%_/_0.06)] to-[hsl(25_95%_53%_/_0.05)] relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[hsl(25_95%_53%_/_0.1)] rounded-full blur-3xl animate-float -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[hsl(142_70%_45%_/_0.1)] rounded-full blur-3xl animate-float -z-10" />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-5">
          <div className="inline-block text-6xl animate-bounce-in">
            <Package className="h-20 w-20 animate-pulse-glow text-[hsl(25_95%_53%)]" />
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight">
            {t("targetAudience.title")}
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium">
            {t("targetAudience.subtitle")}
          </p>
        </div>
        
        <div className="relative mb-12">
          {selectedSegment === null ? (
            // Grid of all segments
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {segments.map((segment, index) => {
                const Icon = segment.icon;
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedSegment(index)}
                    className="group relative flex items-center gap-5 p-8 bg-card rounded-3xl border-2 border-border hover:border-[hsl(25_95%_53%)] transition-all duration-500 hover:shadow-2xl hover:scale-105 cursor-pointer"
                  >
                    <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${segment.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                    </div>
                    <p className="text-lg font-bold leading-tight">{segment.name}</p>

                    {/* Click hint icon */}
                    <div className="pointer-events-none absolute right-4 top-4 text-muted-foreground/70 group-hover:text-primary transition-colors">
                      <MousePointerClick className="w-5 h-5" />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // Carousel view
            <div className="w-full">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  {(() => {
                    const Icon = segments[selectedSegment].icon;
                    return (
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${segments[selectedSegment].color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                      </div>
                    );
                  })()}
                  <h3 className="text-xl font-bold">{segments[selectedSegment].name}</h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedSegment(null)}
                  className="rounded-full hover:bg-secondary/20"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {segmentLogos[selectedSegment].length > 0 ? (
                // Show carousel if there are logos
                <Carousel
                  opts={{
                    align: "center",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {segmentLogos[selectedSegment].map((logo, idx) => (
                      <CarouselItem key={idx} className="md:basis-1/3 lg:basis-1/4">
                        <div className="p-2">
                          <div className="rounded-xl overflow-hidden aspect-square bg-card border-2 border-border shadow-lg p-6 flex items-center justify-center">
                            <img 
                              src={logo} 
                              alt={`Logo ${idx + 1}`}
                              className="w-full h-full object-contain" 
                            />
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex items-center justify-center gap-4 mt-8">
                    <CarouselPrevious className="static" />
                    <CarouselNext className="static" />
                  </div>
                </Carousel>
              ) : (
                // Show CTA button if no logos
                <div className="flex flex-col items-center justify-center py-16 px-4">
                  <Button 
                    size="lg"
                    variant="outline"
                    className="group relative overflow-hidden rounded-full px-8 py-6 hover:border-primary transition-all duration-500"
                    onClick={() => {
                      const waitlistSection = document.getElementById('waitlist');
                      waitlistSection?.scrollIntoView({ behavior: 'smooth' });
                      setSelectedSegment(null);
                    }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 group-hover:opacity-100 opacity-0 transition-opacity duration-500" />
                    <SmilePlus className="w-10 h-10 mr-2 text-primary group-hover:text-white transition-colors duration-500 group-hover:animate-pulse" />
                    <span className="text-lg font-semibold group-hover:text-white group-hover:animate-pulse">{t("targetAudience.first")}</span>
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
        
        <p className="text-center text-2xl md:text-3xl font-black bg-gradient-to-r from-[hsl(25_95%_53%)] via-[hsl(142_70%_45%)] to-[hsl(25_95%_53%)] bg-clip-text text-transparent">
          {t("targetAudience.conclusion")}
        </p>
      </div>
    </section>
  );
};

export default WhatsAppTargetAudience;
