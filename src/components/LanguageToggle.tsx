import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
      className="rounded-full font-medium text-[#6D28D9] hover:bg-[#6D28D9]/20 hover:text-[#6D28D9]"
    >
      {language === "pt" ? "🇧🇷 PT" : "🇬🇧 EN"}
    </Button>
  );
}
