import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface HeroMetric {
  label: string;
  value: string;
}

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  metrics?: HeroMetric[];
  aside?: ReactNode;
  className?: string;
}

const PageHero = ({ eyebrow, title, description, metrics, aside, className }: PageHeroProps) => {
  return (
    <section className={cn("container pb-24 sm:pb-32", className)}>
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] xl:items-end">
        <div className="space-y-8">
          <span className="eyebrow">{eyebrow}</span>

          <div className="space-y-5">
            <h1 className="display-title max-w-4xl text-[clamp(2rem,6vw,4.5rem)] font-semibold leading-[1.1] tracking-tight text-foreground">
              {title}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">{description}</p>
          </div>

          {metrics && metrics.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div key={metric.label} className="panel-surface rounded-[1.45rem] p-5">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-primary">
                    {metric.label}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-foreground">{metric.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {aside && <aside className="panel-surface rounded-[2rem] p-6 sm:p-8">{aside}</aside>}
      </div>
    </section>
  );
};

export default PageHero;
