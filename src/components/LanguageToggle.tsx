import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
      className="rounded-full font-medium"
    >
      {language === "pt" ? "🇧🇷 PT" : "🇬🇧 EN"}
    </Button>
  );
}
