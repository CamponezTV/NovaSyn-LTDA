import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, MessageSquare, ShoppingCart, ArrowRight } from "lucide-react";

const products = [
  {
    icon: MessageSquare,
    titleKey: "WhatsApp Copilot",
    descriptionKey: "Automação inteligente para vendas no WhatsApp 24/7",
    link: "https://projeto-whats.vercel.app/",
  },
  {
    icon: Bot,
    titleKey: "AI Assistant",
    descriptionKey: "Assistente de IA personalizado para sua empresa",
    link: "#",
  },
  {
    icon: ShoppingCart,
    titleKey: "E-commerce Manager",
    descriptionKey: "Sistema completo de gestão para lojas online",
    link: "#",
  },
];

const Products = () => {
  const { t } = useLanguage();

  return (
    <section id="produtos" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-purple-dark dark:text-foreground animate-fade-up">
            {t("products.title")}
          </h2>
          <p className="text-lg text-muted-foreground animate-fade-up animation-delay-100">
            {t("products.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <Card 
              key={index} 
              className="group hover-lift border-2 hover:border-primary transition-smooth animate-scale-up bg-card/50 backdrop-blur-sm overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader className="relative">
                {/* Icon glow effect */}
                <div className="absolute top-8 left-8 w-14 h-14 bg-primary/20 rounded-2xl blur-xl group-hover:bg-primary/40 transition-all"></div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-smooth shadow-soft relative z-10">
                  <product.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                  {product.titleKey}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {product.descriptionKey}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" className="p-0 h-auto font-semibold group/btn transition-smooth" asChild>
                  <a href={product.link} target="_blank" rel="noopener noreferrer">
                    Saiba mais
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
