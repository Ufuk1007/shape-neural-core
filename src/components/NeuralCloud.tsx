import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, Sphere } from "@react-three/drei";
import * as THREE from "three";

// Types
type Category = "STR_ART" | "CX_UX" | "SONIC" | "META";

interface DebrisData {
  id: string;
  category: Category;
  relevance: number;
  headline: string;
}

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

// Calculate position based on relevance and category
const calculatePosition = (relevance: number, category: Category, seed: number): [number, number, number] => {
  // Distance from center based on relevance
  let radius: number;
  if (relevance >= 80) {
    radius = 2.5 + (100 - relevance) / 20 * 1.5; // 2.5 to 4
  } else if (relevance >= 40) {
    radius = 4 + (80 - relevance) / 40 * 2; // 4 to 6
  } else {
    radius = 6 + (40 - relevance) / 40 * 3; // 6 to 9
  }

  // Jitter
  const jitter = () => (Math.random() - 0.5) * 2;
  
  // Base direction by category
  let x = 0, y = 0, z = 0;
  
  switch (category) {
    case "CX_UX": // North (Positive Y)
      y = radius * (0.6 + Math.random() * 0.4);
      x = jitter() * radius * 0.5;
      z = jitter() * radius * 0.5;
      break;
    case "STR_ART": // South (Negative Y)
      y = -radius * (0.6 + Math.random() * 0.4);
      x = jitter() * radius * 0.5;
      z = jitter() * radius * 0.5;
      break;
    case "SONIC": // East (Positive X)
      x = radius * (0.6 + Math.random() * 0.4);
      y = jitter() * radius * 0.5;
      z = jitter() * radius * 0.5;
      break;
    case "META": // West (Negative X)
      x = -radius * (0.6 + Math.random() * 0.4);
      y = jitter() * radius * 0.5;
      z = jitter() * radius * 0.5;
      break;
  }

  return [x, y, z];
};

// Debris Item Component
const DebrisItem = ({ data, index }: { data: DebrisData; index: number }) => {
  const position = useMemo(() => calculatePosition(data.relevance, data.category, index), [data, index]);
  
  return (
    <Sphere args={[0.1, 8, 8]} position={position}>
      <meshBasicMaterial color="white" wireframe />
    </Sphere>
  );
};

// Pulsing Core Component
const PulsingCore = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.008;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <Icosahedron ref={meshRef} args={[1.5, 1]}>
      <meshBasicMaterial color="#ff0055" wireframe transparent opacity={0.9} />
    </Icosahedron>
  );
};

const NeuralCloud = () => {
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

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#ff0055" />
        
        {/* Central Core */}
        <PulsingCore />
        
        {/* Debris Field */}
        {MOCK_DEBRIS.map((item, index) => (
          <DebrisItem key={item.id} data={item} index={index} />
        ))}
      </Canvas>
    </section>
  );
};

export default NeuralCloud;
