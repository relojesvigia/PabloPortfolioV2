/**
 * Collects every image in src/assets/images/ at build time and resolves the
 * filenames used in portfolioData.ts to their hashed URLs. Drop a file in the
 * folder with the expected name and it shows up — no imports needed.
 */
const modules = import.meta.glob<string>(
  '../assets/images/**/*.{jpg,jpeg,png,webp,avif,gif,svg,JPG,JPEG,PNG,WEBP}',
  { eager: true, query: '?url', import: 'default' },
);

/** "project-01-hero.JPG" → "project-01-hero" (case-insensitive, extension-free). */
const normalize = (path: string) => path.replace(/\.[a-z0-9]+$/i, '').toLowerCase();

const registry = new Map<string, string>();
for (const [path, url] of Object.entries(modules)) {
  registry.set(normalize(path.replace('../assets/images/', '')), url);
}

/**
 * Every image in a numbered series, in order: the base file plus any
 * `<name>-2`, `<name>-3`, … next to it. E.g. "project-01-final.jpg" →
 * project-01-final, project-01-final-2, project-01-final-3. Empty when none exist.
 */
export function resolveImageSeries(src?: string): string[] {
  if (!src) return [];
  const base = normalize(src);
  const numbered = new RegExp(`^${base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}-(\\d+)$`);
  return [...registry.entries()]
    .map(([key, url]) => {
      if (key === base) return { order: 1, url };
      const match = numbered.exec(key);
      return match ? { order: Number(match[1]), url } : null;
    })
    .filter((item): item is { order: number; url: string } => item !== null)
    .sort((a, b) => a.order - b.order)
    .map((item) => item.url);
}

/** Returns a URL for the image, or undefined when the file hasn't been added yet. */
export function resolveImage(src?: string): string | undefined {
  if (!src) return undefined;
  if (/^(https?:)?\/\//.test(src) || src.startsWith('/') || src.startsWith('data:')) return src;
  return registry.get(normalize(src));
}
