import { LanguageToggle } from "@/components/LanguageToggle";

const Header = () => {
  return (
    <header className="fixed top-6 right-6 md:top-8 md:right-8 z-50">
      <div
        className="flex items-center bg-black/40 border border-border/40 backdrop-blur-2xl px-2 py-1 shadow-soft"
        style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)" }}
      >
        <LanguageToggle />
      </div>
    </header>
  );
};

export default Header;
