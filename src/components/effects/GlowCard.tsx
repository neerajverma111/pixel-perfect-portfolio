import { ReactNode, useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "primary" | "secondary" | "accent";
  onClick?: () => void;
}

const GlowCard = ({
  children,
  className = "",
  glowColor = "primary",
  onClick,
}: GlowCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const glowColors = {
    primary: "rgba(0, 255, 240, 0.15)",
    secondary: "rgba(255, 0, 255, 0.15)",
    accent: "rgba(139, 92, 246, 0.15)",
  };

  const borderColors = {
    primary: "border-primary/30 hover:border-primary/60",
    secondary: "border-secondary/30 hover:border-secondary/60",
    accent: "border-accent/30 hover:border-accent/60",
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative rounded-lg border backdrop-blur-xl bg-card/40 overflow-hidden transition-all duration-300",
        borderColors[glowColor],
        onClick && "cursor-pointer",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Glow effect following mouse */}
      {isHovered && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColors[glowColor]}, transparent 70%)`,
            inset: 0,
          }}
        />
      )}

      {/* Border glow */}
      <div
        className={cn(
          "absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300",
          isHovered && "opacity-100"
        )}
        style={{
          boxShadow: `0 0 30px ${glowColors[glowColor].replace("0.15", "0.3")}`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default GlowCard;
