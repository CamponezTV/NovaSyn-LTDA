import { XCircle, TriangleAlert } from "lucide-react";
import { useWhatsAppTranslation } from "@/hooks/use-whatsapp-translation";

const WhatsAppProblem = () => {
  const { t } = useWhatsAppTranslation();
  
  const problems = [
    t("problem.problems.1"),
    t("problem.problems.2"),
    t("problem.problems.3"),
    t("problem.problems.4"),
    t("problem.problems.5"),
    t("problem.problems.6"),
  ];

  return (
    <section className="py-32 px-4 bg-gradient-to-b from-[hsl(25_95%_53%_/_0.06)] via-destructive/5 to-[hsl(142_70%_45%_/_0.04)] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-destructive/8 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[hsl(142_70%_45%_/_0.08)] rounded-full blur-3xl -z-10" />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-5">
          <div className="inline-block animate-bounce-in">
            <TriangleAlert color="#ff4d4d" className="w-20 h-20 animate-pulse" />
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight">
            {t("problem.title")}
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium">
            {t("problem.subtitle")}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="group relative p-8 bg-card rounded-3xl border-2 border-destructive/20 hover:border-destructive/50 transition-all duration-500 hover:shadow-2xl hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center group-hover:bg-destructive/20 transition-colors duration-300">
                  <XCircle className="w-6 h-6 text-destructive" strokeWidth={2.5} />
                </div>
                <p className="text-lg font-semibold leading-relaxed pt-2">{problem}</p>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-center text-2xl md:text-3xl font-black text-destructive animate-pulse-glow">
          {t("problem.conclusion")}
        </p>
      </div>
    </section>
  );
};

export default WhatsAppProblem;
