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
    <div 
      className="min-h-screen"
      style={{
        backgroundImage: 'url(/gradient-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: window.innerWidth > 1024 ? 'fixed' : 'scroll'
      }}
    >
      <Navigation />
      
      <main className="container mx-auto px-6 pt-40 pb-32">
        <div className="max-w-4xl mx-auto space-y-24">
          <div className="space-y-8 animate-fade-up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-none">
              philosophy
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-normal">
              thoughts that refuse to sit still.
            </p>
          </div>

          <div className="h-px bg-border/40" />

          {/* Rotating thoughts */}
          <div className="min-h-[400px] flex items-center justify-center py-16">
            <div className="relative">
              {thoughts.map((thought, index) => (
                <p
                  key={index}
                  className={`text-2xl md:text-3xl lg:text-4xl font-normal text-center leading-relaxed transition-all duration-1000 cubic-bezier(0.25, 1, 0.5, 1) absolute inset-0 ${
                    index === currentThought
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6 pointer-events-none"
                  }`}
                >
                  {thought}
                </p>
              ))}
              {/* Placeholder for layout */}
              <p className="text-2xl md:text-3xl lg:text-4xl font-normal text-center leading-relaxed opacity-0">
                {thoughts[0]}
              </p>
            </div>
          </div>

          <div className="h-px bg-border/40" />

          <div className="space-y-8 text-lg leading-relaxed font-normal text-muted-foreground">
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
