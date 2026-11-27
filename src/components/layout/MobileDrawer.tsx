import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { profile } from '@/data/portfolioData';
import { EASE } from '@/components/ui/Reveal';
import { CVButton } from './CVOverlay';
import { ProgressBar } from './ProgressBar';
import { ScrollFade } from './ScrollFade';
import { NavRail } from './NavRail';
import { FullscreenToggle, SectionNav, SoundToggle, type SidebarProps } from './Sidebar';

const EDGE_ZONE = 28; // px from the right edge where a swipe can start
const SWIPE_DISTANCE = 40; // px of leftward travel needed to open

/**
 * Below `lg`, the sidebar becomes a slim tab on the right edge.
 * Tap the tab, or swipe left from the right edge, to open the drawer.
 * When closed only the tab is on screen, and all touch listeners are passive,
 * so page scrolling is never blocked.
 */
export function MobileDrawer({
  items,
  activeId,
  progress,
  soundEnabled,
  onToggleSound,
  fullscreenSupported,
  fullscreenActive,
  onToggleFullscreen,
}: SidebarProps) {
  const [open, setOpen] = useState(false);
  const tabRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  // Edge swipe to open.
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let tracking = false;

    const onStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      tracking = touch.clientX > window.innerWidth - EDGE_ZONE;
      startX = touch.clientX;
      startY = touch.clientY;
    };
    const onMove = (event: TouchEvent) => {
      if (!tracking) return;
      const touch = event.touches[0];
      const dx = startX - touch.clientX;
      const dy = Math.abs(touch.clientY - startY);
      if (dx > SWIPE_DISTANCE && dx > dy * 1.5) {
        tracking = false;
        setOpen(true);
      }
    };
    const onEnd = () => {
      tracking = false;
    };

    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, []);

  // While open: Escape closes, page behind doesn't scroll, focus moves in and back out.
  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      closeRef.current?.focus();
      const onKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') setOpen(false);
      };
      window.addEventListener('keydown', onKey);
      return () => {
        document.body.style.overflow = previousOverflow;
        window.removeEventListener('keydown', onKey);
      };
    }
    if (wasOpen.current) tabRef.current?.focus({ preventScroll: true });
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      {/* Edge tab — shows page progress, opens the drawer */}
      <button
        ref={tabRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open section navigation"
        aria-expanded={open}
        aria-controls="section-drawer"
        className="fixed right-0 top-1/2 z-40 flex h-24 w-5 -translate-y-1/2 items-center justify-center rounded-l-md bg-beige/90 backdrop-blur-sm"
      >
        <ProgressBar progress={progress} className="h-14" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-ink/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={close}
              aria-hidden="true"
            />
            <motion.aside
              key="drawer"
              id="section-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Page sections"
              className="fixed right-0 top-0 z-50 flex h-[100dvh] w-[80vw] max-w-xs flex-col bg-canvas px-7 pb-8 pt-8"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.45, ease: EASE }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={{ left: 0, right: 0.6 }}
              onDragEnd={(_, info) => {
                if (info.offset.x > 80 || info.velocity.x > 500) close();
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-label text-ink">{profile.name}</span>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  className="-mr-2 p-2 text-[10px] font-semibold uppercase tracking-label text-taupe hover:text-ink"
                >
                  Close
                </button>
              </div>

              <ScrollFade activeId={activeId} className="min-h-0 flex-1 overflow-y-auto overscroll-contain py-8">
                <NavRail activeId={activeId}>
                  <SectionNav items={items} activeId={activeId} onNavigate={close} />
                </NavRail>
              </ScrollFade>

              <div className="flex flex-col items-start gap-3">
                {/* Closes the drawer, then the CV panel slides in. */}
                <span onClickCapture={close} className="mb-3">
                  <CVButton />
                </span>
                <FullscreenToggle
                  supported={fullscreenSupported}
                  active={fullscreenActive}
                  onToggle={onToggleFullscreen}
                />
                <SoundToggle enabled={soundEnabled} onToggle={onToggleSound} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
