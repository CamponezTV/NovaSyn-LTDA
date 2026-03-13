import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";

const Header = () => {
  return (
    <header className="fixed top-6 right-6 md:top-8 md:right-8 z-50">
      <div className="flex items-center gap-1 bg-black/10 dark:bg-white/[0.05] rounded-full p-1 border border-border/40 backdrop-blur-2xl shadow-soft">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
