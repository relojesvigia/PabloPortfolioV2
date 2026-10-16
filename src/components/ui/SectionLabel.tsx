import type { ReactNode } from 'react';

/** Small handwritten label (Bryndan Write) that sits above a heading. */
export function SectionLabel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`mb-4 block font-hand text-xl leading-none text-taupe md:text-2xl ${className}`}>
      {children}
    </span>
  );
}
