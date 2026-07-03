"use client";

import { motion, HTMLMotionProps, useMotionValue, MotionProps } from "framer-motion";
import { ReactNode, isValidElement, cloneElement, Children, ReactElement } from "react";

interface AnimatedSectionProps extends Omit<HTMLMotionProps<"section">, "children"> {
  children: ReactNode;
  className?: string;
  variant?: "fade" | "slide-up" | "slide-left" | "slide-right" | "scale" | "stagger";
  delay?: number;
  staggerDelay?: number;
}

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const variants = {
  fade: { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6 } },
  "slide-up": { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease } },
  "slide-left": { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.7, ease } },
  "slide-right": { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.7, ease } },
  scale: { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.6, ease } },
  stagger: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease } },
};

export function AnimatedSection({
  children,
  className = "",
  variant = "slide-up",
  delay = 0,
  staggerDelay = 0.1,
  ...props
}: AnimatedSectionProps) {
  const v = variants[variant];
  const isStagger = variant === "stagger";

  return (
    <motion.section
      className={className}
      initial={isStagger ? { opacity: 0 } : v.initial}
      whileInView={isStagger ? { opacity: 1 } : v.animate}
      viewport={{ once: true, margin: "-100px" }}
      transition={isStagger ? { duration: 0.5 } : { ...v.transition, delay }}
      {...props}
    >
      {isStagger
        ? Children.map(children, (child, index) =>
            isValidElement(child) ? cloneElement(child as ReactElement<MotionProps>, {
              key: (child.key as string) || String(index),
              initial: v.initial,
              whileInView: v.animate,
              viewport: { once: true },
              transition: { ...v.transition, delay: delay + index * staggerDelay },
            // amazonq-ignore-next-line
            }) : child
          )
        : children}
    </motion.section>
  );
}

export function AnimatedDiv({
  children,
  className = "",
  variant = "slide-up",
  delay = 0,
  staggerDelay = 0.1,
  ...props
}: Omit<AnimatedSectionProps, "as" | "ref"> & { as?: React.ElementType; ref?: React.Ref<HTMLDivElement> }) {
  const v = variants[variant];
  const isStagger = variant === "stagger";

  return (
    <motion.div
      className={className}
      initial={isStagger ? { opacity: 0 } : v.initial}
      whileInView={isStagger ? { opacity: 1 } : v.animate}
      viewport={{ once: true, margin: "-100px" }}
      transition={isStagger ? { duration: 0.5 } : { ...v.transition, delay }}
      {...props}
    >
      {isStagger
        ? Children.map(children, (child, index) =>
            isValidElement(child) ? cloneElement(child as ReactElement<MotionProps>, {
              key: (child.key as string) || String(index),
              initial: v.initial,
              whileInView: v.animate,
              viewport: { once: true },
              transition: { ...v.transition, delay: delay + index * staggerDelay },
            }) : child
          )
        : children}
    </motion.div>
  );
}

export function RevealText({ children, className = "", delay = 0 }: { children: string; className?: string; delay?: number }) {
  const words = children.split(" ");
  return (
    <span className={`inline-flex flex-wrap gap-x-1 ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: "100%" }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: delay + i * 0.05, ease }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export function MagneticHover({ children, className = "", strength = 0.3 }: { children: ReactNode; className?: string; strength?: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <motion.div
      className={className}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x, y }}
    >
      {children}
    </motion.div>
  );
}
