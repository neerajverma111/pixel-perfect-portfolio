import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Skill {
  name: string;
  level: number;
  category: string;
  color: "primary" | "secondary" | "accent";
}

const skills: Skill[] = [
  // Frontend
  { name: "HTML", level: 95, category: "Frontend", color: "primary" },
  { name: "React", level: 95, category: "Frontend", color: "primary" },
  { name: "TypeScript", level: 90, category: "Frontend", color: "primary" },
  { name: "JavaScript", level: 90, category: "Frontend", color: "primary" },
  { name: "Next.js", level: 85, category: "Frontend", color: "primary" },
  { name: "Tailwind CSS", level: 92, category: "Frontend", color: "primary" },
  { name: "Redux Toolkit", level: 88, category: "Frontend", color: "primary" },
  { name: "CSS", level: 90, category: "Frontend", color: "primary" },

  // Backend
  { name: "Node.js", level: 80, category: "Backend", color: "secondary" },
  { name: "REST APIs", level: 88, category: "Backend", color: "secondary" },
  { name: "MySQL", level: 78, category: "Backend", color: "secondary" },
  { name: "Smart Contracts", level: 70, category: "Backend", color: "secondary" },
  { name: "Wallet Integration", level: 75, category: "Backend", color: "secondary" },

  // Tools
  { name: "Git", level: 90, category: "Tools", color: "secondary" },
  { name: "GitHub", level: 90, category: "Tools", color: "secondary" },
  { name: "GitLab", level: 80, category: "Tools", color: "secondary" },
  { name: "Docker", level: 75, category: "Tools", color: "secondary" },
  { name: "i18n", level: 80, category: "Tools", color: "secondary" },
  { name: "Claude Code", level: 90, category: "Tools", color: "accent" },
  { name: "Cursor AI", level: 90, category: "Tools", color: "accent" },
  { name: "Antigravity", level: 90, category: "Tools", color: "accent" },
  { name: "Windsurf", level: 90, category: "Tools", color: "accent" },
  { name: "KIRO", level: 90, category: "Tools", color: "accent" },
  { name: "IntelliJ", level: 80, category: "Tools", color: "accent" },
];

const categories = ["All", "Frontend", "Backend", "Tools"];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  const colorClasses = {
    primary: {
      bg: "bg-primary",
      text: "text-primary",
      border: "border-primary/30 hover:border-primary",
      glow: "shadow-primary/30",
    },
    secondary: {
      bg: "bg-secondary",
      text: "text-secondary",
      border: "border-secondary/30 hover:border-secondary",
      glow: "shadow-secondary/30",
    },
    accent: {
      bg: "bg-accent",
      text: "text-accent",
      border: "border-accent/30 hover:border-accent",
      glow: "shadow-accent/30",
    },
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="relative min-h-screen flex items-center py-20 px-4"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
            <span className="font-mono text-secondary text-sm">02</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold">SKILLS</h2>
            <span className="font-mono text-secondary text-sm">{"<skills>"}</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
          </div>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-6 py-2 rounded-full font-mono text-sm border transition-all duration-300",
                activeCategory === category
                  ? "bg-primary/20 border-primary text-primary neon-border"
                  : "border-muted bg-card/30 text-muted-foreground hover:border-primary/50 hover:text-foreground"
              )}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              className={cn(
                "relative p-4 rounded-lg border backdrop-blur-sm bg-card/30 transition-all duration-300 cursor-pointer group",
                colorClasses[skill.color].border,
                hoveredSkill === skill.name && `shadow-lg ${colorClasses[skill.color].glow}`
              )}
            >
              {/* Skill name */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-sm text-foreground group-hover:text-primary transition-colors">
                  {skill.name}
                </span>
                <span className={cn("text-xs font-mono", colorClasses[skill.color].text)}>
                  {skill.level}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                  className={cn("h-full rounded-full", colorClasses[skill.color].bg)}
                />
              </div>

              {/* Hover glow */}
              {hoveredSkill === skill.name && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, hsl(var(--${skill.color}) / 0.1) 0%, transparent 70%)`,
                  }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Additional info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-muted-foreground mt-8 text-sm font-mono"
        >
          Always learning, always improving • Currently exploring: Backend technologies
        </motion.p>
      </div>
    </section>
  );
};

export default SkillsSection;
