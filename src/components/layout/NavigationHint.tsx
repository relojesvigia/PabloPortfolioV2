import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const SEEN_KEY = 'pablo-portfolio:hint-seen';
const SHOW_AFTER_MS = 1200;
const VISIBLE_MS = 4200;

function Key({ children }: { children: string }) {
  return (
    <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-sand px-1 font-sans text-[10px] font-semibold text-espresso">
      {children}
    </kbd>
  );
}

/** Brief, faint hint on first load: fullscreen with F, move with the arrow keys. Keyboard devices only. */
export function NavigationHint({ fullscreenSupported }: { fullscreenSupported: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    try {
      if (sessionStorage.getItem(SEEN_KEY)) return;
    } catch {
      // Storage blocked: still show the hint for this page load.
    }

    const hide = () => setVisible(false);
    const showTimer = window.setTimeout(() => {
      setVisible(true);
      try {
        sessionStorage.setItem(SEEN_KEY, '1');
      } catch {
        // ignore
      }
    }, SHOW_AFTER_MS);
    const hideTimer = window.setTimeout(hide, SHOW_AFTER_MS + VISIBLE_MS);
    window.addEventListener('keydown', hide, { once: true });
    window.addEventListener('wheel', hide, { once: true, passive: true });

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
      window.removeEventListener('keydown', hide);
      window.removeEventListener('wheel', hide);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-8 z-20 flex justify-center px-gutter lg:right-sidebar">
      <AnimatePresence>
        {visible && (
          <motion.p
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.7, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2.5 rounded-full bg-canvas/80 px-4 py-2 text-[11px] text-taupe backdrop-blur-sm"
          >
            {fullscreenSupported && (
              <>
                <Key>F</Key>
                <span>fullscreen</span>
                <span className="text-sand">·</span>
              </>
            )}
            <Key>↑</Key>
            <Key>↓</Key>
            <span>to move between slides</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
