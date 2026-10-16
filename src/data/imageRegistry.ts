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

/** Returns a URL for the image, or undefined when the file hasn't been added yet. */
export function resolveImage(src?: string): string | undefined {
  if (!src) return undefined;
  if (/^(https?:)?\/\//.test(src) || src.startsWith('/') || src.startsWith('data:')) return src;
  return registry.get(normalize(src));
}
