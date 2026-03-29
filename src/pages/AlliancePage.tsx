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

/* ── Project Data ── */
const FEATURED_PROJECTS = [
  {
    title: "SAPIENTBLOCK",
    status: "LIVE" as const,
    collab: "Blockchain Reallabor · Fraunhofer FIT · Prof. Wolfgang Prinz · RWTH Aachen",
    brief: "KI-gestützte Blockchain-Relevanzanalyse für den deutschen Mittelstand. Die Plattform nimmt ein Unternehmensprofil auf, gleicht es gegen validierte Use Cases ab und liefert einen datengetriebenen Relevanz-Score mit konkreten Empfehlungen.",
    stats: [
      { num: "250+", label: "Validierte Use Cases" },
      { num: "74", label: "Branchen" },
      { num: "RAG", label: "Multi-LLM Pipeline" },
    ],
    image: sapientBlockImg,
    video: "/videos/sapientblock.mp4",
  },
  {
    title: "SAPIENTSHIFT",
    status: "LIVE" as const,
    collab: "",
    brief: "KI-Potenzialanalyse, die das abstrakte Versprechen von KI in personalisierte, handlungsrelevante Einblicke übersetzt. Drei Analyse-Pipelines für Unternehmen, Teams und Einzelpersonen — plus eine autonome Creative Guild aus 10 KI-Agenten, die kontextbezogene Inhalte generiert.",
    stats: [
      { num: "318", label: "Kuratierte Use Cases" },
      { num: "3", label: "Analyse-Pipelines" },
      { num: "10", label: "KI-Agenten" },
    ],
    image: sapientshiftImg,
    video: "/videos/sapientshift.mp4",
    reverse: true,
  },
  {
    title: "MELODEYE",
    status: "BETA" as const,
    collab: "",
    brief: "Multimodale Emotionserkennung, die zwischen gezeigter und erlebter Emotion unterscheidet — und Musik generiert, die auf das reagiert, was man wirklich fühlt. Gesichtserkennung, Blickverfolgung und Pupillendynamik in Echtzeit, vollständig im Browser. Kein Server sieht biometrische Daten.",
    stats: [
      { num: "EMER", label: "Emotionstheorie" },
      { num: "100%", label: "Browser-basiert" },
      { num: "0", label: "Server-Uploads" },
    ],
    image: melodeyeImg,
    video: "/videos/melodeye.mp4",
  },
];

const DOCK_CARDS = [
  {
    title: "Vortrag oder Workshop",
    desc: "Wie KI tatsächlich funktioniert — nicht als Folie, sondern mit dem, was hier gebaut wird. Hands-on, mit laufenden Systemen, auf dem Niveau des Publikums.",
    examples: ["Schulen & Hochschulen", "Events & Konferenzen", "Unternehmensteams", "IHKs & Verbände"],
  },
  {
    title: "Gemeinsam bauen",
    desc: "Eine Idee, die allein nicht geht. Zwei Perspektiven, die zusammen etwas Neues ergeben. Kein Auftrag — ein gemeinsames Projekt, an dem beide wachsen.",
    examples: ["KI-Prototypen", "Multi-LLM-Architekturen", "Daten × Design", "Forschungskooperationen"],
  },
  {
    title: "Sparring",
    desc: "Jemand baut etwas und will eine ehrliche Meinung. Oder denkt über etwas nach und braucht einen zweiten Kopf. Ein Gespräch, mehr nicht.",
    examples: ["Produktstrategie", "KI-Integration", "CX & Kundenstrategie", "Technische Architektur"],
  },
  {
    title: "Forschung und Experiment",
    desc: "Ein Thema, das untersucht werden will. Eine Frage, die noch keine Antwort hat. Das Lab als Ort, an dem man sie suchen kann — mit echten Werkzeugen und echten Daten.",
    examples: ["Emotionserkennung", "Generative Musik", "KI-Agentensysteme", "Data Sonification"],
  },
];

const TIMELINE = [
  { year: "SEIT 1996", text: "Graffiti. Visuelle Kommunikation ohne Erlaubnis. Der Ursprung von SN." },
  { year: "2000er", text: "Design, Marke, digitale Transformation. Agenturen, Konzerne, Systeme." },
  { year: "2010er", text: "CX-Strategie im Bankensektor. Kundenerfahrung als Systemdesign." },
  { year: "2024 →", text: "ShapeNeural. KI-Systeme, die funktionieren. Sieben und es werden mehr." },
];

/* ── Scroll-to-top button ── */
function ScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Nach oben"
      style={{
        position: "fixed", bottom: 28, right: 28,
        width: 38, height: 38,
        background: "rgba(10,10,10,0.85)",
        border: `1px solid ${C.greenLine}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer",
        opacity: show ? 1 : 0,
        pointerEvents: show ? "auto" : "none",
        transition: "opacity 0.3s, background 0.2s",
        zIndex: 100,
        backdropFilter: "blur(8px)",
      }}
      onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,255,65,0.12)")}
      onMouseLeave={e => (e.currentTarget.style.background = "rgba(10,10,10,0.85)")}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}

/* ══════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════ */
export default function AlliancePage() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.message.trim()) return;
    setFormState("sending");
    try {
      const res = await fetch("/api/forge-deliver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "signal@shapeneural.com",
          subject: `Alliance — ${form.name || "Nachricht"}`,
          content: [
            form.name && `Name: ${form.name}`,
            form.email && `Email: ${form.email}`,
            "", form.message,
          ].filter(Boolean).join("\n"),
          email: form.email || undefined,
        }),
      });
      if (!res.ok) throw new Error();
      setFormState("sent");
    } catch {
      const subject = encodeURIComponent(`Alliance — ${form.name || "Nachricht"}`);
      const body = encodeURIComponent(form.message);
      window.location.href = `mailto:signal@shapeneural.com?subject=${subject}&body=${body}`;
      setFormState("sent");
    }
  };

  // Load fonts
  useEffect(() => {
    if (!document.getElementById("alliance-fonts")) {
      const link = document.createElement("link");
      link.id = "alliance-fonts";
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;1,9..40,400&family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;1,400&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  /* ── Section label color helper ── */
  const sectionLabel = (text: string, onDark: boolean) => (
    <p style={{
      fontFamily: C.mono, fontSize: 11, fontWeight: 400,
      letterSpacing: "0.13em", textTransform: "uppercase",
      color: onDark ? C.green : C.textDark,
      marginBottom: 48,
    }}>
      {">"} {text}
    </p>
  );

  return (
    <div style={{ fontFamily: C.sans, color: C.textDark, background: C.bgDark, WebkitFontSmoothing: "antialiased" }}>
      <Helmet>
        <title>Alliance — ShapeNeural</title>
        <meta name="description" content="ShapeNeural ist ein unabhängiges KI-Lab. Sieben Systeme, eine offene Tür." />
      </Helmet>

      {/* ═══════ HERO ═══════ */}
      <section style={{
        background: C.bgDark,
        minHeight: "80vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center",
        padding: "100px 40px 80px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Grid texture */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(0,255,65,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{
            marginBottom: 28, opacity: 0,
            animation: "allianceFadeIn 0.5s ease 0.2s forwards",
          }}>
            <BindruneLogo size={40} onDark={true} />
          </div>

          <p style={{
            fontFamily: C.mono, fontSize: 11, letterSpacing: "0.14em",
            color: C.green, marginBottom: 56,
            opacity: 0, animation: "allianceFadeIn 0.5s ease 0.4s forwards",
          }}>
            SHAPENEURAL LABS
          </p>

          {/* Title */}
          <h1 style={{
            fontFamily: C.mono,
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 500, lineHeight: 1.15,
            color: C.textLight, letterSpacing: "-0.01em",
            opacity: 0, animation: "allianceSlideUp 0.65s ease 0.6s forwards",
          }}>
            ShapeNeural Alliance.
          </h1>

          {/* Tagline */}
          <p style={{
            fontFamily: C.mono,
            fontSize: "clamp(14px, 1.6vw, 18px)",
            fontWeight: 300, lineHeight: 1.5,
            color: C.textLightMid, letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginTop: 28,
            opacity: 0, animation: "allianceSlideUp 0.65s ease 0.85s forwards",
          }}>
            Gedanken. Perspektiven. KI-Systeme.
          </p>

          {/* Claim */}
          <p style={{
            fontFamily: C.sans,
            fontSize: "clamp(18px, 2.2vw, 26px)",
            fontWeight: 400, fontStyle: "italic",
            lineHeight: 1.4,
            color: C.textLight, marginTop: 32,
            opacity: 0, animation: "allianceSlideUp 0.65s ease 1.05s forwards",
          }}>
            Gemeinsam gedacht. Gemeinsam gebaut.
          </p>

          {/* Subtext */}
          <p style={{
            fontFamily: C.sans, fontSize: 15,
            color: C.textLightMid, marginTop: 48,
            maxWidth: 480, lineHeight: 1.75,
            opacity: 0, animation: "allianceFadeIn 0.6s ease 1.3s forwards",
          }}>
            ShapeNeural ist ein unabhängiges KI-Lab in Frankfurt.<br />
            Seit 2024 entstehen hier Systeme — und die Gedanken, die dahinterstehen.<br />
            Allianzen entstehen, wenn sie passen.
          </p>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)",
          opacity: 0, animation: "allianceFadeIn 0.5s ease 1.8s forwards",
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeLinecap="round"
            style={{ animation: "allianceBob 2.8s ease-in-out infinite" }}>
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* ═══════ SIGNAL STRIP — 3 Proof Points ═══════ */}
      <div style={{
        background: C.bgDarkAlt,
        borderTop: "1px solid rgba(0,255,65,0.08)",
        borderBottom: "1px solid rgba(0,255,65,0.08)",
        padding: "28px 0", overflow: "hidden",
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 40, flexWrap: "wrap", padding: "0 24px",
        }}>
          {[
            "FRAUNHOFER FIT COMMUNITY",
            "7 LIVE-SYSTEME",
            "15+ KI-TECHNOLOGIEN IM EINSATZ",
          ].map((item, i) => (
            <span key={item} style={{ display: "contents" }}>
              {i > 0 && <span style={{ width: 4, height: 4, background: C.green, borderRadius: "50%", opacity: 0.4, flexShrink: 0 }} />}
              <span style={{
                fontFamily: C.mono, fontSize: 11, letterSpacing: "0.08em",
                color: C.textLightSub, whiteSpace: "nowrap",
              }}>
                {item}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══════ PROJEKTE ═══════ */}
      <section style={{ background: C.bgLight, padding: "120px 0 100px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 40px" }}>
          <FL>{sectionLabel("PROJEKTE_", false)}</FL>

          {/* Project cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {FEATURED_PROJECTS.map((p, idx) => (
              <FI key={p.title} delay={idx * 0.1}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  background: "white",
                  border: "1px solid rgba(0,0,0,0.06)",
                  overflow: "hidden",
                  transition: "box-shadow 0.3s ease",
                  direction: p.reverse ? "rtl" : "ltr",
                }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 8px 40px rgba(0,0,0,0.06)")}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
                  className="project-card"
                >
                  {/* Visual — video or screenshot */}
                  <div style={{
                    aspectRatio: "4 / 3",
                    background: "#0a0a0a",
                    overflow: "hidden",
                    direction: "ltr",
                  }}>
                    {p.video ? (
                      <video
                        src={p.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{
                          width: "100%", height: "100%",
                          objectFit: "cover",
                          objectPosition: "top center",
                        }}
                      />
                    ) : (
                      <img
                        src={p.image}
                        alt={`${p.title} Screenshot`}
                        style={{
                          width: "100%", height: "100%",
                          objectFit: "cover",
                          objectPosition: "top center",
                        }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div style={{
                    padding: "48px 44px",
                    display: "flex", flexDirection: "column", justifyContent: "center",
                    direction: "ltr",
                  }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 4 }}>
                      <span style={{ fontFamily: C.mono, fontSize: 20, fontWeight: 500, color: C.textDark }}>
                        {p.title}
                      </span>
                      <span style={{
                        fontFamily: C.mono, fontSize: 10, letterSpacing: "0.1em",
                        padding: "2px 8px", borderRadius: 1,
                        color: p.status === "LIVE" ? C.green : "rgba(0,180,60,0.7)",
                        background: p.status === "LIVE" ? C.greenDim : "rgba(0,180,60,0.08)",
                      }}>
                        {p.status}
                      </span>
                    </div>

                    {p.collab && (
                      <p style={{
                        fontFamily: C.mono, fontSize: 11,
                        color: C.textDarkMuted, marginTop: 6, marginBottom: 20,
                      }}>
                        {p.collab}
                      </p>
                    )}
                    {!p.collab && <div style={{ marginBottom: 20 }} />}

                    <p style={{ fontSize: 15, lineHeight: 1.7, color: C.textDarkSub, marginBottom: 28 }}>
                      {p.brief}
                    </p>

                    <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
                      {p.stats.map(s => (
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
              </FI>
            ))}
          </div>

          {/* More link */}
          <FI delay={0.3}>
            <div style={{ marginTop: 48 }}>
              <Link to="/#projects" style={{
                fontFamily: C.mono, fontSize: 13, color: C.textDarkSub,
                textDecoration: "none", letterSpacing: "0.04em",
                borderBottom: `1px solid ${C.textDarkMuted}`,
                paddingBottom: 2, transition: "color 0.2s, border-color 0.2s",
              }}>
                + 4 weitere Projekte auf shapeneural.com →
              </Link>
            </div>
          </FI>
        </div>
      </section>

      {/* ═══════ KONTEXT ═══════ */}
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
