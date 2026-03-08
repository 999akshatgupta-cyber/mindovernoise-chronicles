import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  delay?: number;
}

const ProjectCard = ({ title, description, tech, delay = 0 }: ProjectCardProps) => {
  const cardNumber = String(delay / 100 + 1).padStart(2, "0");

  return (
    <Card
      className="panel-surface group relative overflow-hidden rounded-[2rem] border-white/8 p-7 text-left shadow-none animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary via-primary/40 to-transparent" />
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/10 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative space-y-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-primary">Case {cardNumber}</p>
          <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-primary">
            featured build
          </span>
        </div>

        <div className="space-y-3">
          <h3 className="text-2xl font-semibold tracking-[-0.06em] text-foreground transition-colors duration-300 group-hover:text-primary">
            {title}
          </h3>

          <p className="text-sm leading-7 text-muted-foreground">{description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {tech.map((item) => (
            <Badge
              key={item}
              variant="secondary"
              className="border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-foreground"
            >
              {item}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
