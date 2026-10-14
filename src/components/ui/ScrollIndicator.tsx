import { scrollSections, type ScrollSectionId } from '../../content/event';
import './ScrollIndicator.css';

interface ScrollIndicatorProps {
  currentSection: ScrollSectionId;
  onDotClick: (sectionId: ScrollSectionId) => void;
}

export function ScrollIndicator({ currentSection, onDotClick }: ScrollIndicatorProps) {
  const sections = scrollSections.filter(s => s.id !== 'home' && s.id !== 'finale');

  return (
    <aside className="scroll-indicator" aria-label="Progreso de scroll" role="navigation">
      {sections.map((section, index) => (
        <button
          key={section.id}
          className={`scroll-indicator__dot ${currentSection === section.id ? 'scroll-indicator__dot--active' : ''}`}
          onClick={() => onDotClick(section.id)}
          aria-label={section.label}
          aria-current={currentSection === section.id ? 'true' : 'false'}
          title={section.label}
        >
          <span className="scroll-indicator__dot-inner" />
          <span className="scroll-indicator__tooltip">{section.label}</span>
        </button>
      ))}
    </aside>
  );
}