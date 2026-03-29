import { useState, useEffect, useRef, useCallback, ReactNode, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import BindruneLogo from "@/components/BindruneLogo";
import btcRadioImg from "@/assets/btc-radio-screenshot.png";

/* ── Design Tokens ── */
const C = {
  bgDark: "#0a0a0a",
  bgDarkAlt: "#111111",
  bgLight: "#f5f4f0",
  bgAlt: "#eceae4",
  green: "#00ff41",
  greenMid: "rgba(0, 255, 65, 0.45)",
  greenDim: "rgba(0, 255, 65, 0.10)",
  greenLine: "rgba(0, 255, 65, 0.20)",
  magenta: "#ff0055",
  textDark: "#1a1a1a",
  textDarkSub: "rgba(0, 0, 0, 0.55)",
  textDarkMuted: "rgba(0, 0, 0, 0.35)",
  textLight: "rgba(255, 255, 255, 0.92)",
  textLightMid: "rgba(255, 255, 255, 0.65)",
  textLightSub: "rgba(255, 255, 255, 0.4)",
  textLightMuted: "rgba(255, 255, 255, 0.18)",
  mono: "'IBM Plex Mono', 'Courier New', monospace",
  sans: "'DM Sans', system-ui, sans-serif",
};

/* ── Intersection Observer hook ── */
function useReveal(threshold = 0.12): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

/* ── Fade-in from bottom ── */
function FI({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const [ref, vis] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Fade-in from left ── */
function FL({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const [ref, vis] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateX(0)" : "translateX(-24px)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── All Project Data ── */
const ALL_PROJECTS = [
  {
    title: "SAPIENTBLOCK",
    status: "LIVE" as const,
    collab: "Blockchain Reallabor · Fraunhofer FIT",
    brief: "KI-gestützte Blockchain-Relevanzanalyse für den deutschen Mittelstand. Die Plattform nimmt ein Unternehmensprofil auf, gleicht es gegen validierte Use Cases ab und liefert einen datengetriebenen Relevanz-Score mit konkreten Empfehlungen.",
    stats: [
      { num: "250+", label: "Validierte Use Cases" },
      { num: "74", label: "Branchen" },
      { num: "RAG", label: "Multi-LLM Pipeline" },
    ],
    video: "/videos/sapientblock.mp4",
  },
  {
    title: "PROBLAIM",
    status: "BETA" as const,
    collab: "",
    brief: "KI-orchestrierte Problemzerlegung, die komplexe Fragestellungen wie ein erfahrener Berater behandelt — systematisch zerlegt, aus mehreren Perspektiven beleuchtet, mit externer Recherche anreichert und über Tage und Wochen iterativ vertieft.",
    stats: [
      { num: "12", label: "Archetyp-Perspektiven" },
      { num: "4", label: "Pipeline-Phasen" },
      { num: "3", label: "LLMs orchestriert" },
    ],
    video: "/videos/problaim.mp4",
  },
  {
    title: "SAPIENTSHIFT",
    status: "BETA" as const,
    collab: "",
    brief: "KI-Potenzialanalyse, die das abstrakte Versprechen von KI in personalisierte, handlungsrelevante Einblicke übersetzt. Drei Analyse-Pipelines für Unternehmen, Teams und Einzelpersonen — plus eine autonome Creative Guild aus 10 KI-Agenten.",
    stats: [
      { num: "318", label: "Kuratierte Use Cases" },
      { num: "3", label: "Analyse-Pipelines" },
      { num: "10", label: "KI-Agenten" },
    ],
    video: "/videos/sapientshift.mp4",
  },
  {
    title: "MELODEYE",
    status: "BETA" as const,
    collab: "",
    brief: "Multimodale Emotionserkennung, die zwischen gezeigter und erlebter Emotion unterscheidet — und Musik generiert, die auf das reagiert, was man wirklich fühlt. Vollständig im Browser, kein Server sieht biometrische Daten.",
    stats: [
      { num: "EMER", label: "Emotionstheorie" },
      { num: "100%", label: "Browser-basiert" },
      { num: "0", label: "Server-Uploads" },
    ],
    video: "/videos/melodeye.mp4",
  },
  {
    title: "AUTOFORGE",
    status: "LIVE" as const,
    collab: "",
    brief: "Eine Maschine, die deine Automatisierungsmaschine baut. 3 Fragen zu Branche, Zielgruppe und Tonalität — AUTOFORGE generiert eine maßgeschneiderte Content-Automatisierungs-Pipeline. Lokal, ohne Plattformabhängigkeit.",
    stats: [
      { num: "3", label: "Fragen" },
      { num: "0", label: "Vendor Lock-in" },
      { num: "∞", label: "Pipelines" },
    ],
    video: "/videos/autoforge.mp4",
  },
  {
    title: "HUMANCRYP.TO",
    status: "ARCHIVED" as const,
    collab: "",
    brief: "Krypto-Bildungsplattform, in der digitale Währungen menschliche Form annehmen. Jede Kryptowährung wird einem Jungschen Archetyp zugeordnet, erhält eine Persönlichkeit nach dem Plutchik-Modell und wird durch KI-Narrative, Stimme und Video zum Leben erweckt.",
    stats: [
      { num: "12", label: "Archetypen" },
      { num: "AI", label: "Avatar-Pipeline" },
      { num: "∞", label: "Geschichten" },
    ],
    video: "/videos/humancrypto.mp4",
  },
  {
    title: "BITCOIN_SOUNDSCAPE",
    status: "LIVE" as const,
    collab: "",
    brief: "Echtzeit-Bitcoin-Marktdaten, übersetzt in eine kontinuierliche KI-generierte Klanglandschaft. Fünf temporale Schichten — von monatlichen Makrotrends bis zu einzelnen Whale-Transaktionen — als 24/7-Livestream.",
    stats: [
      { num: "5", label: "Temporale Schichten" },
      { num: "24/7", label: "Livestream" },
      { num: "2", label: "KI-Provider" },
    ],
    image: btcRadioImg,
  },
];

/* ── Project Carousel ── */
function ProjectCarousel() {
  const [current, setCurrent] = useState(0);
  const total = ALL_PROJECTS.length;
  const trackRef = useRef<HTMLDivElement>(null);

  const goto = useCallback((idx: number) => {
    setCurrent(((idx % total) + total) % total);
  }, [total]);

  const prev = () => goto(current - 1);
  const next = () => goto(current + 1);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  // Touch swipe
  const touchStart = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
  };

  const p = ALL_PROJECTS[current];

  return (
    <div>
      {/* Carousel track */}
      <div
        ref={trackRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ position: "relative", overflow: "hidden" }}
      >
        <div style={{
          display: "flex",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: `translateX(-${current * 85}%)`,
        }}>
          {ALL_PROJECTS.map((proj, idx) => (
            <div
              key={proj.title}
              style={{
                flex: "0 0 85%",
                paddingRight: 16,
                opacity: idx === current ? 1 : 0.35,
                transform: idx === current ? "scale(1)" : "scale(0.96)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
            >
              <div style={{
                background: "white",
                border: "1px solid rgba(0,0,0,0.06)",
                overflow: "hidden",
                display: "grid",
                gridTemplateColumns: "1fr",
              }}>
                {/* Video / Image — natural aspect ratio */}
                <div style={{
                  background: "#0a0a0a",
                  width: "100%",
                  maxHeight: 480,
                  overflow: "hidden",
                }}>
                  {proj.video ? (
                    <video
                      src={proj.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                        maxHeight: 480,
                        objectFit: "contain",
                        objectPosition: "center",
                        background: "#0a0a0a",
                      }}
                    />
                  ) : proj.image ? (
                    <img
                      src={proj.image}
                      alt={`${proj.title}`}
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                        maxHeight: 480,
                        objectFit: "contain",
                        objectPosition: "center",
                        background: "#0a0a0a",
                      }}
                    />
                  ) : null}
                </div>

                {/* Content */}
                <div style={{ padding: "36px 40px 40px" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 4 }}>
                    <span style={{ fontFamily: C.mono, fontSize: 20, fontWeight: 500, color: C.textDark }}>
                      {proj.title}
                    </span>
                    <span style={{
                      fontFamily: C.mono, fontSize: 10, letterSpacing: "0.1em",
                      padding: "2px 8px", borderRadius: 1,
                      color: proj.status === "LIVE" ? C.green : proj.status === "ARCHIVED" ? "rgba(255,255,255,0.4)" : "rgba(0,180,60,0.7)",
                      background: proj.status === "LIVE" ? C.greenDim : proj.status === "ARCHIVED" ? "rgba(255,255,255,0.06)" : "rgba(0,180,60,0.08)",
                    }}>
                      {proj.status}
                    </span>
                  </div>

                  {proj.collab && (
                    <p style={{
                      fontFamily: C.mono, fontSize: 11,
                      color: C.textDarkMuted, marginTop: 6, marginBottom: 16,
                    }}>
                      {proj.collab}
                    </p>
                  )}
                  {!proj.collab && <div style={{ marginBottom: 16 }} />}

                  <p style={{ fontSize: 15, lineHeight: 1.7, color: C.textDarkSub, marginBottom: 24 }}>
                    {proj.brief}
                  </p>

                  <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
                    {proj.stats.map(s => (
                      <div key={s.label} style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{
                          fontFamily: C.mono, fontSize: 22, fontWeight: 500,
                          color: C.textDark, lineHeight: 1,
                        }}>
                          {s.num}
                        </span>
                        <span style={{
                          fontFamily: C.mono, fontSize: 10, color: C.textDarkMuted,
                          letterSpacing: "0.06em", marginTop: 6, textTransform: "uppercase",
                        }}>
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginTop: 32,
      }}>
        {/* Arrows + counter */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button
            onClick={prev}
            aria-label="Vorheriges Projekt"
            style={{
              width: 44, height: 44,
              background: "transparent",
              border: `1px solid ${C.textDarkMuted}`,
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "border-color 0.2s, background 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.textDark; e.currentTarget.style.background = "rgba(0,0,0,0.04)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.textDarkMuted; e.currentTarget.style.background = "transparent"; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.textDark} strokeWidth="2" strokeLinecap="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Nächstes Projekt"
            style={{
              width: 44, height: 44,
              background: "transparent",
              border: `1px solid ${C.textDarkMuted}`,
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "border-color 0.2s, background 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.textDark; e.currentTarget.style.background = "rgba(0,0,0,0.04)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.textDarkMuted; e.currentTarget.style.background = "transparent"; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.textDark} strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <span style={{
            fontFamily: C.mono, fontSize: 12, color: C.textDarkMuted,
            letterSpacing: "0.05em",
          }}>
            {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        {/* Dots */}
        <div style={{ display: "flex", gap: 8 }}>
          {ALL_PROJECTS.map((_, i) => (
            <button
              key={i}
              onClick={() => goto(i)}
              aria-label={`Projekt ${i + 1}`}
              style={{
                width: i === current ? 24 : 8,
                height: 8,
                background: i === current ? C.textDark : C.textDarkMuted,
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                borderRadius: 1,
              }}
            />
          ))}
        </div>
      </div>

      {/* Portfolio CTA */}
      <div style={{ marginTop: 48, textAlign: "center" }}>
        <Link
          to="/#projects"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            fontFamily: C.mono,
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: "0.1em",
            color: "#0a0a0a",
            background: C.green,
            padding: "14px 36px",
            textDecoration: "none",
            textTransform: "uppercase",
            transition: "all 0.25s ease",
            border: `2px solid ${C.green}`,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = C.textDark;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = C.green;
            e.currentTarget.style.color = "#0a0a0a";
          }}
        >
          GESAMTES PORTFOLIO ANSEHEN
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

      {/* ═══════ PROJEKTE ═══════ */}
      <section style={{ background: C.bgLight, padding: "120px 0 100px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
          <FL>{sectionLabel("PROJEKTE_", false)}</FL>
          <ProjectCarousel />
        </div>
      </section>


      <section style={{
        background: C.bgDark, padding: "120px 0", position: "relative",
      }}>
        {/* Subtle glow */}
        <div style={{
          position: "absolute", top: 0, right: 0, width: "40%", height: "100%",
          background: "radial-gradient(ellipse at 80% 50%, rgba(0,255,65,0.02) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 40px", position: "relative" }}>
          <FL>{sectionLabel("KONTEXT_", true)}</FL>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: 80, alignItems: "start",
          }} className="kontext-grid">
            {/* Bio */}
            <FI>
              <div>
                <h2 style={{
                  fontFamily: C.mono, fontSize: 28, fontWeight: 500,
                  color: C.textLight, marginBottom: 36,
                }}>
                  Ufuk Avci
                </h2>
                <div style={{ fontSize: 17, lineHeight: 1.8, color: C.textLightMid }}>
                  <p style={{ marginBottom: 20 }}>
                    Tagsüber VP Customer Experience bei einer Tier-1-Bank in Frankfurt — verantwortlich für Kundenstrategie, Segmentierung und die Integration von KI in bestehende Prozesse. Der Rest der Zeit gehört diesem Lab.
                  </p>
                  <p>
                    ShapeNeural ist kein Nebenprojekt im klassischen Sinn. Es ist der Ort, an dem Ideen gebaut werden, die in einem Konzern nicht entstehen können — aber von einem Konzernverständnis profitieren. Drei Jahrzehnte Erfahrung an der Schnittstelle von Design, Strategie und Technologie. Seit 2024 als eigenständiges Lab.
                  </p>
                </div>
              </div>
            </FI>

            {/* Timeline */}
            <FI delay={0.2}>
              <div style={{
                borderLeft: `1px solid ${C.greenLine}`,
                paddingLeft: 24,
                display: "flex", flexDirection: "column",
              }}>
                {TIMELINE.map((era, i) => (
                  <div key={era.year} style={{
                    padding: "16px 0", position: "relative",
                  }}>
                    <div style={{
                      position: "absolute", left: -28.5, top: 22,
                      width: 7, height: 7, background: C.green,
                      borderRadius: "50%", opacity: i === TIMELINE.length - 1 ? 1 : 0.5,
                    }} />
                    <p style={{
                      fontFamily: C.mono, fontSize: 11, color: C.green,
                      opacity: 0.7, letterSpacing: "0.08em", marginBottom: 6,
                    }}>
                      {era.year}
                    </p>
                    <p style={{
                      fontFamily: C.sans, fontSize: 14,
                      color: C.textLightSub, lineHeight: 1.5,
                    }}>
                      {era.text}
                    </p>
                  </div>
                ))}
              </div>
            </FI>
          </div>
        </div>
      </section>

      {/* ═══════ ANDOCKEN ═══════ */}
      <section style={{ background: C.bgLight, padding: "120px 0" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 40px" }}>
          <FL>{sectionLabel("ANDOCKEN_", false)}</FL>

          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2,
          }} className="andocken-grid">
            {DOCK_CARDS.map((card, i) => (
              <FI key={card.title} delay={i * 0.08}>
                <div
                  style={{
                    background: "white",
                    padding: "44px 40px",
                    position: "relative",
                    transition: "background 0.25s ease",
                    height: "100%",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(0,255,65,0.02)";
                    const bar = e.currentTarget.querySelector("[data-bar]") as HTMLElement;
                    if (bar) bar.style.opacity = "0.6";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "white";
                    const bar = e.currentTarget.querySelector("[data-bar]") as HTMLElement;
                    if (bar) bar.style.opacity = "0.25";
                  }}
                >
                  {/* Left accent bar */}
                  <div data-bar style={{
                    position: "absolute", top: 0, left: 0,
                    width: 3, height: "100%",
                    background: C.green, opacity: 0.25,
                    transition: "opacity 0.3s",
                  }} />

                  <h3 style={{
                    fontFamily: C.mono, fontSize: 15, fontWeight: 500,
                    color: C.textDark, marginBottom: 14,
                  }}>
                    {card.title}
                  </h3>
                  <p style={{
                    fontSize: 15, lineHeight: 1.65,
                    color: C.textDarkSub, marginBottom: 20,
                  }}>
                    {card.desc}
                  </p>
                  <div style={{
                    fontFamily: C.mono, fontSize: 11,
                    color: C.textDarkMuted, lineHeight: 1.8,
                    letterSpacing: "0.02em",
                  }}>
                    {card.examples.map(ex => (
                      <span key={ex} style={{
                        display: "inline-block",
                        background: C.greenDim,
                        padding: "2px 8px",
                        margin: "2px 4px 2px 0",
                        borderRadius: 1,
                      }}>
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </FI>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ ABLAUF ═══════ */}
      <section style={{
        background: C.bgDark, padding: "80px 0",
        textAlign: "center",
        borderTop: "1px solid rgba(0,255,65,0.06)",
        borderBottom: "1px solid rgba(0,255,65,0.06)",
      }}>
        <FI>
          <p style={{
            fontFamily: C.mono, fontSize: 20, fontWeight: 300,
            color: C.textLight, letterSpacing: "0.05em",
          }}>
            Schreiben. Reden. Sehen, was draus wird.
          </p>
        </FI>
      </section>

      {/* ═══════ KONTAKT ═══════ */}
      <section id="kontakt" style={{ background: C.bgLight, padding: "120px 0" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 40px" }}>
          <FL>{sectionLabel("SIGNAL_", false)}</FL>

          {formState === "sent" ? (
            <FI>
              <div>
                <p style={{
                  fontFamily: C.mono, fontSize: 16, color: C.textDark,
                }}>
                  Ist angekommen. Ich melde mich.
                </p>
                <button
                  onClick={() => { setFormState("idle"); setForm({ name: "", email: "", message: "" }); }}
                  style={{
                    display: "inline-block", marginTop: 20,
                    fontFamily: C.mono, fontSize: 13, color: C.textDarkMuted,
                    textDecoration: "none", background: "none", border: "none",
                    cursor: "pointer", padding: 0,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = C.green)}
                  onMouseLeave={e => (e.currentTarget.style.color = C.textDarkMuted)}
                >
                  ← Zurück
                </button>
              </div>
            </FI>
          ) : (
            <>
              <FI>
                <h2 style={{
                  fontFamily: C.mono, fontSize: 22, fontWeight: 400,
                  color: C.textDark, marginBottom: 12,
                }}>
                  Ein Satz reicht.
                </h2>
                <p style={{
                  fontSize: 15, color: C.textDarkSub,
                  marginBottom: 44, maxWidth: 400, lineHeight: 1.6,
                }}>
                  Wenn etwas auf dieser Seite resoniert hat — oder wenn Sie an etwas arbeiten, bei dem ein Austausch Sinn machen könnte.
                </p>
              </FI>

              <FI delay={0.1}>
                <form onSubmit={handleSubmit} style={{
                  maxWidth: 520, display: "flex", flexDirection: "column", gap: 16,
                }}>
                  <input
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={set("name")}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = C.green)}
                    onBlur={e => (e.target.style.borderColor = "rgba(0,0,0,0.1)")}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={set("email")}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = C.green)}
                    onBlur={e => (e.target.style.borderColor = "rgba(0,0,0,0.1)")}
                  />
                  <textarea
                    placeholder="Nachricht"
                    value={form.message}
                    onChange={set("message")}
                    required
                    style={{ ...inputStyle, minHeight: 130, resize: "vertical" as const }}
                    onFocus={e => (e.target.style.borderColor = C.green)}
                    onBlur={e => (e.target.style.borderColor = "rgba(0,0,0,0.1)")}
                  />

                  <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 4 }}>
                    <button
                      type="submit"
                      disabled={formState === "sending"}
                      style={{
                        fontFamily: C.mono, fontSize: 12, fontWeight: 500,
                        letterSpacing: "0.1em", textTransform: "uppercase",
                        padding: "14px 40px",
                        border: `1px solid ${C.magenta}`,
                        background: "transparent", color: C.magenta,
                        cursor: "pointer",
                        transition: "background 0.25s, color 0.25s",
                        opacity: formState === "sending" ? 0.6 : 1,
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = C.magenta; e.currentTarget.style.color = "#fff"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.magenta; }}
                    >
                      {formState === "sending" ? "..." : "ABSENDEN"}
                    </button>
                    <span style={{ fontFamily: C.mono, fontSize: 12, color: C.textDarkMuted }}>
                      oder{" "}
                      <a href="mailto:signal@shapeneural.com" style={{
                        color: C.textDarkMuted, textDecoration: "none",
                        borderBottom: "1px solid rgba(0,0,0,0.12)",
                        transition: "color 0.2s, border-color 0.2s",
                      }}
                        onMouseEnter={e => { e.currentTarget.style.color = C.green; e.currentTarget.style.borderColor = C.green; }}
                        onMouseLeave={e => { e.currentTarget.style.color = C.textDarkMuted; e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)"; }}
                      >
                        signal@shapeneural.com
                      </a>
                    </span>
                  </div>
                </form>
              </FI>
            </>
          )}
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer style={{ background: C.bgDark, padding: "52px 0", textAlign: "center" }}>
        <div style={{
          display: "flex", justifyContent: "center", gap: 36,
          marginBottom: 24, flexWrap: "wrap",
        }}>
          {[
            { label: "LINKEDIN", href: "https://www.linkedin.com/company/shapeneural/?viewAsMember=true" },
            { label: "EMAIL", href: "mailto:signal@shapeneural.com" },
            { label: "MAINFRAME →", href: "/" },
            { label: "LEGAL", href: "/legal" },
          ].map(link => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{
                fontFamily: C.mono, fontSize: 11, letterSpacing: "0.08em",
                color: C.textLightSub, textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = C.green)}
              onMouseLeave={e => (e.currentTarget.style.color = C.textLightSub)}
            >
              {link.label}
            </a>
          ))}
        </div>
        <p style={{ fontFamily: C.mono, fontSize: 11, color: C.textLightMuted }}>
          © 2025 SHAPENEURAL
        </p>
      </footer>

      <ScrollTop />

      {/* Keyframe animations */}
      <style>{`
        @keyframes allianceFadeIn { to { opacity: 1; } }
        @keyframes allianceSlideUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes allianceBob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(7px); } }
        @media (max-width: 900px) {
          .project-card { grid-template-columns: 1fr !important; }
          .project-card > div:first-child { aspect-ratio: 16 / 9 !important; }
          .kontext-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .andocken-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .project-card > div:last-child { padding: 32px 24px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0s !important; transition-duration: 0s !important; }
        }
      `}</style>
    </div>
  );
}

/* ── Shared input style ── */
const inputStyle: React.CSSProperties = {
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontSize: 15, padding: "14px 16px",
  border: "1px solid rgba(0,0,0,0.1)",
  background: "white", color: "#1a1a1a",
  outline: "none", transition: "border-color 0.25s",
  width: "100%", boxSizing: "border-box",
};
