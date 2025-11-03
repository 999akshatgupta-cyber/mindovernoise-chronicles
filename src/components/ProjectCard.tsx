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
      className="group p-6 bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-500 hover:shadow-glow hover:-translate-y-1 animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="space-y-4">
        <h3 className="text-xl font-light tracking-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm leading-relaxed font-light">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {tech.map((item) => (
            <Badge 
              key={item} 
              variant="secondary" 
              className="bg-secondary/50 text-foreground/80 border border-border/30 font-light"
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
