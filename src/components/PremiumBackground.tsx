"use client";

export function PremiumBackground() {
  return (
    <div className="premium-background" aria-hidden="true">
      <div className="premium-background__mesh" />
      <div className="premium-background__grid" />
      <div className="premium-background__noise" />
      <div className="premium-background__glow premium-background__glow--one" />
      <div className="premium-background__glow premium-background__glow--two" />
      <div className="premium-background__glow premium-background__glow--three" />
      <div className="premium-background__glow premium-background__glow--four" />
    </div>
  );
}
