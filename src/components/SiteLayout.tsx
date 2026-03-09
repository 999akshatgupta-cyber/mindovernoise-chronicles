import { ReactNode } from "react";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { cn } from "@/lib/utils";

interface SiteLayoutProps {
  children: ReactNode;
  className?: string;
}

const SiteLayout = ({ children, className }: SiteLayoutProps) => {
  return (
    <div className={cn("page-shell min-h-screen bg-background text-foreground overflow-x-clip", className)}>
      <Navigation />
      <main className="relative z-10 pt-28 sm:pt-32">{children}</main>
      <Footer />
    </div>
  );
};

export default SiteLayout;
