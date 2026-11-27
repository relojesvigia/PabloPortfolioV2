import type { CSSProperties } from 'react';
import type { ImageAsset } from '@/data/portfolioData';
import { resolveImageSeries } from '@/data/imageRegistry';
import { ImageSlot } from '@/components/ui/ImageSlot';

interface ImageMarqueeProps {
  /** The series' first image, e.g. `project-01-final.jpg`. */
  image: ImageAsset;
  /** Height classes for the strip (every photo uses this height). */
  className?: string;
  /** Scroll speed: seconds each photo takes to pass. Higher = slower. */
  secondsPerImage?: number;
}

/**
 * A slow, endless strip of photos at one fixed height; each photo keeps its own
 * width. ADD / REMOVE PHOTOS by adding or deleting numbered files next to the
 * first one — `project-01-final.jpg`, `project-01-final-2.jpg`,
 * `project-01-final-3.jpg`, … — no code changes. It never pauses.
 */
export function ImageMarquee({ image, className = '', secondsPerImage = 10 }: ImageMarqueeProps) {
  const urls = resolveImageSeries(image.src);

  // Nothing added yet: show the usual placeholder naming the file to add.
  if (urls.length === 0) return <ImageSlot image={image} aspect="" frameClassName={className} />;

  // One "lap" holds at least 4 photos so the strip never runs short on wide screens.
  const lap = Array.from({ length: Math.ceil(4 / urls.length) }, () => urls).flat();
  const style = { '--marquee-duration': `${lap.length * secondsPerImage}s` } as CSSProperties;

  return (
    <div className={`marquee relative overflow-hidden ${className}`} role="group" aria-label={image.alt}>
      {/* Two identical laps: the track slides by exactly one lap, then loops seamlessly. */}
      <ul className="marquee-track flex h-full w-max" style={style}>
        {[...lap, ...lap].map((url, i) => (
          <li key={i} className="h-full shrink-0 pr-4 md:pr-6" aria-hidden={i >= urls.length || undefined}>
            <img
              src={url}
              alt={i < urls.length ? `${image.alt} (${i + 1} of ${urls.length})` : ''}
              decoding="async"
              className="h-full w-auto max-w-none mix-blend-multiply"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
