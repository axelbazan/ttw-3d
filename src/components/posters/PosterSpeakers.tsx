import { speakers } from '../../content/event';
import './PosterSpeakers.css';

interface PosterSpeakersProps {
  className?: string;
}

export function PosterSpeakers({ className = '' }: PosterSpeakersProps) {
  const slots = Array.from({ length: speakers.slots }, (_, i) => i);

  return (
    <article className={`poster poster--speakers ${className}`} role="region" aria-label="Speakers Tandil Tech Week 2026">
      <header className="poster__header">
        <span className="eyebrow">{speakers.eyebrow}</span>
        <h2 className="display-font poster__title">{speakers.title}</h2>
      </header>

      <div className="poster-divider" />

      <p className="body-text poster__body">{speakers.body}</p>

      <div className="poster-divider" />

      <div className="poster__slots" role="list" aria-label="Slots de speakers por confirmar">
        {slots.map((_, i) => (
          <div key={i} className="speaker-slot" role="listitem" aria-label={`Speaker ${i + 1} por confirmar`}>
            ?
          </div>
        ))}
      </div>

      <div className="poster-divider" />

      <footer className="poster__footer">
        <p className="body-text-small poster__note">
          Los speakers se anunciarán próximamente. Estate atento a nuestras redes.
        </p>
      </footer>
    </article>
  );
}