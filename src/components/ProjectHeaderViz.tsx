import { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";

interface ProjectHeaderVizProps {
  slug: string;
}

// ─── MOD_01: SAPIENTBLOCK — Chain-Link Assembly ───
const ChainLinkAssembly = () => {
  const [blocks, setBlocks] = useState<number[]>([]);
  const counterRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      counterRef.current += 1;
      setBlocks((prev) => {
        const next = [...prev, counterRef.current];
        return next.length > 8 ? next.slice(1) : next;
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center overflow-hidden px-4">
      <div className="flex items-center gap-0 transition-transform duration-700" style={{ transform: `translateX(${Math.max(0, (blocks.length - 5)) * -48}px)` }}>
        {blocks.map((id, i) => (
          <div key={id} className="flex items-center">
            {i > 0 && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                className="w-4 h-px origin-left"
                style={{ backgroundColor: "#00ff41" }}
              />
            )}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: i < blocks.length - 3 ? Math.max(0.2, 1 - (blocks.length - 3 - i) * 0.3) : 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative flex-shrink-0"
            >
              <div
                className="w-10 h-6"
                style={{ border: "1px solid #00ff41", backgroundColor: "transparent" }}
              />
              {i === blocks.length - 1 && (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="absolute inset-0"
                  style={{ boxShadow: "0 0 12px #ffffff, 0 0 4px #00ff41", backgroundColor: "#ffffff11" }}
                />
              )}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── MOD_02: MELODEYE — Breathing Iris ───
const BreathingIris = () => {
  const rings = [
    { size: 12, color: "#ff0055", opacity: 1, delay: 0 },
    { size: 28, color: "#ff0055", opacity: 0.6, delay: 0.15 },
    { size: 46, color: "#cc0066", opacity: 0.4, delay: 0.3 },
    { size: 66, color: "#00ccff", opacity: 0.25, delay: 0.45 },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* Horizontal scan line */}
      <div className="absolute w-full h-px opacity-20" style={{ backgroundColor: "#00ccff" }} />
      {/* Rings */}
      {rings.map((ring, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: ring.size,
            height: ring.size,
            border: i === 0 ? "none" : `1px solid ${ring.color}`,
            backgroundColor: i === 0 ? ring.color : "transparent",
            opacity: ring.opacity,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [ring.opacity, ring.opacity * 0.6, ring.opacity],
          }}
          transition={{
            duration: 2.8,
            delay: ring.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// ─── MOD_03: PROBLAIM — Branching Node Tree ───
const BranchingNodeTree = () => {
  const cycleMs = 5000;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 300 80" className="w-full h-full max-w-md" preserveAspectRatio="xMidYMid meet">
        {/* Root */}
        <motion.circle cx="40" cy="40" r="4" fill="#00ff41"
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: cycleMs / 1000, times: [0, 0.1, 0.8, 1], repeat: Infinity }}
        />
        {/* Level 1 branches */}
        {[
          { x: 120, y: 15 },
          { x: 120, y: 40 },
          { x: 120, y: 65 },
        ].map((node, i) => (
          <g key={`l1-${i}`}>
            <motion.line x1="44" y1="40" x2="44" y2={node.y} stroke="#00ff41" strokeWidth="1"
              animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.7, 0.7, 0] }}
              transition={{ duration: cycleMs / 1000, times: [0.1, 0.25, 0.8, 1], repeat: Infinity }}
              style={{ opacity: 0 }}
            />
            <motion.line x1="44" y1={node.y} x2={node.x} y2={node.y} stroke="#00ff41" strokeWidth="1"
              animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.7, 0.7, 0] }}
              transition={{ duration: cycleMs / 1000, times: [0.15, 0.3, 0.8, 1], repeat: Infinity }}
              style={{ opacity: 0 }}
            />
            <motion.circle cx={node.x} cy={node.y} r="3" fill="#00ff41"
              animate={{ opacity: [0, 0.8, 0.8, 0] }}
              transition={{ duration: cycleMs / 1000, times: [0.25, 0.35, 0.8, 1], repeat: Infinity }}
            />
          </g>
        ))}
        {/* Level 2 branches from top node */}
        {[
          { px: 120, py: 15, x: 200, y: 8 },
          { px: 120, py: 15, x: 200, y: 22 },
        ].map((node, i) => (
          <g key={`l2a-${i}`}>
            <motion.line x1={node.px} y1={node.py} x2={node.x} y2={node.py} stroke="#00ff41" strokeWidth="1"
              animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.5, 0.5, 0] }}
              transition={{ duration: cycleMs / 1000, times: [0.35, 0.5, 0.8, 1], repeat: Infinity }}
              style={{ opacity: 0 }}
            />
            <motion.line x1={node.x} y1={node.py} x2={node.x} y2={node.y} stroke="#00ff41" strokeWidth="1"
              animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.5, 0.5, 0] }}
              transition={{ duration: cycleMs / 1000, times: [0.4, 0.55, 0.8, 1], repeat: Infinity }}
              style={{ opacity: 0 }}
            />
            <motion.circle cx={node.x} cy={node.y} r="2.5" fill="#00ff41"
              animate={{ opacity: [0, 0.6, 0.6, 0] }}
              transition={{ duration: cycleMs / 1000, times: [0.45, 0.55, 0.8, 1], repeat: Infinity }}
            />
          </g>
        ))}
        {/* Level 2 from middle node */}
        {[
          { px: 120, py: 40, x: 200, y: 35 },
          { px: 120, py: 40, x: 200, y: 50 },
        ].map((node, i) => (
          <g key={`l2b-${i}`}>
            <motion.line x1={node.px} y1={node.py} x2={node.x} y2={node.py} stroke="#00ff41" strokeWidth="1"
              animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.5, 0.5, 0] }}
              transition={{ duration: cycleMs / 1000, times: [0.35, 0.5, 0.8, 1], repeat: Infinity }}
              style={{ opacity: 0 }}
            />
            <motion.line x1={node.x} y1={node.py} x2={node.x} y2={node.y} stroke="#00ff41" strokeWidth="1"
              animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.5, 0.5, 0] }}
              transition={{ duration: cycleMs / 1000, times: [0.4, 0.55, 0.8, 1], repeat: Infinity }}
              style={{ opacity: 0 }}
            />
            <motion.circle cx={node.x} cy={node.y} r="2.5" fill="#00ff41"
              animate={{ opacity: [0, 0.6, 0.6, 0] }}
              transition={{ duration: cycleMs / 1000, times: [0.45, 0.55, 0.8, 1], repeat: Infinity }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

// ─── MOD_04: HUMANCRYP.TO — Text Cipher Morph ───
const GLYPHS = "█▓░◊∆ΨΩΣ¥₿#@&%".split("");
const TARGET_TEXT = "HUMAN ⇌ CRYPTO";

const TextCipherMorph = () => {
  const [chars, setChars] = useState<string[]>(Array(TARGET_TEXT.length).fill("█"));
  const [phase, setPhase] = useState<"decrypt" | "hold" | "encrypt">("decrypt");
  const [resolvedCount, setResolvedCount] = useState(0);

  useEffect(() => {
    let frame: number;
    let idx = 0;
    let holdTimer: ReturnType<typeof setTimeout>;

    const scrambleInterval = setInterval(() => {
      setChars((prev) =>
        prev.map((ch, i) => {
          if (phase === "decrypt" && i < resolvedCount) return TARGET_TEXT[i];
          if (phase === "encrypt" && i >= TARGET_TEXT.length - resolvedCount) return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          if (TARGET_TEXT[i] === " ") return " ";
          return Math.random() > 0.6 ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)] : prev[i];
        })
      );
    }, 60);

    const resolveInterval = setInterval(() => {
      if (phase === "decrypt") {
        setResolvedCount((c) => {
          if (c >= TARGET_TEXT.length) {
            clearInterval(resolveInterval);
            holdTimer = setTimeout(() => {
              setPhase("encrypt");
              setResolvedCount(0);
            }, 1500);
            return c;
          }
          return c + 1;
        });
      } else if (phase === "encrypt") {
        setResolvedCount((c) => {
          if (c >= TARGET_TEXT.length) {
            clearInterval(resolveInterval);
            holdTimer = setTimeout(() => {
              setPhase("decrypt");
              setResolvedCount(0);
            }, 1000);
            return c;
          }
          return c + 1;
        });
      }
    }, 80);

    return () => {
      clearInterval(scrambleInterval);
      clearInterval(resolveInterval);
      clearTimeout(holdTimer);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [phase]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex" style={{ fontFamily: "'Courier New', monospace", letterSpacing: "0.3em", fontSize: "14px" }}>
        {chars.map((ch, i) => (
          <span
            key={i}
            style={{
              color: phase === "decrypt" && i < resolvedCount ? "#ff0055" : "#666",
              transition: "color 0.15s",
              width: "1ch",
              textAlign: "center",
              display: "inline-block",
            }}
          >
            {ch}
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── MOD_05: SAPIENTSHIFT — Flowing Data Particles ───
const FlowingDataParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;
    const midX = () => w() / 2;

    interface Particle {
      x: number;
      y: number;
      speed: number;
      size: number;
      transformed: boolean;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * w(),
        y: Math.random() * h(),
        speed: 0.3 + Math.random() * 0.8,
        size: 1.5,
        transformed: false,
      });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, w(), h());

      // Transform zone
      const mx = midX();
      ctx.beginPath();
      ctx.moveTo(mx, 0);
      ctx.lineTo(mx, h());
      ctx.strokeStyle = "#00ff4120";
      ctx.lineWidth = 1;
      ctx.stroke();

      for (const p of particles) {
        p.x += p.speed;
        p.transformed = p.x > mx;

        if (p.x > w() + 5) {
          p.x = -5;
          p.y = Math.random() * h();
          p.speed = 0.3 + Math.random() * 0.8;
          p.transformed = false;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.transformed ? 2 : 1.5, 0, Math.PI * 2);
        ctx.fillStyle = p.transformed ? "#00ff41" : "#666";
        ctx.fill();

        if (p.transformed) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = "#00ff4110";
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

// ─── MOD_06: BITCOIN_SOUNDSCAPE — Oscillating Waveform ───
const OscillatingWaveform = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    const waves = [
      { freq: 0.008, amp: 0.35, speed: 0.012, color: "#00ff41", opacity: 0.3 },
      { freq: 0.015, amp: 0.25, speed: 0.02, color: "#00ccff", opacity: 0.35 },
      { freq: 0.025, amp: 0.18, speed: 0.035, color: "#00ccff", opacity: 0.25 },
      { freq: 0.05, amp: 0.1, speed: 0.06, color: "#ff0055", opacity: 0.3 },
      { freq: 0.08, amp: 0.06, speed: 0.1, color: "#ff0055", opacity: 0.2 },
    ];

    let t = 0;
    let animId: number;

    const draw = () => {
      const cw = w();
      const ch = h();
      ctx.clearRect(0, 0, cw, ch);

      // Grid lines
      ctx.strokeStyle = "#222";
      ctx.lineWidth = 0.5;
      for (let y = ch * 0.25; y < ch; y += ch * 0.25) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(cw, y);
        ctx.stroke();
      }

      // Waves
      for (const wave of waves) {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 1;
        ctx.globalAlpha = wave.opacity;

        for (let x = 0; x < cw; x++) {
          const y = ch / 2 + Math.sin((x * wave.freq) + (t * wave.speed)) * (ch * wave.amp);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      t += 1;
      animId = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

// ─── Fallback ───
const GenericViz = () => (
  <div className="w-full h-full relative overflow-hidden">
    <div className="absolute inset-0" style={{
      background: "repeating-linear-gradient(90deg, transparent, transparent 4px, #00ff4108 4px, #00ff4108 8px)",
    }} />
    <motion.div
      className="absolute h-full w-px"
      style={{ backgroundColor: "#00ff41", boxShadow: "0 0 15px #00ff41", left: "50%", opacity: 0.6 }}
      animate={{ opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </div>
);

// ─── Main Component ───
const ProjectHeaderViz = ({ slug }: ProjectHeaderVizProps) => {
  const Viz = useMemo(() => {
    switch (slug) {
      case "sapientblock": return ChainLinkAssembly;
      case "melodeye": return BreathingIris;
      case "problaim": return BranchingNodeTree;
      case "humancrypto": return TextCipherMorph;
      case "sapientshift": return FlowingDataParticles;
      case "bitcoin-soundscape": return OscillatingWaveform;
      default: return GenericViz;
    }
  }, [slug]);

  return (
    <div
      className="w-full mb-8 relative overflow-hidden"
      style={{ border: "1px solid #222", backgroundColor: "#0a0a0a", height: "100px" }}
    >
      <Viz />
    </div>
  );
};

export default ProjectHeaderViz;
