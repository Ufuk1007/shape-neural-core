interface BindruneLogoProps {
  size?: number;
  onDark?: boolean;
  showRed?: boolean;
  className?: string;
}

const BindruneLogo = ({ size = 120, onDark = true, showRed = false, className }: BindruneLogoProps) => {
  const stroke = onDark ? "#00FF00" : "#0a0a0a";
  const bg = onDark ? "#0a0a0a" : "#f0f0f0";
  const cross = onDark ? "#00FF00" : "#0a0a0a";

  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 100 120"
      fill="none"
      className={className}
      style={{ display: "block" }}
    >
      <rect width="100" height="120" fill={bg} />
      {/* Registration marks */}
      {[[8, 8], [92, 8], [8, 112], [92, 112]].map(([cx, cy], i) => (
        <g key={i}>
          <line x1={cx - 6} y1={cy} x2={cx + 6} y2={cy} stroke={cross} strokeWidth="0.8" opacity="0.35" />
          <line x1={cx} y1={cy - 6} x2={cx} y2={cy + 6} stroke={cross} strokeWidth="0.8" opacity="0.35" />
        </g>
      ))}
      {/* S vertical */}
      <line x1="22" y1="12" x2="22" y2="108" stroke={stroke} strokeWidth="5" strokeLinecap="round" />
      {/* N vertical */}
      <line x1="78" y1="12" x2="78" y2="108" stroke={stroke} strokeWidth="5" strokeLinecap="round" />
      {/* N diagonals */}
      <line x1="78" y1="12" x2="22" y2="60" stroke={stroke} strokeWidth="5" strokeLinecap="round" />
      <line x1="78" y1="60" x2="22" y2="108" stroke={stroke} strokeWidth="5" strokeLinecap="round" />
      {/* Nauthiz (red layer) */}
      {showRed && (
        <>
          <line x1="22" y1="30" x2="78" y2="90" stroke="#FF0055" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="50" cy="60" r="5" fill="#FF0055" />
        </>
      )}
    </svg>
  );
};

export default BindruneLogo;
