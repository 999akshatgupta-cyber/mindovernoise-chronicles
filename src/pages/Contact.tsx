import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Instagram, Twitter, Linkedin } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! I'll get back to you soon.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-40 pb-32">
        <div className="max-w-2xl mx-auto space-y-16 animate-fade-up">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-none">
              contact
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-normal">
              or just say hi — i reply when it's something real.
            </p>
          </div>

          <div className="h-px bg-border/40" />

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label htmlFor="name" className="text-sm font-normal text-muted-foreground">
                name
              </label>
              <Input
                id="name"
                placeholder="your name"
                required
                className="bg-secondary/20 border-border/40 focus:border-primary transition-all duration-500 h-12"
              />
            </div>

            <div className="space-y-3">
              <label htmlFor="email" className="text-sm font-normal text-muted-foreground">
                email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                required
                className="bg-secondary/20 border-border/40 focus:border-primary transition-all duration-500 h-12"
              />
            </div>

            <div className="space-y-3">
              <label htmlFor="message" className="text-sm font-normal text-muted-foreground">
                message
              </label>
              <Textarea
                id="message"
                placeholder="what's on your mind?"
                required
                rows={6}
                className="bg-secondary/20 border-border/40 focus:border-primary transition-all duration-500 resize-none"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
            >
              send message
            </Button>
          </form>

          <div className="h-px bg-border/40" />

          <div className="space-y-6">
            <p className="text-sm text-muted-foreground font-normal text-center">
              or connect on social
            </p>
            <div className="flex justify-center gap-4">
              {[
                { icon: Instagram, url: "#", label: "Instagram" },
                { icon: Twitter, url: "#", label: "Twitter" },
                { icon: Linkedin, url: "#", label: "LinkedIn" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-secondary/20 border border-border/40 rounded-lg hover:bg-secondary/40 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_20px_hsl(217_91%_65%/0.15)] hover:-translate-y-0.5 group"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-all duration-500" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
