import { useLanguage } from "@/contexts/LanguageContext";
import { getWhatsAppTranslation, type WhatsAppTranslationKey } from "@/lib/whatsapp-translations";

export function useWhatsAppTranslation() {
  const { language } = useLanguage();
  
  const t = (key: WhatsAppTranslationKey) => getWhatsAppTranslation(language as "en" | "pt", key);
  
  return { t };
}
