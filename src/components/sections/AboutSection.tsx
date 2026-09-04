import GlowCard from "@/components/effects/GlowCard";
import { motion, useInView } from "framer-motion";
import { Calendar, Compass, MapPin, Timer, TimerIcon, TimerOff, User } from "lucide-react";
import { useRef, useState } from "react";
import profileImage from "@/assets/profile.png";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [avatarTilt, setAvatarTilt] = useState({ rotateX: 0, rotateY: 0 });

  const stats = [
    { icon: Calendar, label: "Started Coding", value: "2024" },
    { icon: MapPin, label: "Location", value: "Mohali, Punjab" },
    { icon: Timer, label: "Total Experience", value: "2.5+ Years" },
  ];

  return (
    <section
      id="about"
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
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <span className="font-mono text-primary text-sm">01</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold">ABOUT ME</h2>
            <span className="font-mono text-primary text-sm">{"<about>"}</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Avatar / Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
            style={{ perspective: 1000 }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
              const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
              setAvatarTilt({ rotateY: x * 12, rotateX: -y * 12 });
            }}
            onMouseLeave={() => setAvatarTilt({ rotateX: 0, rotateY: 0 })}
          >
            <motion.div
              className="relative aspect-square max-w-md mx-auto"
              animate={{ rotateX: avatarTilt.rotateX, rotateY: avatarTilt.rotateY }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 rounded-2xl blur-2xl" />

              {/* Avatar container */}
              <div className="relative glass-card rounded-2xl p-8 h-full flex items-center justify-center">
                <div
                  className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-primary/30"
                  style={{ transform: "translateZ(40px)" }}
                >
                  <img
                    src={profileImage}
                    alt="Neeraj Kumar"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Orbiting elements */}
                <motion.div
                  className="absolute w-full h-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{ transform: "translateZ(60px)" }}
                >
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
                </motion.div>
                <motion.div
                  className="absolute w-full h-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  style={{ transform: "translateZ(60px)" }}
                >
                  <div className="absolute bottom-8 right-8 w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_hsl(var(--secondary))]" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <GlowCard className="p-6">
              <p className="text-lg text-foreground/90 leading-relaxed mb-4">
                Hello! I'm a <span className="text-primary font-semibold">passionate software engineer</span> who 
                loves building digital experiences that live on the internet. My journey in tech 
                started with curiosity and has evolved into a full-blown obsession with clean code 
                and elegant solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I specialize in building (and occasionally designing) exceptional digital experiences. 
                Currently, I'm focused on building accessible, human-centered products that make a 
                real difference in people's lives.
              </p>
            </GlowCard>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                >
                  <GlowCard
                    className="p-4 text-center"
                    glowColor={index === 0 ? "primary" : index === 1 ? "secondary" : "accent"}
                  >
                    <stat.icon className="w-5 h-5 mx-auto mb-2 text-primary" />
                    <div className="font-display text-lg font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </GlowCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
