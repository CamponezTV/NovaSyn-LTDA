import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Bot, BarChart3 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const services = [
  {
    icon: Globe,
    titleKey: "services.web.title",
    descriptionKey: "services.web.description",
  },
  {
    icon: Bot,
    titleKey: "services.ai.title",
    descriptionKey: "services.ai.description",
  },
  {
    icon: BarChart3,
    titleKey: "services.management.title",
    descriptionKey: "services.management.description",
  },
];

const Services = () => {
  const { t } = useLanguage();

  return (
    <section id="servicos" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-purple-dark dark:text-foreground animate-fade-up">
            {t("services.title")}
          </h2>
          <p className="text-lg text-muted-foreground animate-fade-up animation-delay-100">
            {t("services.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover-lift border-2 hover:border-primary transition-smooth animate-scale-up bg-card/50 backdrop-blur-sm"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader>
                <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-smooth shadow-soft">
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                  {t(service.titleKey)}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {t(service.descriptionKey)}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
