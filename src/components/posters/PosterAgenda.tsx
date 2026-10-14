import { days, agendaIntro, tagsMarquee, socialLinks } from '../../content/event';
import './PosterAgenda.css';

interface PosterAgendaProps {
  activeTab: 'hacking' | 'startup';
  onTabChange: (tab: 'hacking' | 'startup') => void;
  className?: string;
}

export function PosterAgenda({ activeTab, onTabChange, className = '' }: PosterAgendaProps) {
  const day = days.find(d => d.id === activeTab)!;

  return (
    <article className={`poster poster--agenda ${className}`} role="region" aria-label={`Agenda: ${day.title}`}>
      {/* Intro */}
      <div className="poster__intro">
        <p className="body-text">{agendaIntro}</p>
      </div>

      <div className="poster-divider" />

      {/* Tabs */}
      <div className="poster__tabs" role="tablist" aria-label="Días del evento">
        {days.map(d => (
          <button
            key={d.id}
            role="tab"
            aria-selected={activeTab === d.id}
            aria-controls={`panel-${d.id}`}
            id={`tab-${d.id}`}
            className={`poster__tab ${activeTab === d.id ? 'poster__tab--active' : ''}`}
            onClick={() => onTabChange(d.id)}
            style={{ '--tab-color': d.tagColor }}
          >
            <span className="poster__tab-tag" style={{ background: d.tagColor }}>
              {d.tagText}
            </span>
          </button>
        ))}
      </div>

      {/* Panel activo */}
      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="poster__panel"
      >
        <div className="poster__day-header">
          <div className="poster__day-chip" style={{ background: day.tagColor }}>
            <span>{day.date}</span>
            <span className="poster__day-place">{day.place}</span>
          </div>
          <div className="poster__day-track">{day.track}</div>
        </div>

        <h2 className="display-font poster__day-title">{day.title}</h2>

        <p className="body-text poster__day-body">{day.body}</p>

        <div className="poster__day-venue">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{day.venue}</span>
        </div>

        <div className="poster-divider" />

        <a
          href={day.href}
          target="_blank"
          rel="noopener noreferrer"
          className="poster-btn poster-btn--blue"
        >
          VER JORNADA
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>

        <p className="body-text-small poster__coming-soon">Coming Soon - Cronograma detallado próximamente</p>
      </div>

      {/* Marquee */}
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

      {/* Redes sociales */}
      <div className="poster-divider" />
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
    </article>
  );
}