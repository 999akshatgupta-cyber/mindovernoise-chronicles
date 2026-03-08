import { toast } from "sonner";

import PageHero from "@/components/PageHero";
import SiteLayout from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const auditSteps = [
  {
    title: "1. The Discovery",
    description: "We map out your current workflows and identify where time and money are bleeding out.",
  },
  {
    title: "2. The Evaluation",
    description: "We evaluate which processes can be automated with high ROI and low risk.",
  },
  {
    title: "3. The Roadmap",
    description: "You get a concrete plan for how to implement these systems, whether you hire us or not.",
  },
];

const Contact = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    toast.success("Message received. I will get back to you soon.");
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Audit"
        title={
          <>
            <span className="block">Let's find your</span>
            <span className="block">
              <span className="accent-word">bottlenecks.</span>
            </span>
          </>
        }
        description="Book a 30-minute, no-obligation operational audit. We’ll look at how your business runs and tell you exactly where AI can reduce your costs today."
        metrics={[
          { label: "Focus", value: "Repetitive tasks & bottlenecks" },
          { label: "Outcome", value: "Clear roadmap for automation" },
          { label: "Cost", value: "Free 30-minute consultation" },
        ]}
        aside={
          <div className="space-y-5">
            <div className="overflow-hidden rounded-[1.7rem] border border-white/8">
              <img
                src="/images/voice-interaction.png"
                alt="Voice and interaction design visual"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-primary">Stop doing software's job</p>
            <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-semibold tracking-tight leading-[1.2] text-foreground">
              If your team is copying and pasting data, you are losing money.
            </h2>
            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
              Manually tracking statuses or fighting with inflexible tools is not scalable. Let's fix that.
            </p>
          </div>
        }
      />

      <section className="container py-24 sm:py-32">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(320px,1.05fr)]">
          <article className="panel-surface rounded-[2rem] p-8 sm:p-10">
            <span className="eyebrow">Book an Audit</span>
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="space-y-2">
                <label htmlFor="name" className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Name
                </label>
                <Input id="name" placeholder="Your name" required />
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Company Name
                </label>
                <Input id="company" placeholder="Acme Corp" required />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Email
                </label>
                <Input id="email" type="email" placeholder="your@email.com" required />
              </div>

              <div className="space-y-2">
                <label htmlFor="repetitive-task" className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  What is the most repetitive, annoying task your team does every week?
                </label>
                <Textarea id="repetitive-task" placeholder="e.g. Copying data from PDFs into Excel..." required rows={4} />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Get My Free Audit
              </Button>
            </form>
          </article>

          <div className="grid gap-5">
            {auditSteps.map((step, index) => (
              <article key={step.title} className="panel-surface rounded-[1.8rem] p-7">
                {index === 0 && (
                  <div className="mb-5 overflow-hidden rounded-[1.4rem] border border-white/8">
                    <img
                      src="/images/voice-interaction.png"
                      alt="Data workflow visualization"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <h3 className="text-[clamp(1.25rem,3vw,1.75rem)] font-semibold tracking-tight leading-[1.2] text-foreground">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{step.description}</p>
              </article>
            ))}

            <article className="hazard-stripe rounded-[1.8rem] px-6 py-6 shadow-[0_18px_50px_hsl(var(--primary)/0.16)]">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em]">Zero Fluff</p>
              <p className="mt-3 text-sm leading-7 text-primary-foreground/80 sm:text-base">
                No philosophical debates about the future of AI. Just a direct, honest look at your operations and where you can multiply output today.
              </p>
            </article>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Contact;
