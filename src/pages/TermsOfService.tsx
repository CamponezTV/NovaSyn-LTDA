import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import novasynLogo from '@/assets/logos/logo_1.png';

const TermsOfService = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="fixed top-4 left-0 right-0 z-50 mx-auto w-[95%] max-w-7xl animate-fade-down">
        <div className="bg-[#6D28D9]/10 backdrop-blur-[40px] border border-[#6D28D9]/30 rounded-3xl shadow-soft px-6 py-4 transition-smooth hover:shadow-[0_0_30px_rgba(109,40,217,0.3)] hover:bg-[#6D28D9]/15">
          <div className="flex items-center justify-between">
            {/* Back Button - Esquerda */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="rounded-full text-[#6D28D9] hover:bg-[#6D28D9]/20" asChild>
                <a href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t("nav.back")}
                </a>
              </Button>
            </div>

            {/* Actions - Direita */}
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-purple-dark dark:text-foreground mb-4">
            {t("terms.title")}
          </h1>
          <p className="text-muted-foreground mb-8">
            {t("terms.lastUpdated")}: {new Date().toLocaleDateString()}
          </p>

          <div className="space-y-8 text-foreground/80">
            <section>
              <h2 className="text-2xl font-bold text-brand-purple-dark dark:text-foreground mb-4">
                {t("terms.section1.title")}
              </h2>
              <p className="leading-relaxed mb-4">
                {t("terms.section1.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-purple-dark dark:text-foreground mb-4">
                {t("terms.section2.title")}
              </h2>
              <p className="leading-relaxed mb-4">
                {t("terms.section2.intro")}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{t("terms.section2.item1")}</li>
                <li>{t("terms.section2.item2")}</li>
                <li>{t("terms.section2.item3")}</li>
                <li>{t("terms.section2.item4")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-purple-dark dark:text-foreground mb-4">
                {t("terms.section3.title")}
              </h2>
              <p className="leading-relaxed mb-4">
                {t("terms.section3.intro")}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{t("terms.section3.item1")}</li>
                <li>{t("terms.section3.item2")}</li>
                <li>{t("terms.section3.item3")}</li>
                <li>{t("terms.section3.item4")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-purple-dark dark:text-foreground mb-4">
                {t("terms.section4.title")}
              </h2>
              <p className="leading-relaxed mb-4">
                {t("terms.section4.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-purple-dark dark:text-foreground mb-4">
                {t("terms.section5.title")}
              </h2>
              <p className="leading-relaxed mb-4">
                {t("terms.section5.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-purple-dark dark:text-foreground mb-4">
                {t("terms.section6.title")}
              </h2>
              <p className="leading-relaxed mb-4">
                {t("terms.section6.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-purple-dark dark:text-foreground mb-4">
                {t("terms.section7.title")}
              </h2>
              <p className="leading-relaxed mb-4">
                {t("terms.section7.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-purple-dark dark:text-foreground mb-4">
                {t("terms.section8.title")}
              </h2>
              <p className="leading-relaxed">
                {t("terms.section8.content")}
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
