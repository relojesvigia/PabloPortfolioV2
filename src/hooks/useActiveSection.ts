import { useEffect, useState } from 'react';

interface Options {
  /**
   * A thin horizontal band across the viewport. The section crossing it is
   * "active". Default: a line ~35% from the top.
   */
  rootMargin?: string;
}

/**
 * Tracks which section is currently being read, using one IntersectionObserver
 * for every id. Ids must be passed in document order with parents before their
 * children; when a parent and a child both cross the band, the child wins.
 */
export function useActiveSection(ids: readonly string[], { rootMargin = '-35% 0px -64% 0px' }: Options = {}) {
  const [activeId, setActiveId] = useState(ids[0] ?? '');
  const idsKey = ids.join('|');

  useEffect(() => {
    const order = new Map(ids.map((id, index) => [id, index]));
    const intersecting = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const { id } = entry.target as HTMLElement;
          if (entry.isIntersecting) intersecting.add(id);
          else intersecting.delete(id);
        }

        // Deepest (last in document order) intersecting id wins.
        let next = '';
        let nextIndex = -1;
        intersecting.forEach((id) => {
          const index = order.get(id) ?? -1;
          if (index > nextIndex) {
            nextIndex = index;
            next = id;
          }
        });

        // Between sections nothing crosses the band — keep the previous one.
        if (next) setActiveId(next);
      },
      { rootMargin, threshold: 0 },
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
    // idsKey stands in for `ids` so a new array with the same ids doesn't re-subscribe.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey, rootMargin]);

  return activeId;
}
