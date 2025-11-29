import { useState } from "react";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { Badge } from "@/components/ui/badge";

const Projects = () => {
  const projects = [
    {
      title: "YouTube Content Automation",
      description: "automating the entire video workflow — from idea to publish. a complete pipeline that handles research, script generation, editing suggestions, and scheduling.",
      tech: ["n8n", "LLM", "YouTube API", "Automation"],
    },
    {
      title: "Instagram Reels Automation",
      description: "auto-posting and caption optimization with minimal human effort. smart content scheduling based on engagement patterns and audience behavior.",
      tech: ["n8n", "OpenAI", "Instagram API", "Analytics"],
    },
    {
      title: "YouTube Video Analysis",
      description: "AI pipeline that fetches a video's transcript, checks factual accuracy against multiple sources, and emails a structured analysis with insights.",
      tech: ["n8n", "LLM", "Transcript API", "Email API"],
    },
  ];

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
          // Ignored: response body may not be JSON.
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
      const fallbackMessage =
        err instanceof Error ? err.message : "Unexpected network error.";
      setError(`Network error: ${fallbackMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundImage: 'url(/gradient-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: window.innerWidth > 1024 ? 'fixed' : 'scroll'
      }}
    >
      <Navigation />
      
      <main className="container mx-auto px-6 pt-40 pb-32">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="space-y-8 animate-fade-up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-none">
              projects
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-normal max-w-2xl">
              automation experiments where ideas meet execution.
            </p>
          </div>

          <div className="h-px bg-border/40" />

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                {...project}
                delay={index * 100}
              />
            ))}

            <div className="rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl shadow-lg p-6 text-white flex flex-col space-y-6 animate-fade-up">
              <div className="flex flex-wrap gap-2">
                {["n8n", "Webhook", "Automation"].map((item) => (
                  <Badge
                    key={item}
                    variant="secondary"
                    className="bg-white/15 text-white/80 border-white/10 font-medium text-xs px-3 py-1"
                  >
                    {item}
                  </Badge>
                ))}
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-white tracking-tight">
                  N8N Workflow Automation
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Real-time automation demo - Enter details and watch the workflow execute via webhook
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  required
                  className="w-full rounded-lg bg-white/10 px-3 py-2 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-white/40"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Your email"
                  required
                  className="w-full rounded-lg bg-white/10 px-3 py-2 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-white/40"
                />

                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="What should the workflow do?"
                  required
                  rows={4}
                  className="w-full rounded-lg bg-white/10 px-3 py-2 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-white/40"
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-lg bg-white/90 text-gray-900 font-medium px-4 py-2 transition hover:bg-white disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Running..." : "Run Automation"}
                </button>

                {error && (
                  <div className="rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm p-3">
                    {error}
                  </div>
                )}

                {result && (
                  <div className="rounded-lg bg-black/30 border border-white/10 text-white/80 text-xs p-3 mt-4">
                    <pre className="whitespace-pre-wrap break-words">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  </div>
                )}
              </form>
            </div>
          </div>

          <div className="pt-12 text-center">
            <p className="text-sm text-muted-foreground font-normal italic">
              new experiments coming soon — every workflow is an idea turned into motion.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;
