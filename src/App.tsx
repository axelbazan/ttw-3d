import { useState, useCallback, useEffect } from 'react';
import { Navigation } from './components/ui/Navigation';
import { Loader } from './components/ui/Loader';
import { Fallback2D } from './components/ui/Fallback2D';
import { scrollSections, type ScrollSectionId } from './content/event';
import './styles/global.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'hacking' | 'startup'>('hacking');
  const [scrollSection, setScrollSection] = useState<ScrollSectionId>('home');

  const handleSectionClick = useCallback((sectionId: ScrollSectionId) => {
    setScrollSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleRestart = useCallback(() => {
    setScrollSection('home');
    setActiveTab('hacking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleTabChange = useCallback((tab: 'hacking' | 'startup') => {
    setActiveTab(tab);
  }, []);

  if (!isLoaded) {
    return (
      <Loader 
        progress={0} 
        onComplete={() => setIsLoaded(true)} 
      />
    );
  }

  // Scroll spy simple para actualizar sección activa
  const handleScroll = useCallback(() => {
    const sections = scrollSections.filter(s => s.id !== 'home' && s.id !== 'finale');
    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setScrollSection(section.id);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      <Navigation
        activeSection={scrollSection}
        onSectionClick={handleSectionClick}
      />

      <Fallback2D
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onRestart={handleRestart}
        scrollProgress={{ section: scrollSection, t: 0 }}
      />
    </>
  );
}

export default App;