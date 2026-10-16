import { motion } from 'framer-motion';
import type { SoftwareTool } from '@/data/portfolioData';
import { revealItem } from './Reveal';

/** Coloured initials tile in the program's brand colours, with name and level. */
export function SoftwareTile({ tool }: { tool: SoftwareTool }) {
  return (
    <motion.li variants={revealItem} className="group flex flex-col items-start gap-3" title={tool.description}>
      <span
        className="flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold tracking-tight transition-transform duration-500 ease-out-expo group-hover:-translate-y-1 sm:h-14 sm:w-14"
        style={{ backgroundColor: tool.color, color: tool.textColor }}
        aria-hidden="true"
      >
        {tool.initials}
      </span>
      <span>
        <span className="block text-[13px] font-semibold leading-tight text-ink">{tool.name}</span>
        <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-taupe">
          {tool.level}
        </span>
      </span>
    </motion.li>
  );
}
