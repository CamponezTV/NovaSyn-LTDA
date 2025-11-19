import arthurImg from "@/assets/team-arthur.jpg";
import pauloImg from "@/assets/team-paulo.jpg";
import giovanniImg from "@/assets/team-giovanni.jpg";
import { Code, Cpu, TrendingUp, Handshake } from "lucide-react";
import { useWhatsAppTranslation } from "@/hooks/use-whatsapp-translation";

const WhatsAppTeam = () => {
  const { t } = useWhatsAppTranslation();
  const team = [
    {
      name: "Arthur",
      role: t("team.members.arthur.role"),
      description: t("team.members.arthur.description"),
      image: arthurImg,
      icon: Code,
      color: "from-[hsl(25_95%_53%)] to-[hsl(142_70%_45%)]"
    },
    {
      name: "Paulo",
      role: t("team.members.paulo.role"),
      description: t("team.members.paulo.description"),
      image: pauloImg,
      icon: Cpu,
      color: "from-[hsl(142_70%_45%)] to-[hsl(25_95%_53%)]"
    },
    {
      name: "Giovanni",
      role: t("team.members.giovanni.role"),
      description: t("team.members.giovanni.description"),
      image: giovanniImg,
      icon: TrendingUp,
      color: "from-[hsl(25_95%_53%)] to-[hsl(142_70%_45%)]"
    }
  ];

  return (
    <section className="py-32 px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(25_95%_53%_/_0.05)] to-transparent -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[hsl(25_95%_53%_/_0.1)] to-[hsl(142_70%_45%_/_0.1)] rounded-full blur-3xl animate-pulse-glow -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-5">
          <div className="inline-block text-6xl">
            <Handshake className="w-20 h-20 animate-float text-[hsl(25_95%_53%)]"/>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight">
            {t("team.title")}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {team.map((member, index) => {
            const Icon = member.icon;
            return (
              <div 
                key={index}
                className="group text-center p-10 bg-card rounded-3xl border-2 border-border hover:border-[hsl(25_95%_53%)] transition-all duration-500 hover:shadow-2xl hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s`, opacity: 0, animationFillMode: 'forwards' }}
              >
                <div className="relative mb-8">
                  {/* Icon badge */}
                  <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center shadow-lg z-10 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  
                  {/* Avatar */}
                  <div className="relative w-40 h-40 mx-auto rounded-3xl overflow-hidden border-4 border-transparent group-hover:border-[hsl(25_95%_53%)] transition-all duration-500 shadow-xl">
                    <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                
                <h3 className="text-3xl font-black mb-2">{member.name}</h3>
                <p className={`font-bold mb-4 text-lg bg-gradient-to-r ${member.color} bg-clip-text text-transparent`}>
                  {member.role}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                  {member.description}
                </p>
              </div>
            );
          })}
        </div>
        
        <p className="text-center text-xl md:text-2xl text-muted-foreground italic max-w-4xl mx-auto font-medium leading-relaxed">
          {t("team.conclusion")}
        </p>
      </div>
    </section>
  );
};

export default WhatsAppTeam;
