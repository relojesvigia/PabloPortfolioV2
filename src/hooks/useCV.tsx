import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

/** The CV's own address: yoursite.com/#/cv opens it as a full page. */
export const CV_HASH = '#/cv';

interface CVContextValue {
  panelOpen: boolean;
  pageOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
  openPage: () => void;
  closePage: () => void;
  /** Print / "Save as PDF" — only the open CV is printed. */
  printCV: () => void;
}

const CVContext = createContext<CVContextValue | null>(null);

export function useCV() {
  const value = useContext(CVContext);
  if (!value) throw new Error('useCV must be used inside <CVProvider>');
  return value;
}

/**
 * The CV lives outside the slide flow. It opens either as a side panel over the
 * portfolio (from the "View CV" buttons) or as a full page at `#/cv` (shareable
 * link). While either is open the page behind doesn't scroll and the slide
 * arrow-key navigation is paused.
 */
export function CVProvider({ children }: { children: ReactNode }) {
  const [panelOpen, setPanelOpen] = useState(false);
  const [pageOpen, setPageOpen] = useState(() => window.location.hash === CV_HASH);
  // True when the page was opened from inside the site, so "Back" can return to the same spot.
  const pageOpenedInApp = useRef(false);

  useEffect(() => {
    const onHashChange = () => setPageOpen(window.location.hash === CV_HASH);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const anyOpen = panelOpen || pageOpen;
  useEffect(() => {
    if (!anyOpen) return;
    const root = document.documentElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    root.dataset.cvOpen = 'true';
    return () => {
      document.body.style.overflow = previousOverflow;
      delete root.dataset.cvOpen;
    };
  }, [anyOpen]);

  const openPanel = useCallback(() => setPanelOpen(true), []);
  const closePanel = useCallback(() => setPanelOpen(false), []);

  const openPage = useCallback(() => {
    setPanelOpen(false);
    pageOpenedInApp.current = true;
    window.location.hash = CV_HASH;
  }, []);

  const closePage = useCallback(() => {
    if (pageOpenedInApp.current) {
      pageOpenedInApp.current = false;
      window.history.back();
      return;
    }
    // Arrived straight on /#/cv: drop the hash and land on the projects.
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    setPageOpen(false);
    window.scrollTo({ top: 0 });
  }, []);

  const printCV = useCallback(() => {
    const root = document.documentElement;
    root.classList.add('print-cv');
    const cleanUp = () => {
      root.classList.remove('print-cv');
      window.removeEventListener('afterprint', cleanUp);
    };
    window.addEventListener('afterprint', cleanUp);
    window.print();
  }, []);

  const value = useMemo(
    () => ({ panelOpen, pageOpen, openPanel, closePanel, openPage, closePage, printCV }),
    [panelOpen, pageOpen, openPanel, closePanel, openPage, closePage, printCV],
  );

  return <CVContext.Provider value={value}>{children}</CVContext.Provider>;
}
