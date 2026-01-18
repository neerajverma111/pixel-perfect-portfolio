import { motion } from "framer-motion";
import { Terminal, Volume2, VolumeX, ChevronDown } from "lucide-react";
import TypewriterText from "@/components/effects/TypewriterText";
import useSoundEffects from "@/hooks/useSoundEffects";

interface HeroSectionProps {
  onOpenTerminal: () => void;
}

const HeroSection = ({ onOpenTerminal }: HeroSectionProps) => {
  const { isMuted, toggleMute, playSound } = useSoundEffects();

  const handleTerminalClick = () => {
    playSound("click");
    onOpenTerminal();
  };

  const scrollToAbout = () => {
    playSound("whoosh");
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* Sound toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={toggleMute}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-card/50 backdrop-blur-sm border border-primary/30 hover:border-primary/60 transition-all"
        aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-muted-foreground" />
        ) : (
          <Volume2 className="w-5 h-5 text-primary" />
        )}
      </motion.button>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Glowing accent */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"
        />

        {/* Name / Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider mb-6">
            <span className="text-foreground">JOHN</span>{" "}
            <span className="text-primary neon-text">DOE</span>
          </h1>
        </motion.div>

        {/* Role typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8"
        >
          <p className="text-xl md:text-2xl text-muted-foreground font-mono">
            {"<"}{" "}
            <TypewriterText
              texts={[
                "Software Engineer",
                "Full Stack Developer",
                "Creative Coder",
                "Problem Solver",
              ]}
              className="text-primary"
              typingSpeed={80}
              deletingSpeed={40}
              pauseDuration={2500}
            />{" "}
            {"/>"}
          </p>
        </motion.div>

        {/* Terminal CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={handleTerminalClick}
            className="group relative px-8 py-4 rounded-lg bg-primary/10 border border-primary/50 hover:border-primary hover:bg-primary/20 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3 font-mono text-primary">
              <Terminal className="w-5 h-5" />
              <span>Open Terminal</span>
              <span className="text-xs text-muted-foreground">[Enter]</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </button>

          <span className="text-muted-foreground text-sm">or scroll down</span>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16"
        >
          {[
            { value: "5+", label: "Years Experience" },
            { value: "50+", label: "Projects Completed" },
            { value: "∞", label: "Lines of Code" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-primary neon-text">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.5 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary/60 hover:text-primary transition-colors"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.button>
    </section>
  );
};

export default HeroSection;
