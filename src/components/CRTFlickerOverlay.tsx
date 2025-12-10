const CRTFlickerOverlay = () => {
  return (
    <div 
      className="pointer-events-none fixed inset-0 z-50 animate-flicker"
      style={{ background: 'rgba(18, 16, 16, 0.1)' }}
      aria-hidden="true"
    />
  );
};

export default CRTFlickerOverlay;
