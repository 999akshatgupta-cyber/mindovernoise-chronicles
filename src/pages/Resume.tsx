import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const Resume = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-40 pb-32">
        <div className="max-w-3xl mx-auto space-y-16 animate-fade-up">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-none">
              resume
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-normal">
              the static version of a moving target.
            </p>
          </div>

          <div className="h-px bg-border/40" />

          <div className="space-y-12">
            {/* Education */}
            <section className="space-y-5">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-primary">
                education
              </h2>
              <div className="space-y-3">
                <p className="text-lg font-normal">B.Tech, Mining Engineering</p>
                <p className="text-muted-foreground font-normal">
                  National Institute of Technology Karnataka (NIT-K)
                </p>
                <p className="text-sm text-muted-foreground font-normal">
                  2025 – 2029
                </p>
              </div>
            </section>

            {/* Focus Areas */}
            <section className="space-y-5">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-primary">
                focus
              </h2>
              <div className="flex flex-wrap gap-3">
                {["AI", "Automation", "Philosophy", "Systems Thinking", "n8n Workflows"].map((area) => (
                  <span
                    key={area}
                    className="px-5 py-2.5 bg-secondary/40 border border-border/30 rounded-full text-sm font-normal"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </section>

            {/* Links */}
            <section className="space-y-5">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-primary">
                connect
              </h2>
              <div className="space-y-4">
                {[
                  { name: "Instagram", url: "#" },
                  { name: "Twitter", url: "#" },
                  { name: "LinkedIn", url: "#" },
                ].map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-500 w-fit font-normal"
                  >
                    {link.name}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </section>
          </div>

          <div className="h-px bg-border/40" />

          <div className="flex justify-center">
            <Button
              size="lg"
            >
              View Full Resume
            </Button>
          </div>

          <div className="pt-12 text-center">
            <p className="text-sm text-muted-foreground font-normal italic">
              resume is static; curiosity isn't.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Resume;
