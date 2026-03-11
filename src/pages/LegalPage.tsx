import SubpageShell from "@/components/SubpageShell";

const LegalPage = () => {
  return (
    <SubpageShell footerMeta="LEGAL_PROTOCOL_V1">
      <div className="space-y-12">
        {/* Page Header */}
        <header className="space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: "#0f0", boxShadow: "0 0 10px #0f0" }}
            />
            <span className="text-xs tracking-[0.3em] font-bold" style={{ color: "#0f0" }}>
              LEGAL_PROTOCOLS
            </span>
          </div>

          <h1
            className="text-3xl md:text-5xl font-bold tracking-tight"
            style={{ color: "#e0e0e0", letterSpacing: "-2px" }}
          >
            LEGAL
            <span className="animate-pulse">_</span>
          </h1>
          <p className="text-sm tracking-wider" style={{ color: "#666" }}>
            Impressum & Datenschutz nach deutschem Recht
          </p>
        </header>

        {/* LEGAL NOTICE */}
        <section>
          <h2
            className="text-lg md:text-xl tracking-[0.2em] mb-6 flex items-center gap-2"
            style={{ color: "#0f0", textShadow: "0 0 10px rgba(0,255,0,0.3)" }}
          >
            <span>{">"}</span>
            <span>// LEGAL_NOTICE</span>
          </h2>

          <div className="space-y-3 text-sm md:text-base leading-relaxed" style={{ color: "#888" }}>
            <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-2">
              <span style={{ color: "#666" }}>OPERATOR_ID:</span>
              <span style={{ color: "#aaa" }}>Ufuk Avci</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-2">
              <span style={{ color: "#666" }}>CONTACT_NODE:</span>
              <a
                href="mailto:signal@shapeneural.com"
                className="hover:underline transition-colors"
                style={{ color: "#0f0" }}
              >
                signal@shapeneural.com
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-2">
              <span style={{ color: "#666" }}>LOCATION_DATA:</span>
              <span style={{ color: "#aaa" }}>
                Wasserhofstraße 47, 60529 Frankfurt am Main, Germany
              </span>
            </div>

            <div className="mt-6 pt-6" style={{ borderTop: "1px solid #222" }}>
              <div className="text-xs tracking-wider mb-2" style={{ color: "#666" }}>DISCLAIMER:</div>
              <p className="text-sm leading-relaxed" style={{ color: "#777" }}>
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
            className="text-lg md:text-xl tracking-[0.2em] mb-6 flex items-center gap-2"
            style={{ color: "#0f0", textShadow: "0 0 10px rgba(0,255,0,0.3)" }}
          >
            <span>{">"}</span>
            <span>// DATA_PRIVACY_PROTOCOL</span>
          </h2>

          <div className="space-y-4 text-sm md:text-base" style={{ color: "#888" }}>
            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-2">
              <span style={{ color: "#666" }}>PROTOCOL_STATUS:</span>
              <span style={{ color: "#0f0" }}>GDPR_COMPLIANT</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-2">
              <span style={{ color: "#666" }}>HOSTING_NODE:</span>
              <span style={{ color: "#aaa" }}>Vercel Inc. (Server Logs only)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-2">
              <span style={{ color: "#666" }}>TRACKING:</span>
              <span style={{ color: "#ff0055" }}>NEGATIVE (No Cookies, No Analytics)</span>
            </div>

            <div className="mt-6 pt-6" style={{ borderTop: "1px solid #222" }}>
              <div className="text-xs tracking-wider mb-2" style={{ color: "#666" }}>DATA_HANDLING:</div>
              <p className="text-sm leading-relaxed" style={{ color: "#777" }}>
                If you contact us via email, your data will be stored for communication
                purposes only. We do not share data with third parties unless required by law.
              </p>
            </div>

            <div className="mt-6 pt-6" style={{ borderTop: "1px solid #222" }}>
              <div className="text-xs tracking-wider mb-2" style={{ color: "#666" }}>YOUR_RIGHTS:</div>
              <p className="text-sm leading-relaxed" style={{ color: "#777" }}>
                Access, Rectification, Deletion. Initiate request via{" "}
                <a href="mailto:signal@shapeneural.com" className="hover:underline" style={{ color: "#0f0" }}>
                  signal@shapeneural.com
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Footer meta */}
        <div
          className="pt-6 flex justify-between items-center text-xs tracking-wider"
          style={{ borderTop: "1px solid #222", color: "#444" }}
        >
          <span>PROTOCOL_VERSION: 1.0</span>
          <span>LAST_UPDATE: 2026-03-11</span>
        </div>
      </div>
    </SubpageShell>
  );
};

export default LegalPage;
