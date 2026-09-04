import { motion } from "framer-motion";

const FloatingShapes = () => {
  const shapes = [
    { type: "hexagon", size: 80, x: "10%", y: "20%", delay: 0, duration: 8 },
    { type: "triangle", size: 60, x: "85%", y: "15%", delay: 1, duration: 10 },
    { type: "circle", size: 40, x: "75%", y: "70%", delay: 2, duration: 7 },
    { type: "square", size: 50, x: "15%", y: "75%", delay: 0.5, duration: 9 },
    { type: "hexagon", size: 30, x: "50%", y: "85%", delay: 1.5, duration: 11 },
    { type: "triangle", size: 45, x: "90%", y: "50%", delay: 2.5, duration: 8 },
  ];

  const renderShape = (type: string, size: number) => {
    const strokeWidth = 1;
    
    switch (type) {
      case "hexagon":
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <polygon
              points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
            />
          </svg>
        );
      case "triangle":
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <polygon
              points="50,10 90,90 10,90"
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
            />
          </svg>
        );
      case "circle":
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
            />
          </svg>
        );
      case "square":
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <rect
              x="10"
              y="10"
              width="80"
              height="80"
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              transform="rotate(45 50 50)"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute text-primary/20"
          style={{ left: shape.x, top: shape.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
            y: [0, -30, 0],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {renderShape(shape.type, shape.size)}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingShapes;
