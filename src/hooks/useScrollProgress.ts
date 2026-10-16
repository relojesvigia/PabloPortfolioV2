import { useEffect } from 'react';
import { useMotionValue, type MotionValue } from 'framer-motion';

/**
 * Page scroll progress from 0 (top) to 1 (bottom), as a MotionValue so
 * consumers animate without re-rendering React on every scroll frame.
 *
 * progress = scrollY / (scrollHeight − viewport height)
 * (the viewport is subtracted so the bar actually reaches 100% at the end).
 */
export function useScrollProgress(): MotionValue<number> {
  const progress = useMotionValue(0);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const value = max > 0 ? window.scrollY / max : 0;
      progress.set(Math.min(1, Math.max(0, value)));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    // Page height changes as images load — keep the ratio honest.
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      resizeObserver.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [progress]);

  return progress;
}
