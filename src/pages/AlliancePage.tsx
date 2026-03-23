import { motion } from "framer-motion";

const problemCards = [
  {
    title: "Fehlende Architektur",
    body: "KI-Tools werden eingeführt ohne ein System dahinter. Das Ergebnis: Insellösungen, die niemand nutzt und die nicht zusammenwachsen.",
  },
  {
    title: "Kein menschliches Fundament",
    body: "Automatisierung ohne Strategie optimiert die falschen Dinge. Schneller, aber in die falsche Richtung.",
  },
  {
    title: "Zu spät angefangen",
    body: "Die Organisationen, die 2026 führen, haben ihre Entscheidungen nicht 2026 getroffen.",
  },
];

const AlliancePage = () => {
  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* SECTION 1 — Hero (dark bridge) */}
      <section
        className="min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-24"
        style={{ backgroundColor: "#111111" }}
      >
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text */}
          <div>
            <p
              className="uppercase tracking-[0.3em] text-xs font-bold mb-6"
              style={{
                color: "#00aa00",
                fontFamily: "'Courier New', Courier, monospace",
              }}
            >
              SHAPENEURAL ALLIANCE
            </p>

            <h1
              className="font-bold"
              style={{
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                lineHeight: 1.1,
                color: "#ffffff",
              }}
            >
              KI einsetzen.
              <br />
              Nicht nur darüber reden.
            </h1>

            <p
              className="mt-6 max-w-md"
              style={{
                fontSize: "1.125rem",
                color: "#999999",
                lineHeight: 1.7,
              }}
            >
              ShapeNeural arbeitet mit Unternehmen, Schulen und Organisationen,
              die KI nicht als Buzzword brauchen — sondern als funktionierendes
              System.
            </p>

            <a
              href="#kontakt"
              className="inline-block mt-8 font-bold uppercase text-sm tracking-wider transition-colors"
              style={{
                backgroundColor: "#00aa00",
                color: "#111111",
                padding: "1rem 2rem",
                fontFamily: "'Courier New', Courier, monospace",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#009000")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#00aa00")
              }
            >
              KONTAKT AUFNEHMEN
            </a>

            <p className="mt-4 text-sm" style={{ color: "#666666" }}>
              Keine Agentur. Kein Consulting-Template. Direkte Zusammenarbeit.
            </p>
          </div>

          {/* Right — Image */}
          <div className="mt-8 lg:mt-0">
            {/* REPLACE with hero image — see image prompt in project docs */}
            <img
              src="/placeholder.svg"
              alt="Arbeitsplatz mit warmem Licht und fokussierter Atmosphäre"
              className="w-full object-cover"
              style={{
                filter: "grayscale(20%) contrast(1.05)",
                aspectRatio: "16/9",
                minHeight: "400px",
              }}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* SECTION 2 — Warum jetzt */}
      <section
        className="py-24 px-6 md:px-12 lg:px-20"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p
              className="uppercase tracking-[0.3em] text-xs font-bold mb-4"
              style={{
                color: "#00aa00",
                fontFamily: "'Courier New', Courier, monospace",
              }}
            >
              WARUM JETZT_
            </p>

            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{
                color: "#111111",
                fontFamily: "'Courier New', Courier, monospace",
              }}
            >
              Die meisten KI-Projekte scheitern. Nicht an Technologie.
            </h2>

            <p
              className="text-base mb-12 max-w-2xl"
              style={{ color: "#555555", lineHeight: 1.7 }}
            >
              Sondern daran, dass niemand die richtige Frage gestellt hat —
              bevor die Tools kamen.
            </p>
          </motion.div>

          {/* Problem Cards */}
          {problemCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="p-6 mb-4"
              style={{
                backgroundColor: "#f8f8f8",
                borderLeft: "4px solid #00aa00",
              }}
            >
              <h3
                className="font-bold text-base uppercase tracking-wider"
                style={{
                  color: "#111111",
                  fontFamily: "'Courier New', Courier, monospace",
                }}
              >
                {card.title}
              </h3>
              <p
                className="text-sm mt-2"
                style={{ color: "#555555", lineHeight: 1.7 }}
              >
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AlliancePage;
