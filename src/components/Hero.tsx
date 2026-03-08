import { useEffect, useState, useRef } from "react";
import { ArrowRight, AudioWaveform, Bot, Workflow } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

const INTRO_DURATION_MS = 5500;
const INTRO_EXIT_MS = 700;

const getIntroWindow = () => window as Window & { __mindovernoiseIntroSeen?: boolean };

const heroMetrics = [
  { label: "Focus", value: "Operational friction & custom workflows" },
  { label: "Outcome", value: "Lower costs, higher margins" },
  { label: "Approach", value: "First principles, not hype" },
];

const heroPanels = [
  {
    icon: Workflow,
    title: "Intelligent Automation",
    description: "We connect your existing tools and automate manual handoffs that slow your team down.",
  },
  {
    icon: AudioWaveform,
    title: "Data & Insights",
    description: "We turn raw, messy business data into clear, actionable intelligence using custom AI models.",
  },
  {
    icon: Bot,
    title: "Customer Interaction",
    description: "Voice and text agents that handle frontline inquiries instantly, 24/7, with a human touch.",
  },
];

const FRAME_COUNT = 80;
const currentFramePath = (index: number) => `/sequence/frame_${index.toString().padStart(3, '0')}.jpg`;

const Hero = () => {
  const [introPhase, setIntroPhase] = useState<"enter" | "exit" | "done">(
    typeof window !== "undefined" && getIntroWindow().__mindovernoiseIntroSeen ? "done" : "enter",
  );
  const [isIntroActive, setIsIntroActive] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const scrollTracker = useRef({ targetFrame: 0, currentFrame: 0 });

  // Intro Sequence Logic
  useEffect(() => {
    if (introPhase !== "enter") {
      setIsIntroActive(false);
      return;
    }

    getIntroWindow().__mindovernoiseIntroSeen = true;

    const frame = window.requestAnimationFrame(() => {
      setIsIntroActive(true);
    });

    const exitTimer = window.setTimeout(() => {
      setIntroPhase("exit");
    }, INTRO_DURATION_MS - INTRO_EXIT_MS);

    const doneTimer = window.setTimeout(() => {
      setIntroPhase("done");
    }, INTRO_DURATION_MS);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
  }, [introPhase]);

  // Preload Images
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFramePath(i);
      img.onload = () => {
        loadedCount++;
        // Draw the first frame once loaded
        if (i === 0 && canvasRef.current) {
          drawFrame(0, images);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  // Resize Canvas Logic
  const handleResize = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    // Handle high-dpi displays
    const dpr = window.devicePixelRatio || 1;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Only set width/height if changed to prevent unnecessary reflows
    if (canvas.width !== windowWidth * dpr || canvas.height !== windowHeight * dpr) {
      canvas.width = windowWidth * dpr;
      canvas.height = windowHeight * dpr;
      canvas.style.width = `${windowWidth}px`;
      canvas.style.height = `${windowHeight}px`;
    }

    // Redraw current frame
    drawFrame(Math.round(scrollTracker.current.currentFrame), imagesRef.current, true);
  };

  // Frame Drawing Logic with High-DPI support and "Cover" sizing
  const drawFrame = (frameIndex: number, images: HTMLImageElement[], forceContextReset = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Ensure we don't go out of bounds
    const safeIndex = Math.min(Math.max(frameIndex, 0), FRAME_COUNT - 1);
    const img = images[safeIndex];

    if (!img || !img.complete || img.naturalHeight === 0) return; // Image not ready yet

    const dpr = window.devicePixelRatio || 1;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Reset transform before clearing and drawing
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Scale drawing context to match DPR
    ctx.scale(dpr, dpr);

    // Calculate "cover" math
    const imgAspect = img.width / img.height;
    const canvasAspect = windowWidth / windowHeight;

    let renderWidth, renderHeight, x, y;

    if (canvasAspect > imgAspect) {
      // Canvas is wider than the image (crop top/bottom)
      renderWidth = windowWidth;
      renderHeight = windowWidth / imgAspect;
      x = 0;
      y = (windowHeight - renderHeight) / 2;
    } else {
      // Canvas is taller than the image (crop left/right)
      renderWidth = windowHeight * imgAspect;
      renderHeight = windowHeight;
      x = (windowWidth - renderWidth) / 2;
      y = 0;
    }

    ctx.drawImage(img, x, y, renderWidth, renderHeight);
  };

  // Scroll Scrubbing & Animation Loop
  useEffect(() => {
    let rafId: number;

    const renderLoop = () => {
      // Linearly interpolate towards target frame for smoothness
      scrollTracker.current.currentFrame += (scrollTracker.current.targetFrame - scrollTracker.current.currentFrame) * 0.1;

      // Only draw if we actually moved or if we need to force a redraw
      const frameToDraw = Math.round(scrollTracker.current.currentFrame);
      drawFrame(frameToDraw, imagesRef.current);

      rafId = requestAnimationFrame(renderLoop);
    };

    rafId = requestAnimationFrame(renderLoop);

    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const scrollY = window.scrollY;

      // Calculate accurate absolute top mathematically
      const rect = container.getBoundingClientRect();
      const containerTop = rect.top + scrollY;

      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate progress (0 to 1) based on sticky container scroll
      let progress = 0;
      if (containerHeight > windowHeight) {
        progress = (scrollY - containerTop) / (containerHeight - windowHeight);
      }
      progress = Math.max(0, Math.min(1, progress));

      // Calculate target frame
      scrollTracker.current.targetFrame = progress * (FRAME_COUNT - 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    // Trigger initial calculations
    handleScroll();
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Intro Overlay */}
      {introPhase !== "done" && (
        <section
          className={`fixed inset-0 z-[70] flex items-center justify-center overflow-hidden bg-black transition-all duration-700 ${introPhase === "exit" ? "scale-[1.02] opacity-0" : "scale-100 opacity-100"
            }`}
        >
          {/* Background Video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
            src="/hello animation.mp4"
          />
          {/* Dark overlay so text is readable over the video */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 px-6 text-center">
            <h1
              className={`text-[clamp(3.5rem,10vw,7.5rem)] font-medium leading-[1.1] tracking-tight text-white transition-all duration-1000 ease-out ${isIntroActive ? "translate-y-0 scale-100 opacity-100" : "translate-y-8 scale-95 opacity-0"
                }`}
            >
              hello.
            </h1>
            <p
              className={`mt-4 text-[clamp(1.2rem,3vw,2.5rem)] font-normal tracking-tight text-white/90 transition-all delay-200 duration-1000 ease-out ${isIntroActive ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
            >
              welcome to mindovernoise
            </p>
          </div>
        </section>
      )}

      {/* Top Hook Section: The Catchy Text Hero */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-black pt-32 pb-20">
        {/* Abstract Background Grid & Glows */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/20 opacity-30 blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-10"></div>

        <div className="container relative z-20 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out" style={{ animationDelay: '100ms' }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              Operational Intelligence
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="mt-8 max-w-[1000px] text-[clamp(3rem,8vw,6.5rem)] font-bold leading-[1.05] tracking-tight text-white animate-in fade-in slide-in-from-bottom-10 duration-700 ease-out drop-shadow-lg" style={{ animationDelay: '250ms' }}>
            We build AI systems
            <br className="hidden sm:block" />
            that do your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/50">repetitive</span> work.
          </h1>

          {/* Subheadline */}
          <p className="mt-8 max-w-[700px] text-[clamp(1.1rem,2.5vw,1.3rem)] leading-relaxed text-zinc-400 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out" style={{ animationDelay: '400ms' }}>
            Stop paying humans to do data entry, answer repetitive emails, and click buttons. We build custom AI software that runs your operations automatically, so your team can focus on growth.
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-5 animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out" style={{ animationDelay: '550ms' }}>
            <Button asChild size="lg" className="group h-14 px-8 text-base font-semibold shadow-[0_0_20px_rgba(var(--primary),0.25)] hover:shadow-[0_0_35px_rgba(var(--primary),0.45)] transition-all duration-300">
              <Link to="/contact">
                See How It Works / Book a Free Audit
                <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline" className="h-14 px-8 text-base border-white/10 bg-white/5 hover:bg-white/10 hover:text-white transition-all duration-300 backdrop-blur-sm">
              <Link to="/about">How we work</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Hero that scrubs canvas on scroll */}
      <div ref={containerRef} className="relative h-[250vh]">
        {/* Sticky Container */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-end">

          {/* Canvas WebGL/2D Background — z-[5] so it sits ABOVE the default stacking but below overlays */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-[5] pointer-events-none"
          />

          {/* Gentle fade ONLY at top so it transitions smoothly from the text section above */}
          <div className="absolute top-0 left-0 right-0 h-24 z-[6] bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />

          {/* Bottom gradient — blends into the dock smoothly */}
          <div className="absolute bottom-0 left-0 right-0 h-40 z-[6] bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

          {/* Compact Bottom Dock — frosted glass bar with key info */}
          <div className="hero-dock relative z-[7] w-full pb-6 pt-5 px-4 sm:px-8">
            <div className="container">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                {/* Left: Tagline */}
                <div className="flex items-center gap-3 shrink-0">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-primary">
                    Built on First Principles
                  </p>
                  <span className="hidden sm:inline text-white/20">—</span>
                  <h2 className="hidden sm:block text-lg font-semibold tracking-[-0.03em] text-white">
                    Not Hype.
                  </h2>
                </div>

                {/* Right: Metric Pills */}
                <div className="flex flex-wrap items-center gap-3">
                  {heroMetrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="hero-dock-pill rounded-full px-4 py-2 backdrop-blur-xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.12] transition-colors cursor-default"
                    >
                      <span className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-primary mr-2">
                        {metric.label}
                      </span>
                      <span className="text-sm text-white/90 font-medium">{metric.value}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Panels — Full-width section below the animation */}
      <section className="relative bg-black py-20 sm:py-28">
        {/* Subtle top glow connecting to the animation */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="container relative z-10">
          <div className="flex items-start justify-between gap-4 mb-10">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-primary">
                What We Build
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-[-0.04em] text-white">
                Agnostic Systems.
              </h2>
            </div>
            <div className="hidden rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-primary sm:block self-start mt-2">
              agnostic system
            </div>
          </div>

          <div className="hazard-stripe rounded-[1.4rem] px-5 py-4 text-sm leading-6 tracking-tight shadow-[0_14px_40px_hsl(var(--primary)/0.18)] mb-10">
            We don't sell AI for the sake of AI. We map your exact business logic first, identify the bottlenecks, and only deploy technology where it guarantees a measurable return on investment.
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {heroPanels.map((panel) => (
              <div
                key={panel.title}
                className="group rounded-[1.6rem] border border-white/8 bg-white/[0.03] p-6 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-1"
              >
                <div className="flex flex-col gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-[1rem] border border-primary/20 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                    <panel.icon className="h-5 w-5" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold tracking-[-0.03em] text-white">{panel.title}</h3>
                    <p className="text-sm leading-7 text-zinc-400">{panel.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
