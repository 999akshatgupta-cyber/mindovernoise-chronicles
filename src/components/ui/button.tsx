import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border text-[0.72rem] font-semibold uppercase tracking-[0.18em] transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-primary bg-primary text-primary-foreground shadow-[0_0_28px_hsl(var(--primary)/0.24)] hover:-translate-y-1 hover:shadow-[0_18px_40px_hsl(var(--primary)/0.22)]",
        destructive:
          "border-destructive bg-destructive text-destructive-foreground hover:-translate-y-1 hover:shadow-[0_18px_40px_hsl(var(--destructive)/0.24)]",
        outline:
          "border-white/12 bg-white/5 text-foreground hover:border-primary/50 hover:bg-primary/10 hover:text-primary",
        secondary:
          "border-white/10 bg-card/90 text-foreground hover:border-white/15 hover:bg-secondary hover:-translate-y-1",
        ghost:
          "border-transparent bg-transparent text-muted-foreground hover:bg-white/5 hover:text-foreground",
        link: "border-transparent bg-transparent p-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-10 px-4 text-[0.66rem]",
        lg: "h-14 px-8 text-xs",
        icon: "h-12 w-12 rounded-[1rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
