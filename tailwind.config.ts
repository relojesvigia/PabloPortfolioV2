import type { Config } from 'tailwindcss';

/**
 * Colours and spacing point at the CSS custom properties in src/styles/tokens.css,
 * so the palette is defined in exactly one place. Colours are stored as RGB
 * channels, which keeps Tailwind's opacity modifiers working (e.g. bg-ink/20).
 */
const token = (name: string) => `rgb(var(--color-${name}) / <alpha-value>)`;

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: token('canvas'), // #FAFAF8 warm off-white
        ink: token('ink'), // #221B16 headings
        espresso: token('espresso'), // #3E342B body text, progress fill
        taupe: token('taupe'), // #8C8276 accent / meta
        beige: token('beige'), // #EAE4DA beige surfaces
        sand: token('sand'), // #E5DED3 tracks, hairlines
        whatsapp: token('whatsapp'), // #25D366
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        hand: ['"Bryndan Write"', 'Caveat', 'cursive'],
      },
      spacing: {
        gutter: 'var(--space-gutter)',
        section: 'var(--space-section)',
        sidebar: 'var(--layout-sidebar)',
      },
      letterSpacing: {
        label: '0.22em',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
