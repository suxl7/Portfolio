"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { stiffness: 150, damping: 20 });
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 20 });
  const [isHovering, setIsHovering] = useState(false);
  const observerRef = useRef<MutationObserver | null>(null);
  const elementsRef = useRef<Set<Element>>(new Set());

  const handlersRef = useRef<Map<Element, { enter: () => void; leave: () => void }>>(new Map());

  const attachListeners = (el: Element) => {
    if (elementsRef.current.has(el)) return;
    elementsRef.current.add(el);
    const enter = () => setIsHovering(true);
    const leave = () => setIsHovering(false);
    handlersRef.current.set(el, { enter, leave });
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
  };

  const detachListeners = (el: Element) => {
    if (!elementsRef.current.has(el)) return;
    elementsRef.current.delete(el);
    const handlers = handlersRef.current.get(el);
    if (handlers) {
      el.removeEventListener("mouseenter", handlers.enter);
      el.removeEventListener("mouseleave", handlers.leave);
      handlersRef.current.delete(el);
    }
  };

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const selector = "a, button, [role='button'], input, textarea, select, [href], .group, nav button, [data-cursor-hover], .social-link, .nav-link, .magnetic-btn";
    
    const attachToAll = () => {
      document.querySelectorAll(selector).forEach(attachListeners);
    };

    window.addEventListener("mousemove", move);
    attachToAll();

    observerRef.current = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as Element;
            if (el.matches(selector)) attachListeners(el);
            el.querySelectorAll(selector).forEach(attachListeners);
          }
        });
        mutation.removedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            detachListeners(node as Element);
            (node as Element).querySelectorAll(selector).forEach(detachListeners);
          }
        });
      });
    });

    observerRef.current.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      observerRef.current?.disconnect();
      elementsRef.current.forEach(detachListeners);
      elementsRef.current.clear();
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="cursor-dot hidden lg:block"
        style={{ left: cursorX, top: cursorY }}
        animate={{ scale: isHovering ? 1.5 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="cursor-ring hidden lg:block"
        style={{ left: ringX, top: ringY }}
        animate={{ scale: isHovering ? 1.5 : 1, borderColor: isHovering ? "#3b82f6" : "rgba(59, 130, 246, 0.6)" }}
        transition={{ duration: 0.3 }}
      />
    </>
  );
}
