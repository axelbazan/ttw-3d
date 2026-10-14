import { useEffect } from 'react';
import { scrollSections, type ScrollSectionId } from '../../content/event';
import { 
  PosterPresentation, 
  PosterAgenda, 
  PosterSpeakers, 
  PosterCollaborators, 
  PosterRegistration,
  PosterFinale 
} from '../posters';
import './Fallback2D.css';

interface Fallback2DProps {
  activeTab: 'hacking' | 'startup';
  onTabChange: (tab: 'hacking' | 'startup') => void;
  onRestart: () => void;
  scrollProgress: { section: ScrollSectionId; t: number };
}

export function Fallback2D({ activeTab, onTabChange, onRestart, scrollProgress }: Fallback2DProps) {
  const sections = scrollSections.filter(s => s.id !== 'home' && s.id !== 'finale');

  // Scroll spy para actualizar navegación
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const _id = entry.target.id as ScrollSectionId;
            // La navegación se actualiza via scrollProgress
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 }
    );

    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (sectionId: ScrollSectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main id="main-content" className="fallback" role="main">
      {/* Hero / Home */}
      <section id="home" className="fallback__section fallback__section--hero" aria-labelledby="home-title">
        <div className="fallback__hero-content">
          <h1 id="home-title" className="display-font fallback__hero-title">
            {scrollProgress.section === 'home' ? 'Tandil Tech Week 2026' : ''}
          </h1>
          <PosterPresentation onScrollStart={() => scrollToSection('presentation')} />
        </div>
      </section>

      {/* Presentación */}
      <section id="presentation" className="fallback__section" aria-labelledby="presentation-title">
        <PosterPresentation />
      </section>

      {/* Agenda */}
      <section id="agenda" className="fallback__section" aria-labelledby="agenda-title">
        <PosterAgenda activeTab={activeTab} onTabChange={onTabChange} />
      </section>

      {/* Speakers */}
      <section id="speakers" className="fallback__section" aria-labelledby="speakers-title">
        <PosterSpeakers />
      </section>

      {/* Colaboradores */}
      <section id="collaborators" className="fallback__section" aria-labelledby="collaborators-title">
        <PosterCollaborators />
      </section>

      {/* Inscripción */}
      <section id="registration" className="fallback__section fallback__section--registration" aria-labelledby="registration-title">
        <PosterRegistration />
      </section>

      {/* Finale */}
      <section id="finale" className="fallback__section fallback__section--finale" aria-labelledby="finale-title">
        <PosterFinale onRestart={onRestart} />
      </section>

      {/* Footer */}
      <footer className="fallback__footer">
        <p>2024 Tandil Tech Week. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}