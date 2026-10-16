import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { Annotation } from '@/data/portfolioData';

interface AnnotationOverlayProps {
  /** Data-driven annotations (dot + leader line + label), from portfolioData. */
  items?: Annotation[];
  /**
   * Free-form overlay elements — arrows, sketch marks, hand-drawn SVGs.
   * Position them yourself with absolute classes, e.g.
   *   <img src={arrow} alt="" className="absolute left-[30%] top-[20%] w-24 rotate-12" />
   */
  children?: ReactNode;
}

const clamp = (value: number) => Math.min(98, Math.max(2, value));

/** Where the label sits. By default leader lines point toward the image centre. */
function labelPoint(a: Annotation) {
  const dx = a.dx ?? (a.x < 50 ? 12 : -12);
  const dy = a.dy ?? -10;
  return { x: clamp(a.x + dx), y: clamp(a.y + dy) };
}

/**
 * Absolutely positioned layer that sits on top of an ImageSlot.
 * Coordinates are percentages of the image, so annotations stay put at any size.
 */
export function AnnotationOverlay({ items = [], children }: AnnotationOverlayProps) {
  if (items.length === 0 && !children) return null;

  return (
    <div className="absolute inset-0">
      {items.length > 0 && (
        <svg
          className="absolute inset-0 h-full w-full overflow-visible"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {items.map((a, i) => {
            const end = labelPoint(a);
            return (
              <motion.line
                key={`line-${i}`}
                x1={a.x}
                y1={a.y}
                x2={end.x}
                y2={end.y}
                className="stroke-espresso"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
              />
            );
          })}
        </svg>
      )}

      {items.map((a, i) => {
        const end = labelPoint(a);
        const toLeft = end.x < a.x;
        return (
          <motion.div
            key={`note-${i}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
          >
            <span
              className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-espresso ring-4 ring-canvas/60"
              style={{ left: `${a.x}%`, top: `${a.y}%` }}
              aria-hidden="true"
            />
            <span
              className={`absolute -translate-y-1/2 whitespace-nowrap ${toLeft ? '-translate-x-full pr-2 text-right' : 'pl-2'}`}
              style={{ left: `${end.x}%`, top: `${end.y}%` }}
            >
              <span className="block font-hand text-base leading-none text-ink md:text-lg">{a.label}</span>
              {a.note && (
                <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.14em] text-espresso md:text-[10px]">
                  {a.note}
                </span>
              )}
            </span>
          </motion.div>
        );
      })}

      {children}
    </div>
  );
}
