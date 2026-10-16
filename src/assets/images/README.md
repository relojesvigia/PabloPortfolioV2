# Images

Drop images in this folder using the filenames below. They are picked up
automatically (see `src/data/imageRegistry.ts`) — no imports or code changes.

- The **extension doesn't matter**: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`
  all match. `project-01-hero.webp` satisfies `project-01-hero.jpg`.
- Any missing file shows a soft placeholder with its expected name.
- Product shots on a **white background** work best: images use
  `mix-blend-multiply`, so white melts into the off-white page.
- Aim for ~2400 px on the long edge and export as `.webp` or `.avif` for speed.

## Expected files

Each project uses six slots. `XX` is the project number (01–04).

| Filename               | Where it appears                    | Suggested ratio |
| ---------------------- | ----------------------------------- | --------------- |
| `project-XX-card`      | Projects overview grid              | 4:5 portrait    |
| `project-XX-hero`      | Full-width hero slide               | 21:9 or 16:9    |
| `project-XX-concept`   | Concept & Ideation (right column)   | 4:5 portrait    |
| `project-XX-sketch`    | Design process — sketches           | 4:3             |
| `project-XX-process`   | Design process — prototype/material | 4:3             |
| `project-XX-final`     | Final product                       | 16:9            |

### Full list

```
project-01-card.jpg      project-01-hero.jpg      project-01-concept.jpg
project-01-sketch.jpg    project-01-process.jpg   project-01-final.jpg

project-02-card.jpg      project-02-hero.jpg      project-02-concept.jpg
project-02-sketch.jpg    project-02-process.jpg   project-02-final.jpg

project-03-card.jpg      project-03-hero.jpg      project-03-concept.jpg
project-03-sketch.jpg    project-03-process.jpg   project-03-final.jpg

project-04-card.jpg      project-04-hero.jpg      project-04-concept.jpg
project-04-sketch.jpg    project-04-process.jpg   project-04-final.jpg
```

Project 01 = Automotive Pet Travel Pod · 02 = Bentwood Monocoque Lounger ·
03 = Froggy Art Toy & Smart Box · 04 = Monolith Haptic Audio Console

## Using a different filename

Change the `src` of that image in `src/data/portfolioData.ts`, e.g.

```ts
hero: { src: 'pet-pod-render-final.png', alt: '…' },
```

Subfolders work too: `src: 'pet-pod/hero.jpg'`.

## Annotations

The `process` images carry annotations (dot + line + handwritten label).
Their `x` / `y` are percentages of the image — tweak them in
`portfolioData.ts` once the real images are in place.
