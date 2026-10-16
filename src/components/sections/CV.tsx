import { sectionCopy, skills, software, SECTION_IDS } from '@/data/portfolioData';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SkillBar } from '@/components/ui/SkillBar';
import { SoftwareTile } from '@/components/ui/SoftwareTile';

export function CV() {
  const copy = sectionCopy.cv;

  return (
    <section
      id={SECTION_IDS.cv}
      aria-labelledby="cv-title"
      className="slide grid content-center gap-12 px-gutter xl:grid-cols-[0.8fr_1.15fr_0.95fr] xl:items-start xl:gap-14"
    >
      <SectionHeader label={copy.label} title={copy.title} intro={copy.intro} titleId="cv-title" />

      <div>
        <h3 className="eyebrow">Core competencies</h3>
        <Reveal as="ul" className="mt-7 space-y-6">
          {skills.map((skill) => (
            <SkillBar key={skill.number} skill={skill} />
          ))}
        </Reveal>
      </div>

      <div>
        <h3 className="eyebrow">Software</h3>
        <Reveal as="ul" className="mt-7 grid grid-cols-3 gap-x-6 gap-y-7 sm:grid-cols-4 xl:grid-cols-3">
          {software.map((tool) => (
            <SoftwareTile key={tool.id} tool={tool} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
