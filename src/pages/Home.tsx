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
    image: "/images/automation-architecture.png",
  },
  {
    title: "Data & Reporting",
    description:
      "We build systems that automatically pull up your daily/weekly metrics so you don't have to wait for an employee to build a report.",
    tags: ["LLM Pipelines", "Data Synthesis", "Analytics"],
    image: "/images/narrative-surfaces.png",
  },
  {
    title: "Customer Interaction",
    description:
      "We build AI agents that handle your frontline customer questions 24/7, answering exactly how you want them to.",
    tags: ["Voice AI", "Chat Agents", "Support"],
    image: "/images/voice-interaction.png",
  },
];

const selectedProjects = [
  {
    title: "YouTube Content Automation",
    description:
      "An end-to-end pipeline that moves from research and scripting to edit planning and scheduling with minimal manual overhead.",
    notes: "Sharper process, faster shipping, cleaner review loop.",
  },
  {
    title: "Instagram Reels Automation",
    description:
      "A system that adapts captions, timing, and distribution patterns for short-form content without turning the workflow into chaos.",
    notes: "Built for repeatability, not just novelty.",
  },
  {
    title: "Video Truth Layer",
    description:
      "A review workflow that pulls transcripts, checks claims, and returns a structured analysis before something gets published.",
    notes: "Useful when speed and correctness both matter.",
  },
];

const processSteps = [
  {
    label: "01 / Discovery",
    title: "The Deep Dive",
    description: "We start by mapping your business. We talk to your team, understand your daily operations, and find the exact points where time and money are bleeding.",
  },
  {
    label: "02 / Strategy",
    title: "The Blueprint",
    description: "We present a clear, no-nonsense proposal detailing exactly which AI workflows can be implemented, the timeline, and the projected ROI. If we can't save you money or make you faster, we won't pitch you.",
  },
  {
    label: "03 / Execution",
    title: "The Build",
    description: "We build and integrate the systems directly into your current infrastructure. No massive learning curves for your team.",
  },
  {
    label: "04 / Scaling",
    title: "The Handoff & Optimization",
    description: "We ensure your team knows how to use the new systems, and we monitor the automated workflows to optimize them for maximum efficiency.",
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
        <div className="hazard-stripe rounded-[1.8rem] px-6 py-5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] shadow-[0_18px_50px_hsl(var(--primary)/0.18)] sm:flex sm:items-center sm:justify-between sm:gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out" style={{ animationDelay: '900ms' }}>
          <span>Built on First Principles, Not Hype.</span>
          <span className="mt-2 block text-primary-foreground/75 sm:mt-0">
            We only deploy technology where it guarantees a measurable ROI.
          </span>
        </div>
      </section>

      <section className="container py-24 sm:py-32">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <span className="eyebrow">The Core Problem</span>
            <h2 className="display-title text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[1.1] tracking-tight text-foreground">
              <span className="block">Your team is too expensive</span>
              <span className="block">
                to be doing <span className="accent-word">robot work.</span>
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-8 text-muted-foreground sm:text-base">
            Right now, your employees are spending hours manually moving data between software, copying and pasting emails, and doing tasks a machine could do instantly. You are paying human wages for bot work. <br /><br />
            <strong className="text-foreground">The Pivot:</strong> Off-the-shelf software won't fix this. You need a custom system built specifically for how your business runs today.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {capabilities.map((capability, index) => (
            <article
              key={capability.title}
              className={cn("panel-surface rounded-[2rem] p-8 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-1 flex flex-col group", index === 1 && "lg:translate-y-10")}
            >
              {capability.image && (
                <div className="mb-6 overflow-hidden rounded-2xl border border-white/10 aspect-video relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img
                    src={capability.image}
                    alt={capability.title}
                    className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              )}
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-primary">
                Core capability
              </p>
              <h3 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-foreground">{capability.title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground flex-grow">{capability.description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {capability.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-foreground transition-colors duration-300 group-hover:bg-white/[0.08]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container py-24 sm:py-32">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <span className="eyebrow">Trust</span>
            <h2 className="display-title text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.1] tracking-tight text-foreground">
              <span className="block">We build for ROI,</span>
              <span className="block">
                not for <span className="accent-word">hype.</span>
              </span>
            </h2>
            <p className="max-w-xl text-sm leading-8 text-muted-foreground sm:text-base mt-4">
              We map out your exact business logic first. We identify where you are wasting the most time, and we only install AI if it guarantees you get those hours back.
            </p>
          </div>

          <Button asChild variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-foreground transition-colors duration-300">
            <Link to="/projects">
              View all projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          {selectedProjects.map((project, index) => (
            <article
              key={project.title}
              className={cn(
                "panel-surface rounded-[2rem] p-8 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-1",
                index === 0 && "lg:col-span-7",
                index === 1 && "lg:col-span-5",
                index === 2 && "lg:col-span-12",
              )}
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl space-y-4">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-primary">
                    Featured case
                  </p>
                  <h3 className="text-3xl font-semibold tracking-[-0.03em] text-foreground">{project.title}</h3>
                  <p className="text-sm leading-7 text-muted-foreground">{project.description}</p>
                </div>

                <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.04] px-4 py-3 text-sm leading-7 text-foreground lg:max-w-xs transition-colors duration-300 hover:bg-white/[0.08]">
                  {project.notes}
                </div>
              </div>
            </article>
          ))}
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
            <article key={step.label} className="panel-surface rounded-[2rem] p-8 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-1">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-primary">{step.label}</p>
              <h3 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-foreground">{step.title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{step.description}</p>
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
              We believe that AI is not a magic wand. It is a lever. And if you place a lever in the right spot, you can move mountains. Our job is to find that exact spot in your business to maximize leverage and eliminate friction.
            </p>
          </article>

          <div className="grid gap-5">
            {principles.map((principle) => (
              <article key={principle} className="panel-surface rounded-[1.8rem] p-7">
                <p className="text-lg font-medium leading-8 text-foreground">{principle}</p>
              </article>
            ))}

            <article className="hazard-stripe rounded-[1.8rem] px-6 py-6 shadow-[0_18px_50px_hsl(var(--primary)/0.16)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em]">Ready to eliminate bottlenecks?</p>
                  <p className="mt-2 text-sm leading-7 text-primary-foreground/80 sm:text-base">
                    Book a free operational audit to see exactly where automated workflows can cut costs in your business.
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
