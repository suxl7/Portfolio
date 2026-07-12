"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";

interface EyeFollowButtonProps {
  text?: string;
  href?: string;
  buttonColor?: string;
  textColor?: string;
  eyeColor?: string;
  pupilColor?: string;
  eyeCount?: "one" | "two";
  eyeSize?: number;
  pupilSize?: number;
  eyeGap?: number;
  range?: number;
  speed?: number;
  blinking?: boolean;
  blinkInterval?: number;
  radius?: string;
  padding?: string;
}

export default function EyeFollowButton({
  text = "Get in touch",
  href,
  buttonColor = "rgb(0, 0, 0)",
  textColor = "rgb(255, 255, 255)",
  eyeColor = "rgb(255, 255, 255)",
  pupilColor = "rgb(0, 0, 0)",
  eyeCount = "two",
  eyeSize = 40,
  pupilSize = 12,
  eyeGap = 4,
  range = 90,
  speed = 100,
  blinking = false,
  blinkInterval = 2000,
  radius = "30px",
  padding = "6px 6px 6px 20px",
}: EyeFollowButtonProps) {
  const eyeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [pupilOffsets, setPupilOffsets] = useState<{ x: number; y: number }[]>([]);
  const [isBlinking, setIsBlinking] = useState(false);

  const eyes = eyeCount === "one" ? [0] : [0, 1];

  const updatePupils = useCallback(
    (clientX: number, clientY: number) => {
      const offsets = eyes.map((i) => {
        const el = eyeRefs.current[i];
        if (!el) return { x: 0, y: 0 };
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = clientX - cx;
        const dy = clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const maxTravel = ((eyeSize - pupilSize) / 2) * (range / 100);
        const travel = Math.min(dist, maxTravel);
        return { x: (dx / dist) * travel, y: (dy / dist) * travel };
      });
      setPupilOffsets(offsets);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [eyeSize, pupilSize, range]
  );

  useEffect(() => {
    const handleMove = (e: PointerEvent) => updatePupils(e.clientX, e.clientY);
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [updatePupils]);

  useEffect(() => {
    if (!blinking) return;
    const id = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 120);
    }, blinkInterval);
    return () => clearInterval(id);
  }, [blinking, blinkInterval]);

  const Tag = href ? "a" : "button";

  return (
    <Tag
      {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        border: "none",
        cursor: "pointer",
        textDecoration: "none",
        backgroundColor: buttonColor,
        borderRadius: radius,
        padding,
        boxShadow:
          "0.4px 0.4px 0.56px -0.31px rgba(0,0,0,0.07), 1.2px 1.2px 1.7px -0.63px rgba(0,0,0,0.08), 3.2px 3.2px 4.5px -0.94px rgba(0,0,0,0.1), 10px 10px 14.1px -1.25px rgba(0,0,0,0.19)",
        fontFamily: '"Manrope", ui-sans-serif, system-ui, -apple-system, sans-serif',
      }}
    >
      <span
        style={{
          color: textColor,
          fontWeight: 700,
          fontSize: "16px",
          letterSpacing: "-0.02em",
          lineHeight: "1.4em",
          whiteSpace: "pre",
        }}
      >
        {text}
      </span>

      <span style={{ display: "flex", gap: `${eyeGap}px` }}>
        {eyes.map((i) => (
          <span
            key={i}
            ref={(el) => { eyeRefs.current[i] = el; }}
            style={{
              position: "relative",
              width: `${eyeSize}px`,
              height: isBlinking ? "2px" : `${eyeSize}px`,
              borderRadius: "50%",
              backgroundColor: eyeColor,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "height 0.1s ease",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                position: "absolute",
                width: `${pupilSize}px`,
                height: `${pupilSize}px`,
                borderRadius: "50%",
                backgroundColor: pupilColor,
                transform: `translate(${pupilOffsets[i]?.x || 0}px, ${pupilOffsets[i]?.y || 0}px)`,
                transition: `transform ${speed}ms ease-out`,
                opacity: isBlinking ? 0 : 1,
              }}
            />
          </span>
        ))}
      </span>
    </Tag>
  );
}
