import { profile, sectionCopy, SECTION_IDS } from '@/data/portfolioData';
import { CVButton } from '@/components/layout/CVOverlay';
import { ContactLinks } from '@/components/ui/ContactLinks';
import { Highlight } from '@/components/ui/Highlight';
import { Reveal, RevealItem } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';

export function Contact() {
  const copy = sectionCopy.contact;
  const year = new Date().getFullYear();

  return (
    <section
      id={SECTION_IDS.contact}
      aria-labelledby="contact-title"
      className="slide justify-start px-gutter pb-10 pt-16"
    >
      <Reveal className="flex flex-1 flex-col items-center justify-center text-center">
        <RevealItem>
          <SectionLabel>{copy.label}</SectionLabel>
        </RevealItem>
        <RevealItem
          as="h2"
          id="contact-title"
          className="max-w-4xl text-[clamp(2.5rem,7vw,6.5rem)] font-light leading-[0.98] tracking-[-0.045em] text-ink"
        >
          <Highlight text={copy.title} terms={copy.titleEmphasis} className="font-semibold" />
        </RevealItem>
        <RevealItem as="p" className="mt-8 max-w-xl text-[15px] leading-relaxed text-espresso">
          {copy.intro}
        </RevealItem>
        <RevealItem className="mt-16">
          <ContactLinks align="center" />
        </RevealItem>
      </Reveal>

      <footer className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-sand pt-8 text-[11px] text-taupe sm:flex-row">
        <span>
          © {year} {profile.name}
        </span>
        <span>
          {profile.title} · {profile.location}
        </span>
        <span className="flex items-center gap-8">
          <CVButton className="!text-[11px] !font-normal !normal-case !tracking-normal !text-taupe hover:!text-ink" />
          <a href={`#${SECTION_IDS.about}`} className="transition-colors hover:text-ink">
            Back to top ↑
          </a>
        </span>
      </footer>
    </section>
  );
}
