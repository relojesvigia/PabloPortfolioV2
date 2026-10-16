import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import { useMotionValue, type MotionValue } from 'framer-motion';

interface Rail {
  top: number;
  height: number;
}

function interpolate(value: number, xs: number[], ys: number[]): number {
  if (value <= xs[0]) return ys[0];
  for (let i = 1; i < xs.length; i++) {
    if (value <= xs[i]) {
      const span = xs[i] - xs[i - 1] || 1;
      return ys[i - 1] + ((value - xs[i - 1]) / span) * (ys[i] - ys[i - 1]);
    }
  }
  return ys[ys.length - 1];
}

/**
 * Keeps the sidebar progress rail in step with the labels. Every nav link
 * (`[data-nav-id]`) is paired with the page section of the same id. Scroll
 * position is mapped piecewise from "section top" to "label centre", so the
 * fill sits on a label exactly when its section is on screen, and the rail
 * only spans first label → last label. Adding a section or project to the
 * data needs no change here.
 */
export function useNavRail(
  containerRef: RefObject<HTMLElement>,
  ids: string[],
  activeId: string,
): { rail: Rail; progress: MotionValue<number> } {
  const progress = useMotionValue(0);
  const [rail, setRail] = useState<Rail>({ top: 0, height: 0 });
  const metrics = useRef<{ tops: number[]; centers: number[] }>({ tops: [], centers: [] });
  const idsKey = ids.join('|');

  const update = useCallback(() => {
    const { tops, centers } = metrics.current;
    if (centers.length < 2) return;
    const first = centers[0];
    const span = centers[centers.length - 1] - first;
    const y = interpolate(window.scrollY, tops, centers);
    progress.set(span > 0 ? Math.min(1, Math.max(0, (y - first) / span)) : 0);
  }, [progress]);

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const base = container.getBoundingClientRect().top;
    const tops: number[] = [];
    const centers: number[] = [];

    for (const id of idsKey.split('|')) {
      const link = container.querySelector<HTMLElement>(`[data-nav-id="${id}"]`);
      const section = document.getElementById(id);
      if (!link || !section) continue;
      const linkRect = link.getBoundingClientRect();
      const top = section.getBoundingClientRect().top + window.scrollY;
      if (tops.length && top < tops[tops.length - 1]) continue;
      tops.push(top);
      centers.push(linkRect.top - base + linkRect.height / 2);
    }

    metrics.current = { tops, centers };
    if (centers.length >= 2) {
      const next = { top: centers[0], height: centers[centers.length - 1] - centers[0] };
      setRail((prev) =>
        Math.abs(prev.top - next.top) < 0.5 && Math.abs(prev.height - next.height) < 0.5 ? prev : next,
      );
    }
    update();
  }, [containerRef, idsKey, update]);

  useEffect(() => {
    let frame = 0;
    const schedule = () => {
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0;
          update();
        });
      }
    };

    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', measure);

    // Labels animate in size and the page grows as images load: re-measure on both.
    const observer = new ResizeObserver(measure);
    if (containerRef.current) observer.observe(containerRef.current);
    observer.observe(document.body);

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', measure);
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [containerRef, measure, update]);

  // Settle after the active label finishes its size/weight animation.
  useEffect(() => {
    const timer = window.setTimeout(measure, 450);
    return () => window.clearTimeout(timer);
  }, [activeId, measure]);

  return { rail, progress };
}
