import AutoforgeWizard from "@/components/AutoforgeWizard";

const ForgePage = () => {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "#050505",
        fontFamily: "'IBM Plex Mono', 'Courier New', Courier, monospace",
      }}
    >
      <AutoforgeWizard />
    </div>
  );
};

export default ForgePage;
