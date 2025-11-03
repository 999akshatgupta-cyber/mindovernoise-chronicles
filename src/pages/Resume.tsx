import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const Resume = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-3xl mx-auto space-y-12 animate-fade-up">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight">
              resume
            </h1>
            <p className="text-xl text-muted-foreground font-light">
              the static version of a moving target.
            </p>
          </div>

          <div className="h-px bg-border/50" />

          <div className="space-y-10">
            {/* Education */}
            <section className="space-y-4">
              <h2 className="text-2xl font-light tracking-tight text-primary">
                education
              </h2>
              <div className="space-y-2">
                <p className="text-lg">B.Tech, Mining Engineering</p>
                <p className="text-muted-foreground font-light">
                  National Institute of Technology Karnataka (NIT-K)
                </p>
                <p className="text-sm text-muted-foreground font-light">
                  2025 – 2029
                </p>
              </div>
            </section>

            {/* Focus Areas */}
            <section className="space-y-4">
              <h2 className="text-2xl font-light tracking-tight text-primary">
                focus
              </h2>
              <div className="flex flex-wrap gap-3">
                {["AI", "Automation", "Philosophy", "Systems Thinking", "n8n Workflows"].map((area) => (
                  <span
                    key={area}
                    className="px-4 py-2 bg-secondary/50 border border-border/30 rounded-md text-sm font-light"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </section>

            {/* Links */}
            <section className="space-y-4">
              <h2 className="text-2xl font-light tracking-tight text-primary">
                connect
              </h2>
              <div className="space-y-3">
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
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors w-fit"
                  >
                    {link.name}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </section>
          </div>

          <div className="h-px bg-border/50" />

          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all duration-300"
            >
              View Full Resume
            </Button>
          </div>

          <div className="pt-8 text-center">
            <p className="text-sm text-muted-foreground font-light italic">
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
