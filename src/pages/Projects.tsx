import { useState } from "react";

import PageHero from "@/components/PageHero";
import ProjectCard from "@/components/ProjectCard";
import SiteLayout from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "YouTube Content Automation",
    description:
      "Automating the full video workflow from idea to publish: research, script generation, edit guidance, and scheduling in one system.",
    tech: ["n8n", "LLM", "YouTube API", "Automation"],
  },
  {
    title: "Instagram Reels Automation",
    description:
      "Auto-posting, caption optimization, and release timing based on audience behavior instead of random guesswork.",
    tech: ["n8n", "OpenAI", "Instagram API", "Analytics"],
  },
  {
    title: "YouTube Video Analysis",
    description:
      "An AI pipeline that checks transcript-based claims against multiple sources and sends a structured summary by email.",
    tech: ["n8n", "LLM", "Transcript API", "Email API"],
  },
];

const workflowNotes = [
  "Structured intake before the workflow starts",
  "Readable output instead of raw automation logs",
  "Visual treatment designed to feel product-grade",
];

const Projects = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<unknown | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch("http://localhost:4000/api/project-one", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        let errorMessage = "Something went wrong. Please try again.";

        try {
          const errorData = await response.json();
          const parsedError =
            (typeof errorData === "string" && errorData) ||
            errorData?.message ||
            errorData?.error ||
            errorData?.detail;

          if (parsedError) {
            errorMessage = parsedError;
          }
        } catch {
          // The response may not be JSON.
        }

        setError(errorMessage);
        return;
      }

      const data = await response.json();
      setResult(data);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      const fallbackMessage = err instanceof Error ? err.message : "Unexpected network error.";
      setError(`Network error: ${fallbackMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Projects"
        title={
          <>
            <span className="block">
              Automation <span className="accent-word">experiments</span>
            </span>
            <span className="block">where the system is part</span>
            <span className="block">
              of the <span className="accent-word">design.</span>
            </span>
          </>
        }
        description="These projects are not just technical flows. They are attempts to make complexity feel readable, useful, and worth interacting with."
        metrics={[
          { label: "Featured", value: "3 active build directions" },
          { label: "Stack", value: "n8n, AI models, APIs, workflow design" },
          { label: "Goal", value: "From idea to execution with less drag" },
        ]}
        aside={
          <div className="space-y-5">
            <div className="overflow-hidden rounded-[1.7rem] border border-white/8">
              <img
                src="/images/automation-architecture.png"
                alt="Automation architecture visual"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-primary">Design note</p>
            <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-semibold tracking-tight leading-[1.2] text-foreground">
              Projects should look as intentional as they behave.
            </h2>
            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
              The previous project page felt flat. This version uses stronger cards, cleaner spacing, and clearer visual
              grouping so each experiment feels like a case study instead of a list item.
            </p>
          </div>
        }
      />

      <section className="container py-24 sm:py-32">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(360px,1.05fr)]">
          <div className="grid gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} {...project} delay={index * 100} />
            ))}
          </div>

          <article className="panel-surface rounded-[2rem] p-8 sm:p-10">
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="overflow-hidden rounded-[1.6rem] border border-white/8">
                  <img
                    src="/images/automation-architecture.png"
                    alt="Automation workflow visual"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-primary">
                  Live workflow demo
                </p>
                <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-semibold tracking-tight leading-[1.2] text-foreground">
                  Trigger an automation and watch the shape of the input.
                </h2>
                <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                  This form feeds the backend demo endpoint. The redesign gives it more room, clearer labels, and a
                  better hierarchy so it feels like part of the product.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {workflowNotes.map((note) => (
                  <div
                    key={note}
                    className="rounded-[1.3rem] border border-white/8 bg-white/[0.04] px-4 py-3 text-sm leading-7 text-foreground"
                  >
                    {note}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="project-name" className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Name
                  </label>
                  <input
                    id="project-name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your name"
                    required
                    className="flex h-12 w-full rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-foreground shadow-[inset_0_1px_0_hsl(0_0%_100%/0.04)] transition-all duration-300 placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="project-email" className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Email
                  </label>
                  <input
                    id="project-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex h-12 w-full rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-foreground shadow-[inset_0_1px_0_hsl(0_0%_100%/0.04)] transition-all duration-300 placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="project-message" className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Workflow brief
                  </label>
                  <textarea
                    id="project-message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="What should the workflow do?"
                    required
                    rows={5}
                    className="flex min-h-[160px] w-full rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-foreground shadow-[inset_0_1px_0_hsl(0_0%_100%/0.04)] transition-all duration-300 placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Running workflow" : "Run automation"}
                </Button>

                {error && (
                  <div className="rounded-[1.3rem] border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm leading-7 text-destructive">
                    {error}
                  </div>
                )}

                {result && (
                  <div className="rounded-[1.5rem] border border-white/8 bg-black/20 p-4 text-xs text-foreground">
                    <pre className="whitespace-pre-wrap break-words">{JSON.stringify(result, null, 2)}</pre>
                  </div>
                )}
              </form>
            </div>
          </article>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Projects;
