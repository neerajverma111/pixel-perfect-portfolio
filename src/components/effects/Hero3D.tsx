import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PlanetConfig {
  name: string;
  radius: number;
  distance: number;
  color: string;
  speed: number;
  tilt: number;
  hasRing?: boolean;
}

const PLANETS: PlanetConfig[] = [
  { name: "mercury", radius: 0.12, distance: 1.6, color: "#9ca3af", speed: 0.9, tilt: 0.1 },
  { name: "venus", radius: 0.18, distance: 2.15, color: "#f5b942", speed: 0.7, tilt: -0.05 },
  { name: "earth", radius: 0.2, distance: 2.75, color: "#00fff0", speed: 0.55, tilt: 0.15 },
  { name: "mars", radius: 0.15, distance: 3.3, color: "#ff5533", speed: 0.45, tilt: -0.1 },
  { name: "saturn", radius: 0.32, distance: 4.1, color: "#c9a86a", speed: 0.28, tilt: 0.2, hasRing: true },
  { name: "neptune", radius: 0.22, distance: 4.9, color: "#8b5cf6", speed: 0.2, tilt: -0.15 },
];

const Sun = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.15;
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial color="#ffb703" transparent opacity={0.85} />
      </mesh>
      {/* glow halo */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#ff8f00" transparent opacity={0.12} />
      </mesh>
      <pointLight color="#ffb703" intensity={1.4} distance={10} />
    </group>
  );
};

const OrbitRing = ({ radius }: { radius: number }) => {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return pts;
  }, [radius]);

  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  return (
    <primitive object={new THREE.LineLoop(geometry, new THREE.LineBasicMaterial({ color: "#4b5563", transparent: true, opacity: 0.35 }))} />
  );
};

const Planet = ({ config }: { config: PlanetConfig }) => {
  const orbitRef = useRef<THREE.Group>(null);
  const spinRef = useRef<THREE.Mesh>(null);
  const startAngle = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state, delta) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y = startAngle + state.clock.elapsedTime * config.speed * 0.3;
    }
    if (spinRef.current) {
      spinRef.current.rotation.y += delta * 1.2;
    }
  });

  return (
    <group ref={orbitRef} rotation={[config.tilt, 0, 0]}>
      <mesh ref={spinRef} position={[config.distance, 0, 0]}>
        <sphereGeometry args={[config.radius, 24, 24]} />
        <meshStandardMaterial color={config.color} roughness={0.6} metalness={0.1} />
        {config.hasRing && (
          <mesh rotation={[Math.PI / 2.2, 0, 0]}>
            <ringGeometry args={[config.radius * 1.5, config.radius * 2.3, 48]} />
            <meshBasicMaterial color="#c9a86a" side={THREE.DoubleSide} transparent opacity={0.55} />
          </mesh>
        )}
      </mesh>
    </group>
  );
};

const SystemGroup = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const targetX = state.pointer.y * 0.15;
    const targetY = state.pointer.x * 0.25;
    groupRef.current.rotation.x += (targetX - 0.35 - groupRef.current.rotation.x) * 0.02;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.02;
  });

  return (
    <group
      ref={groupRef}
      rotation={[0.45, 0, 0]}
      position={[0, -4.6, -2.5]}
      scale={0.75}
    >
      <Sun />
      {PLANETS.map((planet) => (
        <group key={planet.name} rotation={[planet.tilt, 0, 0]}>
          <OrbitRing radius={planet.distance} />
        </group>
      ))}
      {PLANETS.map((planet) => (
        <Planet key={planet.name} config={planet} />
      ))}
    </group>
  );
};

const Starfield = () => {
  const positions = useMemo(() => {
    const arr = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
    }
    return arr;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.03} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

const Hero3D = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 1, 9.5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <Starfield />
          <SystemGroup />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Hero3D;
