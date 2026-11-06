import { useEffect } from 'react';

const NEXT_KEYS = new Set(['ArrowDown', 'ArrowRight', 'PageDown']);
const PREV_KEYS = new Set(['ArrowUp', 'ArrowLeft', 'PageUp']);
const EPS = 8;
const LOCK_MS = 650;

interface Slide {
  top: number;
  bottom: number;
}

function measureSlides(): Slide[] {
  const y = window.scrollY;
  return Array.from(document.querySelectorAll<HTMLElement>('.slide')).map((el) => {
    const rect = el.getBoundingClientRect();
    return { top: rect.top + y, bottom: rect.bottom + y };
  });
}

/**
 * Presentation-style keyboard navigation: arrow keys / Page Up / Page Down /
 * Home / End move between `.slide` elements. A slide taller than the viewport
 * (small screens) is scrolled through in steps before moving on.
 */
export function useSlideNavigation() {
  useEffect(() => {
    let lastTarget = window.scrollY;
    let lockedUntil = 0;

    const scrollToY = (top: number) => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      lastTarget = Math.max(0, Math.min(top, max));
      lockedUntil = performance.now() + LOCK_MS;
      window.scrollTo({ top: lastTarget, behavior: 'smooth' });
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      // The CV panel / page is open on top: let its own scrolling handle the keys.
      if (document.documentElement.dataset.cvOpen) return;

      if (e.target instanceof Element && e.target.closest('input, textarea, select, [contenteditable="true"]')) return;

      const isNext = NEXT_KEYS.has(e.key);
      const isPrev = PREV_KEYS.has(e.key);
      const isHome = e.key === 'Home';
      const isEnd = e.key === 'End';
      if (!isNext && !isPrev && !isHome && !isEnd) return;

      const slides = measureSlides();
      if (slides.length === 0) return;
      e.preventDefault();

      if (isHome) return scrollToY(0);
      if (isEnd) return scrollToY(document.documentElement.scrollHeight);

      const vh = window.innerHeight;
      const y = performance.now() < lockedUntil ? lastTarget : window.scrollY;

      if (isNext) {
        const current = [...slides].reverse().find((s) => s.top <= y + EPS);
        if (current && current.bottom > y + vh + EPS) {
          return scrollToY(Math.min(y + vh * 0.85, current.bottom - vh));
        }
        const next = slides.find((s) => s.top > y + EPS);
        if (next) scrollToY(next.top);
        return;
      }

      const prev = [...slides].reverse().find((s) => s.top < y - EPS);
      if (!prev) return scrollToY(0);
      const tall = prev.bottom - prev.top > vh + EPS;
      if (tall && prev.bottom > y + EPS) return scrollToY(Math.max(prev.top, y - vh * 0.85));
      scrollToY(prev.top);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
}
