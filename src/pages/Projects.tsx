import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";

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
