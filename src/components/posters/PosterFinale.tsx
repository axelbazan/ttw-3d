import { registration, socialLinks, event } from '../../content/event';
import './PosterFinale.css';

interface PosterFinaleProps {
  className?: string;
  onRestart?: () => void;
}

export function PosterFinale({ className = '', onRestart }: PosterFinaleProps) {
  return (
    <article className={`poster poster--finale ${className}`} role="region" aria-label="Final Tandil Tech Week 2026">
      <div className="poster__blob-finale" aria-hidden="true" />

      <header className="poster__header">
        <h1 className="display-font poster__title">
          La piedra se movió.
        </h1>
      </header>

      <div className="poster-divider" />

      <blockquote className="poster__tagline">
        <p className="body-text poster__tagline-text">
          {event.tagline}
        </p>
      </blockquote>

      <div className="poster-divider" />

      <div className="poster__cta-group">
        {registration.buttons.map((btn, i) => (
          <a
            key={i}
            href={btn.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`poster-btn poster-btn--${btn.variant} poster-btn--large`}
          >
            {btn.label}
          </a>
        ))}
      </div>

      <div className="poster-divider" />

      <footer className="poster__footer">
        <div className="poster__social">
          <span className="eyebrow">{registration.social.label}</span>
          <div className="poster__social-links">
            <a
              href={registration.social.instagram}
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
              href={registration.social.x}
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
          className="poster__restart-btn"
          onClick={onRestart}
          aria-label="Volver a empezar la experiencia"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          Volver a empezar
        </button>

        <p className="poster__footer-text">{registration.footer}</p>
      </footer>
    </article>
  );
}