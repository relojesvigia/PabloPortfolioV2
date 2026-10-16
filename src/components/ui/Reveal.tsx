import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';

/** Shared easing for every entrance on the site. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const revealContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

/** Fade + slight upward slide. Under reduced motion, MotionConfig drops the slide. */
export const revealItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const VIEWPORT = { once: true, margin: '0px 0px -10% 0px' } as const;

type ContainerTag = 'div' | 'header' | 'ul' | 'ol' | 'dl';
type ItemTag = 'div' | 'li' | 'p' | 'h1' | 'h2' | 'h3' | 'span';

type RevealProps = HTMLMotionProps<'div'> & { as?: ContainerTag };
type RevealItemProps = HTMLMotionProps<'div'> & { as?: ItemTag };

/** Staggers its RevealItem children in when it scrolls into view (once). */
export function Reveal({ as = 'div', ...rest }: RevealProps) {
  const Component = motion[as] as unknown as typeof motion.div;
  return (
    <Component initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={revealContainer} {...rest} />
  );
}

/** One staggered step inside a Reveal. */
export function RevealItem({ as = 'div', ...rest }: RevealItemProps) {
  const Component = motion[as] as unknown as typeof motion.div;
  return <Component variants={revealItem} {...rest} />;
}
