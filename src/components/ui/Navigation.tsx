import { useState, useEffect } from 'react';
import { socialLinks, scrollSections, type ScrollSectionId } from '../../content/event';
import './Navigation.css';

interface NavigationProps {
  activeSection: ScrollSectionId;
  onSectionClick: (sectionId: ScrollSectionId) => void;
}

export function Navigation({ activeSection, onSectionClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navSections = scrollSections.filter(s => 
    ['presentation', 'agenda', 'speakers', 'collaborators', 'registration'].includes(s.id)
  );

  return (
    <nav className={`nav ${isScrolled ? 'nav--scrolled' : ''}`} role="navigation" aria-label="Navegación principal">
      <div className="nav__brand">
        <a href="#home" className="nav__logo" onClick={(e) => { e.preventDefault(); onSectionClick('home'); }}>
          <span className="nav__logo-mark" aria-hidden="true">TTW</span>
          <span className="nav__logo-text">Tandil Tech Week</span>
        </a>
      </div>

      <ul className={`nav__links ${mobileMenuOpen ? 'nav__links--open' : ''}`}>
        {navSections.map(section => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={`nav__link ${activeSection === section.id ? 'nav__link--active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                onSectionClick(section.id);
                setMobileMenuOpen(false);
              }}
              aria-current={activeSection === section.id ? 'page' : undefined}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav__actions">
        <div className="nav__social" aria-label="Redes sociales">
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="nav__social-link"
            aria-label="Instagram"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a
            href={socialLinks.x}
            target="_blank"
            rel="noopener noreferrer"
            className="nav__social-link"
            aria-label="X"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </a>
        </div>

        <button
          className="nav__menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="nav-links"
          aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {mobileMenuOpen ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>
    </nav>
  );
}