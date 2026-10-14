import { useEffect, useState } from 'react';
import { registration, socialLinks, colors, formatCountdown } from '../../content/event';
import './PosterRegistration.css';

interface PosterRegistrationProps {
  className?: string;
}

export function PosterRegistration({ className = '' }: PosterRegistrationProps) {
  const [countdown, setCountdown] = useState(() => formatCountdown(
    new Date(registration.opensAt).getTime() - Date.now()
  ));
  const [isOpen, setIsOpen] = useState(registration.isOpen);

  useEffect(() => {
    // Verificar estado inicial
    const now = Date.now();
    const opensAt = new Date(registration.opensAt).getTime();
    setIsOpen(now >= opensAt);

    if (now < opensAt) {
      const interval = setInterval(() => {
        const remaining = new Date(registration.opensAt).getTime() - Date.now();
        if (remaining <= 0) {
          setIsOpen(true);
          clearInterval(interval);
        } else {
          setCountdown(formatCountdown(remaining));
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <article className={`poster poster--registration ${className} ${isOpen ? 'poster--open' : ''}`} role="region" aria-label="Inscripciones Tandil Tech Week 2026">
      <header className="poster__header">
        <span className="eyebrow">{registration.eyebrow}</span>
        <h2 className="display-font poster__title">{registration.title}</h2>
      </header>

      <div className="poster-divider" />

      <p className="body-text poster__body">{registration.body}</p>

      <p className="body-text-small poster__note">{registration.note}</p>

      <div className="poster-divider" />

      {!isOpen ? (
        // Estado: Countdown
        <div className="poster__countdown-wrapper">
          <div className="countdown" role="timer" aria-label="Tiempo restante para apertura de inscripciones">
            <div className="countdown__item">
              <span className="countdown__value">{String(countdown.days).padStart(2, '0')}</span>
              <span className="countdown__label">Días</span>
            </div>
            <div className="countdown__item">
              <span className="countdown__value">{String(countdown.hours).padStart(2, '0')}</span>
              <span className="countdown__label">Horas</span>
            </div>
            <div className="countdown__item">
              <span className="countdown__value">{String(countdown.minutes).padStart(2, '0')}</span>
              <span className="countdown__label">Min</span>
            </div>
            <div className="countdown__item">
              <span className="countdown__value">{String(countdown.seconds).padStart(2, '0')}</span>
              <span className="countdown__label">Seg</span>
            </div>
          </div>
        </div>
      ) : (
        // Estado: Abierto - Botones
        <div className="poster__buttons">
          {registration.buttons.map((btn, i) => (
            <a
              key={i}
              href={btn.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`poster-btn poster-btn--${btn.variant}`}
            >
              {btn.label}
            </a>
          ))}
        </div>
      )}

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

        <p className="poster__footer-text">{registration.footer}</p>
      </footer>
    </article>
  );
}