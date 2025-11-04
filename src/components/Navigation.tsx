import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();

  const links = [
    { name: "home", path: "/" },
    { name: "about", path: "/about" },
    { name: "projects", path: "/projects" },
    { name: "philosophy", path: "/philosophy" },
    { name: "resume", path: "/resume" },
    { name: "contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 backdrop-blur-xl bg-background/90">
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-base font-normal tracking-tight hover:text-primary transition-all duration-500">
            mindovernoise
          </Link>

          <div className="flex gap-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-normal transition-all duration-500 hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-500 hover:after:scale-x-100",
                  location.pathname === link.path
                    ? "text-primary after:scale-x-100"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
