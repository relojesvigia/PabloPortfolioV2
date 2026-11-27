import { useState } from 'react';
import type { Video } from '@/data/portfolioData';
import { resolveImage, resolveVideo } from '@/data/imageRegistry';

const ASPECT: Record<Video['aspect'], string> = {
  vertical: 'aspect-[9/16]',
  wide: 'aspect-video',
  cinema: 'aspect-[2.39/1]',
};

const youtubeId = (link?: string) =>
  link?.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/)?.[1];

/** YouTube / Vimeo page link → its player URL (autoplaying once clicked). */
function toEmbedUrl(link?: string): string | undefined {
  if (!link) return undefined;
  const youtube = youtubeId(link);
  if (youtube) return `https://www.youtube-nocookie.com/embed/${youtube}?autoplay=1&rel=0&playsinline=1`;
  const vimeo = link.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`;
  return undefined;
}

function PlayIcon() {
  return (
    <span className="flex h-16 w-16 items-center justify-center rounded-full border border-ink/40 bg-canvas/30 text-ink backdrop-blur-sm transition-transform duration-500 ease-out-expo group-hover:scale-110">
      <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="currentColor" aria-hidden="true">
        <path d="M8 5.5v13l10-6.5-10-6.5Z" />
      </svg>
    </span>
  );
}

/**
 * One video in a fixed frame. Uses, in order: a YouTube/Vimeo `embed` (poster +
 * play button, the player loads on click), a file in src/assets/videos/ (`src`),
 * or a placeholder that names the file to add. Vertical reels play silently on
 * a loop; the others wait for a click.
 */
export function VideoFrame({ video, className = '' }: { video: Video; className?: string }) {
  const [started, setStarted] = useState(false);
  const embedUrl = toEmbedUrl(video.embed);
  const fileUrl = resolveVideo(video.src);
  // Own still if added; otherwise YouTube's thumbnail for that video.
  const ytId = youtubeId(video.embed);
  const posterUrl =
    resolveImage(video.poster.src) ?? (ytId ? `https://i.ytimg.com/vi/${ytId}/maxresdefault.jpg` : undefined);
  const ambient = video.aspect === 'vertical';
  const frame = `relative overflow-hidden bg-beige ${ASPECT[video.aspect]} ${className}`;

  if (embedUrl) {
    return (
      <div className={frame}>
        {started ? (
          <iframe
            src={embedUrl}
            title={video.title}
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setStarted(true)}
            aria-label={`Play ${video.title}`}
            className="group absolute inset-0 flex items-center justify-center"
          >
            {posterUrl && (
              <img
                src={posterUrl}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                // Not every video has a max-res thumbnail; fall back to the standard one.
                onError={(e) => {
                  if (ytId && !e.currentTarget.src.includes('hqdefault')) {
                    e.currentTarget.src = `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`;
                  }
                }}
              />
            )}
            <span className="relative">
              <PlayIcon />
            </span>
          </button>
        )}
      </div>
    );
  }

  if (fileUrl) {
    return (
      <div className={frame}>
        <video
          src={fileUrl}
          poster={posterUrl}
          controls
          playsInline
          preload="metadata"
          autoPlay={ambient}
          muted={ambient}
          loop={ambient}
          aria-label={video.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    );
  }

  // Placeholder until the video is added.
  return (
    <div
      className={`${frame} flex items-center justify-center`}
      role="img"
      aria-label={`${video.title} (video coming soon)`}
      style={{
        background:
          'radial-gradient(ellipse at center, rgb(var(--color-beige)) 0%, rgb(var(--color-beige) / 0.55) 55%, rgb(var(--color-canvas)) 100%)',
      }}
    >
      <div className="flex flex-col items-center gap-4 px-4 text-center">
        <PlayIcon />
        <span className="text-[10px] font-medium tracking-[0.12em] text-taupe">
          {video.src ?? video.embed ?? video.id}
        </span>
      </div>
    </div>
  );
}
