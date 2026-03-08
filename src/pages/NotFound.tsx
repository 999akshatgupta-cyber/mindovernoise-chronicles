import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import SiteLayout from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <SiteLayout>
      <section className="container pb-16 pt-6 sm:pb-20">
        <div className="panel-surface mx-auto max-w-3xl rounded-[2rem] p-8 text-center sm:p-12">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-primary">404 / Lost signal</p>
          <h1 className="mt-6 text-[clamp(3rem,8vw,6rem)] font-semibold leading-[0.88] tracking-[-0.08em] text-foreground">
            This page does not exist.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-muted-foreground sm:text-base">
            The route you tried does not map to anything in the current system. Head back to the homepage and continue
            from there.
          </p>

          <div className="mt-8 flex justify-center">
            <Button asChild size="lg">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
                Return home
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default NotFound;
