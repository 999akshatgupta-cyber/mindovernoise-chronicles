import PageHero from "@/components/PageHero";
import SiteLayout from "@/components/SiteLayout";

const values = [
  {
    title: "Systems over hacks",
    description: "We prefer workflows that scale with clarity over quick tricks that only work once.",
  },
  {
    title: "Reality over hype",
    description: "Technology without a business case is just expensive decoration. We build for measurable ROI.",
  },
  {
    title: "Frictionless execution",
    description: "The best systems are the ones your team doesn't have to think about.",
  },
];

const timeline = [
  {
    label: "Foundation",
    title: "Systems Thinking",
    description: "We look at businesses not as a collection of tasks, but as a system of interconnected levers.",
  },
  {
    label: "Execution",
    title: "Intelligent Workflows",
    description: "We deploy AI where it guarantees a measurable return, eliminating delays and manual labor.",
  },
  {
    label: "Outcome",
    title: "Uncapped Leverage",
    description: "With constraints removed, your team is free to focus entirely on high-impact growth.",
  },
];

const About = () => {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="About"
        title={
          <>
            <span className="block">The Mind Over</span>
            <span className="block">
              <span className="accent-word">Noise</span> Standard.
            </span>
          </>
        }
        description="AI is just a tool. We focus on the system."
        metrics={[
          { label: "Identity", value: "Mindovernoise / Akshat Gupta" },
          { label: "Discipline", value: "Operational problem solving, AI systems" },
          { label: "Approach", value: "Question hard, eliminate friction" },
        ]}
        aside={
          <div className="space-y-5">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-primary">The Manifesto</p>
            <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-semibold tracking-tight leading-[1.2] text-foreground">
              Most agencies are trying to sell you the newest AI tool just because it looks cool. We don't.
            </h2>
          </div>
        }
      />

      <section className="container py-24 sm:py-32">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)]">
          <article className="panel-surface rounded-[2rem] p-8 sm:p-10">
            <span className="eyebrow">Story</span>
            <div className="mt-6 space-y-5 text-sm leading-8 text-muted-foreground sm:text-base">
              <p>
                My name is Akshat Gupta. I built this agency because I realized that while technology is changing fast, the core mechanics of a profitable business remain exactly the same: efficiency, cost-reduction, and speed.
              </p>
              <p>
                We operate on absolute reality. Before we write a single line of code, we look at your current workflow and ask 'Why are you doing it this way?' until we find the real bottleneck.
              </p>
              <p>
                We don't believe AI is magic. It is a lever. And if you place a lever in the exact right spot, you can lift a massive amount of weight. Our job is to find that exact spot in your business.
              </p>
            </div>
          </article>

          <div className="grid gap-5">
            {values.map((value) => (
              <article key={value.title} className="panel-surface rounded-[1.8rem] p-7">
                <h3 className="text-[clamp(1.25rem,3vw,1.75rem)] font-semibold tracking-tight leading-[1.2] text-foreground">{value.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-24 sm:py-32">
        <div className="mb-8 max-w-3xl space-y-4">
          <span className="eyebrow">Timeline</span>
          <h2 className="text-[clamp(1.8rem,5vw,3.8rem)] font-semibold leading-[1.1] tracking-tight text-foreground">
            The path is still moving, but the direction is clear.
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {timeline.map((item) => (
            <article key={item.label} className="panel-surface rounded-[2rem] p-8">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-primary">{item.label}</p>
              <h3 className="mt-5 text-[clamp(1.25rem,3vw,1.75rem)] font-semibold tracking-tight leading-[1.2] text-foreground">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
};

export default About;
