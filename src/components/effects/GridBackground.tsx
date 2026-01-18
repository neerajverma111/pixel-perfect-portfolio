import { motion } from "framer-motion";

const GridBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-background via-background to-black" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 240, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 240, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Perspective grid at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[40vh] opacity-20"
        style={{
          background: `
            linear-gradient(transparent 0%, rgba(0, 255, 240, 0.1) 100%),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 59px,
              rgba(0, 255, 240, 0.1) 59px,
              rgba(0, 255, 240, 0.1) 60px
            )
          `,
          transform: "perspective(500px) rotateX(60deg)",
          transformOrigin: "bottom",
        }}
      />

      {/* Glow orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0, 255, 240, 0.08) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255, 0, 255, 0.06) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Scanlines overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 240, 0.5) 2px,
            rgba(0, 255, 240, 0.5) 4px
          )`,
        }}
      />
    </div>
  );
};

export default GridBackground;
