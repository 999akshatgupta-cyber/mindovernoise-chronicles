import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "hey — i make digital things that feel human.";
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        currentIndex++;
        setDisplayedText(fullText.slice(0, currentIndex));
      } else {
        setIsTypingComplete(true);
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [fullText]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      
      {/* Gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />

      <div className="container relative z-10 max-w-4xl px-6">
        <div className="space-y-8 animate-fade-up">
          {/* Typewriter text */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight">
            {displayedText}
            {!isTypingComplete && (
              <span className="inline-block w-1 h-[1em] bg-primary ml-1 animate-blink" />
            )}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl font-light">
            i help ideas become products people remember.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/projects">
              <Button 
                size="lg" 
                className="group bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all duration-300 hover:shadow-glow"
              >
                see my work
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                size="lg" 
                variant="outline"
                className="border-border hover:bg-secondary/50 transition-all duration-300"
              >
                say hi
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
