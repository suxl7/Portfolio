"use client";

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
  const frameRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

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
    const render = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.22;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.22;
      element.style.transform = `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0)`;
      frameRef.current = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      targetRef.current.x = (e.clientX - centerX) * 0.14;
      targetRef.current.y = (e.clientY - centerY) * 0.14;
    };

    const handleMouseLeave = () => {
      targetRef.current.x = 0;
      targetRef.current.y = 0;
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);
    frameRef.current = requestAnimationFrame(render);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [magnetic]);

  return (
    <button
      ref={ref}
      className={`group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] ${variants[variant]} ${className} magnetic-btn`}
      style={{
        ...style,
        boxShadow: glow
          ? `0 10px 30px -10px ${glowColors[variant]}, 0 0 0 1px rgba(255,255,255,0.1) inset`
          : "none",
      }}
      data-cursor-hover
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-3">
        {iconPosition === "left" && icon && <span>{icon}</span>}
        <span>{children}</span>
        {iconPosition === "right" && icon && (
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            {icon}
          </span>
        )}
      </span>

      <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 transition-opacity duration-200 hover:opacity-100 dark:bg-white/5" />
    </button>
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
      <span className="relative z-10 transition-transform duration-200 group-hover:scale-110">
        <Icon className="w-6 h-6" style={{ color }} />
      </span>
      <span
        className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{ background: `linear-gradient(135deg, ${color}40, ${color}60)` }}
      />
      <span
        className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 transition-transform duration-200 group-hover:scale-x-100"
        style={{ background: color }}
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
