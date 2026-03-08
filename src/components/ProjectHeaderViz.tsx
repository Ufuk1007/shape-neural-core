import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  const offset = Math.max(0, blocks.length - 5) * -56;

  return (
    <div className="w-full h-full flex items-center overflow-hidden px-4">
      <div
        className="flex items-center gap-0"
        style={{
          transform: `translateX(${offset}px)`,
          transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {blocks.map((id, i) => (
          <div key={id} className="flex items-center">
            {i > 0 && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                className="w-4 h-px origin-left relative"
              >
                {/* Connection line with pulse */}
                <motion.div
                  className="absolute inset-0"
                  style={{ backgroundColor: "#00ff41" }}
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            )}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: i < blocks.length - 3 ? Math.max(0.2, 1 - (blocks.length - 3 - i) * 0.3) : 1,
                scale: 1,
              }}
              transition={{ duration: 0.4 }}
              className="relative flex-shrink-0"
            >
              <div
                className="w-12 h-7 flex items-center justify-center"
                style={{ border: "1px solid #00ff41", backgroundColor: "transparent" }}
              >
                {/* Hex counter inside block */}
                <span
                  style={{
                    color: "#00ff4180",
                    fontSize: "8px",
                    fontFamily: "'Courier New', monospace",
                    letterSpacing: "1px",
                  }}
                >
                  {(id - 1).toString(16).toUpperCase().padStart(2, "0")}
                </span>
              </div>
              {/* Connection flash */}
              {i === blocks.length - 1 && (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="absolute inset-0"
                  style={{
                    boxShadow: "0 0 12px #ffffff, 0 0 4px #00ff41",
                    backgroundColor: "#ffffff11",
                  }}
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
    <div
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{
        maskImage: "radial-gradient(circle, black 55%, transparent 85%)",
        WebkitMaskImage: "radial-gradient(circle, black 55%, transparent 85%)",
      }}
    >
      {/* Static horizontal scan line */}
      <div className="absolute w-full h-px opacity-20" style={{ backgroundColor: "#00ccff" }} />

      {/* Moving vertical scan line */}
      <motion.div
        className="absolute w-full opacity-10"
        style={{ height: "1px", backgroundColor: "#ff0055" }}
        animate={{ y: [-50, 50, -50] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

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

      {/* Pupil with micro-jitter */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 6,
          height: 6,
          backgroundColor: "#ff0055",
        }}
        animate={{
          x: [0, 1.5, -1, 0.5, -1.5, 0],
          y: [0, -1, 1.5, -0.5, 1, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

// ─── MOD_03: PROBLAIM — Branching Node Tree (REWORKED) ───
const BranchingNodeTree = () => {
  const totalCycle = 5;
  const fadeOutStart = 3.5;
  const fadeOutDur = 0.5;
  const pauseAfter = 1;

  // Node definitions: { cx, cy, level, delay }
  const nodes = useMemo(() => [
    // Root
    { cx: 40, cy: 40, r: 5, level: 0, delay: 0 },
    // L1
    { cx: 120, cy: 15, r: 3.5, level: 1, delay: 0.8 },
    { cx: 120, cy: 40, r: 3.5, level: 1, delay: 0.9 },
    { cx: 120, cy: 65, r: 3.5, level: 1, delay: 1.0 },
    // L2 from top
    { cx: 200, cy: 8, r: 2.5, level: 2, delay: 1.6 },
    { cx: 200, cy: 22, r: 2.5, level: 2, delay: 1.7 },
    // L2 from mid
    { cx: 200, cy: 35, r: 2.5, level: 2, delay: 1.8 },
    { cx: 200, cy: 50, r: 2.5, level: 2, delay: 1.9 },
    // L2 from bottom
    { cx: 260, cy: 58, r: 2.5, level: 2, delay: 2.0 },
    { cx: 260, cy: 72, r: 2.5, level: 2, delay: 2.1 },
  ], []);

  // Paths: 90° angle L-shaped connections
  const paths = useMemo(() => [
    // Root to L1
    { d: "M 44 40 L 44 15 L 116 15", delay: 0.3, level: 1 },
    { d: "M 44 40 L 116 40", delay: 0.4, level: 1 },
    { d: "M 44 40 L 44 65 L 116 65", delay: 0.5, level: 1 },
    // L1-top to L2
    { d: "M 124 15 L 124 8 L 196 8", delay: 1.2, level: 2 },
    { d: "M 124 15 L 124 22 L 196 22", delay: 1.3, level: 2 },
    // L1-mid to L2
    { d: "M 124 40 L 124 35 L 196 35", delay: 1.4, level: 2 },
    { d: "M 124 40 L 124 50 L 196 50", delay: 1.5, level: 2 },
    // L1-bottom to L2
    { d: "M 124 65 L 124 58 L 256 58", delay: 1.6, level: 2 },
    { d: "M 124 65 L 124 72 L 256 72", delay: 1.7, level: 2 },
  ], []);

  const levelOpacity = [1, 0.8, 0.6];

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 300 80" className="w-full h-full max-w-md" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="lineGlow">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Paths */}
        {paths.map((p, i) => (
          <motion.path
            key={`path-${i}`}
            d={p.d}
            fill="none"
            stroke="#00ff41"
            strokeWidth={1.5}
            filter="url(#lineGlow)"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={1}
            animate={{
              strokeDashoffset: [1, 0, 0, 1],
              opacity: [0, levelOpacity[p.level], levelOpacity[p.level], 0],
            }}
            transition={{
              duration: totalCycle,
              times: [
                p.delay / totalCycle,
                (p.delay + 0.5) / totalCycle,
                fadeOutStart / totalCycle,
                (fadeOutStart + fadeOutDur) / totalCycle,
              ],
              repeat: Infinity,
              repeatDelay: pauseAfter,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((n, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={n.cx}
            cy={n.cy}
            r={n.r}
            fill="#00ff41"
            filter="url(#nodeGlow)"
            animate={{
              opacity: [0, 0, levelOpacity[n.level], levelOpacity[n.level], 0],
              scale: [0.5, 0.5, 1.5, 1, 0.8],
            }}
            transition={{
              duration: totalCycle,
              times: [
                Math.max(0, (n.delay - 0.1)) / totalCycle,
                n.delay / totalCycle,
                (n.delay + 0.15) / totalCycle,
                fadeOutStart / totalCycle,
                (fadeOutStart + fadeOutDur) / totalCycle,
              ],
              repeat: Infinity,
              repeatDelay: pauseAfter,
              ease: "easeOut",
            }}
            style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
          />
        ))}
      </svg>
    </div>
  );
};

// ─── MOD_04: HUMANCRYP.TO — Text Cipher Morph (REWORKED) ───
const GLYPHS = "█▓░◊∆ΨΩΣ¥₿#@&%".split("");
const TARGET_TEXT = "HUMAN ⇌ CRYPTO";

const TextCipherMorph = () => {
  const [chars, setChars] = useState<string[]>(Array(TARGET_TEXT.length).fill("█"));
  const [charColors, setCharColors] = useState<string[]>(Array(TARGET_TEXT.length).fill("#666"));
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  // Timing constants (ms)
  const DECRYPT_PER_CHAR = 80;
  const DECRYPT_TOTAL = TARGET_TEXT.length * DECRYPT_PER_CHAR;
  const HOLD_DECODED = 1500;
  const ENCRYPT_PER_CHAR = 80;
  const ENCRYPT_TOTAL = TARGET_TEXT.length * ENCRYPT_PER_CHAR;
  const HOLD_ENCRYPTED = 1000;
  const FULL_CYCLE = DECRYPT_TOTAL + HOLD_DECODED + ENCRYPT_TOTAL + HOLD_ENCRYPTED;

  const animate = useCallback((timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = (timestamp - startTimeRef.current) % FULL_CYCLE;

    const newChars: string[] = [];
    const newColors: string[] = [];

    for (let i = 0; i < TARGET_TEXT.length; i++) {
      if (TARGET_TEXT[i] === " ") {
        newChars.push(" ");
        newColors.push("transparent");
        continue;
      }

      if (elapsed < DECRYPT_TOTAL) {
        // Decrypting phase
        const resolvedAt = i * DECRYPT_PER_CHAR;
        if (elapsed >= resolvedAt + DECRYPT_PER_CHAR) {
          // Just resolved — white flash for brief moment
          const sinceLanded = elapsed - (resolvedAt + DECRYPT_PER_CHAR);
          newChars.push(TARGET_TEXT[i]);
          newColors.push(sinceLanded < 40 ? "#ffffff" : "#ff0055");
        } else {
          // Still scrambling
          newChars.push(GLYPHS[Math.floor(Math.random() * GLYPHS.length)]);
          // Flicker between dark shades
          newColors.push(Math.random() > 0.5 ? "#888" : "#444");
        }
      } else if (elapsed < DECRYPT_TOTAL + HOLD_DECODED) {
        // Hold decoded
        newChars.push(TARGET_TEXT[i]);
        newColors.push("#ff0055");
      } else if (elapsed < DECRYPT_TOTAL + HOLD_DECODED + ENCRYPT_TOTAL) {
        // Encrypting phase (right to left)
        const encryptElapsed = elapsed - DECRYPT_TOTAL - HOLD_DECODED;
        const encryptIdx = TARGET_TEXT.length - 1 - i;
        const encryptAt = encryptIdx * ENCRYPT_PER_CHAR;
        if (encryptElapsed >= encryptAt + ENCRYPT_PER_CHAR) {
          newChars.push(GLYPHS[Math.floor(Math.random() * GLYPHS.length)]);
          newColors.push(Math.random() > 0.5 ? "#888" : "#444");
        } else if (encryptElapsed >= encryptAt) {
          newChars.push(GLYPHS[Math.floor(Math.random() * GLYPHS.length)]);
          newColors.push("#666");
        } else {
          newChars.push(TARGET_TEXT[i]);
          newColors.push("#ff0055");
        }
      } else {
        // Hold encrypted
        if (Math.random() > 0.7) {
          newChars.push(GLYPHS[Math.floor(Math.random() * GLYPHS.length)]);
        } else {
          newChars.push(chars[i] || "█");
        }
        newColors.push(Math.random() > 0.5 ? "#888" : "#444");
      }
    }

    setChars(newChars);
    setCharColors(newColors);
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* Scanline behind text */}
      <div
        className="absolute w-full opacity-15"
        style={{ height: "1px", backgroundColor: "#ff0055", top: "50%" }}
      />
      <div
        className="flex"
        style={{
          fontFamily: "'Courier New', monospace",
          letterSpacing: "0.3em",
          fontSize: "14px",
        }}
      >
        {chars.map((ch, i) => (
          <span
            key={i}
            style={{
              color: charColors[i],
              transition: "color 0.05s",
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

// ─── MOD_05: SAPIENTSHIFT — Flowing Data Particles (REWORKED) ───
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

    const LANES = 6;
    const PARTICLE_COUNT = 55;

    interface Particle {
      x: number;
      y: number;
      lane: number;
      speed: number;
      baseSize: number;
      transformed: boolean;
      trail: { x: number; y: number }[];
    }

    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const lane = i % LANES;
      const laneH = h() / LANES;
      particles.push({
        x: Math.random() * w(),
        y: laneH * lane + laneH * 0.5 + (Math.random() - 0.5) * laneH * 0.4,
        lane,
        speed: 0.3 + Math.random() * 0.6,
        baseSize: 1 + Math.random() * 1.5,
        transformed: false,
        trail: [],
      });
    }

    let animId: number;
    let scanY = 0;
    let scanDir = 1;

    const draw = () => {
      const cw = w();
      const ch = h();
      ctx.clearRect(0, 0, cw, ch);

      const zoneX = cw / 2;
      const zoneW = 6;

      // Transform zone strip
      const grad = ctx.createLinearGradient(zoneX - zoneW, 0, zoneX + zoneW, 0);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(0.5, "rgba(0,255,65,0.18)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(zoneX - zoneW, 0, zoneW * 2, ch);

      // Zone scanline
      scanY += 0.5 * scanDir;
      if (scanY > ch || scanY < 0) scanDir *= -1;
      ctx.beginPath();
      ctx.moveTo(zoneX - zoneW, scanY);
      ctx.lineTo(zoneX + zoneW, scanY);
      ctx.strokeStyle = "rgba(0,255,65,0.4)";
      ctx.lineWidth = 1;
      ctx.stroke();

      for (const p of particles) {
        const wasTransformed = p.transformed;
        p.transformed = p.x > zoneX;

        // Speed up after transform
        const spd = p.transformed ? p.speed * 1.5 : p.speed;
        p.x += spd;

        // Store trail for transformed particles
        if (p.transformed) {
          p.trail.push({ x: p.x, y: p.y });
          if (p.trail.length > 4) p.trail.shift();
        } else {
          p.trail = [];
        }

        // Reset
        if (p.x > cw + 5) {
          const laneH = ch / LANES;
          p.x = -5;
          p.y = laneH * p.lane + laneH * 0.5 + (Math.random() - 0.5) * laneH * 0.4;
          p.speed = 0.3 + Math.random() * 0.6;
          p.transformed = false;
          p.trail = [];
        }

        // Flash white when crossing zone
        const inZone = Math.abs(p.x - zoneX) < zoneW;

        // Draw trail
        if (p.trail.length > 1) {
          for (let t = 0; t < p.trail.length - 1; t++) {
            const alpha = (t / p.trail.length) * 0.3;
            ctx.beginPath();
            ctx.arc(p.trail[t].x, p.trail[t].y, p.baseSize * 0.6, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0,255,65,${alpha})`;
            ctx.fill();
          }
        }

        // Draw particle
        const size = p.transformed ? p.baseSize * 1.8 : p.baseSize;
        const color = inZone ? "#ffffff" : p.transformed ? "#00ff41" : "#444";

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // Glow ring for transformed
        if (p.transformed && !inZone) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, size + 3, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(0,255,65,0.15)";
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
      { freq: 0.008, amp: 0.35, speed: 0.012, color: "#00ff41", opacity: 0.3, glow: true },
      { freq: 0.015, amp: 0.25, speed: 0.02, color: "#00ccff", opacity: 0.35, glow: false },
      { freq: 0.025, amp: 0.18, speed: 0.035, color: "#00ccff", opacity: 0.25, glow: false },
      { freq: 0.05, amp: 0.1, speed: 0.06, color: "#ff0055", opacity: 0.3, glow: false },
      { freq: 0.08, amp: 0.06, speed: 0.1, color: "#ff0055", opacity: 0.2, glow: false },
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

      // Center zero line
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, ch / 2);
      ctx.lineTo(cw, ch / 2);
      ctx.stroke();

      // Waves
      for (let wi = 0; wi < waves.length; wi++) {
        const wave = waves[wi];
        // Amplitude modulation
        const ampMod = 0.8 + 0.2 * Math.sin(t * 0.001 * (wi + 1));

        // Glow pass for bass wave
        if (wave.glow) {
          ctx.beginPath();
          ctx.strokeStyle = wave.color;
          ctx.lineWidth = 3;
          ctx.globalAlpha = wave.opacity * 0.15;
          for (let x = 0; x < cw; x++) {
            const y = ch / 2 + Math.sin(x * wave.freq + t * wave.speed) * ch * wave.amp * ampMod;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }

        // Main wave
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 1;
        ctx.globalAlpha = wave.opacity;

        for (let x = 0; x < cw; x++) {
          const y = ch / 2 + Math.sin(x * wave.freq + t * wave.speed) * ch * wave.amp * ampMod;
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

  return (
    <div
      className="w-full h-full"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

// ─── Fallback ───
const GenericViz = () => (
  <div className="w-full h-full relative overflow-hidden">
    <div
      className="absolute inset-0"
      style={{
        background: "repeating-linear-gradient(90deg, transparent, transparent 4px, #00ff4108 4px, #00ff4108 8px)",
      }}
    />
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
