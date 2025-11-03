import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-3xl mx-auto space-y-12 animate-fade-up">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight">
              akshat gupta
            </h1>
            <p className="text-xl text-muted-foreground font-light">
              known online as <span className="text-primary">mindovernoise</span>
            </p>
          </div>

          <div className="h-px bg-border/50" />

          <div className="space-y-6 text-lg leading-relaxed font-light text-muted-foreground">
            <p>
              i explore how humans think, how machines learn, and how both can grow together.
            </p>

            <p>
              i believe philosophy and automation aren't opposites — they're reflections of each other.
            </p>

            <p>
              currently pursuing B.Tech in Mining Engineering at NIT-K (2025–2029), but my real work happens at the intersection of AI, automation, and thought.
            </p>

            <p>
              every system can be questioned. every question can become a system.
            </p>
          </div>

          <div className="h-px bg-border/50" />

          <blockquote className="border-l-2 border-primary pl-6 py-2 italic text-lg text-foreground/80 font-light">
            "curiosity is the only religion worth following."
          </blockquote>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
