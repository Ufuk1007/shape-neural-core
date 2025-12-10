import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron } from "@react-three/drei";
import * as THREE from "three";

const PulsingCore = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Rotation
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.008;
      
      // Pulsing scale
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <Icosahedron ref={meshRef} args={[1.5, 1]}>
      <meshBasicMaterial 
        color="#ff0055" 
        wireframe 
        transparent 
        opacity={0.9}
      />
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
      <div 
        className="absolute top-8 left-8 z-10 text-[#0f0] font-bold tracking-wider text-sm md:text-base"
      >
        // NEURAL_DEBRIS_FIELD
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#ff0055" />
        <PulsingCore />
      </Canvas>
    </section>
  );
};

export default NeuralCloud;
