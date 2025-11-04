import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [showMainContent, setShowMainContent] = useState(false);
  const fullText = "hey — i make digital things that feel human.";
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    // Show video hero for 8 seconds, then reveal main content
    const timer = setTimeout(() => {
      setShowMainContent(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showMainContent) return;
    
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
  }, [fullText, showMainContent]);

  return (
    <>
      {/* Video Hero Section */}
      <section 
        className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-1000 ${
          showMainContent ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.25,1,0.5,1)' }}
      >
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/animation-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover motion-reduce:hidden"
        >
          <source src="/animation.mp4" type="video/mp4" />
        </video>

        {/* Fallback for reduced motion */}
        <div className="hidden motion-reduce:block absolute inset-0 bg-background" />

        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Centered Text */}
        <div className="relative z-10 text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium text-white tracking-tight">
            hello.
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl font-light text-white/90 mt-4">
            welcome to mindovernoise
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section 
        className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-all duration-1000 ${
          showMainContent ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.25,1,0.5,1)' }}
      >
        {/* Grid pattern background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        
        {/* Gradient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />

        <div className="container relative z-10 max-w-4xl px-6">
          <div className="space-y-8">
            {/* Typewriter text */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight leading-tight">
              {displayedText}
              {!isTypingComplete && showMainContent && (
                <span className="inline-block w-1 h-[1em] bg-primary ml-1 animate-blink" />
              )}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl font-normal leading-relaxed">
              i help ideas become products people remember.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-6">
              <Link to="/projects">
                <Button 
                  size="lg" 
                  className="group"
                >
                  see my work
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  size="lg" 
                  variant="outline"
                >
                  say hi
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
