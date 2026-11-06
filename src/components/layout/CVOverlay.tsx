import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCV } from '@/hooks/useCV';
import { EASE } from '@/components/ui/Reveal';
import { CVContent } from '@/components/sections/CV';

const actionClass =
  'text-[10px] font-semibold uppercase tracking-label text-taupe transition-colors hover:text-ink print:hidden';

/** "View CV" trigger. `variant="pill"` for the opening slide, `"text"` for nav and footer. */
export function CVButton({ variant = 'text', className = '' }: { variant?: 'pill' | 'text'; className?: string }) {
  const { openPanel } = useCV();
  const style =
    variant === 'pill'
      ? 'inline-flex items-center gap-2.5 rounded-full border border-sand px-5 py-2.5 text-[11px] font-semibold uppercase tracking-label text-ink transition duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-ink'
      : 'inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-label text-ink transition-colors hover:text-espresso';
  return (
    <button type="button" onClick={openPanel} aria-haspopup="dialog" className={`${style} ${className}`}>
      View CV
      <span aria-hidden="true">→</span>
    </button>
  );
}

/** Escape closes; focus moves into the dialog and back to whatever opened it. */
function useDialogFocus(open: boolean, onClose: () => void) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    returnTo.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      returnTo.current?.focus({ preventScroll: true });
    };
  }, [open, onClose]);

  return closeRef;
}

/** The CV as a panel sliding in from the right, over the portfolio. */
export function CVPanel() {
  const { panelOpen, closePanel, openPage, printCV } = useCV();
  const closeRef = useDialogFocus(panelOpen, closePanel);

  return (
    <AnimatePresence>
      {panelOpen && (
        <>
          <motion.div
            key="cv-backdrop"
            className="fixed inset-0 z-[55] bg-ink/25"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={closePanel}
            aria-hidden="true"
          />
          <motion.aside
            key="cv-panel"
            data-cv-print
            role="dialog"
            aria-modal="true"
            aria-label="Curriculum vitae"
            className="fixed right-0 top-0 z-[60] flex h-[100dvh] w-full max-w-[46rem] flex-col bg-canvas shadow-[-24px_0_60px_-30px_rgba(34,27,22,0.35)] sm:w-[88vw]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.55, ease: EASE }}
          >
            <div className="flex items-center justify-between gap-6 border-b border-sand px-7 py-5 sm:px-10 print:hidden">
              <div className="flex items-center gap-6">
                <button type="button" onClick={openPage} className={actionClass}>
                  Open as page ↗
                </button>
                <button type="button" onClick={printCV} className={actionClass}>
                  Download PDF
                </button>
              </div>
              <button ref={closeRef} type="button" onClick={closePanel} className={actionClass}>
                Close ✕
              </button>
            </div>

            <div className="cv-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-7 py-10 sm:px-10 md:px-12">
              <CVContent layout="panel" />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/** The CV as a full page at `#/cv` — same content, two columns, shareable link. */
export function CVPage() {
  const { pageOpen, closePage, printCV } = useCV();
  const closeRef = useDialogFocus(pageOpen, closePage);

  return (
    <AnimatePresence>
      {pageOpen && (
        <motion.div
          key="cv-page"
          data-cv-print
          role="dialog"
          aria-modal="true"
          aria-label="Curriculum vitae"
          className="cv-scroll fixed inset-0 z-[70] overflow-y-auto bg-canvas"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <div className="mx-auto max-w-6xl px-gutter pb-20 pt-8">
            <div className="mb-14 flex items-center justify-between gap-6 print:hidden">
              <button ref={closeRef} type="button" onClick={closePage} className={actionClass}>
                ← Back to projects
              </button>
              <button type="button" onClick={printCV} className={actionClass}>
                Download PDF
              </button>
            </div>
            <CVContent layout="page" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
