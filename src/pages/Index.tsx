import { useState, useEffect, useCallback } from "react";
import GridBackground from "@/components/effects/GridBackground";
import ParticleBackground from "@/components/effects/ParticleBackground";
import FloatingShapes from "@/components/effects/FloatingShapes";
import Satellites from "@/components/effects/Satellites";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import Terminal from "@/components/Terminal";
import { motion } from "framer-motion";

const Index = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll progress for XP bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut for terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !isTerminalOpen) {
        setIsTerminalOpen(true);
      } else if (e.key === "Escape" && isTerminalOpen) {
        setIsTerminalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isTerminalOpen]);

  const handleNavigate = useCallback((section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Background layers */}
      <GridBackground />
      <ParticleBackground />
      <FloatingShapes />
      <Satellites />

      {/* XP Progress Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted"
      >
        <div
          className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </motion.div>

      {/* Level indicator */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
        className="fixed top-4 left-4 z-40 font-mono text-xs text-muted-foreground"
      >
        <span className="text-primary">LVL</span>{" "}
        <span className="text-foreground">{Math.floor(scrollProgress / 25) + 1}</span>
        <span className="text-muted-foreground/50"> / 5</span>
      </motion.div>

      {/* Main content */}
      <main className="relative z-10">
        <HeroSection onOpenTerminal={() => setIsTerminalOpen(true)} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* Interactive Terminal */}
      <Terminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default Index;
