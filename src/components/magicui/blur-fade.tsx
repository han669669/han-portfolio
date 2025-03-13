"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: number;
  blur?: string;
}
const BlurFade = ({
  children,
  className,
  variant,
  duration = 0.3,
  delay = 0,
  yOffset = 4,
  inView = false,
  inViewMargin = -50,
  blur = "3px",
}: BlurFadeProps) => {
  const ref = useRef(null);
  const inViewResult = useInView(ref, { once: true, margin: `${inViewMargin}px` });
  const isInView = !inView || inViewResult;
  const defaultVariants: Variants = {
    hidden: { opacity: 0, filter: `blur(${blur})` },
    visible: { opacity: 1, filter: `blur(0px)` },
  };
  const combinedVariants = variant || defaultVariants;
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={combinedVariants}
      transition={{
        delay: 0.04 + delay,
        duration,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default BlurFade;
