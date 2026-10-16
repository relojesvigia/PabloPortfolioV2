import type { ReactNode } from 'react';
import type { ImageAsset } from '@/data/portfolioData';
import { resolveImage } from '@/data/imageRegistry';

interface ImageSlotProps {
  image: ImageAsset;
  /** Tailwind aspect class, e.g. 'aspect-[4/5]'. */
  aspect?: string;
  fit?: 'cover' | 'contain';
  className?: string;
  /** Classes on the aspect frame (e.g. 'overflow-hidden' for hover zoom). */
  frameClassName?: string;
  /** Classes on the <img> or placeholder (e.g. hover scale). */
  mediaClassName?: string;
  priority?: boolean;
  showCaption?: boolean;
  /** Overlay layer: anything here is positioned absolutely over the image. */
  children?: ReactNode;
}

/**
 * An image with no frame, border or shadow. `mix-blend-multiply` lets white
 * product-shot backgrounds melt into the off-white page. When the file is
 * missing it renders a soft placeholder naming the file to add.
 */
export function ImageSlot({
  image,
  aspect = 'aspect-[4/3]',
  fit = 'cover',
  className = '',
  frameClassName = '',
  mediaClassName = '',
  priority = false,
  showCaption = true,
  children,
}: ImageSlotProps) {
  const url = resolveImage(image.src);

  return (
    <figure className={`relative ${className}`}>
      <div className={`relative w-full ${aspect} ${frameClassName}`}>
        {url ? (
          <img
            src={url}
            alt={image.alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className={`absolute inset-0 h-full w-full mix-blend-multiply ${fit === 'cover' ? 'object-cover' : 'object-contain'} ${mediaClassName}`}
          />
        ) : (
          <div
            role="img"
            aria-label={image.alt}
            className={`absolute inset-0 flex items-center justify-center ${mediaClassName}`}
            style={{
              background:
                'radial-gradient(ellipse at center, rgb(var(--color-beige)) 0%, rgb(var(--color-beige) / 0.55) 50%, rgb(var(--color-canvas)) 100%)',
            }}
          >
            <span className="px-4 text-center text-[10px] font-medium tracking-[0.12em] text-taupe">
              {image.src}
            </span>
          </div>
        )}

        {children && <div className="pointer-events-none absolute inset-0">{children}</div>}
      </div>

      {showCaption && image.caption && (
        <figcaption className="mt-4 text-xs text-taupe">{image.caption}</figcaption>
      )}
    </figure>
  );
}
