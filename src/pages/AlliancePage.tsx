import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import BindruneLogo from "@/components/BindruneLogo";
import { PROJECTS } from "@/data/projects";

/* ── Design Tokens ── */
const C = {
  dark: "#0a0a0a",
  light: "#f5f4f0",
  green: "#00ff41",
  greenDim: "rgba(0, 255, 65, 0.10)",
  cta: "#ff0055",
  textOnLight: "#1a1a1a",
  textOnLightSec: "rgba(0,0,0,0.55)",
  textOnLightMuted: "rgba(0,0,0,0.35)",
  textOnDark: "rgba(255,255,255,0.92)",
  textOnDarkSec: "rgba(255,255,255,0.65)",
  textOnDarkMuted: "rgba(255,255,255,0.4)",
  mono: "'IBM Plex Mono', 'Courier New', monospace",
  sans: "'DM Sans', system-ui, sans-serif",
};

/* ── Animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const, delay },
  }),
};

const slideLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: (delay: number = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const, delay },
  }),
};

/* ── Section Label ── */
function SectionLabel({ children, onDark = false }: { children: string; onDark?: boolean }) {
  return (
    <motion.p
      variants={slideLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      custom={0}
      style={{
        fontFamily: C.mono,
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.13em",
        textTransform: "uppercase",
        color: C.green,
        marginBottom: "1.5rem",
      }}
    >
      {">"} {children}_
    </motion.p>
  );
}

/* ── Motion wrapper ── */
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Projects to show (all with images) ── */
const SHOWCASE_PROJECTS = PROJECTS.filter(p => p.image);

/* ── Andocken scenarios ── */
const SCENARIOS = [
  {
    label: "SPRECHEN",
    text: "Events, Panels, Vorträge — über KI-Systeme, die gebaut werden. Keine Keynote-Slides mit Stock-Fotos. Echte Architektur, echte Fehler, echte Ergebnisse.",
  },
  {
    label: "VERMITTELN",
    text: "Schulen, Hochschulen, Weiterbildung — KI greifbar machen. Nicht als Theorie, sondern als Werkzeug, das man anfassen und benutzen kann.",
  },
  {
    label: "BAUEN",
    text: "Ein Problem, eine Idee, ein Prototyp. Zusammen etwas bauen, das vorher nicht existiert hat. Tage, nicht Monate.",
  },
  {
    label: "DENKEN",
    text: "Sparring, Perspektivwechsel, Domänen kreuzen. Wenn ein Gedanke einen Gegenpart braucht.",
  },
  {
    label: "FORSCHEN",
    text: "Interdisziplinäre Kollaboration — Emotion und KI, Blockchain und Mittelstand, Musik und Marktdaten. Die interessantesten Ergebnisse entstehen an den Rändern.",
  },
];

/* ── Contact situation options ── */
const SITUATIONS = [
  "Ich habe eine Idee und suche einen Sparringspartner.",
  "Wir suchen einen Speaker / Workshop-Leiter.",
  "Wir wollen KI in unserer Organisation greifbar machen.",
  "Ich baue selbst und suche Austausch.",
  "Etwas anderes.",
];

export default function AlliancePage() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", situation: "", message: "" });

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [k]: e.target.value });

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
          subject: `Alliance — ${form.name || "Nachricht"}${form.situation ? ` [${form.situation}]` : ""}`,
          content: [
            form.name && `Name: ${form.name}`,
            form.email && `Email: ${form.email}`,
            form.situation && `Situation: ${form.situation}`,
            "",
            form.message,
          ].filter(Boolean).join("\n"),
          email: form.email || undefined,
        }),
      });
      if (!res.ok) throw new Error("Send failed");
      setFormState("sent");
    } catch {
      // Fallback to mailto
      const subject = encodeURIComponent(`Alliance — ${form.name || "Nachricht"}`);
      const body = encodeURIComponent(
        [form.name && `Von: ${form.name}`, form.situation && `Kontext: ${form.situation}`, "", form.message]
          .filter(Boolean).join("\n")
      );
      window.location.href = `mailto:signal@shapeneural.com?subject=${subject}&body=${body}`;
      setFormState("sent");
    }
  };

  return (
    <div style={{ fontFamily: C.sans, color: C.textOnLight }}>
      <Helmet>
        <title>Alliance — ShapeNeural</title>
        <meta name="description" content="ShapeNeural ist ein unabhängiges KI-Lab. Sieben Systeme, eine offene Tür." />
      </Helmet>

      {/* ═══════════════════════════════════════════
          HERO — Dark
      ═══════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: C.dark,
          padding: "6rem 1.5rem",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.03,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "52rem", position: "relative" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ marginBottom: "2.5rem" }}
          >
            <BindruneLogo size={40} onDark={true} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: C.mono,
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              color: C.green,
              marginBottom: "2rem",
            }}
          >
            {">"} SHAPENEURAL // ALLIANCE_
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            style={{
              fontFamily: C.mono,
              fontSize: "clamp(2rem, 5vw, 3.4rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              color: C.textOnDark,
              marginBottom: "2rem",
            }}
          >
            Sieben KI-Systeme.
            <br />
            Ein Lab.
            <br />
            <span style={{ color: C.green }}>Eine offene Tür.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{
              fontFamily: C.sans,
              fontSize: "1.05rem",
              color: C.textOnDarkSec,
              lineHeight: 1.8,
              maxWidth: "38rem",
              marginBottom: "3rem",
            }}
          >
            ShapeNeural baut KI-Systeme — von Blockchain-Analyse über Emotionserkennung
            bis zu generativen Soundscapes. Unabhängig, eigenfinanziert, in Kollaboration
            mit Fraunhofer FIT.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
          >
            <a
              href="#kontakt"
              style={{
                fontFamily: C.mono,
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                padding: "0.85rem 2rem",
                background: C.cta,
                color: "#fff",
                transition: "opacity 0.25s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Signal senden
            </a>
            <a
              href="#projekte"
              style={{
                fontFamily: C.mono,
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                padding: "0.85rem 2rem",
                border: `1px solid ${C.green}`,
                color: C.green,
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = C.green;
                e.currentTarget.style.color = C.dark;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = C.green;
              }}
            >
              Was hier gebaut wird
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          KONTEXT — Dark
      ═══════════════════════════════════════════ */}
      <section style={{ background: C.dark, padding: "7rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "52rem", margin: "0 auto" }}>
          <SectionLabel onDark>KONTEXT</SectionLabel>

          <FadeIn>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "2.5rem",
                marginBottom: "3rem",
              }}
            >
              {[
                { num: "7", label: "KI-Systeme gebaut" },
                { num: "250+", label: "Validierte Use Cases" },
                { num: "1", label: "Fraunhofer-Kollaboration" },
                { num: "2024–", label: "Lab aktiv seit" },
              ].map((item, i) => (
                <FadeIn key={item.label} delay={i * 0.1}>
                  <div>
                    <span
                      style={{
                        fontFamily: C.mono,
                        fontSize: "clamp(2rem, 4vw, 2.8rem)",
                        fontWeight: 700,
                        color: C.green,
                        display: "block",
                        marginBottom: "0.4rem",
                      }}
                    >
                      {item.num}
                    </span>
                    <span
                      style={{
                        fontFamily: C.mono,
                        fontSize: "11px",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: C.textOnDarkMuted,
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div
              style={{
                borderLeft: `2px solid ${C.green}`,
                paddingLeft: "1.5rem",
                maxWidth: "40rem",
              }}
            >
              <p
                style={{
                  fontFamily: C.sans,
                  fontSize: "1rem",
                  color: C.textOnDarkSec,
                  lineHeight: 1.8,
                  marginBottom: "1rem",
                }}
              >
                SAPIENTBLOCK — das Flaggschiff-Projekt — entstand in Kollaboration mit dem
                Blockchain Reallabor (Fraunhofer FIT, BMWK-gefördert, RWTH Aachen). Es analysiert
                Blockchain-Relevanz für den deutschen Mittelstand über 74 Branchen hinweg.
              </p>
              <a
                href="https://blockchain-reallabor.de/showroom-bcrl/use-case-bot/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: C.mono,
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  color: C.green,
                  textDecoration: "none",
                  opacity: 0.7,
                  transition: "opacity 0.25s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
              >
                → BLOCKCHAIN REALLABOR
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WER — Light
      ═══════════════════════════════════════════ */}
      <section style={{ background: C.light, padding: "7rem 1.5rem" }}>
        <div style={{ maxWidth: "52rem", margin: "0 auto" }}>
          <SectionLabel>WER</SectionLabel>

          <FadeIn>
            <h2
              style={{
                fontFamily: C.mono,
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 700,
                lineHeight: 1.2,
                color: C.textOnLight,
                marginBottom: "2rem",
              }}
            >
              Ufuk Avci
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{ maxWidth: "40rem" }}>
              <p
                style={{
                  fontSize: "1rem",
                  color: C.textOnLightSec,
                  lineHeight: 1.85,
                  marginBottom: "1.2rem",
                }}
              >
                VP Customer Experience bei einer Tier-1-Bank in Frankfurt. Drei Jahrzehnte
                an der Schnittstelle von Design, Strategie und Technologie — von
                Interface-Design über digitale Transformation bis zu KI-Architektur.
              </p>
              <p
                style={{
                  fontSize: "1rem",
                  color: C.textOnLightSec,
                  lineHeight: 1.85,
                  marginBottom: "1.5rem",
                }}
              >
                ShapeNeural ist das Lab, in dem abends und am Wochenende gebaut wird.
                Nicht im Auftrag — aus Überzeugung. Sieben Systeme in 18 Monaten,
                jedes davon ein eigenständiges Produkt.
              </p>

              {/* Credential tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {[
                  "VP CX — TIER-1 BANK",
                  "FRAUNHOFER FIT KOLLABORATION",
                  "BMWK-GEFÖRDERT",
                  "RWTH AACHEN",
                  "30 JAHRE DESIGN & TECH",
                ].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: C.mono,
                      fontSize: "10px",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      padding: "0.35rem 0.7rem",
                      background: C.greenDim,
                      color: C.textOnLight,
                      border: "1px solid rgba(0, 255, 65, 0.15)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PROJEKTE — Light
      ═══════════════════════════════════════════ */}
      <section id="projekte" style={{ background: C.light, padding: "7rem 1.5rem", borderTop: `1px solid rgba(0,0,0,0.06)` }}>
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          <SectionLabel>PROJEKTE</SectionLabel>

          <FadeIn>
            <h2
              style={{
                fontFamily: C.mono,
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 700,
                lineHeight: 1.2,
                color: C.textOnLight,
                marginBottom: "0.8rem",
              }}
            >
              Gebaut. Nicht geplant.
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: C.textOnLightSec,
                lineHeight: 1.8,
                maxWidth: "36rem",
                marginBottom: "3rem",
              }}
            >
              Jedes System ist eigenständig, funktioniert, und löst ein konkretes Problem.
            </p>
          </FadeIn>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.2rem",
            }}
          >
            {SHOWCASE_PROJECTS.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.08}>
                <Link
                  to={`/project/${p.slug}`}
                  style={{ textDecoration: "none", color: "inherit", display: "block" }}
                >
                  <div
                    style={{
                      background: "#fff",
                      border: "1px solid rgba(0,0,0,0.08)",
                      overflow: "hidden",
                      transition: "border-color 0.3s, transform 0.3s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = C.green;
                      e.currentTarget.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden", background: "#111" }}>
                      <img
                        src={p.image}
                        alt={p.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }}
                        loading="lazy"
                      />
                      <span
                        style={{
                          position: "absolute",
                          top: "0.5rem",
                          right: "0.5rem",
                          fontFamily: C.mono,
                          fontSize: "9px",
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          padding: "0.2rem 0.5rem",
                          background: p.status === "LIVE" ? C.green : C.dark,
                          color: p.status === "LIVE" ? C.dark : C.green,
                        }}
                      >
                        {p.status}
                      </span>
                    </div>
                    <div style={{ padding: "1rem 1rem 1.2rem" }}>
                      <h3
                        style={{
                          fontFamily: C.mono,
                          fontSize: "12px",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          color: C.textOnLight,
                          marginBottom: "0.4rem",
                        }}
                      >
                        {p.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "13px",
                          color: C.textOnLightSec,
                          lineHeight: 1.6,
                        }}
                      >
                        {p.brief.length > 120 ? p.brief.slice(0, 120) + "…" : p.brief}
                      </p>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <Link
                to="/#projects"
                style={{
                  fontFamily: C.mono,
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  color: C.green,
                  transition: "opacity 0.25s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                → Alle Projekte im Detail
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ANDOCKEN — Light
      ═══════════════════════════════════════════ */}
      <section style={{ background: C.light, padding: "7rem 1.5rem", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: "52rem", margin: "0 auto" }}>
          <SectionLabel>ANDOCKEN</SectionLabel>

          <FadeIn>
            <h2
              style={{
                fontFamily: C.mono,
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 700,
                lineHeight: 1.2,
                color: C.textOnLight,
                marginBottom: "0.8rem",
              }}
            >
              Fünf Arten, hier anzudocken.
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: C.textOnLightSec,
                lineHeight: 1.8,
                maxWidth: "36rem",
                marginBottom: "3rem",
              }}
            >
              Keine Personas. Keine Zielgruppen. Aktivitäten.
            </p>
          </FadeIn>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {SCENARIOS.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.08}>
                <div
                  style={{
                    display: "flex",
                    gap: "1.2rem",
                    alignItems: "flex-start",
                    padding: "1.2rem 0",
                    borderBottom: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: C.mono,
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: C.green,
                      minWidth: "6rem",
                      paddingTop: "0.15rem",
                      flexShrink: 0,
                    }}
                  >
                    {s.label}
                  </span>
                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: C.textOnLightSec,
                      lineHeight: 1.75,
                    }}
                  >
                    {s.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ABLAUF — Dark strip
      ═══════════════════════════════════════════ */}
      <section style={{ background: C.dark, padding: "4rem 1.5rem" }}>
        <div
          style={{
            maxWidth: "52rem",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: "3rem",
            justifyContent: "space-between",
          }}
        >
          {[
            { step: "01", text: "Schreiben." },
            { step: "02", text: "Gespräch. 30 Minuten." },
            { step: "03", text: "Entscheiden." },
          ].map((item, i) => (
            <FadeIn key={item.step} delay={i * 0.12}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.8rem" }}>
                <span
                  style={{
                    fontFamily: C.mono,
                    fontSize: "11px",
                    color: C.green,
                    opacity: 0.5,
                  }}
                >
                  {item.step}
                </span>
                <span
                  style={{
                    fontFamily: C.mono,
                    fontSize: "14px",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    color: C.textOnDark,
                  }}
                >
                  {item.text}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          KONTAKT — Light
      ═══════════════════════════════════════════ */}
      <section id="kontakt" style={{ background: C.light, padding: "7rem 1.5rem" }}>
        <div style={{ maxWidth: "36rem", margin: "0 auto" }}>
          <SectionLabel>SIGNAL</SectionLabel>

          {formState === "sent" ? (
            <FadeIn>
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    margin: "0 auto 1.5rem",
                    background: C.greenDim,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="4 10 8 14 16 6" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: C.mono,
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: C.textOnLight,
                    marginBottom: "0.5rem",
                  }}
                >
                  Signal angekommen.
                </h3>
                <p style={{ fontSize: "0.92rem", color: C.textOnLightSec, marginBottom: "1.5rem" }}>
                  Antwort folgt. Meistens innerhalb von ein, zwei Tagen.
                </p>
                <button
                  onClick={() => { setFormState("idle"); setForm({ name: "", email: "", situation: "", message: "" }); }}
                  style={{
                    fontFamily: C.mono,
                    fontSize: "11px",
                    letterSpacing: "0.05em",
                    color: C.green,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  ← Neue Nachricht
                </button>
              </div>
            </FadeIn>
          ) : (
            <>
              <FadeIn>
                <h2
                  style={{
                    fontFamily: C.mono,
                    fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                    fontWeight: 700,
                    lineHeight: 1.2,
                    color: C.textOnLight,
                    marginBottom: "2.5rem",
                  }}
                >
                  Ein Satz reicht.
                </h2>
              </FadeIn>

              <FadeIn delay={0.1}>
                <form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
                >
                  {/* Situation select */}
                  <div>
                    <label style={labelStyle}>Was beschreibt Ihre Situation?</label>
                    <select
                      value={form.situation}
                      onChange={set("situation")}
                      style={{
                        ...inputStyle,
                        color: form.situation ? C.textOnLight : C.textOnLightMuted,
                        cursor: "pointer",
                      }}
                    >
                      <option value="" disabled>Bitte auswählen…</option>
                      {SITUATIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Name */}
                  <div>
                    <label style={labelStyle}>Name (optional)</label>
                    <input type="text" value={form.name} onChange={set("name")} style={inputStyle} />
                  </div>

                  {/* Email */}
                  <div>
                    <label style={labelStyle}>Email (optional — für Rückantwort)</label>
                    <input type="email" value={form.email} onChange={set("email")} style={inputStyle} />
                  </div>

                  {/* Message */}
                  <div>
                    <label style={labelStyle}>Nachricht</label>
                    <textarea
                      value={form.message}
                      onChange={set("message")}
                      rows={5}
                      required
                      style={{ ...inputStyle, resize: "vertical" }}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={formState === "sending"}
                    style={{
                      width: "100%",
                      fontFamily: C.mono,
                      fontWeight: 700,
                      fontSize: "12px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      border: "none",
                      padding: "0.9rem",
                      color: "#fff",
                      background: C.cta,
                      transition: "opacity 0.25s",
                      opacity: formState === "sending" ? 0.6 : 1,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = formState === "sending" ? "0.6" : "1")}
                  >
                    {formState === "sending" ? "Wird gesendet…" : "Signal senden"}
                  </button>

                  {formState === "error" && (
                    <p style={{ fontFamily: C.mono, fontSize: "11px", color: C.cta }}>
                      Etwas ist schiefgelaufen. Versuche es nochmal.
                    </p>
                  )}
                </form>
              </FadeIn>
            </>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER — Dark
      ═══════════════════════════════════════════ */}
      <footer style={{ background: C.dark, padding: "3rem 1.5rem 2rem", fontFamily: C.mono }}>
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1.5rem",
              marginBottom: "1.5rem",
            }}
          >
            {[
              { label: "LINKEDIN", href: "https://www.linkedin.com/company/shapeneural/?viewAsMember=true", color: C.green },
              { label: "EMAIL", href: "mailto:signal@shapeneural.com", color: C.textOnDarkMuted },
              { label: "MAINFRAME", href: "/", color: C.green },
              { label: "LEGAL", href: "/legal", color: C.cta },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{
                  color: C.textOnDarkMuted,
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = link.color)}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.textOnDarkMuted)}
              >
                <span style={{ color: link.color, opacity: 0.5 }}>[</span>
                {link.label}
                <span style={{ color: link.color, opacity: 0.5 }}>]</span>
              </a>
            ))}
          </div>

          <div
            style={{
              textAlign: "center",
              color: C.textOnDarkMuted,
              fontSize: "10px",
              letterSpacing: "0.2em",
            }}
          >
            © 2025 SHAPENEURAL // <span style={{ color: C.green }}>DESIGNED_INTELLIGENCE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── Shared form styles ── */
const labelStyle: React.CSSProperties = {
  fontFamily: C.mono,
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: C.textOnLightSec,
  display: "block",
  marginBottom: "0.5rem",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  fontFamily: C.sans,
  fontSize: "0.95rem",
  padding: "0.75rem 0.9rem",
  border: "1px solid rgba(0,0,0,0.1)",
  background: "#fff",
  outline: "none",
  boxSizing: "border-box",
  color: "#1a1a1a",
};
