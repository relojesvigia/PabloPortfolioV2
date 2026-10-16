import { profile, sectionCopy, SECTION_IDS } from '@/data/portfolioData';
import { Highlight } from '@/components/ui/Highlight';
import { Reveal, RevealItem } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';

export function About() {
  const [firstName, ...rest] = profile.name.split(' ');
  const lastName = rest.join(' ');

  return (
    <section
      id={SECTION_IDS.about}
      aria-label="About"
      className="slide relative px-gutter"
    >
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
          <span className="font-semibold">{lastName}</span>
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

        <RevealItem as="p" className="mt-5 max-w-3xl text-[15px] leading-[1.85] text-espresso">
          {profile.bio}
        </RevealItem>
      </Reveal>

      <Reveal as="ul" className="mt-10 grid max-w-5xl gap-8 sm:grid-cols-3 sm:gap-12">
        {profile.pillars.map((pillar) => (
          <RevealItem as="li" key={pillar.category}>
            <h2 className="eyebrow">{pillar.category}</h2>
            <p className="mt-3 text-[13px] leading-relaxed text-taupe">{pillar.items}</p>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}
