import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Zap, TrendingUp } from "lucide-react";

const teamMembers = [
  {
    name: "Arthur Marinho",
    role: "Dev & Product",
    description: "Transforma ideias em realidade, construindo sistemas e interfaces que funcionam perfeitamente.",
    icon: Code,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
  },
  {
    name: "Paulo Henrique",
    role: "Automação & IA",
    description: "Conecta tudo, integra sistemas e constrói automações inteligentes que fazem a diferença.",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces",
  },
  {
    name: "Giovanni Sartoretto",
    role: "Vendas & Estratégia",
    description: "Cuida das vendas, marketing e escalabilidade para levar a empresa ao próximo nível.",
    icon: TrendingUp,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces",
  },
];

const Team = () => {
  const { t } = useLanguage();

  return (
    <section id="equipe" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-purple-dark dark:text-foreground animate-fade-up">
            Nossa Equipe
          </h2>
          <p className="text-lg text-muted-foreground animate-fade-up animation-delay-100">
            Conheça os especialistas que tornam tudo isso possível
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {teamMembers.map((member, index) => (
            <Card 
              key={index} 
              className="group hover-lift border-2 hover:border-primary transition-smooth animate-scale-up bg-card/50 backdrop-blur-sm overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader className="text-center">
                {/* Image */}
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary transition-smooth">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Icon overlay on hover */}
                  <div className="absolute inset-0 bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <member.icon className="w-12 h-12 text-primary-foreground" />
                  </div>
                </div>
                
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                  {member.name}
                </CardTitle>
                <CardDescription className="text-base font-semibold text-primary">
                  {member.role}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-foreground/70 leading-relaxed">
                  {member.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center max-w-2xl mx-auto animate-fade-up animation-delay-400">
          <p className="text-lg text-foreground/70 leading-relaxed">
            Vimos como a tecnologia pode transformar negócios. Então nos unimos para criar soluções que realmente fazem a diferença.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Team;
