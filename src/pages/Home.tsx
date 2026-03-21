import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import Hero from "@/components/Hero";
import SiteLayout from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const capabilities = [
  {
    title: "Intelligent Automation",
    description:
      "We connect your existing software (CRM, Sheets, Email) so they talk to each other automatically. No more manual data entry.",
    tags: ["n8n", "System Integration", "Custom Workflows"],
    bgClass: "bg-gradient-to-br from-[#4A00E0] to-[#120033] ring-1 ring-inset ring-[#8E2DE2]/30",
    image: "/Intelligent Automation.jpeg",
  },
  {
    title: "Data & Reporting",
    description:
      "We build systems that automatically pull up your daily/weekly metrics so you don't have to wait for an employee to build a report.",
    tags: ["LLM Pipelines", "Data Synthesis", "Analytics"],
    bgClass: "bg-gradient-to-br from-[#0082c8] to-[#001829] ring-1 ring-inset ring-[#00e1ff]/30",
    image: "/Data & Reporting.jpeg",
  },
  {
    title: "Customer Interaction",
    description:
      "We build AI agents that handle your frontline customer questions 24/7, answering exactly how you want them to.",
    tags: ["Voice AI", "Chat Agents", "Support"],
    bgClass: "bg-gradient-to-br from-[#b20a2c] to-[#2b0005] ring-1 ring-inset ring-[#ff3355]/30",
    image: "/Customer Interaction.jpeg",
  },
];

const selectedProjects = [
  {
    title: "AI Voice Agents",
    description:
      "Intelligent voice support for customer service and sales. Deploy AI-powered phone systems that handle inquiries, qualify prospects, and escalate complex issues instantly.",
    tags: ["Voice AI", "Sales", "Customer Service"],
    bgClass: "bg-gradient-to-br from-[#5e17eb] to-[#17023b] ring-1 ring-inset ring-[#d91be2]/30",
    image: "/AI Voice Agents.jpeg",
  },
  {
    title: "Lead Qualification",
    description:
      "Automated lead scoring and engagement flows that surface your hottest prospects, personalise outreach, and feed your sales team only the leads worth chasing.",
    tags: ["Lead Scoring", "CRM Integration", "Sales Automation"],
    bgClass: "bg-gradient-to-br from-[#00A859] to-[#002B12] ring-1 ring-inset ring-[#00FF87]/30",
    image: "/Lead Qualification.jpeg",
  },
  {
    title: "AI-Generated Media",
    description:
      "On-brand visual content created in minutes. Your logos, palette, and tone — multiplied across campaigns without a designer bottleneck.",
    tags: ["Image Generation", "Brand Content", "Creative AI"],
    bgClass: "bg-gradient-to-br from-[#D4002B] to-[#3A0005] ring-1 ring-inset ring-[#FF0055]/30",
    image: "/AI-Generated Media.jpeg",
  },
  {
    title: "AI Chatbots",
    description:
      "Multi-lingual, context-aware customer support bots that never sleep, never lose patience, and always answer exactly the way your brand would.",
    tags: ["Chatbot", "NLP", "Multi-Language"],
    bgClass: "bg-gradient-to-br from-[#0055FF] to-[#000A33] ring-1 ring-inset ring-[#00D4FF]/30",
    image: "/AI Chatbots.jpeg",
  },
  {
    title: "Content Automation",
    description:
      "Automated content lifecycle at scale — from research and scripting to scheduling and distribution across YouTube, Instagram, and beyond.",
    tags: ["YouTube", "Instagram", "Content Pipeline"],
    bgClass: "bg-gradient-to-br from-[#E65C00] to-[#331100] ring-1 ring-inset ring-[#FF9900]/30",
    image: "/Content Automation.jpeg",
  },
  {
    title: "Custom AI Systems",
    description:
      "Bespoke AI integrations for coaching platforms, professional services, and enterprise teams. If your workflow is unique, your system should be too.",
    tags: ["Custom Build", "Enterprise", "Industry-Specific"],
    bgClass: "bg-gradient-to-br from-[#00b09b] to-[#001f18] ring-1 ring-inset ring-[#96c93d]/30",
    image: "/Custom AI Systems.jpeg",
  },
];

const processSteps = [
  {
    label: "01 / Discovery",
    title: "The Deep Dive",
    description:
      "We start by mapping your business. We talk to your team, understand your daily operations, and find the exact points where time and money are bleeding.",
  },
  {
    label: "02 / Strategy",
    title: "The Blueprint",
    description:
      "We present a clear, no-nonsense proposal detailing exactly which AI workflows can be implemented, the timeline, and the projected ROI. If we can't save you money or make you faster, we won't pitch you.",
  },
  {
    label: "03 / Execution",
    title: "The Build",
    description:
      "We build and integrate the systems directly into your current infrastructure. No massive learning curves for your team.",
  },
  {
    label: "04 / Scaling",
    title: "The Handoff & Optimization",
    description:
      "We ensure your team knows how to use the new systems, and we monitor the automated workflows to optimize them for maximum efficiency.",
  },
];

const principles = [
  "AI is a lever, not a magic wand.",
  "We operate on reality, not hype.",
  "If we can't save you money, we won't pitch you.",
];

const Home = () => {
  return (
    <SiteLayout>
      <Hero />

      <section className="container py-24 sm:py-32">
        <div
          className="hazard-stripe rounded-[1.8rem] px-6 py-5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] shadow-[0_18px_50px_hsl(var(--primary)/0.18)] sm:flex sm:items-center sm:justify-between sm:gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out"
          style={{ animationDelay: "900ms" }}
        >
          <span>Built on First Principles, Not Hype.</span>
          <span className="mt-2 block text-primary-foreground/75 sm:mt-0">
            We only deploy technology where it guarantees a measurable ROI.
          </span>
        </div>
      </section>

      {/* ── CORE PROBLEM ───────────────────────────────────────────── */}
      <section className="container py-24 sm:py-32 font-sans">
        {/* Centered heading */}
        <div className="text-center mb-16 space-y-5">
          <span className="eyebrow">The Core Problem</span>
          <h2 className="display-title text-[clamp(2rem,5.5vw,5rem)] font-semibold leading-[1.08] tracking-tight text-foreground">
            <span className="block">Your team is too expensive</span>
            <span className="block">
              to be doing <span className="accent-word">robot work.</span>
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-sm leading-8 text-muted-foreground sm:text-base">
            Right now, your employees are spending hours manually moving data
            between software, copying and pasting emails, and doing tasks a
            machine could do instantly.{" "}
            <strong className="text-foreground">The Pivot:</strong> Off-the-shelf
            software won't fix this. You need a custom system built specifically
            for how your business runs today.
          </p>
        </div>

        {/* Premium colored capability cards */}
        <div className="grid gap-6 lg:grid-cols-3">
          {capabilities.map((cap, index) => {
            return (
              <article
                key={cap.title}
                className={cn(
                  "rounded-[2rem] overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-2 group cursor-default shadow-2xl",
                  cap.bgClass,
                  index === 1 && "lg:translate-y-10"
                )}
              >
                {/* Visual area with real image */}
                <div className="relative h-60 overflow-hidden bg-black/50">
                  <img
                    src={cap.image}
                    alt={cap.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle vignette/gradient for elegant blending */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
                </div>

                {/* Text content */}
                <div className="p-8 flex flex-col flex-grow relative z-10">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/50">
                    Core capability
                  </p>
                  <h3 className="mt-4 text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-white">
                    {cap.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/60 flex-grow">
                    {cap.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {cap.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-white/80 backdrop-blur-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── OUR SERVICES / FEATURED CASES ─────────────────────────── */}
      <section className="container py-24 sm:py-32 font-sans">
        {/* Large centered heading */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="display-title text-[clamp(3rem,8vw,7rem)] font-semibold tracking-tight text-foreground leading-[1]">
            Our <span className="accent-word">services</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto leading-7">
            Six high-impact AI engagements. Each one built for measurable output,
            not demos.
          </p>
        </div>

        <div className="space-y-6">
          {selectedProjects.map((project) => {
            return (
              <article
                key={project.title}
                className="rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row min-h-[450px] lg:min-h-[550px] transition-all duration-500 hover:-translate-y-1 group bg-black shadow-2xl"
              >
                {/* Left: massive colored info panel */}
                <div
                  className={cn(
                    "md:w-[40%] xl:w-[35%] p-10 lg:p-14 flex flex-col justify-center relative overflow-hidden shrink-0",
                    project.bgClass
                  )}
                >
                  <div className="relative z-10 space-y-4">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-white/50">
                      Featured Service
                    </p>
                    <h3 className="text-3xl lg:text-4xl font-semibold tracking-[-0.03em] text-white leading-[1.15]">
                      {project.title}
                    </h3>
                    <p className="text-sm lg:text-base leading-8 text-white/70 mt-4">
                      {project.description}
                    </p>
                  </div>
                  <div className="relative z-10 mt-10 flex flex-col gap-6">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/20 bg-black/20 px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-white/80 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-3 text-sm font-semibold text-white/90 hover:text-white transition-all duration-300 group/link w-fit bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full backdrop-blur-md"
                    >
                      <span>Start this project</span>
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>

                {/* Right: Massive premium image panel */}
                <div className="h-64 md:h-auto md:w-[60%] xl:w-[65%] relative overflow-hidden bg-black flex-grow">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  {/* Subtle overlay gradient to ensure smooth blending near the panel edge */}
                  <div className="absolute inset-y-0 left-0 w-8 md:w-24 bg-gradient-to-r from-black/40 to-transparent mix-blend-multiply" />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="container py-24 sm:py-32">
        <div className="mb-10 max-w-3xl space-y-4">
          <span className="eyebrow">The Integration Process</span>
          <h2 className="display-title text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.1] tracking-tight text-foreground">
            <span className="block">We don't guess. We analyze,</span>
            <span className="block">
              build, and deploy with <span className="accent-word">precision.</span>
            </span>
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <article
              key={step.label}
              className="panel-surface rounded-[2rem] p-8 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-1"
            >
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-primary">
                {step.label}
              </p>
              <h3 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-foreground">
                {step.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="container py-24 sm:py-32">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(320px,1.05fr)]">
          <article className="panel-surface rounded-[2rem] p-8 sm:p-10">
            <span className="eyebrow">Philosophy</span>
            <blockquote className="display-title mt-6 max-w-2xl text-[clamp(1.8rem,5vw,3.8rem)] font-semibold leading-[1.1] tracking-tight text-foreground">
              <span className="block">Every system can</span>
              <span className="block">
                be questioned. <span className="accent-word">Every</span>
              </span>
              <span className="block">question can become a system.</span>
            </blockquote>
            <p className="mt-6 max-w-xl text-sm leading-8 text-muted-foreground sm:text-base">
              We believe that AI is not a magic wand. It is a lever. And if you
              place a lever in the right spot, you can move mountains. Our job is
              to find that exact spot in your business to maximize leverage and
              eliminate friction.
            </p>
          </article>

          <div className="grid gap-5">
            {principles.map((principle) => (
              <article key={principle} className="panel-surface rounded-[1.8rem] p-7">
                <p className="text-lg font-medium leading-8 text-foreground">
                  {principle}
                </p>
              </article>
            ))}

            <article className="hazard-stripe rounded-[1.8rem] px-6 py-6 shadow-[0_18px_50px_hsl(var(--primary)/0.16)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em]">
                    Ready to eliminate bottlenecks?
                  </p>
                  <p className="mt-2 text-sm leading-7 text-primary-foreground/80 sm:text-base">
                    Book a free operational audit to see exactly where automated
                    workflows can cut costs in your business.
                  </p>
                </div>
                <Button asChild variant="secondary">
                  <Link to="/contact">Get My Free Audit</Link>
                </Button>
              </div>
            </article>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Home;
