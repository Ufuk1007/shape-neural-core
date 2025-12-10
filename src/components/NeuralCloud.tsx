import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, Tetrahedron, Line } from "@react-three/drei";
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
  CX_UX: "#0f0",
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

// Data Analysis Functions
const analyzeDebrisData = (debris: DebrisData[]) => {
  // Dominant Category
  const categoryCount = debris.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<Category, number>);
  
  const dominantCategory = Object.entries(categoryCount).reduce((a, b) => 
    a[1] > b[1] ? a : b
  )[0] as Category;

  // Average Relevance
  const averageRelevance = debris.reduce((sum, item) => sum + item.relevance, 0) / debris.length;

  // Top 5 Nodes
  const top5Nodes = [...debris]
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 5);

  // Pulse speed: map 0-100 to 0.5-3.0
  const pulseSpeed = 0.5 + (averageRelevance / 100) * 2.5;

  return { dominantCategory, averageRelevance, top5Nodes, pulseSpeed };
};

// Calculate position based on relevance and category
const calculatePosition = (relevance: number, category: Category): [number, number, number] => {
  let radius: number;
  if (relevance >= 80) {
    radius = 2.5 + (100 - relevance) / 20 * 1.5;
  } else if (relevance >= 40) {
    radius = 4 + (80 - relevance) / 40 * 2;
  } else {
    radius = 6 + (40 - relevance) / 40 * 3;
  }

  const jitter = () => (Math.random() - 0.5) * 2;
  let x = 0, y = 0, z = 0;
  
  switch (category) {
    case "CX_UX":
      y = radius * (0.6 + Math.random() * 0.4);
      x = jitter() * radius * 0.5;
      z = jitter() * radius * 0.5;
      break;
    case "STR_ART":
      y = -radius * (0.6 + Math.random() * 0.4);
      x = jitter() * radius * 0.5;
      z = jitter() * radius * 0.5;
      break;
    case "SONIC":
      x = radius * (0.6 + Math.random() * 0.4);
      y = jitter() * radius * 0.5;
      z = jitter() * radius * 0.5;
      break;
    case "META":
      x = -radius * (0.6 + Math.random() * 0.4);
      y = jitter() * radius * 0.5;
      z = jitter() * radius * 0.5;
      break;
  }

  return [x, y, z];
};

// Debris Item Component
const DebrisItem = ({ 
  data, 
  isActive,
  onHover,
  onLeave 
}: { 
  data: DebrisData; 
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const position = useMemo(() => calculatePosition(data.relevance, data.category), [data]);
  const rotationSpeed = useMemo(() => ({
    x: (Math.random() - 0.5) * 0.02,
    y: (Math.random() - 0.5) * 0.02,
  }), []);

  const color = CATEGORY_COLORS[data.category];

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed.x;
      meshRef.current.rotation.y += rotationSpeed.y;
    }
  });

  return (
    <group>
      <Tetrahedron
        ref={meshRef}
        args={[0.2]}
        position={position}
        scale={isActive ? 1.5 : 1}
        onPointerEnter={(e) => { e.stopPropagation(); onHover(); }}
        onPointerLeave={onLeave}
      >
        <meshBasicMaterial 
          color={color} 
          wireframe={!isActive} 
          transparent 
          opacity={isActive ? 1 : 0.8} 
        />
      </Tetrahedron>
      
      {/* Connection Line to Center */}
      {isActive && (
        <Line
          points={[position, [0, 0, 0]]}
          color={color}
          lineWidth={1}
          transparent
          opacity={0.6}
        />
      )}
    </group>
  );
};

// Reactive Pulsing Core Component
const ReactiveCore = ({ 
  dominantColor, 
  pulseSpeed,
  top5Positions 
}: { 
  dominantColor: string;
  pulseSpeed: number;
  top5Positions: [number, number, number][];
}) => {
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (innerRef.current) {
      // Inner core rotates one direction
      innerRef.current.rotation.x += 0.003;
      innerRef.current.rotation.y += 0.005;
      // Pulse based on calculated speed
      const pulse = 1 + Math.sin(time * pulseSpeed) * 0.15;
      innerRef.current.scale.setScalar(pulse);
    }
    
    if (outerRef.current) {
      // Outer shell rotates opposite direction
      outerRef.current.rotation.x -= 0.002;
      outerRef.current.rotation.y -= 0.004;
      // Slower, inverse pulse
      const outerPulse = 1 + Math.sin(time * pulseSpeed * 0.5) * 0.08;
      outerRef.current.scale.setScalar(outerPulse);
    }
  });

  return (
    <group>
      {/* Inner Core - Solid, Glowing */}
      <Icosahedron ref={innerRef} args={[1.2, 1]}>
        <meshBasicMaterial color={dominantColor} transparent opacity={0.95} />
      </Icosahedron>
      
      {/* Outer Shell - Wireframe, Counter-rotating */}
      <Icosahedron ref={outerRef} args={[1.8, 1]}>
        <meshBasicMaterial color={dominantColor} wireframe transparent opacity={0.4} />
      </Icosahedron>
      
      {/* Permanent Data Streams to Top 5 */}
      {top5Positions.map((pos, i) => (
        <Line
          key={`stream-${i}`}
          points={[[0, 0, 0], pos]}
          color={dominantColor}
          lineWidth={0.5}
          transparent
          opacity={0.25}
          dashed
          dashSize={0.3}
          gapSize={0.2}
        />
      ))}
    </group>
  );
};

// Data Card Overlay
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
        RELEVANCE: <span style={{ color: '#0f0' }}>{data.relevance}%</span>
      </div>
      <div style={{ color: '#888' }}>
        HEADLINE: <span style={{ color: '#fff' }}>{data.headline}</span>
      </div>
    </div>
  );
};

const NeuralCloud = () => {
  const [activeShard, setActiveShard] = useState<DebrisData | null>(null);
  
  // Analyze data once
  const analysis = useMemo(() => analyzeDebrisData(MOCK_DEBRIS), []);
  
  // Calculate positions for top 5 nodes (stable positions)
  const top5Positions = useMemo(() => {
    return analysis.top5Nodes.map(node => calculatePosition(node.relevance, node.category));
  }, [analysis.top5Nodes]);

  return (
    <section 
      id="cloud"
      className="relative h-screen w-full"
      style={{ 
        backgroundColor: '#111',
        fontFamily: "'Courier New', Courier, monospace"
      }}
    >
      {/* Section Header */}
      <div className="absolute top-8 left-8 z-10 text-[#0f0] font-bold tracking-wider text-sm md:text-base">
        // NEURAL_DEBRIS_FIELD
      </div>
      
      {/* Data Stats Overlay */}
      <div className="absolute top-8 right-8 z-10 text-xs font-mono opacity-60">
        <div style={{ color: CATEGORY_COLORS[analysis.dominantCategory] }}>
          DOMINANT: {analysis.dominantCategory}
        </div>
        <div className="text-[#0f0]">
          AVG_RELEVANCE: {analysis.averageRelevance.toFixed(1)}%
        </div>
        <div className="text-white/50">
          PULSE_FREQ: {analysis.pulseSpeed.toFixed(2)}Hz
        </div>
      </div>

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#ff0055" />
        
        <ReactiveCore 
          dominantColor={CATEGORY_COLORS[analysis.dominantCategory]}
          pulseSpeed={analysis.pulseSpeed}
          top5Positions={top5Positions}
        />
        
        {MOCK_DEBRIS.map((item) => (
          <DebrisItem 
            key={item.id} 
            data={item} 
            isActive={activeShard?.id === item.id}
            onHover={() => setActiveShard(item)}
            onLeave={() => setActiveShard(null)}
          />
        ))}
      </Canvas>

      {/* Data Card Overlay */}
      {activeShard && <DataCard data={activeShard} />}
    </section>
  );
};

export default NeuralCloud;
