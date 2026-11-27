import { useEffect, useRef } from 'react';
import { MotionConfig } from 'framer-motion';
import { navIds, navSections, projects } from '@/data/portfolioData';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useFullscreen } from '@/hooks/useFullscreen';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useSlideNavigation } from '@/hooks/useSlideNavigation';
import { useSoundEffect } from '@/hooks/useSoundEffect';
import { CVProvider } from '@/hooks/useCV';
import { CVPage, CVPanel } from '@/components/layout/CVOverlay';
import { MobileDrawer } from '@/components/layout/MobileDrawer';
import { NavigationHint } from '@/components/layout/NavigationHint';
import { Sidebar } from '@/components/layout/Sidebar';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { ProjectDetail } from '@/components/sections/ProjectDetail';
import { Projects } from '@/components/sections/Projects';
import { Videography } from '@/components/sections/Videography';

export default function App() {
  useSlideNavigation();
  const fullscreen = useFullscreen();
  const progress = useScrollProgress();
  const activeId = useActiveSection(navIds);
  const { play, enabled: soundEnabled, toggle: toggleSound } = useSoundEffect();

  // One click per change of active section (play() also enforces a minimum gap).
  const previousId = useRef(activeId);
  useEffect(() => {
    if (activeId === previousId.current) return;
    previousId.current = activeId;
    play();
  }, [activeId, play]);

  const navProps = {
    items: navSections,
    activeId,
    progress,
    soundEnabled,
    onToggleSound: toggleSound,
    fullscreenSupported: fullscreen.supported,
    fullscreenActive: fullscreen.active,
    onToggleFullscreen: fullscreen.toggle,
  };

  return (
    // reducedMotion="user": honours prefers-reduced-motion — transforms are
    // skipped, opacity fades remain.
    <MotionConfig reducedMotion="user">
      <CVProvider>
        <main className="overflow-x-clip lg:mr-sidebar">
          <About />
          <Projects />
          {projects.map((project) => (
            <ProjectDetail key={project.id} project={project} />
          ))}
          <Videography />
          <Contact />
        </main>

        <NavigationHint fullscreenSupported={fullscreen.supported} />
        <Sidebar {...navProps} />
        <MobileDrawer {...navProps} />

        {/* The CV, outside the slide flow: side panel ("View CV") and full page (#/cv). */}
        <CVPanel />
        <CVPage />
      </CVProvider>
    </MotionConfig>
  );
}
