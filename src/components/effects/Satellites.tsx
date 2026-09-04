import { motion } from "framer-motion";

interface SatelliteConfig {
  id: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
  startY: string;
  reverse?: boolean;
}

const satellites: SatelliteConfig[] = [
  { id: 1, color: "hsl(var(--primary))", size: 26, duration: 22, delay: 0, startY: "8%" },
  { id: 2, color: "hsl(var(--secondary))", size: 20, duration: 28, delay: 6, startY: "38%", reverse: true },
  { id: 3, color: "hsl(var(--accent))", size: 22, duration: 25, delay: 12, startY: "65%" },
  { id: 4, color: "hsl(var(--primary))", size: 16, duration: 32, delay: 18, startY: "85%", reverse: true },
];

const SatelliteIcon = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    {/* body */}
    <rect x="24" y="24" width="16" height="16" rx="2" fill={color} />
    {/* solar panels */}
    <rect x="2" y="27" width="18" height="10" rx="1" fill={color} fillOpacity="0.5" stroke={color} strokeWidth="1" />
    <rect x="44" y="27" width="18" height="10" rx="1" fill={color} fillOpacity="0.5" stroke={color} strokeWidth="1" />
    {/* antenna */}
    <line x1="32" y1="24" x2="32" y2="12" stroke={color} strokeWidth="1.5" />
    <circle cx="32" cy="10" r="2.5" fill={color} />
    {/* connectors */}
    <line x1="20" y1="32" x2="24" y2="32" stroke={color} strokeWidth="1.5" />
    <line x1="40" y1="32" x2="44" y2="32" stroke={color} strokeWidth="1.5" />
  </svg>
);

const Satellites = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[6]">
      {satellites.map((sat) => {
        const from = sat.reverse ? "110vw" : "-10vw";
        const to = sat.reverse ? "-10vw" : "110vw";
        return (
          <motion.div
            key={sat.id}
            className="absolute drop-shadow-[0_0_8px_currentColor]"
            style={{ top: sat.startY, color: sat.color }}
            initial={{ x: from, opacity: 0 }}
            animate={{
              x: [from, to],
              y: [0, -50, 30, 0],
              rotate: sat.reverse ? [0, -15, 15, 0] : [0, 15, -15, 0],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: sat.duration,
              delay: sat.delay,
              repeat: Infinity,
              x: { duration: sat.duration, delay: sat.delay, repeat: Infinity, ease: "linear" },
              y: { duration: sat.duration, delay: sat.delay, repeat: Infinity, ease: "linear", times: [0, 0.08, 0.92, 1] },
              rotate: { duration: sat.duration, delay: sat.delay, repeat: Infinity, ease: "linear", times: [0, 0.08, 0.92, 1] },
              opacity: { duration: sat.duration, delay: sat.delay, repeat: Infinity, ease: "linear", times: [0, 0.08, 0.92, 1] },
            }}
          >
            <SatelliteIcon color={sat.color} size={sat.size} />
          </motion.div>
        );
      })}
    </div>
  );
};

export default Satellites;
