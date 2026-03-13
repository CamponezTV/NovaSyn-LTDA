import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
      className="magnetic-button rounded-full font-medium text-foreground/80 hover:bg-primary/10 hover:text-primary transition-all duration-300"
    >
      {language === "pt" ? "🇧🇷 PT" : "🇬🇧 EN"}
    </Button>
  );
}
