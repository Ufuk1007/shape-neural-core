import { useState, useEffect, useRef, ReactNode, FormEvent } from "react";
import BindruneLogo from "@/components/BindruneLogo";
import sapientBlockImg from "@/assets/sapient-block-screenshot.png";
import melodeyeImg from "@/assets/melodeye-screenshot.png";
import problaimImg from "@/assets/problaim-screenshot.png";

const T = {
  green: "#00944a",
  dark: "#111",
  muted: "#666",
  light: "#999",
  bg1: "#f7f7f5",
  bg2: "#fff",
  border: "#e2e2e0",
  mono: "'Courier New', Courier, monospace",
  sans: "'DM Sans', 'Avenir Next', system-ui, -apple-system, sans-serif",
};

function useReveal(threshold = 0.12): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
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

function Label({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        fontFamily: T.mono,
        fontSize: "0.72rem",
        fontWeight: 700,
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color: T.green,
        marginBottom: "1rem",
      }}
    >
      {children}
    </p>
  );
}

function Wrap({
  children,
  bg = T.bg1,
  id,
}: {
  children: ReactNode;
  bg?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      style={{
        background: bg,
        padding: "6rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: "56rem", margin: "0 auto" }}>{children}</div>
    </section>
  );
}

export default function AlliancePage() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", message: "" });
  const [hoverCta, setHoverCta] = useState(false);
  const [hoverSend, setHoverSend] = useState(false);
  const set = (k: "name" | "message") => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.message.trim()) return;
    setFormState("sending");
    const subject = encodeURIComponent(
      "Alliance — " + (form.name || "Nachricht")
    );
    const body = encodeURIComponent(
      `${form.name ? "Von: " + form.name + "\n\n" : ""}${form.message}`
    );
    window.location.href = `mailto:signal@shapeneural.com?subject=${subject}&body=${body}`;
    setTimeout(() => setFormState("sent"), 800);
  };

  useEffect(() => {
    if (!document.getElementById("sn-a-styles")) {
      const s = document.createElement("style");
      s.id = "sn-a-styles";
      s.textContent = `
        @keyframes sn-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
      `;
      document.head.appendChild(s);
    }
  }, []);

  return (
    <div style={{ fontFamily: T.sans, color: T.dark, background: T.bg1 }}>
      {/* ═══════ HERO ═══════ */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: T.dark,
          padding: "6rem 1.5rem",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "48rem", textAlign: "center", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
            <BindruneLogo size={48} onDark={true} />
          </div>
          <p
            style={{
              fontFamily: T.mono,
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: T.green,
              marginBottom: "2rem",
            }}
          >
            SHAPENEURAL ALLIANCE
          </p>
          <Reveal>
            <h1
              style={{
                fontFamily: T.mono,
                fontSize: "clamp(2rem, 5vw, 3.6rem)",
                fontWeight: 700,
                lineHeight: 1.15,
                color: "#fff",
              }}
            >
              Ein Lab.
              <br />
              Offene Türen.
              <br />
              KI als gemeinsame Sprache.
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p
              style={{
                fontFamily: T.sans,
                fontSize: "1.1rem",
                color: T.light,
                lineHeight: 1.75,
                maxWidth: "36rem",
                margin: "2rem auto 0",
              }}
            >
              ShapeNeural ist ein unabhängiges Lab an der Schnittstelle von KI,
              Design und Strategie. Offen für Zusammenarbeit mit allen, die
              Neues ausprobieren wollen — egal ob Organisation, Team oder
              Einzelperson.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <a
              href="#kontakt"
              onMouseEnter={() => setHoverCta(true)}
              onMouseLeave={() => setHoverCta(false)}
              style={{
                display: "inline-block",
                marginTop: "2.5rem",
                fontFamily: T.mono,
                fontSize: "0.82rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: T.dark,
                background: hoverCta ? "#00b35a" : T.green,
                padding: "0.9rem 2.2rem",
                transition: "background 0.25s",
              }}
            >
              Lass uns reden
            </a>
          </Reveal>
        </div>
      </section>

      {/* ═══════ WAS UNS ANTREIBT ═══════ */}
      <Wrap bg={T.bg2}>
        <Label>WAS UNS ANTREIBT_</Label>
        <Reveal>
          <h2
            style={{
              fontFamily: T.mono,
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              color: T.dark,
              marginBottom: "1rem",
            }}
          >
            Herausfinden, wo KI
            <br />
            echten Unterschied macht.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p
            style={{
              fontSize: "1rem",
              color: T.muted,
              lineHeight: 1.8,
              maxWidth: "38rem",
              marginBottom: "3rem",
            }}
          >
            Nicht jedes Problem braucht KI. Aber manche Ideen werden erst durch
            KI möglich. Uns interessiert genau diese Grenze — und die besten
            Ergebnisse entstehen, wenn unterschiedliche Perspektiven
            aufeinandertreffen. Deshalb suchen wir den Austausch: mit Menschen,
            die in ihrer Welt tief drin stecken, und mit uns, die wissen, was
            die Technologie kann.
          </p>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {[
            {
              title: "Neugier vor Methodik",
              text: "Wir starten nicht mit Frameworks, sondern mit Fragen. Was wäre möglich, wenn...? Daraus entstehen die interessantesten Projekte.",
            },
            {
              title: "Prototypen statt Strategiepapiere",
              text: "Wenn eine Idee gut ist, bauen wir etwas. Nicht planen, nicht präsentieren — bauen. Ob es funktioniert, sieht man schnell.",
            },
            {
              title: "Wissen teilen, nicht hüten",
              text: "Jede Zusammenarbeit hat das Ziel, dass am Ende alle mehr können als vorher. Kein Lock-in, keine Abhängigkeit.",
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.12}>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "3px",
                    minHeight: "100%",
                    background: T.green,
                    borderRadius: "2px",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <h3
                    style={{
                      fontFamily: T.mono,
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      color: T.dark,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.92rem",
                      color: T.muted,
                      lineHeight: 1.7,
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Wrap>

      {/* ═══════ WOMIT WIR ARBEITEN ═══════ */}
      <Wrap bg={T.bg1}>
        <Label>WOMIT WIR ARBEITEN_</Label>
        <Reveal>
          <h2
            style={{
              fontFamily: T.mono,
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              color: T.dark,
              marginBottom: "1rem",
            }}
          >
            Themen, Technologien,
            <br />
            Denkweisen.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p
            style={{
              fontSize: "1rem",
              color: T.muted,
              lineHeight: 1.8,
              maxWidth: "38rem",
              marginBottom: "3rem",
            }}
          >
            Kein festes Produktportfolio. Stattdessen: ein wachsendes Feld aus
            Technologien und Ansätzen, die wir verstehen, anwenden und
            weiterentwickeln.
          </p>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1rem",
          }}
        >
          {[
            {
              label: "Generative KI",
              text: "Large Language Models, Bild- und Musikgenerierung, Prompt Engineering. Nicht als Spielerei — als Werkzeug für echte Anwendungen.",
            },
            {
              label: "Multi-Agent-Systeme",
              text: "Mehrere KI-Modelle, die zusammenarbeiten. Unterschiedliche Stärken, ein Ergebnis. So löst man komplexe Aufgaben, die ein einzelnes Modell nicht schafft.",
            },
            {
              label: "Emotion & Sensorik",
              text: "Gesichtserkennung, Stimmungsanalyse, biometrische Signale — alles browserbasiert, ohne Cloud-Abhängigkeit. KI, die Menschen liest, nicht überwacht.",
            },
            {
              label: "KI-Strategie & Integration",
              text: "Wo macht KI Sinn, wo nicht? Wie führt man sie ein, ohne dass das Team abgehängt wird? Die Fragen vor der Technologie.",
            },
            {
              label: "Rapid Prototyping",
              text: "Von der Idee zum funktionierenden System in Tagen, nicht Monaten. React, Python, APIs — was gebraucht wird, wird gebaut.",
            },
            {
              label: "Human-Centered Design",
              text: "Drei Jahrzehnte Erfahrung darin, Dinge zu gestalten, die Menschen bewegen. Von Graffiti über Interfaces bis zu KI-Systemen — der rote Faden ist immer der Mensch.",
            },
          ].map((t, i) => (
            <Reveal key={t.label} delay={i * 0.08}>
              <div
                style={{
                  padding: "1.4rem",
                  border: `1px solid ${T.border}`,
                  background: T.bg2,
                  transition: "border-color 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = T.green)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = T.border)
                }
              >
                <h3
                  style={{
                    fontFamily: T.mono,
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: T.dark,
                    marginBottom: "0.6rem",
                  }}
                >
                  {t.label}
                </h3>
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: T.muted,
                    lineHeight: 1.7,
                  }}
                >
                  {t.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Wrap>

      {/* ═══════ WER ═══════ */}
      <Wrap bg={T.bg2}>
        <Label>WER_</Label>
        <Reveal>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: T.mono,
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  color: T.dark,
                  marginBottom: "1.2rem",
                }}
              >
                Ufuk Avci
              </h2>
              <p
                style={{
                  fontSize: "1rem",
                  color: T.muted,
                  lineHeight: 1.8,
                  marginBottom: "1rem",
                }}
              >
                VP Customer Experience bei einer Tier-1-Bank in Frankfurt.
                Nebenbei: ShapeNeural — ein persönliches Lab, das seit 2024
                KI-Systeme baut. Der Hintergrund: drei Jahrzehnte an der
                Schnittstelle von Design, Strategie und Technologie.
              </p>
              <p
                style={{
                  fontSize: "1rem",
                  color: T.muted,
                  lineHeight: 1.8,
                }}
              >
                Was mich antreibt: herausfinden, wo KI echten Unterschied
                macht — und wo sie nur Lärm erzeugt. Das geht am besten im
                Gespräch mit Leuten, die eine ähnliche Frage haben.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                marginTop: "0.5rem",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: T.green,
                  animation: "sn-pulse 2.5s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: T.mono,
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: T.green,
                }}
              >
                OFFEN FÜR AUSTAUSCH
              </span>
            </div>
          </div>
        </Reveal>
      </Wrap>

      {/* ═══════ PORTFOLIO TEASER ═══════ */}
      <Wrap bg={T.bg1}>
        <Reveal>
          <div
            style={{
              textAlign: "center",
              padding: "2rem 0",
            }}
          >
            <Label>PORTFOLIO_</Label>
            <h2
              style={{
                fontFamily: T.mono,
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                fontWeight: 700,
                lineHeight: 1.2,
                color: T.dark,
                marginBottom: "1rem",
              }}
            >
              Was bisher entstanden ist.
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: T.muted,
                lineHeight: 1.8,
                maxWidth: "32rem",
                margin: "0 auto 2.5rem",
              }}
            >
              Projekte an der Schnittstelle von KI, Design und Strategie —
              von autonomen Content-Pipelines bis zu emotionaler Sensorik
              im Browser. Alles gebaut, nicht nur gedacht.
            </p>
            <a
              href="https://shapeneural.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                fontFamily: T.mono,
                fontSize: "0.82rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "#fff",
                background: T.dark,
                padding: "0.9rem 2.2rem",
                transition: "all 0.3s ease",
                borderBottom: `3px solid ${T.green}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = T.green;
                e.currentTarget.style.color = T.dark;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = T.dark;
                e.currentTarget.style.color = "#fff";
              }}
            >
              Portfolio ansehen →
            </a>
          </div>
        </Reveal>
      </Wrap>

      {/* ═══════ SCHREIBEN ═══════ */}
      <Wrap bg={T.bg1} id="kontakt">
        <Label>SCHREIBEN_</Label>
        <Reveal>
          <h2
            style={{
              fontFamily: T.mono,
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              color: T.dark,
              marginBottom: "1rem",
            }}
          >
            Kein Formular.
            <br />
            Ein Anfang.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p
            style={{
              fontSize: "1rem",
              color: T.muted,
              lineHeight: 1.8,
              maxWidth: "38rem",
              marginBottom: "2.5rem",
            }}
          >
            Wenn etwas auf dieser Seite resoniert hat — oder wenn Sie an etwas
            arbeiten, bei dem ein Austausch Sinn machen könnte — schreiben Sie
            einfach. Ein Satz reicht.
          </p>
        </Reveal>

        {formState === "sent" ? (
          <Reveal>
            <div style={{ textAlign: "center", padding: "3rem 0" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  margin: "0 auto 1.5rem",
                  borderRadius: "50%",
                  background: `${T.green}18`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke={T.green}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="4 10 8 14 16 6" />
                </svg>
              </div>
              <h3
                style={{
                  fontFamily: T.mono,
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: T.dark,
                  marginBottom: "0.5rem",
                }}
              >
                Ist angekommen.
              </h3>
              <p style={{ fontSize: "0.92rem", color: T.muted }}>
                Ich melde mich. Meistens innerhalb von ein, zwei Tagen.
              </p>
              <button
                onClick={() => {
                  setFormState("idle");
                  setForm({ name: "", message: "" });
                }}
                style={{
                  fontFamily: T.mono,
                  color: T.green,
                  fontSize: "0.72rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  marginTop: "1.5rem",
                  letterSpacing: "0.05em",
                }}
              >
                ← Zurück
              </button>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={0.15}>
            <form
              onSubmit={handleSubmit}
              style={{
                maxWidth: "32rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.2rem",
              }}
            >
              <div>
                <label
                  style={{
                    fontFamily: T.mono,
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: T.muted,
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  Name (optional)
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={set("name")}
                  style={{
                    width: "100%",
                    fontFamily: T.sans,
                    fontSize: "0.95rem",
                    padding: "0.75rem 0.9rem",
                    border: `1px solid ${T.border}`,
                    background: T.bg2,
                    outline: "none",
                    transition: "border-color 0.25s",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = T.green)}
                  onBlur={(e) => (e.target.style.borderColor = T.border)}
                />
              </div>
              <div>
                <label
                  style={{
                    fontFamily: T.mono,
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: T.muted,
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  Ihre Nachricht
                </label>
                <textarea
                  value={form.message}
                  onChange={set("message")}
                  rows={5}
                  style={{
                    width: "100%",
                    fontFamily: T.sans,
                    fontSize: "0.95rem",
                    padding: "0.75rem 0.9rem",
                    border: `1px solid ${T.border}`,
                    background: T.bg2,
                    outline: "none",
                    resize: "vertical",
                    transition: "border-color 0.25s",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = T.green)}
                  onBlur={(e) => (e.target.style.borderColor = T.border)}
                />
              </div>
              <button
                type="submit"
                disabled={formState === "sending"}
                onMouseEnter={() => setHoverSend(true)}
                onMouseLeave={() => setHoverSend(false)}
                style={{
                  width: "100%",
                  fontFamily: T.mono,
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  border: "none",
                  padding: "0.9rem",
                  color: hoverSend ? T.dark : "#fff",
                  background: hoverSend ? T.green : T.dark,
                  transition: "all 0.25s ease",
                  opacity: formState === "sending" ? 0.6 : 1,
                }}
              >
                {formState === "sending" ? "..." : "Abschicken"}
              </button>
            </form>
          </Reveal>
        )}
      </Wrap>

      {/* ═══════ FOOTER ═══════ */}
      <footer
        style={{
          background: T.dark,
          padding: "1.3rem 1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.6rem",
        }}
      >
        <span
          style={{
            fontFamily: T.mono,
            color: "#444",
            fontSize: "0.68rem",
          }}
        >
          © 2025 SHAPENEURAL
        </span>
        <span
          style={{
            fontFamily: T.sans,
            color: "#555",
            fontSize: "0.72rem",
          }}
        >
          signal@shapeneural.com
        </span>
        <span
          style={{
            fontFamily: T.mono,
            color: T.green,
            fontSize: "0.66rem",
            letterSpacing: "0.08em",
          }}
        >
          ALLIANCE // OFFEN
        </span>
      </footer>
    </div>
  );
}
