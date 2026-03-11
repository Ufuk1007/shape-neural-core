import { useState, useEffect, useRef } from "react";
import { useChat, UIMessage } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";

type AtmosphereMood = 'NEUTRAL' | 'AGITATED' | 'ENLIGHTENED' | 'DARK';

interface InterrogationUIProps {
  onExit: () => void;
  onMoodChange?: (mood: AtmosphereMood) => void;
}

// Extend Window interface for Web Speech API
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

// Helper to extract text from UIMessage parts (AI SDK 5.0)
const getMessageText = (message: UIMessage): string => {
  return message.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
    .map(p => p.text)
    .join('');
};

const InterrogationUI = ({ onExit, onMoodChange }: InterrogationUIProps) => {
  const [userInput, setUserInput] = useState("");
  const [isGlitching, setIsGlitching] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [currentMood, setCurrentMood] = useState<AtmosphereMood>('NEUTRAL');

  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const lastSpokenMessageId = useRef<string>("");
  const activeToolResultRef = useRef<any>(null);

  // Use Vercel AI SDK's useChat hook (v5.0 API)
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
    tools: {
      setAtmosphere: {
        description: 'Update the visual atmosphere',
        parameters: jsonSchema({
          type: 'object',
          properties: {
            mood: {
              type: 'string',
              enum: ['NEUTRAL', 'AGITATED', 'ENLIGHTENED', 'DARK'],
            },
          },
          required: ['mood'],
        }),
      },
    },
    messages: [
      {
        id: '0',
        role: 'assistant',
        parts: [{ type: 'text', text: 'COMFORT IS THE ENEMY. WHY ARE YOU HERE?' }]
      }
    ],
    onError: (error) => {
      console.error('❌ useChat ERROR:', error);
    },
    onToolCall: ({ toolCall }) => {
      console.log('🔧 Raw toolCall event:', toolCall);

      if (toolCall.toolName === 'setAtmosphere' && (toolCall as any).input?.mood) {
        const newMood = (toolCall as any).input.mood as AtmosphereMood;
        console.log('🌍 Atmosphere changed:', newMood);

        setCurrentMood(newMood);
        onMoodChange?.(newMood);

        if (newMood === 'AGITATED') {
          setIsGlitching(true);
          setTimeout(() => setIsGlitching(false), 500);
        }
      }
    },
    onFinish: (message) => {
      console.log('✅ Message finished:', message);
    },
  });

  const isLoading = status === 'streaming' || status === 'submitted';

  // Log any errors
  useEffect(() => {
    if (error) {
      console.error('🔥 CHAT ERROR STATE:', error);
    }
  }, [error]);

  // Get the latest assistant message
  const currentMessage = messages.length > 0
    ? getMessageText(messages[messages.length - 1])
    : '';

  // Initial setup
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInput(true);
      inputRef.current?.focus();
    }, 2500); // Wait for zoom animation

    return () => clearTimeout(timer);
  }, []);

  // Speak AI messages ONLY when streaming is complete
  useEffect(() => {
    // Don't speak while loading or if muted
    if (isLoading || isMuted) return;

    const latestMessage = messages[messages.length - 1];
    if (!latestMessage || latestMessage.role !== 'assistant') return;

    // Check if we already spoke this message
    if (lastSpokenMessageId.current === latestMessage.id) return;

    const messageText = getMessageText(latestMessage);
    if (!messageText) return;

    // Mark as spoken BEFORE calling speakText to prevent double calls
    lastSpokenMessageId.current = latestMessage.id;

    console.log('🔊 Speaking message:', latestMessage.id, messageText.substring(0, 50));
    speakText(messageText);

    // Check if session should end
    if (messageText.includes('TERMINATED') || messageText.includes('SESSION END')) {
      setSessionEnded(true);
      setTimeout(() => {
        onExit();
      }, 3000);
    }
  }, [messages, isLoading, isMuted, onExit]);

  // Detect if native Speech Recognition is available (Chrome, Edge, Safari)
  const hasNativeSpeechRecognition = typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  // MediaRecorder ref for Whisper fallback
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Initialize native Speech Recognition (if available)
  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) return;

    const recognition = new SpeechRecognitionAPI();
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

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Text-to-Speech via server-side OpenAI TTS proxy
  const ttsAbortRef = useRef<AbortController | null>(null);

  const speakText = async (text: string) => {
    if (isMuted) return;

    // Abort any ongoing TTS request
    ttsAbortRef.current?.abort();
    const controller = new AbortController();
    ttsAbortRef.current = controller;

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
        signal: controller.signal,
      });

      if (!response.ok) {
        console.error('TTS error:', response.status);
        return;
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      audio.onended = () => URL.revokeObjectURL(audioUrl);
      audio.onerror = () => URL.revokeObjectURL(audioUrl);

      await audio.play();
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('TTS error:', error);
      }
    }
  };

  // Whisper fallback: stop recording and transcribe via server
  const stopWhisperRecording = async () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  // Whisper fallback: start recording with MediaRecorder
  const startWhisperRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];

      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        // Stop all tracks to release mic
        stream.getTracks().forEach(t => t.stop());
        setIsListening(false);

        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        if (audioBlob.size === 0) return;

        try {
          const response = await fetch('/api/stt', {
            method: 'POST',
            headers: { 'Content-Type': 'audio/webm' },
            body: audioBlob,
          });

          if (!response.ok) {
            console.error('STT error:', response.status);
            return;
          }

          const { text: transcript } = await response.json();
          if (transcript?.trim()) {
            setUserInput(transcript);
            setTimeout(() => handleSendMessage(transcript), 500);
          }
        } catch (error) {
          console.error('STT transcription error:', error);
        }
      };

      recorder.start();
      setIsListening(true);
    } catch (error) {
      console.error('Microphone permission error:', error);
      setIsListening(false);
    }
  };

  // Toggle microphone — uses native Speech API if available, otherwise Whisper fallback
  const toggleMicrophone = async () => {
    if (isListening) {
      // Stop listening
      if (hasNativeSpeechRecognition && recognitionRef.current) {
        recognitionRef.current.stop();
      } else {
        stopWhisperRecording();
      }
      setIsListening(false);
    } else {
      // Start listening
      if (hasNativeSpeechRecognition && recognitionRef.current) {
        try {
          if (navigator.mediaDevices?.getUserMedia) {
            await navigator.mediaDevices.getUserMedia({ audio: true });
          }
          recognitionRef.current.start();
          setIsListening(true);
        } catch (error) {
          console.error('Microphone permission error:', error);
        }
      } else {
        // Fallback: record audio and send to Whisper API
        await startWhisperRecording();
      }
    }
  };

  // Send message using useChat (AI SDK 5.0)
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading || sessionEnded) return;

    // Trigger glitch effect
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 200);

    // Clear input
    setUserInput("");

    // Send via useChat hook (v5.0 API - uses 'text' not 'content')
    await sendMessage({ text });

    // Refocus input after sending
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(userInput);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none ${currentMood === 'AGITATED' ? 'screen-shake' : ''}`}>
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
                      ttsAbortRef.current?.abort();
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

        @keyframes screen-shake-animation {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5px, 5px); }
          20% { transform: translate(5px, -5px); }
          30% { transform: translate(-5px, -5px); }
          40% { transform: translate(5px, 5px); }
          50% { transform: translate(-5px, 0); }
          60% { transform: translate(5px, 0); }
          70% { transform: translate(0, -5px); }
          80% { transform: translate(0, 5px); }
          90% { transform: translate(-2px, 2px); }
        }

        .screen-shake {
          animation: screen-shake-animation 0.5s ease-in-out;
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
