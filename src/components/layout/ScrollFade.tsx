import { useEffect, useRef, useState, type ReactNode } from 'react';

const FADE = '2.25rem';

/**
 * Scroll box for the section list. When the list doesn't fit (short windows),
 * the edge(s) with more content fade out instead of cutting text off, and the
 * active section's label is kept scrolled into view.
 */
export function ScrollFade({
  activeId,
  className = '',
  children,
}: {
  activeId: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ top: false, bottom: false });

  // Track whether there is hidden content above / below.
  useEffect(() => {
    const box = ref.current;
    if (!box) return;
    const check = () => {
      const top = box.scrollTop > 1;
      const bottom = box.scrollTop + box.clientHeight < box.scrollHeight - 1;
      setEdges((prev) => (prev.top === top && prev.bottom === bottom ? prev : { top, bottom }));
    };
    check();
    box.addEventListener('scroll', check, { passive: true });
    const observer = new ResizeObserver(check);
    observer.observe(box);
    if (box.firstElementChild) observer.observe(box.firstElementChild);
    return () => {
      box.removeEventListener('scroll', check);
      observer.disconnect();
    };
  }, []);

  // Keep the active label clear of the faded edges (after its size animation settles).
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const box = ref.current;
      const link = box?.querySelector<HTMLElement>(`[data-nav-id="${CSS.escape(activeId)}"]`);
      if (!box || !link || box.scrollHeight <= box.clientHeight) return;
      const boxRect = box.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      const margin = 40;
      if (linkRect.top < boxRect.top + margin) {
        box.scrollBy({ top: linkRect.top - boxRect.top - margin, behavior: 'smooth' });
      } else if (linkRect.bottom > boxRect.bottom - margin) {
        box.scrollBy({ top: linkRect.bottom - boxRect.bottom + margin, behavior: 'smooth' });
      }
    }, 400);
    return () => window.clearTimeout(timer);
  }, [activeId]);

  const mask = `linear-gradient(to bottom, ${edges.top ? 'transparent' : '#000'} 0, #000 ${FADE}, #000 calc(100% - ${FADE}), ${
    edges.bottom ? 'transparent' : '#000'
  } 100%)`;

  return (
    <div ref={ref} className={className} style={{ maskImage: mask, WebkitMaskImage: mask }}>
      {children}
    </div>
  );
}
