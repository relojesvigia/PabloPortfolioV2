import { motion } from 'framer-motion';
import { sectionCopy, skills, software } from '@/data/portfolioData';
import { ContactLinks } from '@/components/ui/ContactLinks';
import { revealContainer, revealItem } from '@/components/ui/Reveal';
import { SkillBar } from '@/components/ui/SkillBar';
import { SoftwareTile } from '@/components/ui/SoftwareTile';
import { CVAbout } from './About';
import { CVTimeline, educationEntries, experienceEntries } from './Experience';

/**
 * The whole CV — about, strengths, software, experience, education, contact.
 * Shown in the side panel (one column) and on the full page (two columns).
 * Everything fades in when it opens, so it is all visible for printing.
 */
export function CVContent({ layout }: { layout: 'panel' | 'page' }) {
  const page = layout === 'page';

  const strengths = (
    <motion.section variants={revealContainer}>
      <motion.h3 variants={revealItem} className="eyebrow">
        Core competencies
      </motion.h3>
      <motion.p variants={revealItem} className="mt-3 max-w-xl text-[13px] leading-relaxed text-taupe">
        {sectionCopy.cv.intro}
      </motion.p>
      <motion.ul variants={revealContainer} className="mt-6 space-y-5">
        {skills.map((skill) => (
          <SkillBar key={skill.number} skill={skill} playOnMount />
        ))}
      </motion.ul>
    </motion.section>
  );

  const tools = (
    <motion.section variants={revealContainer} className="print:break-inside-avoid">
      <motion.h3 variants={revealItem} className="eyebrow">
        Software
      </motion.h3>
      <motion.ul variants={revealContainer} className="mt-6 grid grid-cols-3 gap-x-6 gap-y-6 sm:grid-cols-4">
        {software.map((tool) => (
          <SoftwareTile key={tool.id} tool={tool} />
        ))}
      </motion.ul>
    </motion.section>
  );

  return (
    <motion.article
      initial="hidden"
      animate="visible"
      variants={revealContainer}
      aria-labelledby="cv-title"
      className="space-y-14"
    >
      <CVAbout />

      <div className={page ? 'grid gap-14 lg:grid-cols-2 lg:gap-20' : 'space-y-14'}>
        <div className="space-y-14">
          {strengths}
          {tools}
        </div>
        <div className="space-y-14">
          <CVTimeline heading="Professional experience" entries={experienceEntries} />
          <CVTimeline heading="Education" entries={educationEntries} />
        </div>
      </div>

      <motion.div variants={revealItem} className="bg-beige px-7 py-7 sm:px-10 print:break-inside-avoid">
        <ContactLinks align="spread" />
      </motion.div>
    </motion.article>
  );
}
