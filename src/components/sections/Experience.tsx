import { motion } from 'framer-motion';
import { education, experience } from '@/data/portfolioData';
import { revealContainer, revealItem } from '@/components/ui/Reveal';

interface TimelineEntry {
  key: string;
  period: string;
  title: string;
  organisation: string;
  location: string;
  description: string;
}

export const experienceEntries: TimelineEntry[] = experience.map((item) => ({
  key: `${item.role}-${item.period}`,
  period: item.period,
  title: item.role,
  organisation: item.company,
  location: item.location,
  description: item.description,
}));

export const educationEntries: TimelineEntry[] = education.map((item) => ({
  key: `${item.institution}-${item.period}`,
  period: item.period,
  title: item.degree,
  organisation: item.institution,
  location: item.location,
  description: item.description,
}));

/** A CV timeline (experience or education): period on the left, details on the right. */
export function CVTimeline({ heading, entries }: { heading: string; entries: TimelineEntry[] }) {
  return (
    <motion.section variants={revealContainer}>
      <motion.h3 variants={revealItem} className="eyebrow">
        {heading}
      </motion.h3>
      <motion.ol variants={revealContainer} className="mt-6 space-y-7">
        {entries.map((entry) => (
          <motion.li
            variants={revealItem}
            key={entry.key}
            className="grid gap-1.5 sm:grid-cols-[8.5rem_1fr] sm:gap-6 print:break-inside-avoid"
          >
            <p className="pt-0.5 text-xs font-medium tabular-nums text-taupe">{entry.period}</p>
            <div>
              <h4 className="text-[15px] font-semibold leading-snug text-ink">{entry.title}</h4>
              <p className="mt-0.5 text-[13px] text-espresso">
                {entry.organisation}
                <span className="text-taupe"> · {entry.location}</span>
              </p>
              <p className="mt-2 text-[13px] leading-[1.7] text-espresso">{entry.description}</p>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </motion.section>
  );
}
