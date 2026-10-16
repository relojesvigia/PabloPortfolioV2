import { education, experience, sectionCopy, SECTION_IDS } from '@/data/portfolioData';
import { ContactLinks } from '@/components/ui/ContactLinks';
import { Reveal, RevealItem } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface TimelineEntry {
  key: string;
  period: string;
  title: string;
  organisation: string;
  location: string;
  description: string;
}

function Timeline({
  heading,
  entries,
  twoColumns = false,
}: {
  heading: string;
  entries: TimelineEntry[];
  twoColumns?: boolean;
}) {
  return (
    <div>
      <h3 className="eyebrow">{heading}</h3>
      <Reveal
        as="ol"
        className={`mt-8 space-y-9 ${twoColumns ? 'xl:grid xl:grid-cols-2 xl:gap-x-16 xl:gap-y-10 xl:space-y-0' : ''}`}
      >
        {entries.map((entry) => (
          <RevealItem
            as="li"
            key={entry.key}
            className={`grid gap-3 ${twoColumns ? 'xl:gap-2' : 'md:grid-cols-[12rem_1fr] md:gap-12'}`}
          >
            <p className="pt-1 text-xs font-medium tabular-nums text-taupe">{entry.period}</p>
            <div>
              <h4 className="text-lg font-semibold leading-snug tracking-[-0.01em] text-ink">{entry.title}</h4>
              <p className="mt-1 text-sm text-espresso">
                {entry.organisation}
                <span className="text-taupe"> · {entry.location}</span>
              </p>
              <p className="mt-4 max-w-2xl text-[14px] leading-[1.85] text-espresso">{entry.description}</p>
            </div>
          </RevealItem>
        ))}
      </Reveal>
    </div>
  );
}

export function Experience() {
  const copy = sectionCopy.experience;

  return (
    <section id={SECTION_IDS.experience} aria-labelledby="experience-title">
      {/* Screen 1 — professional experience */}
      <div className="slide px-gutter">
        <SectionHeader label={copy.label} title={copy.title} titleId="experience-title" />
        <div className="mt-10">
          <Timeline
            heading="Professional experience"
            twoColumns
            entries={experience.map((item) => ({
              key: `${item.role}-${item.period}`,
              period: item.period,
              title: item.role,
              organisation: item.company,
              location: item.location,
              description: item.description,
            }))}
          />
        </div>
      </div>

      {/* Screen 2 — education + contact bar */}
      <div className="slide px-gutter">
        <Timeline
          heading="Education"
          entries={education.map((item) => ({
            key: `${item.institution}-${item.period}`,
            period: item.period,
            title: item.degree,
            organisation: item.institution,
            location: item.location,
            description: item.description,
          }))}
        />

        <Reveal className="mt-20">
          <RevealItem className="bg-beige px-7 py-7 sm:px-10 md:px-14">
            <ContactLinks align="spread" />
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
