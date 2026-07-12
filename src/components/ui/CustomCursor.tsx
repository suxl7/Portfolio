// "use client";

// import { useEffect, useRef } from "react";

// export function CustomCursor() {
//   const dotRef = useRef<HTMLDivElement>(null);
//   const ringRef = useRef<HTMLDivElement>(null);
//   const targetRef = useRef({ x: -100, y: -100 });
//   const ringRefPosition = useRef({ x: -100, y: -100 });
//   const frameRef = useRef<number | null>(null);

//   useEffect(() => {
//     if (!window.matchMedia("(pointer: fine)").matches) return;

//     const dot = dotRef.current;
//     const ring = ringRef.current;
//     if (!dot || !ring) return;

//     const render = () => {
//       const target = targetRef.current;
//       const ringPosition = ringRefPosition.current;

//       ringPosition.x += (target.x - ringPosition.x) * 0.18;
//       ringPosition.y += (target.y - ringPosition.y) * 0.18;

//       dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
//       ring.style.transform = `translate3d(${ringPosition.x}px, ${ringPosition.y}px, 0) translate(-50%, -50%)`;
//       frameRef.current = requestAnimationFrame(render);
//     };

//     const move = (event: MouseEvent) => {
//       targetRef.current.x = event.clientX;
//       targetRef.current.y = event.clientY;
//     };

//     const hoverIn = () => {
//       dot.classList.add("cursor-dot--hover");
//       ring.classList.add("cursor-ring--hover");
//     };

//     const hoverOut = () => {
//       dot.classList.remove("cursor-dot--hover");
//       ring.classList.remove("cursor-ring--hover");
//     };

//     const selector = "a, button, [role='button'], input, textarea, select, [href], [data-cursor-hover], .social-link, .nav-link, .magnetic-btn";

//     const handleMouseOver = (event: MouseEvent) => {
//       if ((event.target as Element | null)?.closest(selector)) hoverIn();
//     };

//     const handleMouseOut = (event: MouseEvent) => {
//       if ((event.target as Element | null)?.closest(selector)) hoverOut();
//     };

//     document.addEventListener("mousemove", move, { passive: true });
//     document.addEventListener("mouseover", handleMouseOver);
//     document.addEventListener("mouseout", handleMouseOut);
//     frameRef.current = requestAnimationFrame(render);

//     return () => {
//       document.removeEventListener("mousemove", move);
//       document.removeEventListener("mouseover", handleMouseOver);
//       document.removeEventListener("mouseout", handleMouseOut);
//       if (frameRef.current) cancelAnimationFrame(frameRef.current);
//     };
//   }, []);

//   return (
//     <>
//       <div ref={dotRef} className="cursor-dot hidden lg:block" />
//       <div ref={ringRef} className="cursor-ring hidden lg:block" />
//     </>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Raw mouse position — the dot follows this directly
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Ring lags behind with spring physics for that premium "trailing" feel
  const ringX = useSpring(mouseX, { damping: 25, stiffness: 300, mass: 0.5 });
  const ringY = useSpring(mouseY, { damping: 25, stiffness: 300, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const selector =
      "a, button, [role='button'], input, textarea, select, [href], [data-cursor-hover], .social-link, .nav-link, .magnetic-btn";

    const move = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (event: MouseEvent) => {
      if ((event.target as Element | null)?.closest(selector)) setIsHovering(true);
    };

    const handleMouseOut = (event: MouseEvent) => {
      if ((event.target as Element | null)?.closest(selector)) setIsHovering(false);
    };

    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <>
      {/* Dot — snaps directly to the mouse, scales down on hover */}
      <motion.div
        className="hidden lg:block fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-white mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 8 : 8,
          height: isHovering ? 8 : 8,
          scale: isHovering ? 0.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />

      {/* Ring — trails behind with spring easing, expands on hover */}
      <motion.div
        className="hidden lg:block fixed top-0 left-0 z-[9999] pointer-events-none rounded-full border border-white mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 64 : 40,
          height: isHovering ? 64 : 40,
          opacity: isVisible ? (isHovering ? 0.6 : 1) : 0,
          borderWidth: isHovering ? 1.5 : 1,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </>
  );
}