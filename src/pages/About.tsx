import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-40 pb-32">
        <div className="max-w-3xl mx-auto space-y-16 animate-fade-up">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-none">
              akshat gupta
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-normal">
              known online as <span className="text-primary">mindovernoise</span>
            </p>
          </div>

          <div className="h-px bg-border/40" />

          <div className="space-y-8 text-lg leading-relaxed font-normal text-muted-foreground">
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

          <div className="h-px bg-border/40" />

          <blockquote className="border-l-2 border-primary pl-8 py-4 italic text-lg md:text-xl text-foreground/90 font-normal">
            "curiosity is the only religion worth following."
          </blockquote>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
