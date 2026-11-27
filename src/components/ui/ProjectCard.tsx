import { motion } from 'framer-motion';
import type { ProjectSummary } from '@/data/portfolioData';
import { ImageSlot } from './ImageSlot';
import { revealItem } from './Reveal';

/** Overview card: image, number and title only — no frame. Links to the project. */
export function ProjectCard({ project }: { project: ProjectSummary }) {
  return (
    <motion.li variants={revealItem}>
      <a href={`#${project.id}`} className="group block">
        {/* IMAGE: project card — file `project-XX-card.*` in src/assets/images */}
        <ImageSlot
          image={project.images.card}
          aspect="aspect-[4/5]"
          showCaption={false}
          frameClassName="overflow-hidden"
          mediaClassName="transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.03]"
        />
        <div className="mt-6 flex items-baseline gap-5">
          <span className="text-xs font-semibold tabular-nums text-taupe">{project.number}</span>
          <div>
            <h3 className="text-lg font-semibold leading-snug tracking-[-0.01em] text-ink md:text-xl">
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ease-out-expo group-hover:bg-[length:100%_1px]">
                {project.title}
              </span>
            </h3>
            <p className="mt-1 text-[13px] text-taupe">{project.subtitle}</p>
          </div>
        </div>
      </a>
    </motion.li>
  );
}
