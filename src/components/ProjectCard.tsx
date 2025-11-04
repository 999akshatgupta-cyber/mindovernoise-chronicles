import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  delay?: number;
}

const ProjectCard = ({ title, description, tech, delay = 0 }: ProjectCardProps) => {
  return (
    <Card 
      className="group p-8 bg-card/30 border-border/40 backdrop-blur-sm hover:bg-card/50 transition-all duration-500 hover:shadow-[0_4px_24px_hsl(0_0%_0%/0.5)] hover:-translate-y-1 animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="space-y-5">
        <h3 className="text-xl font-semibold tracking-tight group-hover:text-primary transition-all duration-500">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm leading-relaxed font-normal">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {tech.map((item) => (
            <Badge 
              key={item} 
              variant="secondary" 
              className="bg-secondary/40 text-foreground/70 border border-border/20 font-normal text-xs px-3 py-1"
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
