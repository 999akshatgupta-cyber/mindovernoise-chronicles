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
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-2xl mx-auto space-y-12 animate-fade-up">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight">
              contact
            </h1>
            <p className="text-xl text-muted-foreground font-light">
              or just say hi — i reply when it's something real.
            </p>
          </div>

          <div className="h-px bg-border/50" />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-light text-muted-foreground">
                name
              </label>
              <Input
                id="name"
                placeholder="your name"
                required
                className="bg-secondary/30 border-border/50 focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-light text-muted-foreground">
                email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                required
                className="bg-secondary/30 border-border/50 focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-light text-muted-foreground">
                message
              </label>
              <Textarea
                id="message"
                placeholder="what's on your mind?"
                required
                rows={6}
                className="bg-secondary/30 border-border/50 focus:border-primary transition-colors resize-none"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all duration-300 hover:shadow-glow"
            >
              send message
            </Button>
          </form>

          <div className="h-px bg-border/50" />

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground font-light text-center">
              or connect on social
            </p>
            <div className="flex justify-center gap-6">
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
                  className="p-3 bg-secondary/30 border border-border/50 rounded-lg hover:bg-secondary/50 hover:border-primary/30 transition-all duration-300 hover:shadow-glow group"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
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
