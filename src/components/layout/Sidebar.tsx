import { motion, type MotionValue } from 'framer-motion';
import { navParentId, profile, type NavItem } from '@/data/portfolioData';
import { EASE } from '@/components/ui/Reveal';
import { NavRail } from './NavRail';

/* ── Section list (shared by the desktop sidebar and the mobile drawer) ── */

interface SectionNavProps {
  items: NavItem[];
  activeId: string;
  onNavigate?: () => void;
}

const SIZES = {
  0: { base: 11, active: 13.5 },
  1: { base: 10, active: 11.5 },
} as const;

function NavLink({
  item,
  active,
  current,
  level,
  onNavigate,
}: {
  item: NavItem;
  active: boolean;
  current: boolean;
  level: 0 | 1;
  onNavigate?: () => void;
}) {
  const size = SIZES[level];
  return (
    <a
      href={`#${item.id}`}
      onClick={onNavigate}
      aria-current={current ? 'location' : undefined}
      data-nav-id={item.id}
      className={`block py-[3px] leading-snug transition-colors duration-300 ${
        active ? 'text-ink' : 'text-taupe hover:text-espresso'
      }`}
    >
      {/* Montserrat is loaded as a variable font, so weight tweens smoothly. */}
      <motion.span
        className="block whitespace-pre-wrap"
        initial={false}
        animate={{ fontSize: `${active ? size.active : size.base}px`, fontWeight: active ? 700 : 400 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        {item.label}
      </motion.span>
    </a>
  );
}

export function SectionNav({ items, activeId, onNavigate }: SectionNavProps) {
  const activeParent = navParentId(activeId);

  return (
    <nav aria-label="Page sections">
      <ol className="space-y-1.5">
        {items.map((item) => {
          const parentActive = item.id === activeParent;
          return (
            <li key={item.id}>
              <NavLink
                item={item}
                active={parentActive}
                current={item.id === activeId}
                level={0}
                onNavigate={onNavigate}
              />
              {item.children && (
                <ol
                  className={`mb-2 mt-0.5 space-y-0.5 pl-3 transition-opacity duration-300 ${
                    parentActive ? 'opacity-100' : 'opacity-60'
                  }`}
                >
                  {item.children.map((child) => (
                    <li key={child.id}>
                      <NavLink
                        item={child}
                        active={child.id === activeId}
                        current={child.id === activeId}
                        level={1}
                        onNavigate={onNavigate}
                      />
                    </li>
                  ))}
                </ol>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ── Sound toggle ── */

export function SoundToggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={enabled}
      className="text-[10px] font-semibold uppercase tracking-label text-taupe transition-colors hover:text-ink"
    >
      Sound {enabled ? 'on' : 'off'}
    </button>
  );
}

/* ── Fullscreen toggle (hidden where the browser can't do fullscreen) ── */

export function FullscreenToggle({
  supported,
  active,
  onToggle,
}: {
  supported: boolean;
  active: boolean;
  onToggle: () => void;
}) {
  if (!supported) return null;
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      title="Toggle fullscreen (F)"
      className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-label text-taupe transition-colors hover:text-ink"
    >
      <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        {active ? (
          <path d="M6 1.5V6H1.5M10 14.5V10h4.5M10 1.5V6h4.5M6 14.5V10H1.5" />
        ) : (
          <path d="M1.5 6V1.5H6M10 1.5h4.5V6M14.5 10v4.5H10M6 14.5H1.5V10" />
        )}
      </svg>
      {active ? 'Exit fullscreen' : 'Fullscreen'}
    </button>
  );
}

/* ── Desktop sidebar: fixed, right, ~15% wide ── */

export interface SidebarProps {
  items: NavItem[];
  activeId: string;
  progress: MotionValue<number>;
  soundEnabled: boolean;
  onToggleSound: () => void;
  fullscreenSupported: boolean;
  fullscreenActive: boolean;
  onToggleFullscreen: () => void;
}

export function Sidebar({
  items,
  activeId,
  soundEnabled,
  onToggleSound,
  fullscreenSupported,
  fullscreenActive,
  onToggleFullscreen,
}: SidebarProps) {
  return (
    <aside
      className="fixed right-0 top-0 z-30 hidden h-screen w-sidebar flex-col justify-between bg-canvas px-6 py-10 lg:flex xl:px-8"
      aria-label="Page navigation"
    >
      <a href="#about" className="text-[11px] font-semibold uppercase tracking-label text-ink">
        {profile.name}
      </a>

      <div className="no-scrollbar my-10 min-h-0 flex-1 overflow-y-auto">
        <NavRail activeId={activeId}>
          <SectionNav items={items} activeId={activeId} />
        </NavRail>
      </div>

      <div className="flex flex-col items-start gap-3">
        <FullscreenToggle supported={fullscreenSupported} active={fullscreenActive} onToggle={onToggleFullscreen} />
        <SoundToggle enabled={soundEnabled} onToggle={onToggleSound} />
      </div>
    </aside>
  );
}
