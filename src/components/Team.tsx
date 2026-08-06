import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Cpu, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import arthurImg from "@/assets/team-arthur.webp";
import pauloImg from "@/assets/team-paulo.webp";
import giovanniImg from "@/assets/team-giovanni.webp";
import teamFullImg from "@/assets/team-full.webp";

const Team = () => {
  const { t } = useLanguage();

  const teamMembers = [
    {
      name: t("team.arthur.name"),
      role: t("team.arthur.role"),
      description: t("team.arthur.description"),
      icon: Code,
      image: arthurImg,
      link: "https://camponez.com.br",
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
    <section id="equipe" className="py-16 lg:py-0 lg:min-h-screen lg:flex lg:items-start bg-background relative overflow-hidden">

      <div className="container mx-auto px-4 relative z-10 py-8 lg:py-12">
        <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-10 space-y-2 lg:space-y-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-[10px] font-semibold text-primary/80 uppercase tracking-[0.25em] mb-2"
          >
            Nosso time
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-display"
          >
            {t("team.title")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base lg:text-lg text-muted-foreground"
          >
            {t("team.subtitle")}
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto mb-10 lg:mb-12 relative group"
        >
          <div className="relative rounded-2xl overflow-hidden border border-border/30 shadow-2xl">
            <img 
              src={teamFullImg} 
              alt="NovaSyn Team" 
              className="w-full h-full object-cover object-top aspect-[16/9] md:aspect-[21/9] lg:max-h-[300px] group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-60" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-10 lg:mb-12">
          {teamMembers.map((member, index) => {
            const CardComponent = member.link ? "a" : "div";
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
              >
                <CardComponent
                  href={member.link}
                  target={member.link ? "_blank" : undefined}
                  rel={member.link ? "noopener noreferrer" : undefined}
                  className={member.link ? "no-underline block h-full" : "block h-full"}
                >
                  <Card 
                    className="group hover:scale-[1.01] border border-border/40 hover:border-primary/40 transition-all duration-500 bg-card overflow-hidden h-full"
                  >
                    <CardHeader className="text-center p-4 lg:p-6">
                      <div className="relative w-24 h-24 lg:w-28 lg:h-28 mx-auto mb-3 lg:mb-4 rounded-full overflow-hidden border-2 border-border/30 group-hover:border-primary/50 transition-all duration-500">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      
                      <CardTitle className="text-xl lg:text-2xl group-hover:text-primary transition-colors">
                        {member.name}
                      </CardTitle>
                      <CardDescription className="text-sm lg:text-base font-semibold text-primary">
                        {member.role}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-4 pb-4 lg:px-6 lg:pb-6">
                      <p className="text-center text-xs lg:text-sm text-foreground/70 leading-relaxed line-clamp-3">
                        {member.description}
                      </p>
                    </CardContent>
                  </Card>
                </CardComponent>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center max-w-2xl mx-auto mt-auto"
        >
          <p className="text-base lg:text-lg text-foreground/70 leading-relaxed italic">
            {t("team.mission")}
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default Team;
