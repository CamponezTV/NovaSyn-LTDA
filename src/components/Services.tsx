import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Bot, BarChart3, Package } from "lucide-react";
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
  {
    icon: Package,
    titleKey: "services.software.title",
    descriptionKey: "services.software.description",
  },
];

const Services = () => {
  const { t } = useLanguage();

  return (
    <section id="servicos" className="py-32 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <h2 className="text-5xl md:text-6xl font-bold text-brand-purple-dark dark:text-foreground">
            {t("services.title")}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t("services.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300 animate-scale-up bg-background"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader className="pb-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 shadow-md">
                  <service.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors duration-300 leading-snug">
                  {t(service.titleKey)}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                  {t(service.descriptionKey)}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
