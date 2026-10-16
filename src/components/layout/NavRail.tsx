import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useSpring } from 'framer-motion';
import { navIds } from '@/data/portfolioData';
import { useNavRail } from '@/hooks/useNavRail';

/**
 * Wraps the section list (children) with a progress rail that runs from the
 * first label to the last one and fills in step with them. Links must carry
 * `data-nav-id`. Used by the sidebar and the drawer.
 */
export function NavRail({ activeId, children }: { activeId: string; children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { rail, progress } = useNavRail(containerRef, navIds, activeId);
  const reduceMotion = useReducedMotion();
  const smoothed = useSpring(progress, { stiffness: 260, damping: 40, restDelta: 0.0005 });

  return (
    <div ref={containerRef} className="relative pl-5">
      <div
        className="absolute left-0 w-[2px]"
        style={{ top: rail.top, height: rail.height }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-sand" />
        <motion.div
          className="absolute inset-0 origin-top bg-espresso"
          style={{ scaleY: reduceMotion ? progress : smoothed }}
        />
      </div>
      {children}
    </div>
  );
}
