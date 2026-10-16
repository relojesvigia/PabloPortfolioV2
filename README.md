# Pablo Cobián — Portfolio

Industrial design portfolio built with React, Vite, TypeScript, Tailwind CSS and Framer Motion.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build
```

## Editing content

All content is in **`src/data/portfolioData.ts`**: profile, skills, software,
education, experience, contact and projects.

- **Add a project:** append one object to `projects`. The overview grid, the
  detail section and the sidebar navigation update automatically.
- **Images:** drop files into `src/assets/images/` using the expected names.
  See [`src/assets/images/README.md`](src/assets/images/README.md).
- **Annotations:** add `annotations: [{ x, y, label, note }]` to any image in
  the data file. For custom arrows or sketch marks, use the commented
  `OVERLAY SLOT`s in `src/components/sections/ProjectDetail.tsx`.
- **Bryndan Write font:** see [`public/fonts/README.md`](public/fonts/README.md).

## Structure

```
src/
  components/
    layout/    Sidebar (+ SectionNav, SoundToggle), ProgressBar, MobileDrawer
    sections/  About, CV, Experience, Projects, ProjectDetail, Contact
    ui/        SkillBar, SoftwareTile, ProjectCard, AnnotationOverlay,
               ImageSlot, Reveal, SectionHeader, SectionLabel, Highlight, ContactLinks
  data/        portfolioData.ts (content), imageRegistry.ts (image lookup)
  hooks/       useScrollProgress, useActiveSection, useSoundEffect
  styles/      tokens.css (design tokens), index.css (Tailwind + base)
  assets/images/
```

## Notes

- Colours and spacing are CSS custom properties in `src/styles/tokens.css`;
  Tailwind reads them via `tailwind.config.ts`.
- Motion respects `prefers-reduced-motion` (Framer `MotionConfig reducedMotion="user"`
  plus a CSS fallback).
- The sidebar click sound is synthesized with the Web Audio API. Browsers only
  allow audio after the visitor's first click, tap or key press, so the sound starts
  after that. It can be turned off from the sidebar, and the choice is remembered.
