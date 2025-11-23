import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Cpu, TrendingUp } from "lucide-react";
import arthurImg from "@/assets/team-arthur.jpg";
import pauloImg from "@/assets/team-paulo.jpg";
import giovanniImg from "@/assets/team-giovanni.jpg";

const Team = () => {
  const { t } = useLanguage();

  const teamMembers = [
    {
      name: t("team.arthur.name"),
      role: t("team.arthur.role"),
      description: t("team.arthur.description"),
      icon: Code,
      image: arthurImg,
    },
    {
      name: t("team.paulo.name"),
      role: t("team.paulo.role"),
      description: t("team.paulo.description"),
      icon: Cpu,
      image: pauloImg,
    },
    {
      name: t("team.giovanni.name"),
      role: t("team.giovanni.role"),
      description: t("team.giovanni.description"),
      icon: TrendingUp,
      image: giovanniImg,
    },
  ];

  return (
    <section id="equipe" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-purple-dark dark:text-foreground animate-fade-up">
            {t("team.title")}
          </h2>
          <p className="text-lg text-muted-foreground animate-fade-up animation-delay-100">
            {t("team.subtitle")}
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
            {t("team.mission")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Team;
