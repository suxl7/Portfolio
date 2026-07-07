"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: -100, y: -100 });
  const ringRefPosition = useRef({ x: -100, y: -100 });
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const render = () => {
      const target = targetRef.current;
      const ringPosition = ringRefPosition.current;

      ringPosition.x += (target.x - ringPosition.x) * 0.18;
      ringPosition.y += (target.y - ringPosition.y) * 0.18;

      dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringPosition.x}px, ${ringPosition.y}px, 0) translate(-50%, -50%)`;
      frameRef.current = requestAnimationFrame(render);
    };

    const move = (event: MouseEvent) => {
      targetRef.current.x = event.clientX;
      targetRef.current.y = event.clientY;
    };

    const hoverIn = () => {
      dot.classList.add("cursor-dot--hover");
      ring.classList.add("cursor-ring--hover");
    };

    const hoverOut = () => {
      dot.classList.remove("cursor-dot--hover");
      ring.classList.remove("cursor-ring--hover");
    };

    const selector = "a, button, [role='button'], input, textarea, select, [href], [data-cursor-hover], .social-link, .nav-link, .magnetic-btn";

    const handleMouseOver = (event: MouseEvent) => {
      if ((event.target as Element | null)?.closest(selector)) hoverIn();
    };

    const handleMouseOut = (event: MouseEvent) => {
      if ((event.target as Element | null)?.closest(selector)) hoverOut();
    };

    document.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    frameRef.current = requestAnimationFrame(render);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden lg:block" />
      <div ref={ringRef} className="cursor-ring hidden lg:block" />
    </>
  );
}
