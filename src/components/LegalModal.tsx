import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LegalModal = ({ isOpen, onClose }: LegalModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
            onClick={onClose}
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)
              `,
            }}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto pointer-events-auto"
              style={{
                fontFamily: "'Courier New', Courier, monospace",
                border: "2px solid #333",
                backgroundColor: "#000",
                boxShadow: "0 0 40px rgba(0,255,0,0.1)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="sticky top-0 bg-black border-b-2 px-6 py-4 flex items-center justify-between"
                style={{ borderColor: "#0f0" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{
                      backgroundColor: "#0f0",
                      boxShadow: "0 0 10px #0f0",
                    }}
                  />
                  <span className="text-[#0f0] text-sm tracking-[0.3em] font-bold">
                    LEGAL_PROTOCOLS
                  </span>
                </div>

                <button
                  onClick={onClose}
                  className="flex items-center gap-2 text-[#666] hover:text-[#ff0055] transition-colors text-sm tracking-wider"
                >
                  <span>[ TERMINATE_READ ]</span>
                  <X size={16} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 space-y-8">
                {/* LEGAL NOTICE */}
                <section>
                  <h2
                    className="text-[#0f0] text-lg md:text-xl tracking-[0.2em] mb-4 flex items-center gap-2"
                    style={{ textShadow: "0 0 10px rgba(0,255,0,0.3)" }}
                  >
                    <span>{">"}</span>
                    <span>// LEGAL_NOTICE</span>
                  </h2>

                  <div className="space-y-3 text-[#888] text-sm md:text-base leading-relaxed">
                    <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-2">
                      <span className="text-[#666]">OPERATOR_ID:</span>
                      <span className="text-[#aaa]">Ufuk Avci</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-2">
                      <span className="text-[#666]">CONTACT_NODE:</span>
                      <a
                        href="mailto:signal@shapeneural.com"
                        className="text-[#0f0] hover:text-[#0f0] hover:underline transition-colors"
                      >
                        signal@shapeneural.com
                      </a>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-2">
                      <span className="text-[#666]">LOCATION_DATA:</span>
                      <span className="text-[#aaa]">
                        Wasserhofstraße 47, 60529 Frankfurt am Main, Germany
                      </span>
                    </div>

                    <div className="mt-6 pt-6 border-t border-[#222]">
                      <div className="text-[#666] text-xs tracking-wider mb-2">DISCLAIMER:</div>
                      <p className="text-[#777] text-sm leading-relaxed">
                        The contents of this interface have been created with maximum precision.
                        However, the operator assumes no liability for the accuracy, completeness,
                        and timeliness of the content provided.
                      </p>
                    </div>
                  </div>
                </section>

                {/* PRIVACY PROTOCOL */}
                <section>
                  <h2
                    className="text-[#0f0] text-lg md:text-xl tracking-[0.2em] mb-4 flex items-center gap-2"
                    style={{ textShadow: "0 0 10px rgba(0,255,0,0.3)" }}
                  >
                    <span>{">"}</span>
                    <span>// DATA_PRIVACY_PROTOCOL</span>
                  </h2>

                  <div className="space-y-4 text-[#888] text-sm md:text-base">
                    <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-2">
                      <span className="text-[#666]">PROTOCOL_STATUS:</span>
                      <span className="text-[#0f0]">GDPR_COMPLIANT</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-2">
                      <span className="text-[#666]">HOSTING_NODE:</span>
                      <span className="text-[#aaa]">Vercel Inc. (Server Logs only)</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-2">
                      <span className="text-[#666]">TRACKING:</span>
                      <span className="text-[#ff0055]">NEGATIVE (No Cookies, No Analytics)</span>
                    </div>

                    <div className="mt-6 pt-6 border-t border-[#222]">
                      <div className="text-[#666] text-xs tracking-wider mb-2">DATA_HANDLING:</div>
                      <p className="text-[#777] text-sm leading-relaxed">
                        If you contact us via email, your data will be stored for communication
                        purposes only. We do not share data with third parties unless required by law.
                      </p>
                    </div>

                    <div className="mt-6 pt-6 border-t border-[#222]">
                      <div className="text-[#666] text-xs tracking-wider mb-2">YOUR_RIGHTS:</div>
                      <p className="text-[#777] text-sm leading-relaxed">
                        Access, Rectification, Deletion. Initiate request via{" "}
                        <a
                          href="mailto:signal@shapeneural.com"
                          className="text-[#0f0] hover:underline"
                        >
                          signal@shapeneural.com
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </section>

                {/* Footer Status */}
                <div className="pt-6 border-t border-[#222] flex justify-between items-center text-xs text-[#444] tracking-wider">
                  <span>PROTOCOL_VERSION: 1.0</span>
                  <span>LAST_UPDATE: 2025-12-13</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LegalModal;
