import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Github, Linkedin, Twitter, Send, ArrowUpRight } from "lucide-react";
import GlowCard from "@/components/effects/GlowCard";
import useSoundEffects from "@/hooks/useSoundEffects";

interface SocialLink {
  name: string;
  icon: typeof Mail;
  href: string;
  color: "primary" | "secondary" | "accent";
  username: string;
}

const socialLinks: SocialLink[] = [
  {
    name: "Email",
    icon: Mail,
    href: "mailto:hello@johndoe.dev",
    color: "primary",
    username: "hello@johndoe.dev",
  },
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/johndoe",
    color: "secondary",
    username: "@johndoe",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/in/johndoe",
    color: "accent",
    username: "John Doe",
  },
  {
    name: "Twitter",
    icon: Twitter,
    href: "https://twitter.com/johndoe",
    color: "primary",
    username: "@johndoe",
  },
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { playSound } = useSoundEffects();

  const handleLinkClick = () => {
    playSound("click");
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative min-h-screen flex items-center py-20 px-4"
    >
      <div className="max-w-4xl mx-auto w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="flex items-center gap-4 mb-4 justify-center">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
            <span className="font-mono text-primary text-sm">04</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold">CONTACT</h2>
            <span className="font-mono text-primary text-sm">{"<contact>"}</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-xl mx-auto"
          >
            Got a project in mind? Let's build something amazing together. 
            I'm always open to discussing new opportunities and ideas.
          </motion.p>
        </motion.div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <GlowCard className="p-8 text-center" glowColor="primary">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/30 mb-6">
              <Send className="w-7 h-7 text-primary" />
            </div>

            <h3 className="font-display text-2xl font-bold text-foreground mb-4">
              Let's Work Together
            </h3>

            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Whether you have a question, want to start a project, or just want to say hi, 
              my inbox is always open!
            </p>

            <a
              href="mailto:hello@johndoe.dev"
              onClick={handleLinkClick}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-display font-bold hover:bg-primary/90 transition-all hover:scale-105 neon-border"
            >
              <Mail className="w-5 h-5" />
              Say Hello
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </GlowCard>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              target={link.name !== "Email" ? "_blank" : undefined}
              rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
              onClick={handleLinkClick}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <GlowCard className="p-4 text-center h-full" glowColor={link.color}>
                <link.icon className="w-6 h-6 mx-auto mb-2 text-muted-foreground group-hover:text-primary transition-colors" />
                <div className="font-mono text-sm text-foreground">{link.name}</div>
                <div className="text-xs text-muted-foreground truncate">{link.username}</div>
              </GlowCard>
            </motion.a>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-8" />

          <p className="font-mono text-sm text-muted-foreground mb-2">
            Designed & Built by{" "}
            <span className="text-primary">John Doe</span>
          </p>

          <p className="font-mono text-xs text-muted-foreground/50">
            © {new Date().getFullYear()} • Made with 💜 and lots of ☕
          </p>
        </motion.footer>
      </div>
    </section>
  );
};

export default ContactSection;
