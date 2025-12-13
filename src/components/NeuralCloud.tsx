import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sphere, Line, MeshDistortMaterial, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { X, ExternalLink } from "lucide-react";

// Types
type Category = "STR_ART" | "CX_UX" | "SONIC" | "META";

interface DebrisData {
  id: string;
  category: Category;
  relevance: number;
  headline: string;
  url?: string;
  summary?: string;
}

// Category Colors
const CATEGORY_COLORS: Record<Category, string> = {
  STR_ART: "#ff0055",
  CX_UX: "#00ff41",
  SONIC: "#00ccff",
  META: "#ffffff",
};

// Fallback Mock Data
const MOCK_DEBRIS: DebrisData[] = [
  { id: "d01", category: "CX_UX", relevance: 95, headline: "User Flow Optimization", url: "#", summary: "Optimizing user journeys for maximum conversion." },
  { id: "d02", category: "STR_ART", relevance: 88, headline: "Brand Identity System", url: "#", summary: "Comprehensive visual identity framework." },
  { id: "d03", category: "SONIC", relevance: 72, headline: "Audio Branding Suite", url: "#", summary: "Sonic signature and audio identity." },
  { id: "d04", category: "META", relevance: 45, headline: "AR Experience Layer", url: "#", summary: "Augmented reality interface overlay." },
  { id: "d05", category: "CX_UX", relevance: 62, headline: "Onboarding Redesign", url: "#", summary: "Streamlined user onboarding flow." },
  { id: "d06", category: "STR_ART", relevance: 91, headline: "Visual Language V2", url: "#", summary: "Next generation design system." },
  { id: "d07", category: "SONIC", relevance: 33, headline: "Ambient Soundscape", url: "#", summary: "Environmental audio design." },
  { id: "d08", category: "META", relevance: 85, headline: "AI Integration Core", url: "#", summary: "Neural network processing hub." },
  { id: "d09", category: "CX_UX", relevance: 28, headline: "Legacy Support Module", url: "#", summary: "Backward compatibility layer." },
  { id: "d10", category: "STR_ART", relevance: 55, headline: "Icon System Refresh", url: "#", summary: "Updated iconography set." },
  { id: "d11", category: "SONIC", relevance: 98, headline: "Voice Interface Engine", url: "#", summary: "Voice-first interaction system." },
  { id: "d12", category: "META", relevance: 15, headline: "Archive Protocol", url: "#", summary: "Data archival and retrieval." },
  { id: "d13", category: "CX_UX", relevance: 77, headline: "Mobile-First Framework", url: "#", summary: "Touch-optimized interface." },
  { id: "d14", category: "STR_ART", relevance: 42, headline: "Print Collateral Set", url: "#", summary: "Physical brand materials." },
  { id: "d15", category: "SONIC", relevance: 68, headline: "Notification Tones", url: "#", summary: "Alert and notification sounds." },
  { id: "d16", category: "META", relevance: 82, headline: "Neural Network Hub", url: "#", summary: "AI processing center." },
  { id: "d17", category: "CX_UX", relevance: 36, headline: "Accessibility Audit", url: "#", summary: "WCAG compliance review." },
  { id: "d18", category: "STR_ART", relevance: 93, headline: "Motion Design System", url: "#", summary: "Animation and transition library." },
  { id: "d19", category: "SONIC", relevance: 22, headline: "Background Loops", url: "#", summary: "Ambient audio loops." },
  { id: "d20", category: "META", relevance: 58, headline: "Data Viz Dashboard", url: "#", summary: "Analytics visualization." },
  { id: "d21", category: "CX_UX", relevance: 89, headline: "Checkout Flow v3", url: "#", summary: "E-commerce purchase flow." },
  { id: "d22", category: "STR_ART", relevance: 18, headline: "Legacy Assets", url: "#", summary: "Historical brand assets." },
];

// Data Analysis
const analyzeDebrisData = (debris: DebrisData[]) => {
  if (debris.length === 0) {
    return { dominantCategory: "META" as Category, averageRelevance: 50, pulseSpeed: 1.5 };
  }
  
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
  isDecrypted,
  onHover,
  onLeave,
  onClick
}: { 
  data: DebrisData;
  position: [number, number, number];
  isActive: boolean;
  isDecrypted: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const color = CATEGORY_COLORS[data.category];

  useFrame(() => {
    if (meshRef.current && !isDecrypted) {
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
        onClick={(e) => { e.stopPropagation(); onClick(); }}
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

// Data Card Component (Hover preview)
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

// Decryption Panel Component (Full detail view)
const DecryptionPanel = ({ 
  data, 
  onClose 
}: { 
  data: DebrisData; 
  onClose: () => void;
}) => {
  const borderColor = CATEGORY_COLORS[data.category];
  
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Side Panel */}
      <div 
        className="fixed top-0 right-0 h-full w-full max-w-md z-50 animate-in slide-in-from-right duration-300"
        style={{
          fontFamily: "'Courier New', Courier, monospace",
          background: 'rgba(0, 0, 0, 0.95)',
          borderLeft: `2px solid ${borderColor}`,
        }}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between p-4 border-b"
          style={{ borderColor }}
        >
          <div style={{ color: '#00ff41' }} className="text-sm tracking-wider">
            {'>'} DECRYPTION_MODE
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 transition-colors rounded"
            style={{ color: '#fff' }}
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Source ID */}
          <div>
            <div className="text-xs mb-1" style={{ color: '#666' }}>
              {'>'} SOURCE_ID:
            </div>
            <div className="text-lg tracking-wider" style={{ color: borderColor }}>
              [{data.id}]
            </div>
          </div>
          
          {/* Category */}
          <div>
            <div className="text-xs mb-1" style={{ color: '#666' }}>
              CATEGORY:
            </div>
            <div 
              className="inline-block px-3 py-1 text-sm font-bold tracking-wider"
              style={{ 
                color: borderColor, 
                border: `1px solid ${borderColor}`,
                background: `${borderColor}15`
              }}
            >
              {data.category}
            </div>
          </div>
          
          {/* Relevance */}
          <div>
            <div className="text-xs mb-1" style={{ color: '#666' }}>
              RELEVANCE_SCORE:
            </div>
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold" style={{ color: '#00ff41' }}>
                {data.relevance}%
              </div>
              <div 
                className="flex-1 h-2 bg-white/10 overflow-hidden"
                style={{ border: '1px solid #333' }}
              >
                <div 
                  className="h-full transition-all duration-500"
                  style={{ 
                    width: `${data.relevance}%`,
                    background: borderColor
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Headline */}
          <div>
            <div className="text-xs mb-2" style={{ color: '#666' }}>
              HEADLINE:
            </div>
            <div className="text-xl leading-relaxed" style={{ color: '#fff' }}>
              {data.headline}
            </div>
          </div>
          
          {/* Summary */}
          {data.summary && (
            <div>
              <div className="text-xs mb-2" style={{ color: '#666' }}>
                SUMMARY:
              </div>
              <div 
                className="text-sm leading-relaxed p-4"
                style={{ 
                  color: '#aaa',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid #222'
                }}
              >
                {data.summary}
              </div>
            </div>
          )}
          
          {/* Link Button */}
          {data.url && data.url !== '#' && (
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 mt-8 font-bold tracking-wider text-sm transition-all hover:scale-[1.02]"
              style={{
                color: '#000',
                background: '#00ff41',
                border: '2px solid #00ff41',
              }}
            >
              <span>[ ACCESS_SOURCE_DATA ]</span>
              <ExternalLink size={16} />
            </a>
          )}
        </div>
        
        {/* Footer */}
        <div 
          className="absolute bottom-0 left-0 right-0 p-4 border-t text-xs"
          style={{ borderColor: '#222', color: '#444' }}
        >
          // CLICK_OUTSIDE_OR_[X]_TO_CLOSE
        </div>
      </div>
    </>
  );
};

// Mobile detection hook - only for phones (< 640px)
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
};

// Camera controller that updates based on screen size
const CameraController = ({ isMobile }: { isMobile: boolean }) => {
  const { camera } = useThree();
  
  useEffect(() => {
    // Desktop: z=10 (20% further than 8), Mobile: z=16
    camera.position.z = isMobile ? 16 : 10;
    (camera as THREE.PerspectiveCamera).fov = isMobile ? 60 : 50;
    (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
  }, [camera, isMobile]);
  
  return null;
};

// Main Component
const NeuralCloud = () => {
  const [activeShard, setActiveShard] = useState<DebrisData | null>(null);
  const [decryptedShard, setDecryptedShard] = useState<DebrisData | null>(null);
  const [debrisData, setDebrisData] = useState<DebrisData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  
  const isDecrypted = decryptedShard !== null;
  
  // Fetch external data from GitHub Raw URL
  useEffect(() => {
    const fetchDebrisData = async () => {
      const GITHUB_RAW_URL = 'https://raw.githubusercontent.com/Ufuk1007/shape-neural-core/main/public/data/debris.json';
      
      console.log('[NEURAL_CLOUD] Fetching from GitHub:', GITHUB_RAW_URL);
      
      try {
        const response = await fetch(GITHUB_RAW_URL);
        console.log('[NEURAL_CLOUD] Response:', {
          status: response.status,
          ok: response.ok,
          statusText: response.statusText
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('[NEURAL_CLOUD] ✓ Live data loaded:', data.length, 'items');
          console.log('[NEURAL_CLOUD] Data preview:', data.slice(0, 2));
          setDebrisData(data);
        } else {
          console.warn('[NEURAL_CLOUD] ✗ GitHub fetch failed, using fallback');
          setDebrisData(MOCK_DEBRIS);
        }
      } catch (error) {
        console.error('[NEURAL_CLOUD] ✗ Network error:', error);
        console.log('[NEURAL_CLOUD] Using MOCK_DEBRIS fallback');
        setDebrisData(MOCK_DEBRIS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDebrisData();
  }, []);
  
  const analysis = useMemo(() => analyzeDebrisData(debrisData), [debrisData]);
  const dominantColor = CATEGORY_COLORS[analysis.dominantCategory];
  
  // Pre-calculate stable positions
  const debrisPositions = useMemo(() => {
    return debrisData.map((item, index) => ({
      data: item,
      position: calculatePosition(item.relevance, item.category, index * 100)
    }));
  }, [debrisData]);

  return (
    <section id="cloud" className="relative h-screen w-full bg-gradient-to-b from-[#111] via-[#000000] to-[#111]">
      {/* Section Header - Above everything with semi-transparent background */}
      <div className="absolute top-0 left-0 right-0 z-40 px-8 md:px-20 pt-20 pb-8 pointer-events-none" 
           style={{ background: 'linear-gradient(to bottom, rgba(17,17,17,0.95) 0%, rgba(17,17,17,0.7) 70%, transparent 100%)' }}>
        <div className="max-w-6xl mx-auto pointer-events-auto">
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-3 h-3 rounded-full animate-pulse"
              style={{
                backgroundColor: "#0f0",
                boxShadow: "0 0 10px #0f0, 0 0 20px #0f044",
              }}
            />
            <span className="text-[#0f0] text-sm tracking-[0.3em] font-bold" style={{ fontFamily: "'Courier New', monospace" }}>DATA_CLOUD</span>
          </div>
          
          {/* Chromatic Aberration Title */}
          <div className="relative">
            {/* Red Channel */}
            <div
              className="absolute top-0 left-[-2px] text-red-600 opacity-70 select-none pointer-events-none text-4xl md:text-6xl"
              style={{ letterSpacing: "-4px", lineHeight: 0.85, fontFamily: "'Courier New', monospace" }}
            >
              NEURAL_SINGULARITY
            </div>
            {/* Blue Channel */}
            <div
              className="absolute top-0 left-[2px] text-blue-600 opacity-70 select-none pointer-events-none text-4xl md:text-6xl"
              style={{ letterSpacing: "-4px", lineHeight: 0.85, fontFamily: "'Courier New', monospace" }}
            >
              NEURAL_SINGULARITY
            </div>
            {/* Main Channel */}
            <div
              className="relative text-[#e0e0e0] text-4xl md:text-6xl"
              style={{ letterSpacing: "-4px", lineHeight: 0.85, fontFamily: "'Courier New', monospace" }}
            >
              NEURAL<span className="text-[#ff0055]">_</span>SINGULARITY
            </div>
          </div>
          
          <p className="text-[#666] mt-6 max-w-xl tracking-wide text-sm md:text-base" style={{ fontFamily: "'Courier New', monospace" }}>
            {">"} Live data visualization. Click nodes to decrypt.
          </p>
          
          {/* Stats - Desktop: right side, Mobile: below subtitle */}
          {!isLoading && (
            <div className="mt-4 md:absolute md:top-20 md:right-8 lg:right-20 md:mt-0 text-xs font-mono flex flex-wrap gap-x-4 gap-y-1 md:block md:text-right">
              <div style={{ color: dominantColor }}>
                DOMINANT: {analysis.dominantCategory}
              </div>
              <div style={{ color: '#00ff41' }}>
                AVG_RELEVANCE: {analysis.averageRelevance.toFixed(1)}%
              </div>
              <div className="hidden md:block" style={{ color: 'rgba(255,255,255,0.5)' }}>
                PULSE_FREQ: {analysis.pulseSpeed.toFixed(2)}Hz
              </div>
              <div style={{ color: 'rgba(255,255,255,0.3)' }}>
                NODES: {debrisData.length}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Top Vignette Overlay - removed, now part of header */}
      
      {/* Bottom Vignette Overlay - lower z-index so nodes are clickable */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#111] to-transparent z-10 pointer-events-none" />
      
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <div className="font-mono text-sm tracking-wider animate-pulse" style={{ color: '#00ff41' }}>
            INITIALIZING_CONNECTION...
          </div>
        </div>
      )}

      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        {/* Dynamic Camera Controller */}
        <CameraController isMobile={isMobile} />
        
        {/* Atmosphere */}
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", 10, 25]} />
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
            isActive={activeShard?.id === data.id || decryptedShard?.id === data.id}
            isDecrypted={isDecrypted}
            onHover={() => !isDecrypted && setActiveShard(data)}
            onLeave={() => !isDecrypted && setActiveShard(null)}
            onClick={() => setDecryptedShard(data)}
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
      
      {/* Data Card Overlay (only show when not decrypted) */}
      {activeShard && !isDecrypted && <DataCard data={activeShard} />}
      
      {/* Decryption Panel */}
      {decryptedShard && (
        <DecryptionPanel 
          data={decryptedShard} 
          onClose={() => setDecryptedShard(null)} 
        />
      )}
    </section>
  );
};

export default NeuralCloud;
