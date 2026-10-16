import { Reveal, RevealItem } from './Reveal';
import { SectionLabel } from './SectionLabel';

interface SectionHeaderProps {
  label?: string;
  title: string;
  intro?: string;
  titleId?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({ label, title, intro, titleId, align = 'left', className = '' }: SectionHeaderProps) {
  const centered = align === 'center';
  return (
    <Reveal as="header" className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''} ${className}`}>
      {label && (
        <RevealItem>
          <SectionLabel>{label}</SectionLabel>
        </RevealItem>
      )}
      <RevealItem
        as="h2"
        id={titleId}
        className="text-[clamp(2.25rem,5vw,4rem)] font-light leading-[1.02] tracking-[-0.035em] text-ink"
      >
        {title}
      </RevealItem>
      {intro && (
        <RevealItem
          as="p"
          className={`mt-6 max-w-2xl text-[15px] leading-[1.8] text-espresso ${centered ? 'mx-auto' : ''}`}
        >
          {intro}
        </RevealItem>
      )}
    </Reveal>
  );
}
