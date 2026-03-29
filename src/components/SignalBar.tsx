import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface SignalBarProps {
  isInterrogating: boolean;
  onAskOracle: () => void;
}

const SignalBar = ({ isInterrogating, onAskOracle }: SignalBarProps) => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("signalBarDismissed") === "true") return;
    const timer = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem("signalBarDismissed", "true");
  };

  if (isInterrogating) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-md"
          style={{
            background: "rgba(0, 0, 0, 0.85)",
            borderTop: "1px solid rgba(0, 255, 65, 0.2)",
            fontFamily: "'Courier New', Courier, monospace",
          }}
        >
          {/* Desktop */}
          <div className="hidden md:flex items-center justify-between px-6 py-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-[13px] font-bold" style={{ color: "#00ff41", opacity: 0.9 }}>
                {">"} THIS IS AN AI LAB. NOT A WEBSITE.
              </span>
              <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.6)" }}>
                {">"} BUILT TO EXPLORE, NOT TO EXPLAIN.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onAskOracle}
                className="px-4 py-2 text-[12px] font-bold tracking-wider transition-colors"
                style={{
                  border: "1px solid #00ff41",
                  color: "#00ff41",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#00ff41";
                  e.currentTarget.style.color = "#000";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#00ff41";
                }}
              >
                ASK THE ORACLE
              </button>
              <button
                onClick={() => navigate("/alliance")}
                className="px-4 py-2 text-[12px] font-bold tracking-wider transition-colors"
                style={{
                  border: "1px solid #ff0055",
                  color: "#ff0055",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#ff0055";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#ff0055";
                }}
              >
                FORM AN ALLIANCE
              </button>
              <button
                onClick={dismiss}
                className="text-[20px] leading-none transition-colors px-1"
                style={{ color: "rgba(255,255,255,0.4)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
              >
                ×
              </button>
            </div>
          </div>

          {/* Mobile */}
          <div className="flex flex-col md:hidden px-4 py-3 relative">
            <button
              onClick={dismiss}
              className="absolute top-2 right-3 text-[18px] leading-none transition-colors"
              style={{ color: "rgba(255,255,255,0.4)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
            >
              ×
            </button>
            <div className="flex flex-col gap-0.5 mb-3 pr-6">
              <span className="text-[12px] font-bold" style={{ color: "#00ff41", opacity: 0.9 }}>
                {">"} THIS IS AN AI LAB. NOT A WEBSITE.
              </span>
              <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.6)" }}>
                {">"} BUILT TO EXPLORE, NOT TO EXPLAIN.
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onAskOracle}
                className="px-3 py-1.5 text-[11px] font-bold tracking-wider transition-colors"
                style={{ border: "1px solid #00ff41", color: "#00ff41", background: "transparent" }}
              >
                ASK THE ORACLE
              </button>
              <button
                onClick={() => navigate("/alliance")}
                className="px-3 py-1.5 text-[11px] font-bold tracking-wider transition-colors"
                style={{ border: "1px solid #ff0055", color: "#ff0055", background: "transparent" }}
              >
                FORM AN ALLIANCE
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignalBar;
