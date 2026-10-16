import { motion, useReducedMotion, useSpring, type MotionValue } from 'framer-motion';

interface ProgressBarProps {
  /** 0–1 page progress from useScrollProgress. */
  progress: MotionValue<number>;
  className?: string;
}

/** Vertical bar that fills top → bottom as the page scrolls. */
export function ProgressBar({ progress, className = '' }: ProgressBarProps) {
  const reduceMotion = useReducedMotion();
  const smoothed = useSpring(progress, { stiffness: 260, damping: 40, restDelta: 0.0005 });

  return (
    <div className={`relative w-[2px] shrink-0 ${className}`} aria-hidden="true">
      <div className="absolute inset-0 bg-sand" />
      <motion.div
        className="absolute inset-0 origin-top bg-espresso"
        style={{ scaleY: reduceMotion ? progress : smoothed }}
      />
    </div>
  );
}
