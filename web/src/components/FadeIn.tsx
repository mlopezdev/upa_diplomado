"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.7,
  once = true,
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-80px 0px" });

  const offsets = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 50 },
    right: { y: 0, x: -50 },
    none: { y: 0, x: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...offsets[direction] }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: React.ReactNode[];
  className?: string;
  staggerDelay?: number;
  childDelay?: number;
  direction?: FadeInProps["direction"];
}

export function Stagger({
  children,
  className,
  staggerDelay = 0.12,
  childDelay = 0,
  direction = "up",
}: StaggerProps) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <FadeIn key={i} delay={childDelay + i * staggerDelay} direction={direction}>
          {child}
        </FadeIn>
      ))}
    </div>
  );
}
