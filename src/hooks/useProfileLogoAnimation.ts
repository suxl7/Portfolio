"use client";

import { useEffect, useState } from "react";
import { useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

const TRANSITION_ZONE = 500; // px of scroll over which the swap happens

export function useProfileLogoAnimation(): MotionValue<number> {
  const [heroBottom, setHeroBottom] = useState(0);

  useEffect(() => {
    const heroEl = document.getElementById("hero");
    if (!heroEl) return;

    const updateHeroBottom = () => {
      const rect = heroEl.getBoundingClientRect();
      setHeroBottom(rect.bottom + window.scrollY);
    };

    updateHeroBottom();

    const resizeObserver = new ResizeObserver(updateHeroBottom);
    resizeObserver.observe(heroEl);
    window.addEventListener("resize", updateHeroBottom);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeroBottom);
    };
  }, []);

  const { scrollY } = useScroll();

  const start = Math.max(heroBottom - TRANSITION_ZONE, 0);
  const end = Math.max(heroBottom, TRANSITION_ZONE);

  const rawProgress = useTransform(scrollY, [start, end], [0, 1], {
    clamp: true,
  });

  const progress = useSpring(rawProgress, {
    stiffness: 300,
    damping: 40,
    mass: 0.5,
  });

  return progress;
}