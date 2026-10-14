import { organizers, sponsors } from '../../content/event';
import './PosterCollaborators.css';

interface PosterCollaboratorsProps {
  className?: string;
}

export function PosterCollaborators({ className = '' }: PosterCollaboratorsProps) {
  return (
    <article className={`poster poster--collaborators ${className}`} role="region" aria-label="Colaboradores Tandil Tech Week 2026">
      {/* ORGANIZAN */}
      <section className="poster__section" aria-labelledby="organizan-title">
        <header className="poster__section-header">
          <span className="eyebrow">{organizers.eyebrow}</span>
          <h2 className="display-font poster__section-title" id="organizan-title">{organizers.title}</h2>
        </header>
        <p className="body-text poster__section-body">{organizers.body}</p>

        <div className="poster-divider" />

        <div className="poster__cards-grid" role="list">
          {organizers.items.map((org, i) => (
            <article key={i} className="collab-card" role="listitem">
              <div className="collab-card__logo" aria-hidden="true">
                {/* Placeholder para logo - TODO: reemplazar con SVG real */}
                <div className="collab-card__logo-placeholder">
                  {org.label.split(' ').map(w => w[0]).join('')}
                </div>
              </div>
              <span className="collab-card__label">{org.label}</span>
              <h3 className="collab-card__name">{org.name}</h3>
              <p className="collab-card__desc">{org.description}</p>
              <div className="collab-card__footer">
                <span className="collab-card__tag">{org.footer}</span>
                <a
                  href={org.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="collab-card__link"
                  aria-label={`Visitar ${org.name}`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="poster-divider poster-divider--major" />

      {/* ACOMPAÑAN */}
      <section className="poster__section" aria-labelledby="acompanan-title">
        <header className="poster__section-header">
          <span className="eyebrow">{sponsors.eyebrow}</span>
          <h2 className="display-font poster__section-title" id="acompanan-title">{sponsors.title}</h2>
        </header>
        <p className="body-text poster__section-body">{sponsors.body}</p>

        <div className="poster-divider" />

        <div className="poster__sponsors-grid" role="list">
          {sponsors.items.map((sponsor, i) => (
            <article key={i} className="collab-card collab-card--sponsor" role="listitem">
              <div className="collab-card__logo" aria-hidden="true">
                <div className="collab-card__logo-placeholder">
                  {sponsor.label.split(' ').map(w => w[0]).join('')}
                </div>
              </div>
              <span className="collab-card__label">{sponsor.label}</span>
              <h3 className="collab-card__name">{sponsor.name}</h3>
              <a
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="collab-card__link"
                aria-label={`Visitar ${sponsor.name}`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </article>
          ))}
        </div>
      </section>
    </article>
  );
}