import { projects, sectionCopy, SECTION_IDS, videography } from '@/data/portfolioData';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';

/** Overview grid: all projects on one screen. Every second card drops lower. */
export function Projects() {
  const copy = sectionCopy.projects;

  return (
    <section id={SECTION_IDS.projects} aria-labelledby="projects-title" className="slide px-gutter">
      <SectionHeader label={copy.label} title={copy.title} titleId="projects-title" />

      <Reveal
        as="ul"
        className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-6 lg:[&>li:nth-child(even)]:mt-10"
      >
        {[...projects, videography].map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </Reveal>
    </section>
  );
}
