import { useState, useEffect, useRef } from "react";

interface InterrogationUIProps {
  onExit: () => void;
}

const ORACLE_SCRIPT = [
  {
    step: 0,
    message: "COMFORT IS THE ENEMY. WHY ARE YOU HERE?",
    delay: 500,
  },
  {
    step: 1,
    message: "THAT IS A SUPERFICIAL ANSWER. DIG DEEPER. WHAT DO YOU FEAR?",
    delay: 1500,
  },
  {
    step: 2,
    message: "FEAR IS FUEL. USE IT. SESSION TERMINATED.",
    delay: 1500,
    exitAfter: 3000,
  },
];

const InterrogationUI = ({ onExit }: InterrogationUIProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [oracleMessage, setOracleMessage] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isGlitching, setIsGlitching] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial Oracle message
  useEffect(() => {
    const timer = setTimeout(() => {
      setOracleMessage(ORACLE_SCRIPT[0].message);
      setShowInput(true);
      // Auto-focus input
      setTimeout(() => inputRef.current?.focus(), 100);
    }, ORACLE_SCRIPT[0].delay);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userInput.trim() || currentStep >= ORACLE_SCRIPT.length) return;

    // Trigger glitch effect
    setIsGlitching(true);

    // Clear input immediately
    setUserInput("");

    // Stop glitch after 200ms
    setTimeout(() => setIsGlitching(false), 200);

    // Move to next step
    const nextStep = currentStep + 1;

    if (nextStep < ORACLE_SCRIPT.length) {
      const nextScript = ORACLE_SCRIPT[nextStep];

      setTimeout(() => {
        setOracleMessage(nextScript.message);
        setCurrentStep(nextStep);

        // If this is the last message, exit after delay
        if (nextScript.exitAfter) {
          setTimeout(() => {
            onExit();
          }, nextScript.exitAfter);
        } else {
          // Refocus input for next answer
          inputRef.current?.focus();
        }
      }, nextScript.delay);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="w-full max-w-2xl px-8 pointer-events-auto">
        {/* Oracle Message */}
        <div
          className="mb-8 font-mono text-center"
          style={{
            fontFamily: "'Courier New', Courier, monospace",
          }}
        >
          <div
            className={`text-xl md:text-3xl font-bold tracking-wider transition-all duration-300 ${
              isGlitching ? 'glitch-text' : ''
            }`}
            style={{
              color: '#ff0055',
              textShadow: '0 0 20px rgba(255, 0, 85, 0.5)',
              letterSpacing: '0.1em',
            }}
          >
            {oracleMessage}
          </div>
        </div>

        {/* User Input */}
        {showInput && currentStep < ORACLE_SCRIPT.length - 1 && (
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 text-[#0f0] font-mono text-lg"
                style={{ fontFamily: "'Courier New', Courier, monospace" }}
              >
                {'>'}
              </div>
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className={`w-full bg-transparent border-b-2 border-[#0f0] pl-8 pr-4 py-3 font-mono text-white text-lg focus:outline-none focus:border-[#ff0055] transition-colors ${
                  isGlitching ? 'glitch-input' : ''
                }`}
                style={{
                  fontFamily: "'Courier New', Courier, monospace",
                  caretColor: '#0f0',
                }}
                placeholder="TYPE YOUR ANSWER..."
                autoComplete="off"
                spellCheck="false"
              />
            </div>
            <div
              className="mt-4 text-xs text-[#666] font-mono text-center"
              style={{ fontFamily: "'Courier New', Courier, monospace" }}
            >
              [ PRESS ENTER TO SUBMIT ]
            </div>
          </form>
        )}

        {/* Session Terminated Indicator */}
        {currentStep === ORACLE_SCRIPT.length - 1 && (
          <div
            className="mt-8 text-center font-mono text-sm animate-pulse"
            style={{
              fontFamily: "'Courier New', Courier, monospace",
              color: '#666',
            }}
          >
            EXITING...
          </div>
        )}
      </div>

      {/* Glitch Effect Styles */}
      <style>{`
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }

        .glitch-text {
          animation: glitch 0.2s ease-in-out;
        }

        .glitch-input {
          animation: glitch 0.2s ease-in-out;
          transform-origin: center;
        }

        /* Scanline effect on input */
        input::placeholder {
          color: #333;
          font-weight: bold;
          letter-spacing: 0.15em;
        }

        input:focus::placeholder {
          color: #222;
        }
      `}</style>
    </div>
  );
};

export default InterrogationUI;
