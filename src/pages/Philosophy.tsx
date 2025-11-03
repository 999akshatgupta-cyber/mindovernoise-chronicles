import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

const Philosophy = () => {
  const thoughts = [
    "is reality a dream we haven't woken from yet?",
    "truth isn't what exists — it's what persists.",
    "faith is a sin, curiosity is worship.",
    "machines don't replace us; they mirror our laziness.",
    "the question isn't if we'll create god — it's when we'll realize we already did.",
    "consciousness might just be the universe's way of experiencing itself.",
    "every system eventually becomes the problem it was designed to solve.",
  ];

  const [currentThought, setCurrentThought] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentThought((prev) => (prev + 1) % thoughts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [thoughts.length]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto space-y-20">
          <div className="space-y-6 animate-fade-up">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight">
              philosophy
            </h1>
            <p className="text-xl text-muted-foreground font-light">
              thoughts that refuse to sit still.
            </p>
          </div>

          <div className="h-px bg-border/50" />

          {/* Rotating thoughts */}
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="relative">
              {thoughts.map((thought, index) => (
                <p
                  key={index}
                  className={`text-2xl md:text-4xl font-light text-center leading-relaxed transition-all duration-1000 absolute inset-0 ${
                    index === currentThought
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4 pointer-events-none"
                  }`}
                >
                  {thought}
                </p>
              ))}
              {/* Placeholder for layout */}
              <p className="text-2xl md:text-4xl font-light text-center leading-relaxed opacity-0">
                {thoughts[0]}
              </p>
            </div>
          </div>

          <div className="h-px bg-border/50" />

          <div className="space-y-8 text-lg leading-relaxed font-light text-muted-foreground">
            <p>
              philosophy isn't about having answers. it's about asking better questions.
            </p>

            <p>
              i don't believe in certainty. i believe in curiosity, iteration, and the courage to be wrong.
            </p>

            <p>
              these thoughts aren't conclusions — they're invitations to think differently.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Philosophy;
