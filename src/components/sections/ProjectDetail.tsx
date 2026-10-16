import { motion } from 'framer-motion';
import { subsectionId, type Project, type TextBlock } from '@/data/portfolioData';
import { AnnotationOverlay } from '@/components/ui/AnnotationOverlay';
import { Highlight } from '@/components/ui/Highlight';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { EASE, Reveal, RevealItem } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';

function Copy({ label, block, headingId }: { label: string; block: TextBlock; headingId?: string }) {
  return (
    <RevealItem>
      <SectionLabel>{label}</SectionLabel>
      <h3 id={headingId} className="text-2xl font-semibold leading-tight tracking-[-0.02em] text-ink md:text-3xl">
        {block.title}
      </h3>
      <p className="mt-5 max-w-xl text-[15px] leading-[1.85] text-espresso">
        <Highlight text={block.body} terms={block.highlights} />
      </p>
    </RevealItem>
  );
}

/**
 * One project, in four parts:
 *   1. Hero slide       — #<id>
 *   2. Concept/Ideation — #<id>-concept
 *   3. Design process   — #<id>-process
 *   4. Final product    — #<id>-final
 *
 * IMAGES: every <ImageSlot> reads a filename from portfolioData.ts
 * (project.images.*). To swap an image, drop the file into
 * src/assets/images/ with that name — no code changes needed.
 *
 * OVERLAYS: each ImageSlot has an overlay slot. Data-driven annotations
 * render through <AnnotationOverlay items={...} />; add any custom
 * arrows / sketch marks as absolutely positioned children inside it.
 */
export function ProjectDetail({ project }: { project: Project }) {
  const { sections, images, specs } = project;
  const ids = {
    concept: subsectionId(project.id, 'concept'),
    process: subsectionId(project.id, 'process'),
    final: subsectionId(project.id, 'final'),
  };

  return (
    <article id={project.id} aria-labelledby={`${project.id}-title`}>
      {/* ── 1. HERO SLIDE ───────────────────────────────────── */}
      <div className="slide">
        <header className="px-gutter">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
            <RevealItem>
              <p className="text-[clamp(3rem,min(8vw,12svh),6.5rem)] font-extralight leading-none tracking-[-0.06em] text-taupe">
                {project.number}
              </p>
              <h2
                id={`${project.id}-title`}
                className="mt-3 max-w-3xl text-[clamp(1.75rem,min(4.5vw,7svh),3.5rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-ink"
              >
                {project.title}
              </h2>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-label text-taupe">{project.subtitle}</p>
            </RevealItem>
            <RevealItem as="p" className="max-w-sm text-[15px] leading-relaxed text-espresso md:pb-2 md:text-right">
              {project.tagline}
            </RevealItem>
          </Reveal>
        </header>

        {/* Full width of the content column — the image bleeds edge to edge. */}
        <motion.div
          className="mt-8 md:mt-10"
          initial={{ opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          {/* IMAGE: hero — `project-XX-hero.*` (wide, ideally 16:9 or wider) */}
          <ImageSlot image={images.hero} aspect="" frameClassName="h-[38svh] md:h-[44svh]">
            <AnnotationOverlay items={images.hero.annotations}>
              {/* OVERLAY SLOT (hero) — arrows, sketch marks, notes. Example:
                  <img src={arrowSvg} alt="" className="absolute left-[12%] top-[30%] w-28" /> */}
            </AnnotationOverlay>
          </ImageSlot>
        </motion.div>
      </div>

      {/* ── 2. CONCEPT & IDEATION — text left, image right ──── */}
      <section
        id={ids.concept}
        aria-labelledby={`${ids.concept}-title`}
        className="slide grid items-center gap-10 px-gutter lg:grid-cols-2 lg:gap-20"
      >
        <Reveal className="space-y-10">
          <Copy label="concept" block={sections.concept} headingId={`${ids.concept}-title`} />
          <Copy label="ideation" block={sections.ideation} />
        </Reveal>

        <Reveal className="lg:-mr-gutter">
          <RevealItem>
            {/* IMAGE: concept — `project-XX-concept.*` (portrait or square) */}
            <ImageSlot image={images.concept} aspect="" frameClassName="h-[34svh] lg:h-[62svh]">
              <AnnotationOverlay items={images.concept.annotations}>
                {/* OVERLAY SLOT (concept) */}
              </AnnotationOverlay>
            </ImageSlot>
          </RevealItem>
        </Reveal>
      </section>

      {/* ── 3. DESIGN PROCESS — two screens: text, then images ─ */}
      <section id={ids.process} aria-labelledby={`${ids.process}-title`}>
        <div className="slide px-gutter">
          <Reveal className="grid gap-10 lg:grid-cols-2 lg:gap-20">
            <Copy label="design process" block={sections.process} headingId={`${ids.process}-title`} />

            {sections.process.materials && (
              <RevealItem className="lg:pt-10">
                <h4 className="eyebrow">{sections.process.materials.title}</h4>
                <p className="mt-4 max-w-md text-[15px] leading-[1.85] text-espresso">
                  {sections.process.materials.body}
                </p>
                <dl className="mt-8 space-y-5">
                  {sections.process.materials.callouts.map((callout) => (
                    <div key={callout.label}>
                      <dt className="font-hand text-lg leading-none text-ink">{callout.label}</dt>
                      <dd className="mt-1.5 text-[13px] text-taupe">{callout.text}</dd>
                    </div>
                  ))}
                </dl>
              </RevealItem>
            )}
          </Reveal>
        </div>

        <div className="slide px-gutter">
          <Reveal className="grid gap-10 md:grid-cols-2 md:gap-10">
            <RevealItem>
              {/* IMAGE: sketch — `project-XX-sketch.*` (sketches / ideation boards) */}
              <ImageSlot image={images.sketch} aspect="" frameClassName="h-[30svh] md:h-[54svh]">
                <AnnotationOverlay items={images.sketch.annotations}>
                  {/* OVERLAY SLOT (sketch) — e.g. circled details, hand-drawn arrows */}
                </AnnotationOverlay>
              </ImageSlot>
            </RevealItem>
            <RevealItem className="md:mt-12">
              {/* IMAGE: process — `project-XX-process.*` (prototype / materials diagram) */}
              <ImageSlot image={images.process} aspect="" frameClassName="h-[30svh] md:h-[54svh]">
                <AnnotationOverlay items={images.process.annotations}>
                  {/* OVERLAY SLOT (process) */}
                </AnnotationOverlay>
              </ImageSlot>
            </RevealItem>
          </Reveal>
        </div>
      </section>

      {/* ── 4. FINAL PRODUCT — image, description, specs ────── */}
      <section id={ids.final} aria-labelledby={`${ids.final}-title`} className="slide">
        <Reveal>
          <RevealItem>
            {/* IMAGE: final — `project-XX-final.*` (hero-quality product shot) */}
            <ImageSlot image={images.final} aspect="" frameClassName="h-[34svh] md:h-[42svh]">
              <AnnotationOverlay items={images.final.annotations}>
                {/* OVERLAY SLOT (final) */}
              </AnnotationOverlay>
            </ImageSlot>
          </RevealItem>
        </Reveal>

        <Reveal className="grid gap-10 px-gutter pt-10 lg:grid-cols-2 lg:gap-20">
          <Copy label="final product" block={sections.final} headingId={`${ids.final}-title`} />

          <RevealItem className="lg:pt-6">
            <h4 className="eyebrow">Specifications</h4>
            <dl className="mt-5 grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {specs.map((spec) => (
                <div key={spec.label}>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-taupe">{spec.label}</dt>
                  <dd className="mt-2 text-[15px] font-medium leading-snug text-ink">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </RevealItem>
        </Reveal>
      </section>
    </article>
  );
}
