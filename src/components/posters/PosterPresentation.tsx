import { event, tagsMarquee, socialLinks } from '../../content/event';
import './PosterPresentation.css';

interface PosterPresentationProps {
  className?: string;
  onScrollStart?: () => void;
}

export function PosterPresentation({ className = '', onScrollStart }: PosterPresentationProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onScrollStart?.();
    }
  };

  return (
    <article className={`poster poster--presentation ${className}`} role="region" aria-label="Presentación Tandil Tech Week 2026">
      <div className="poster__blob" aria-hidden="true" />

      <header className="poster__header">
        <span className="eyebrow">{event.year}</span>
        <h1 className="display-font poster__title">
          {event.name}
          <br />
          <span className="poster__title-date">{event.dates}</span>
        </h1>
      </header>

      <div className="poster-divider" />

      <blockquote className="poster__tagline">
        <p className="body-text poster__tagline-text">
          Un encuentro para
          <br />
          <span className="poster__highlight">construir</span>
          <br />
          <span className="poster__highlight">lo que viene.</span>
        </p>
      </blockquote>

      <div className="poster-divider" />

      <div className="poster__venues">
        <div className="poster__venue">
          <span className="eyebrow">Hacking Day</span>
          <p className="body-text">14 Octubre · Campus Universitario UNICEN</p>
        </div>
        <div className="poster__venue">
          <span className="eyebrow">Startup Day</span>
          <p className="body-text">15 Octubre · Distrito Avellaneda</p>
        </div>
      </div>

      <div className="poster-divider" />

      <div className="poster__marquee" aria-hidden="true">
        <div className="marquee">
          <div className="marquee__content">
            {tagsMarquee.map((tag, i) => (
              <span key={i} className="marquee__item">{tag} ✦</span>
            ))}
            {tagsMarquee.map((tag, i) => (
              <span key={`${i}-dup`} className="marquee__item">{tag} ✦</span>
            ))}
          </div>
        </div>
      </div>

      <div className="poster-divider" />

      <footer className="poster__footer">
        <div className="poster__social">
          <span className="eyebrow">Seguinos</span>
          <div className="poster__social-links">
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="link-text"
              aria-label="Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              {socialLinks.handle}
            </a>
            <a
              href={socialLinks.x}
              target="_blank"
              rel="noopener noreferrer"
              className="link-text"
              aria-label="X"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
              {socialLinks.handle}
            </a>
          </div>
        </div>

        <button
          className="poster__cta"
          onClick={onScrollStart}
          onKeyDown={handleKeyDown}
          aria-label="Scrollear para acercarte a la piedra"
        >
          <span>Scrolleá para acercarte</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </button>
      </footer>
    </article>
  );
}