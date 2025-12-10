import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Line, MeshDistortMaterial, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// Types
type Category = "STR_ART" | "CX_UX" | "SONIC" | "META";

interface DebrisData {
  id: string;
  category: Category;
  relevance: number;
  headline: string;
}

// Category Colors
const CATEGORY_COLORS: Record<Category, string> = {
  STR_ART: "#ff0055",
  CX_UX: "#00ff41",
  SONIC: "#00ccff",
  META: "#ffffff",
};

// Mock Data
const MOCK_DEBRIS: DebrisData[] = [
  { id: "d01", category: "CX_UX", relevance: 95, headline: "User Flow Optimization" },
  { id: "d02", category: "STR_ART", relevance: 88, headline: "Brand Identity System" },
  { id: "d03", category: "SONIC", relevance: 72, headline: "Audio Branding Suite" },
  { id: "d04", category: "META", relevance: 45, headline: "AR Experience Layer" },
  { id: "d05", category: "CX_UX", relevance: 62, headline: "Onboarding Redesign" },
  { id: "d06", category: "STR_ART", relevance: 91, headline: "Visual Language V2" },
  { id: "d07", category: "SONIC", relevance: 33, headline: "Ambient Soundscape" },
  { id: "d08", category: "META", relevance: 85, headline: "AI Integration Core" },
  { id: "d09", category: "CX_UX", relevance: 28, headline: "Legacy Support Module" },
  { id: "d10", category: "STR_ART", relevance: 55, headline: "Icon System Refresh" },
  { id: "d11", category: "SONIC", relevance: 98, headline: "Voice Interface Engine" },
  { id: "d12", category: "META", relevance: 15, headline: "Archive Protocol" },
  { id: "d13", category: "CX_UX", relevance: 77, headline: "Mobile-First Framework" },
  { id: "d14", category: "STR_ART", relevance: 42, headline: "Print Collateral Set" },
  { id: "d15", category: "SONIC", relevance: 68, headline: "Notification Tones" },
  { id: "d16", category: "META", relevance: 82, headline: "Neural Network Hub" },
  { id: "d17", category: "CX_UX", relevance: 36, headline: "Accessibility Audit" },
  { id: "d18", category: "STR_ART", relevance: 93, headline: "Motion Design System" },
  { id: "d19", category: "SONIC", relevance: 22, headline: "Background Loops" },
  { id: "d20", category: "META", relevance: 58, headline: "Data Viz Dashboard" },
  { id: "d21", category: "CX_UX", relevance: 89, headline: "Checkout Flow v3" },
  { id: "d22", category: "STR_ART", relevance: 18, headline: "Legacy Assets" },
];

// Data Analysis
const analyzeDebrisData = (debris: DebrisData[]) => {
  const categoryCount = debris.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<Category, number>);
  
  const dominantCategory = Object.entries(categoryCount).reduce((a, b) => 
    a[1] > b[1] ? a : b
  )[0] as Category;

  const averageRelevance = debris.reduce((sum, item) => sum + item.relevance, 0) / debris.length;
  const pulseSpeed = 0.5 + (averageRelevance / 100) * 2.5;

  return { dominantCategory, averageRelevance, pulseSpeed };
};

// Calculate position based on relevance and category
const calculatePosition = (relevance: number, category: Category, seed: number): [number, number, number] => {
  let radius: number;
  if (relevance >= 80) {
    radius = 2.5 + (100 - relevance) / 20 * 1.5;
  } else if (relevance >= 40) {
    radius = 4 + (80 - relevance) / 40 * 2;
  } else {
    radius = 6 + (40 - relevance) / 40 * 3;
  }

  // Seeded random for stable positions
  const seededRandom = (s: number) => {
    const x = Math.sin(s * 12.9898 + 78.233) * 43758.5453;
    return x - Math.floor(x);
  };

  const jitterX = (seededRandom(seed) - 0.5) * 2;
  const jitterY = (seededRandom(seed + 1) - 0.5) * 2;
  const jitterZ = (seededRandom(seed + 2) - 0.5) * 2;

  let x = 0, y = 0, z = 0;
  
  switch (category) {
    case "CX_UX":
      y = radius * (0.6 + seededRandom(seed + 3) * 0.4);
      x = jitterX * radius * 0.5;
      z = jitterZ * radius * 0.5;
      break;
    case "STR_ART":
      y = -radius * (0.6 + seededRandom(seed + 3) * 0.4);
      x = jitterX * radius * 0.5;
      z = jitterZ * radius * 0.5;
      break;
    case "SONIC":
      x = radius * (0.6 + seededRandom(seed + 3) * 0.4);
      y = jitterY * radius * 0.5;
      z = jitterZ * radius * 0.5;
      break;
    case "META":
      x = -radius * (0.6 + seededRandom(seed + 3) * 0.4);
      y = jitterY * radius * 0.5;
      z = jitterZ * radius * 0.5;
      break;
  }

  return [x, y, z];
};

// The Liquid Core Component
const LiquidCore = ({ color, pulseSpeed }: { color: string; pulseSpeed: number }) => {
  const materialRef = useRef<any>(null);
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.distort = 0.4 + Math.sin(state.clock.elapsedTime * pulseSpeed) * 0.2;
    }
  });

  return (
    <Sphere args={[1.5, 64, 64]}>
      <MeshDistortMaterial 
        ref={materialRef}
        color={color}
        emissive={color}
        emissiveIntensity={2}
        roughness={0.1}
        metalness={1}
        speed={5}
      />
    </Sphere>
  );
};

// Debris Shard Component
const DebrisShard = ({ 
  data, 
  position,
  isActive,
  onHover,
  onLeave 
}: { 
  data: DebrisData;
  position: [number, number, number];
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const color = CATEGORY_COLORS[data.category];

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group>
      <mesh 
        ref={meshRef}
        position={position}
        scale={isActive ? 1.8 : 1}
        onPointerEnter={(e) => { e.stopPropagation(); onHover(); }}
        onPointerLeave={onLeave}
      >
        <tetrahedronGeometry args={[0.25, 0]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={isActive ? 3 : 0.5}
          wireframe={!isActive}
          transparent
          opacity={isActive ? 1 : 0.6}
        />
      </mesh>

      {/* Data Stream - visible when active or high relevance */}
      {(isActive || data.relevance > 90) && (
        <Line
          points={[position, [0, 0, 0]]}
          color={isActive ? "#fff" : color}
          lineWidth={isActive ? 2 : 1}
          transparent
          opacity={isActive ? 0.8 : 0.5}
        />
      )}
    </group>
  );
};

// Data Card Component
const DataCard = ({ data }: { data: DebrisData }) => {
  const borderColor = CATEGORY_COLORS[data.category];
  
  return (
    <div 
      className="absolute bottom-8 left-8 z-20 pointer-events-none"
      style={{
        fontFamily: "'Courier New', Courier, monospace",
        background: 'rgba(0, 0, 0, 0.9)',
        border: `2px solid ${borderColor}`,
        padding: '16px 20px',
        minWidth: '280px',
      }}
    >
      <div style={{ color: borderColor, marginBottom: '8px' }}>
        {`> DECRYPTING_ID: [${data.id}]`}
      </div>
      <div style={{ color: '#888', marginBottom: '4px' }}>
        CATEGORY: <span style={{ color: borderColor }}>{data.category}</span>
      </div>
      <div style={{ color: '#888', marginBottom: '4px' }}>
        RELEVANCE: <span style={{ color: '#00ff41' }}>{data.relevance}%</span>
      </div>
      <div style={{ color: '#888' }}>
        HEADLINE: <span style={{ color: '#fff' }}>{data.headline}</span>
      </div>
    </div>
  );
};

// Main Component
const NeuralCloud = () => {
  const [activeShard, setActiveShard] = useState<DebrisData | null>(null);
  
  const analysis = useMemo(() => analyzeDebrisData(MOCK_DEBRIS), []);
  const dominantColor = CATEGORY_COLORS[analysis.dominantCategory];
  
  // Pre-calculate stable positions
  const debrisPositions = useMemo(() => {
    return MOCK_DEBRIS.map((item, index) => ({
      data: item,
      position: calculatePosition(item.relevance, item.category, index * 100)
    }));
  }, []);

  return (
    <section id="cloud" className="relative h-screen w-full" style={{ backgroundColor: '#050505' }}>
      {/* UI Overlay */}
      <div className="absolute top-8 left-8 z-10 font-mono font-bold tracking-wider text-sm md:text-base" style={{ color: '#00ff41' }}>
        // NEURAL_SINGULARITY
      </div>
      
      {/* Stats Overlay */}
      <div className="absolute top-8 right-8 z-10 text-xs font-mono opacity-70">
        <div style={{ color: dominantColor }}>
          DOMINANT: {analysis.dominantCategory}
        </div>
        <div style={{ color: '#00ff41' }}>
          AVG_RELEVANCE: {analysis.averageRelevance.toFixed(1)}%
        </div>
        <div style={{ color: 'rgba(255,255,255,0.5)' }}>
          PULSE_FREQ: {analysis.pulseSpeed.toFixed(2)}Hz
        </div>
      </div>

      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        {/* Atmosphere */}
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 5, 20]} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#fff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff0055" />

        {/* The Liquid Core */}
        <LiquidCore color={dominantColor} pulseSpeed={analysis.pulseSpeed} />

        {/* Data Debris */}
        {debrisPositions.map(({ data, position }) => (
          <DebrisShard 
            key={data.id}
            data={data}
            position={position}
            isActive={activeShard?.id === data.id}
            onHover={() => setActiveShard(data)}
            onLeave={() => setActiveShard(null)}
          />
        ))}
        
        {/* Post Processing - The Aura/Glow */}
        <EffectComposer enableNormalPass={false}>
          <Bloom 
            luminanceThreshold={1}
            mipmapBlur
            intensity={1.5}
            radius={0.6}
          />
        </EffectComposer>
      </Canvas>
      
      {/* Data Card Overlay */}
      {activeShard && <DataCard data={activeShard} />}
    </section>
  );
};

export default NeuralCloud;
