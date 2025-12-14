import { useState, useEffect, useRef } from "react";
import { useChat } from "ai/react";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";

interface InterrogationUIProps {
  onExit: () => void;
}

// Extend Window interface for Web Speech API
declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

const InterrogationUI = ({ onExit }: InterrogationUIProps) => {
  const [userInput, setUserInput] = useState("");
  const [isGlitching, setIsGlitching] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [hasSpokenGreeting, setHasSpokenGreeting] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const lastMessageRef = useRef<string>("");

  // Use Vercel AI SDK's useChat hook
  const { messages, append, isLoading } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: '0',
        role: 'assistant',
        content: 'COMFORT IS THE ENEMY. WHY ARE YOU HERE?'
      }
    ],
  });

  // Get the latest assistant message
  const currentMessage = messages.length > 0
    ? messages[messages.length - 1].content
    : '';

  // Initial setup
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInput(true);
      inputRef.current?.focus();
    }, 2500); // Wait for zoom animation

    return () => clearTimeout(timer);
  }, []);

  // Speak greeting once
  useEffect(() => {
    if (!hasSpokenGreeting && currentMessage && !isMuted) {
      setHasSpokenGreeting(true);
      speakText(currentMessage);
    }
  }, [hasSpokenGreeting, isMuted]);

  // Speak new AI responses (but not greeting again)
  useEffect(() => {
    const latestMessage = messages[messages.length - 1];

    // Only speak assistant messages that are new and not the initial greeting
    if (
      latestMessage?.role === 'assistant' &&
      latestMessage.content !== lastMessageRef.current &&
      hasSpokenGreeting && // Only after greeting has been spoken
      !isMuted
    ) {
      lastMessageRef.current = latestMessage.content;
      speakText(latestMessage.content);

      // Check if session should end
      if (latestMessage.content.includes('TERMINATED') || latestMessage.content.includes('SESSION END')) {
        setSessionEnded(true);
        setTimeout(() => {
          onExit();
        }, 3000);
      }
    }
  }, [messages, isMuted, hasSpokenGreeting, onExit]);

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setUserInput(transcript);
        setIsListening(false);

        // Auto-submit after voice input
        setTimeout(() => {
          if (transcript.trim()) {
            handleSendMessage(transcript);
          }
        }, 500);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Text-to-Speech function with ElevenLabs ONLY
  const speakText = async (text: string) => {
    if (isMuted) return;

    const elevenlabsKey = import.meta.env.VITE_ELEVENLABS_API_KEY;

    // ONLY use ElevenLabs - NO browser TTS fallback
    if (!elevenlabsKey || elevenlabsKey === 'your_elevenlabs_key_here') {
      console.log('ElevenLabs API key not configured. Voice disabled.');
      return;
    }

    try {
      // Use "Adam" voice - deep, authoritative
      const voiceId = 'pNInz6obpgDQGcFmaJgB';

      console.log('Calling ElevenLabs API...');
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
        {
          method: 'POST',
          headers: {
            'xi-api-key': elevenlabsKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: text,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.8,
              style: 0.0,
              use_speaker_boost: true
            }
          })
        }
      );

      console.log('ElevenLabs response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('ElevenLabs API error:', response.status, errorText);
        return;
      }

      const audioBlob = await response.blob();
      console.log('Audio blob size:', audioBlob.size);

      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      audio.addEventListener('canplaythrough', () => {
        console.log('Audio ready to play');
      });

      audio.addEventListener('error', (e) => {
        console.error('Audio playback error:', e);
      });

      await audio.play();
      console.log('Audio playing...');
    } catch (error) {
      console.error('ElevenLabs TTS error:', error);
    }
  };

  // Toggle microphone
  const toggleMicrophone = async () => {
    if (!recognitionRef.current) {
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        // Request microphone permission first (check if API exists)
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          await navigator.mediaDevices.getUserMedia({ audio: true });
        }

        // Start speech recognition
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Microphone permission error:', error);
      }
    }
  };

  // Send message using useChat
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading || sessionEnded) return;

    // Trigger glitch effect
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 200);

    // Clear input
    setUserInput("");

    // Send via useChat hook
    await append({
      role: 'user',
      content: text
    });

    // Refocus input after sending
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(userInput);
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
            className={`text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-widest transition-all duration-300 ${
              isLoading && !currentMessage ? 'oracle-processing' : 'oracle-pulse'
            } ${isGlitching ? 'glitch-text' : ''}`}
            style={{
              color: '#ffffff',
              textShadow: '0 0 30px rgba(255, 0, 85, 0.9), 0 0 60px rgba(255, 0, 85, 0.5), 0 0 90px rgba(255, 0, 85, 0.3)',
              letterSpacing: '0.2em',
              fontWeight: 900,
            }}
          >
            {currentMessage || (
              <span className="text-[#666]">
                <span className="animate-pulse">█</span>
              </span>
            )}
          </div>
        </div>

        {/* User Input */}
        {showInput && !sessionEnded && (
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
                disabled={isLoading}
                className={`w-full bg-transparent border-b-2 border-[#0f0] pl-8 pr-24 py-3 font-mono text-white text-lg focus:outline-none focus:border-[#ff0055] transition-colors disabled:opacity-50 ${
                  isGlitching ? 'glitch-input' : ''
                }`}
                style={{
                  fontFamily: "'Courier New', Courier, monospace",
                  caretColor: '#0f0',
                }}
                placeholder={isLoading ? "..." : "TYPE YOUR ANSWER..."}
                autoComplete="off"
                spellCheck="false"
              />

              {/* Voice Controls */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {/* Microphone Button */}
                <button
                  type="button"
                  onClick={toggleMicrophone}
                  disabled={isLoading}
                  className={`p-2 transition-all ${
                    isListening
                      ? 'text-[#ff0055] animate-pulse'
                      : 'text-[#0f0] hover:text-[#ff0055]'
                  } disabled:opacity-30`}
                  title={isListening ? "Stop listening" : "Start voice input"}
                >
                  {isListening ? <Mic size={20} /> : <MicOff size={20} />}
                </button>

                {/* Mute Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    setIsMuted(!isMuted);
                    if (!isMuted) {
                      window.speechSynthesis.cancel();
                    }
                  }}
                  className={`p-2 transition-colors ${
                    isMuted
                      ? 'text-[#666] hover:text-[#0f0]'
                      : 'text-[#0f0] hover:text-[#ff0055]'
                  }`}
                  title={isMuted ? "Unmute voice" : "Mute voice"}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>
            </div>
            <div
              className="mt-4 text-xs font-mono text-center"
              style={{
                fontFamily: "'Courier New', Courier, monospace",
                color: isListening ? '#ff0055' : '#ffffff'
              }}
            >
              {isListening
                ? "[ LISTENING... ]"
                : "[ PRESS ENTER TO SUBMIT OR USE MICROPHONE ]"
              }
            </div>
          </form>
        )}

        {/* Session Terminated Indicator */}
        {sessionEnded && (
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

        @keyframes oracle-pulse {
          0%, 100% {
            text-shadow: 0 0 30px rgba(255, 0, 85, 0.9), 0 0 60px rgba(255, 0, 85, 0.5), 0 0 90px rgba(255, 0, 85, 0.3);
            transform: scale(1);
          }
          50% {
            text-shadow: 0 0 40px rgba(255, 0, 85, 1), 0 0 80px rgba(255, 0, 85, 0.7), 0 0 120px rgba(255, 0, 85, 0.4);
            transform: scale(1.015);
          }
        }

        @keyframes oracle-processing {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .oracle-pulse {
          animation: oracle-pulse 3s ease-in-out infinite;
        }

        .oracle-processing {
          animation: oracle-processing 0.8s ease-in-out infinite;
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
