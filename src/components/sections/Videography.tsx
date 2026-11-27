import { videography, VIDEOGRAPHY_SLIDES } from '@/data/portfolioData';
import { Reveal, RevealItem } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { VideoFrame } from '@/components/ui/VideoFrame';

/**
 * Project 05 — videography, on the dark palette so the films read like a screening.
 *   1. #videography-reel  — title, the three films listed, and the vertical FPV reel
 *   2. #videography-films — the two horizontal films side by side
 * Videos and posters are set in portfolioData.ts (`videography.videos`).
 */
export function Videography() {
  const [reel, ...films] = videography.videos;
  const [reelSlide, filmsSlide] = VIDEOGRAPHY_SLIDES;

  return (
    <article
      id={videography.id}
      aria-labelledby={`${videography.id}-title`}
      className="theme-dark bg-canvas text-espresso"
    >
      {/* ── 1. Title + vertical reel ─────────────────────────── */}
      <section
        id={reelSlide.id}
        className="slide grid items-center gap-12 px-gutter lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20"
      >
        <Reveal>
          <RevealItem as="p" className="text-[clamp(3rem,min(8vw,12svh),6.5rem)] font-extralight leading-none tracking-[-0.06em] text-taupe">
            {videography.number}
          </RevealItem>
          <RevealItem
            as="h2"
            id={`${videography.id}-title`}
            className="mt-3 text-[clamp(1.75rem,min(4.5vw,7svh),3.5rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-ink"
          >
            {videography.title}
          </RevealItem>
          <RevealItem as="p" className="mt-3 text-[11px] font-semibold uppercase tracking-label text-taupe">
            {videography.subtitle}
          </RevealItem>
          <RevealItem as="p" className="mt-6 max-w-md text-[15px] leading-relaxed text-espresso">
            {videography.tagline}
          </RevealItem>

          {/* The three films, as a small index */}
          <RevealItem as="div" className="mt-10 max-w-md">
            <ol className="divide-y divide-sand border-y border-sand">
              {videography.videos.map((video, index) => (
                <li key={video.id} className="flex items-baseline gap-5 py-4">
                  <span className="text-xs font-semibold tabular-nums text-taupe">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold text-ink">{video.title}</span>
                    <span className="mt-0.5 block text-[12px] text-taupe">{video.kind}</span>
                  </span>
                </li>
              ))}
            </ol>
          </RevealItem>
        </Reveal>

        <Reveal className="flex justify-center">
          <RevealItem>
            <VideoFrame video={reel} className="w-[min(100%,22rem)] lg:h-[78svh] lg:w-auto" />
            <p className="mt-4 text-xs text-taupe">
              <span className="font-hand text-lg text-ink">{reel.title}</span> · {reel.kind}
            </p>
          </RevealItem>
        </Reveal>
      </section>

      {/* ── 2. The two horizontal films ──────────────────────── */}
      <section id={filmsSlide.id} className="slide px-gutter">
        <Reveal className="grid gap-12 md:grid-cols-2 md:gap-10">
          {films.map((video, index) => (
            <RevealItem key={video.id} className={index % 2 === 1 ? 'md:mt-16' : ''}>
              <VideoFrame video={video} className="w-full" />
              <div className="mt-6">
                <SectionLabel className="!mb-2">{video.kind}</SectionLabel>
                <h3 className="text-xl font-semibold leading-tight tracking-[-0.02em] text-ink md:text-2xl">
                  {video.title}
                </h3>
                <p className="mt-2 max-w-md text-[14px] leading-relaxed text-espresso">{video.description}</p>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </section>
    </article>
  );
}
