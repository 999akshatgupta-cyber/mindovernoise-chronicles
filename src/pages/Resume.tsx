import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import PageHero from "@/components/PageHero";
import SiteLayout from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";

const focusAreas = ["AI systems", "Intelligent automation", "Workflow mapping", "Data synthesis", "Systems thinking", "ROI-driven engineering"];

const Resume = () => {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Capabilities"
        title={
          <>
            <span className="block">The technical bedrock</span>
            <span className="block">
              of a <span className="accent-word">moving mission.</span>
            </span>
          </>
        }
        description="We combine deep technical capabilities with an unyielding focus on business outcomes."
        metrics={[
          { label: "Core focus", value: "Intelligent workflow automation" },
          { label: "Goal", value: "Eliminate repetitive friction" },
          { label: "Outcome", value: "Higher margins, uncapped scale" },
        ]}
        aside={
          <div className="space-y-5">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-primary">Current status</p>
            <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-semibold tracking-tight leading-[1.2] text-foreground">
              Built to multiply output.
            </h2>
            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
              We operate exclusively at the intersection of complex systems engineering and direct business impact.
            </p>
          </div>
        }
      />

      <section className="container py-24 sm:py-32">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)]">
          <article className="panel-surface rounded-[2rem] p-8 sm:p-10">
            <span className="eyebrow">Experience</span>
            <div className="mt-6 space-y-4">
              <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-semibold tracking-tight leading-[1.2] text-foreground">Mindovernoise</h2>
              <p className="text-base text-foreground">Operational Problem Solving & Automation</p>
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Present</p>
            </div>

            <div className="mt-10 border-t border-white/8 pt-6 text-sm leading-8 text-muted-foreground sm:text-base">
              Our identity is anchored in AI systems, automation architecture, frictionless digital experiences, and thoughtful engineering.
            </div>
          </article>

          <article className="panel-surface rounded-[2rem] p-8 sm:p-10">
            <span className="eyebrow">Focus areas</span>
            <div className="mt-6 flex flex-wrap gap-3">
              {focusAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-foreground"
                >
                  {area}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="container py-24 sm:py-32">
        <div className="grid gap-5 lg:grid-cols-3">
          <article className="panel-surface rounded-[2rem] p-8">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-primary">Strength</p>
            <h3 className="mt-5 text-[clamp(1.25rem,3vw,1.75rem)] font-semibold tracking-tight leading-[1.2] text-foreground">Cross-disciplinary thinking</h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Technical systems, philosophical framing, and interface decisions are all treated as part of the same
              product problem.
            </p>
          </article>

          <article className="panel-surface rounded-[2rem] p-8">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-primary">Style</p>
            <h3 className="mt-5 text-[clamp(1.25rem,3vw,1.75rem)] font-semibold tracking-tight leading-[1.2] text-foreground">Build fast, refine hard</h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Ideas move quickly into prototypes, then get reworked until the system feels cleaner and more deliberate.
            </p>
          </article>

          <article className="panel-surface rounded-[2rem] p-8">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-primary">Next step</p>
            <h3 className="mt-5 text-[clamp(1.25rem,3vw,1.75rem)] font-semibold tracking-tight leading-[1.2] text-foreground">Book an audit</h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Use the contact page to request a free operational audit, review work samples, or start a conversation about collaboration.
            </p>
          </article>
        </div>

        <div className="mt-10 flex justify-center">
          <Button asChild size="lg">
            <Link to="/contact">
              Request a consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Resume;
