import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Systems", path: "/philosophy" },
  { name: "Capabilities", path: "/resume" },
  { name: "Contact", path: "/contact" },
];

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1380px]">
        <div className="panel-surface flex items-center justify-between rounded-[1.6rem] px-4 py-3 sm:px-5">
          <Link to="/" className="flex items-center group relative z-10 transition-all duration-300 hover:opacity-90 hover:scale-[1.02]">
            <div className="relative flex items-center">
              <img
                src="/Gemini_Generated_Image_a3o1eta3o1eta3o1.svg"
                alt="Mindsovernoise Logo"
                className="h-12 sm:h-[3.25rem] w-auto object-contain object-left drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              />
            </div>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-white/8 bg-black/10 p-1 lg:flex">
            {links.map((link) => {
              const isActive = location.pathname === link.path;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "rounded-full px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] transition-all duration-300",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-[0_0_24px_hsl(var(--primary)/0.24)]"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Button asChild size="sm">
              <Link to="/contact">Start a project</Link>
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="grid h-11 w-11 place-items-center rounded-[1rem] border border-white/10 bg-white/5 text-foreground transition-colors hover:border-primary/35 hover:text-primary lg:hidden"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isOpen && (
          <div className="panel-surface mt-3 rounded-[1.6rem] p-3 lg:hidden">
            <nav className="flex flex-col gap-1">
              {links.map((link) => {
                const isActive = location.pathname === link.path;

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "rounded-[1rem] px-4 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] transition-all duration-300",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <Button asChild className="mt-3 w-full">
              <Link to="/contact">Start a project</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
