import { useEffect, useState } from "react";

import PageHero from "@/components/PageHero";
import SiteLayout from "@/components/SiteLayout";

const thoughts = [
  "Every system eventually becomes the bottleneck it was designed to fix.",
  "AI is not a magic wand. It is a lever.",
  "Technology without a business case is just expensive decoration.",
  "True efficiency is eliminating the need to do the task at all.",
  "Scale means building systems that don't break when you win.",
];

const principles = [
  {
    title: "Diagnostics over assumptions",
    description: "Before we write a single line of code, we ask 'Why?' until we hit the absolute baseline of your problem.",
  },
  {
    title: "Leverage over novelty",
    description: "We don't use AI because it's new. We use it out of a ruthless desire for measurable ROI.",
  },
  {
    title: "Thought should change behavior",
    description: "If an idea does not improve the workflow, reduce cost, or multiply output, it is not finished.",
  },
];

const Philosophy = () => {
  const [currentThought, setCurrentThought] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentThought((prev) => (prev + 1) % thoughts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Approach"
        title={
          <>
            <span className="block">Systems that</span>
            <span className="block">
              <span className="accent-word">refuse</span> to sit still.
            </span>
          </>
        }
        description="This page is less about philosophical conclusions and more about the frameworks that shape our work."
        metrics={[
          { label: "Prompts", value: "5 rotating frameworks" },
          { label: "Intent", value: "Ask better questions before building" },
          { label: "Effect", value: "Concepts become operational leverage" },
        ]}
        aside={
          <div className="space-y-5">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-primary">Why it matters</p>
            <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-semibold tracking-tight leading-[1.2] text-foreground">
              First principles are our operating system.
            </h2>
            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
              They dictate how we simplify a workflow, how we map your business, and how we decide what deserves automated attention.
            </p>
          </div>
        }
      />

      <section className="container py-24 sm:py-32">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)]">
          <article className="panel-surface relative min-h-[420px] overflow-hidden rounded-[2rem] p-8 sm:p-10">
            <span className="eyebrow">Rotating thought</span>

            <div className="relative mt-8 min-h-[250px]">
              {thoughts.map((thought, index) => (
                <p
                  key={thought}
                  className={`absolute inset-0 text-[clamp(2rem,4vw,3.8rem)] font-semibold leading-[0.94] tracking-[-0.08em] transition-all duration-700 ${index === currentThought
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-6 opacity-0"
                    }`}
                >
                  {thought}
                </p>
              ))}

              <p className="pointer-events-none opacity-0 text-[clamp(2rem,4vw,3.8rem)] font-semibold leading-[0.94] tracking-[-0.08em]">
                {thoughts[0]}
              </p>
            </div>

            <div className="mt-10 border-t border-white/8 pt-5 text-sm leading-7 text-muted-foreground">
              These are not just slogans. They are the mental models we use to dissect and solve operational friction.
            </div>
          </article>

          <div className="grid gap-5">
            {principles.map((principle) => (
              <article key={principle.title} className="panel-surface rounded-[1.8rem] p-7">
                <h3 className="text-[clamp(1.25rem,3vw,1.75rem)] font-semibold tracking-tight leading-[1.2] text-foreground">{principle.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-24 sm:py-32">
        <article className="panel-surface rounded-[2rem] p-8 sm:p-10">
          <span className="eyebrow">Position</span>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <p className="text-sm leading-8 text-muted-foreground sm:text-base">
              We do not believe in hype. We believe in mapping your exact business logic first, identifying the bottlenecks, and only deploying technology where it guarantees a measurable return.
            </p>
            <p className="text-sm leading-8 text-muted-foreground sm:text-base">
              These frameworks are useful only if they affect how your team operates, how the systems behave, and how much leverage you gain over daily tasks.
            </p>
          </div>
        </article>
      </section>
    </SiteLayout>
  );
};

export default Philosophy;
