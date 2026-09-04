import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, ChevronRight } from "lucide-react";
import GlowCard from "@/components/effects/GlowCard";
import useSoundEffects from "@/hooks/useSoundEffects";

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  image?: string;
  github?: string;
  live?: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Note Wallet",
    description: "Multi-role wallet & e-commerce platform with Admin, Vendor, and User portals.",
    longDescription:
      "Built a full-featured multi-role platform including Admin, Vendor, and User portals to manage wallet operations and e-commerce workflows from a unified system. Implemented secure authentication and role-based access control to safeguard financial and customer data, enabled admins to manage products, orders, vendors, and payouts with configurable workflows, and used Redux Toolkit with RTK Query for scalable API integration and caching across responsive, modular UI components.",
    tech: ["React", "TypeScript", "Redux Toolkit", "RTK Query", "Node.js"],
    // github: "https://github.com",
    // live: "https://example.com",
    featured: true,
  },
  {
    id: 2,
    title: "Mishkat",
    description: "Full-stack enterprise web application with scalable architecture and secure APIs.",
    longDescription:
      "Developed a full-stack enterprise web application with scalable architecture, secure APIs, and role-based access control for efficient business operations. Built responsive, reusable interfaces with Next.js, TypeScript, Tailwind CSS, and RTK Query, and scalable backend services in Node.js with JWT authentication, RBAC, and route guards. Designed and optimized MySQL databases with TypeORM, integrated third-party APIs, dynamic forms, and search/filter/pagination, and improved performance through SSR, lazy loading, and code splitting.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MySQL", "TypeORM"],
    // github: "https://github.com",
    // live: "https://example.com",
    featured: true,
  },
  {
    id: 3,
    title: "LERN-360",
    description: "Multi-role e-learning ecosystem with blockchain-powered course payments.",
    longDescription:
      "Built a multi-role e-learning ecosystem with four interconnected platforms — Admin, Student, Reviewer, and Instructor — enabling seamless collaboration and content lifecycle management. Developed role-based dashboards where instructors create courses, reviewers approve them, and students purchase approved courses using LERN Tokens powered by blockchain smart contracts. Integrated MetaMask wallet authentication and on-chain payment logic, with Redux and RTK Query for state management across all roles.",
    tech: ["React", "Node.js", "Redux Toolkit", "RTK Query", "Web3", "Smart Contracts"],
    // github: "https://github.com",
    // live: "https://example.com",
    featured: true,
  },
  {
    id: 4,
    title: "EduBlock Pro",
    description: "Secure online exam portal with Aadhaar and OTP-based student verification.",
    longDescription:
      "Developed a full-fledged exam portal with separate interfaces for students and admins. Integrated Aadhaar and mobile OTP verification along with photo verification for secure student authentication. Admins can create, schedule, and manage exams while students access and attempt exams on specified dates, with seamless data flow and state management using Redux Toolkit and RTK Query.",
    tech: ["React", "TypeScript", "Next.js", "Redux Toolkit", "RTK Query"],
    // github: "https://github.com",
    // live: "https://example.com",
    featured: false,
  },
  {
    id: 5,
    title: "Sixr",
    description: "Built Sixr, a cricket-based Telegram mobile game using React, TypeScript, and NestJS.",
    longDescription:
      "Developed Sixr, a cricket-based Telegram mobile game using React and TypeScript for the frontend and NestJS for the backend, delivering real-time gameplay, scalable APIs, and a smooth user experience.",
    tech: ["React", "TypeScript", "NestJs", "Unity"],
    // github: "https://github.com",
    featured: false,
  },
  {
    id: 6,
    title: "Escape Earth",
    description: "Telegram-based infinite runner mobile game with fast-paced gameplay.",
    longDescription:
      "Developed Escape Earth, a Telegram-based infinite runner mobile game built with React (JavaScript) on the frontend and NestJS on the backend, delivering fast-paced gameplay and scalable backend services.",
    tech: ["React", "JavaScript", "Telegram Bot", "NestJs", "Unity"],
    // github: "https://github.com",
    // live: "https://example.com",
    featured: false,
  },
  {
    id: 7,
    title: "Khayo Pio",
    description: "Built Khayo-Piyo, a frontend food ordering app with restaurant browsing, cart management, and billing.",
    longDescription:
      "Developed Khayo-Piyo, a frontend-only food ordering application that allows users to browse restaurants, select food items, add them to a cart, and view the final bill with a smooth and intuitive user experience.",
    tech: ["React", "JavaScript", "Bootstrap"],
    github: "https://github.com/neerajverma111/Khayo-Piyp",
    featured: false,
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);
  const { playSound } = useSoundEffects();

  const displayedProjects = showAll ? projects : projects.filter((p) => p.featured);

  const handleProjectClick = (project: Project) => {
    playSound("click");
    setSelectedProject(project);
  };

  return (
    <section
      id="projects"
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
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
            <span className="font-mono text-accent text-sm">03</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold">PROJECTS</h2>
            <span className="font-mono text-accent text-sm">{"<projects>"}</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          </div>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <GlowCard
                className="h-full p-6 flex flex-col"
                glowColor={index % 3 === 0 ? "primary" : index % 3 === 1 ? "secondary" : "accent"}
                onClick={() => handleProjectClick(project)}
              >
                {/* Project header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <span className="font-display text-primary font-bold">
                      {String(project.id).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Project content */}
                <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 flex-grow">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs font-mono bg-card border border-border rounded text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>

        {/* Show more button */}
        {!showAll && projects.length > 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center mt-8"
          >
            <button
              onClick={() => {
                playSound("click");
                setShowAll(true);
              }}
              className="group flex items-center gap-2 px-6 py-3 rounded-lg border border-primary/30 hover:border-primary bg-card/30 hover:bg-primary/10 transition-all font-mono text-sm text-primary"
            >
              View All Projects
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}

        {/* Project modal */}
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl w-full glass-card p-8 rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>

              <h3 className="font-display text-2xl font-bold text-primary mb-4">
                {selectedProject.title}
              </h3>
              <p className="text-foreground mb-6">{selectedProject.longDescription}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm font-mono bg-primary/10 border border-primary/30 rounded-full text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/50 hover:bg-primary/10 transition-colors text-primary font-mono text-sm"
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </a>
                )}
                {selectedProject.live && (
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-mono text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
