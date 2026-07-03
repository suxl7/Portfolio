"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { ArrowRight, Mail } from "lucide-react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  magnetic?: boolean;
  glow?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  style?: React.CSSProperties;
}

export function MagneticButton({
  children,
  className = "",
  variant = "primary",
  icon,
  iconPosition = "right",
  magnetic = true,
  glow = true,
  style,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const variants = {
    primary: "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200",
    secondary: "bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-500 dark:hover:bg-blue-400",
    outline: "border-2 border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800",
    ghost: "text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800",
  };

  const glowColors = {
    primary: "rgba(0,0,0,0.4)",
    secondary: "rgba(59, 130, 246, 0.4)",
    outline: "rgba(0,0,0,0.2)",
    ghost: "transparent",
  };

  useEffect(() => {
    if (!magnetic || !ref.current) return;

    const element = ref.current;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * 0.3);
      y.set((e.clientY - centerY) * 0.3);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [x, y, magnetic]);

  const rotateX = useTransform(y, [-50, 50], ["5deg", "-5deg"]);
  const rotateY = useTransform(x, [-50, 50], ["-5deg", "5deg"]);

  return (
    <motion.button
      ref={ref}
      className={`relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-base transition-all ${variants[variant]} ${className} magnetic-btn`}
      style={{
        ...style,
        x,
        y,
        rotateX,
        rotateY,
        transformPerspective: 500,
        transformStyle: "preserve-3d",
        boxShadow: glow
          ? `0 10px 30px -10px ${glowColors[variant]}, 0 0 0 1px rgba(255,255,255,0.1) inset`
          : "none",
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      data-cursor-hover
      {...props}
    >
      <span style={{ transform: "translateZ(10px)" }}>
        {iconPosition === "left" && icon && <motion.span style={{ transform: "translateZ(10px)" }}>{icon}</motion.span>}
        <span style={{ transform: "translateZ(10px)" }}>{children}</span>
        {iconPosition === "right" && icon && (
          <motion.span
            style={{ transform: "translateZ(10px)" }}
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {icon}
          </motion.span>
        )}
      </span>

      <motion.div
        className="absolute inset-0 rounded-xl bg-white/10 dark:bg-white/5 opacity-0"
        style={{ transform: "translateZ(-10px)" }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );
}

export function SocialButton({ href, icon: Icon, label, color }: { href: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; label: string; color: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden social-link"
      style={{ background: `linear-gradient(135deg, ${color}20, ${color}40)`, border: `1px solid ${color}30` }}
      aria-label={label}
      data-cursor-hover
    >
      <motion.span
        className="relative z-10"
        whileHover={{ scale: 1.2, rotateZ: 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <Icon className="w-6 h-6" style={{ color }} />
      </motion.span>
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0"
        style={{ background: `linear-gradient(135deg, ${color}40, ${color}60)` }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{ background: color }}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </a>
  );
}

export function CTAButtonGroup() {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-4">
      <MagneticButton
        variant="primary"
        icon={<ArrowRight className="w-5 h-5" />}
        className="w-full sm:w-auto"
      >
        View Projects
      </MagneticButton>
      <MagneticButton
        variant="outline"
        icon={<Mail className="w-5 h-5" />}
        iconPosition="left"
        className="w-full sm:w-auto"
      >
        Get In Touch
      </MagneticButton>
    </div>
  );
}