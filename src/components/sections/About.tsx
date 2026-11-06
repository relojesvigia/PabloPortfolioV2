import { motion } from 'framer-motion';
import { profile, projects, sectionCopy, SECTION_IDS } from '@/data/portfolioData';
import { CVButton } from '@/components/layout/CVOverlay';
import { Highlight } from '@/components/ui/Highlight';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { Reveal, RevealItem, revealContainer, revealItem } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';

/** Small 2×2 preview of the projects (opening slide, right side). Each tile jumps to its project. */
function ProjectPeek() {
  return (
    <Reveal as="ul" aria-label="Projects preview" className="grid grid-cols-2 gap-x-5 gap-y-6">
      {projects.map((project) => (
        <RevealItem as="li" key={project.id}>
          <a href={`#${project.id}`} className="group block">
            <ImageSlot
              image={project.images.card}
              aspect="aspect-[4/5]"
              showCaption={false}
              frameClassName="overflow-hidden"
              mediaClassName="transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.04]"
            />
            <p className="mt-2.5 flex items-baseline gap-2 text-[11px] leading-snug">
              <span className="font-semibold tabular-nums text-taupe">{project.number}</span>
              <span className="font-medium text-ink">{project.shortTitle}</span>
            </p>
          </a>
        </RevealItem>
      ))}
    </Reveal>
  );
}

/**
 * Opening slide: name, title, statement and focus areas — the main thing on
 * screen — with a small preview of the four projects on the right (screens 1280px+).
 */
export function About() {
  const [firstName, ...rest] = profile.name.split(' ');

  return (
    <section
      id={SECTION_IDS.about}
      aria-label="About"
      className="slide relative grid items-center gap-12 px-gutter xl:grid-cols-[minmax(0,1fr)_14rem] xl:gap-14 2xl:grid-cols-[minmax(0,1fr)_19rem] 2xl:gap-20"
    >
      <div>
        <Reveal className="max-w-5xl">
          <RevealItem>
            <SectionLabel>{sectionCopy.about.label}</SectionLabel>
          </RevealItem>

          <RevealItem
            as="h1"
            className="text-[clamp(3rem,min(10vw,13svh),9rem)] font-light leading-[0.9] tracking-[-0.045em] text-ink"
          >
            {firstName}
            <br />
            <span className="font-semibold">{rest.join(' ')}</span>
          </RevealItem>

          <RevealItem as="p" className="mt-6 text-[11px] font-semibold uppercase tracking-label text-taupe">
            {profile.title} · {profile.location}
          </RevealItem>

          <RevealItem
            as="p"
            className="mt-6 max-w-3xl text-[clamp(1.2rem,min(2.4vw,3.6svh),2.1rem)] font-light leading-[1.35] tracking-[-0.01em] text-ink"
          >
            <Highlight text={profile.statement} terms={profile.statementHighlights} className="font-medium text-ink" />
          </RevealItem>
        </Reveal>

        <Reveal as="ul" className="mt-8 grid max-w-5xl gap-8 sm:grid-cols-3 sm:gap-12">
          {profile.pillars.map((pillar) => (
            <RevealItem as="li" key={pillar.category}>
              <h2 className="eyebrow">{pillar.category}</h2>
              <p className="mt-3 text-[13px] leading-relaxed text-taupe">{pillar.items}</p>
            </RevealItem>
          ))}
        </Reveal>

        <Reveal className="mt-8">
          <RevealItem>
            <CVButton variant="pill" />
          </RevealItem>
        </Reveal>
      </div>

      <div className="hidden xl:block">
        <ProjectPeek />
      </div>
    </section>
  );
}

/** Top of the CV: name, title line, statement and the three focus areas. */
export function CVAbout() {
  const [firstName, ...rest] = profile.name.split(' ');

  return (
    <motion.header variants={revealContainer}>
      <motion.div variants={revealItem}>
        <SectionLabel>{sectionCopy.cv.label}</SectionLabel>
      </motion.div>
      <motion.h2
        variants={revealItem}
        id="cv-title"
        className="text-[clamp(2.25rem,5vw,3.75rem)] font-light leading-[0.95] tracking-[-0.04em] text-ink"
      >
        {firstName} <span className="font-semibold">{rest.join(' ')}</span>
      </motion.h2>
      <motion.p variants={revealItem} className="mt-4 text-[11px] font-semibold uppercase tracking-label text-taupe">
        {profile.title} · {profile.location} · {profile.workMode}
      </motion.p>
      <motion.p
        variants={revealItem}
        className="mt-6 max-w-2xl text-[clamp(1.05rem,1.6vw,1.35rem)] font-light leading-[1.45] text-ink"
      >
        <Highlight text={profile.statement} terms={profile.statementHighlights} className="font-medium text-ink" />
      </motion.p>

      <motion.ul variants={revealContainer} className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-8">
        {profile.pillars.map((pillar) => (
          <motion.li variants={revealItem} key={pillar.category}>
            <h3 className="eyebrow">{pillar.category}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-taupe">{pillar.items}</p>
          </motion.li>
        ))}
      </motion.ul>
    </motion.header>
  );
}
