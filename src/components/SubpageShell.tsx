import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface SubpageShellProps {
  children: React.ReactNode;
  projectLink?: { label: string; to: string };
  footerMeta?: string;
}

const SubpageShell = ({ children, projectLink, footerMeta }: SubpageShellProps) => {
  return (
    <div
      className="min-h-screen relative"
      style={{
        background: "#050505",
        fontFamily: "'Courier New', Courier, monospace",
      }}
    >
      {/* Scanline overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.15) 50%)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* Sticky nav */}
      <nav
        className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 border-b"
        style={{
          backgroundColor: "#050505ee",
          borderColor: "#222",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs tracking-[0.3em] hover:opacity-80 transition-opacity"
            style={{ color: "#0f0" }}
          >
            <ArrowLeft size={14} />
            MAINFRAME
          </Link>
          {projectLink && (
            <>
              <span style={{ color: "#333" }}>//</span>
              <Link
                to={projectLink.to}
                className="text-xs tracking-[0.2em] hover:opacity-80 transition-opacity"
                style={{ color: "#666" }}
              >
                ← {projectLink.label}
              </Link>
            </>
          )}
        </div>
        <span className="text-xs tracking-[0.3em]" style={{ color: "#333" }}>
          SN//LAB
        </span>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">{children}</main>

      {/* Footer */}
      <footer
        className="max-w-4xl mx-auto px-6 py-8 border-t"
        style={{ borderColor: "#222" }}
      >
        <div className="flex items-center justify-between text-xs tracking-widest" style={{ color: "#444" }}>
          <Link
            to="/"
            className="hover:opacity-80 transition-opacity"
            style={{ color: "#0f0" }}
          >
            {">"} BACK_TO_MAINFRAME
          </Link>
          <span>{footerMeta || "TRANSMISSION_END"}</span>
        </div>
      </footer>
    </div>
  );
};

export default SubpageShell;
