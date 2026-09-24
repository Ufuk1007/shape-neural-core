import darkStage from "@/assets/studio/device-stage-dark.webp";
import lightStage from "@/assets/studio/device-stage-light.webp";
import "@/studio-device-stage.css";

type StudioDeviceStageProps = {
  primarySrc: string;
  secondarySrc?: string;
  alt: string;
  host: string;
  variant?: "dark" | "light";
  compact?: boolean;
};

export default function StudioDeviceStage({
  primarySrc,
  secondarySrc,
  alt,
  host,
  variant = "dark",
  compact = false,
}: StudioDeviceStageProps) {
  const supportingSrc = secondarySrc ?? primarySrc;

  return (
    <div className={`sn-device-stage sn-device-stage--${variant} ${compact ? "sn-device-stage--compact" : ""}`}>
      <img
        className="sn-device-stage__backdrop"
        src={variant === "dark" ? darkStage : lightStage}
        alt=""
        aria-hidden="true"
      />
      <div className="sn-device-stage__veil" />

      <div className="sn-device-stage__screen sn-device-stage__screen--desktop">
        <div className="sn-device-stage__browser-bar"><i /><i /><i /><span>{host}</span></div>
        <img src={primarySrc} alt={alt} />
      </div>

      <div className="sn-device-stage__screen sn-device-stage__screen--tablet" aria-hidden="true">
        <div className="sn-device-stage__browser-bar"><i /><i /><i /></div>
        <img src={supportingSrc} alt="" />
      </div>

      <div className="sn-device-stage__screen sn-device-stage__screen--phone" aria-hidden="true">
        <span />
        <img src={primarySrc} alt="" />
      </div>

      <p className="sn-device-stage__label"><span>CURRENT UI</span> / PRODUCT SURFACE</p>
    </div>
  );
}
