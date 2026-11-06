import { useEffect, useRef } from 'react';
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import type { Skill } from '@/data/portfolioData';
import { EASE, revealItem } from './Reveal';

/**
 * Skill row with a percentage bar. One motion value drives both the bar width
 * and the counter, so they stay in sync as it fills on scroll into view.
 */
export function SkillBar({ skill, playOnMount = false }: { skill: Skill; playOnMount?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const seen = useInView(trackRef, { once: true, margin: '0px 0px -10% 0px' });
  // In the CV panel/page the bars fill as soon as it opens (so a printed PDF is never empty).
  const inView = playOnMount || seen;
  const reduceMotion = useReducedMotion();

  const value = useMotionValue(0);
  const width = useTransform(value, (v) => `${v}%`);
  const counter = useTransform(value, (v) => `${Math.round(v)}%`);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      value.set(skill.level);
      return;
    }
    const controls = animate(value, skill.level, { duration: 1.4, ease: EASE, delay: 0.2 });
    return () => controls.stop();
  }, [inView, reduceMotion, skill.level, value]);

  return (
    <motion.li variants={revealItem}>
      <div className="flex items-baseline justify-between gap-6">
        <h4 className="text-[15px] font-semibold leading-snug text-ink">
          <span className="mr-3 text-xs font-medium tabular-nums text-taupe">{skill.number}</span>
          {skill.title}
        </h4>
        <motion.span className="text-xs font-semibold tabular-nums text-espresso" aria-hidden="true">
          {counter}
        </motion.span>
      </div>

      <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-taupe">{skill.description}</p>

      <div
        ref={trackRef}
        className="mt-4 h-[3px] w-full bg-sand"
        role="progressbar"
        aria-label={skill.title}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={skill.level}
      >
        <motion.div className="h-full bg-espresso" style={{ width }} />
      </div>
    </motion.li>
  );
}
