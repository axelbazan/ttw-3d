import './Loader.css';

interface LoaderProps {
  progress: number;
  onComplete: () => void;
}

export function Loader({ progress, onComplete }: LoaderProps) {
  return (
    <div className={`loader ${progress >= 1 ? 'loader--hidden' : ''}`} role="status" aria-label="Cargando experiencia 3D" aria-busy={progress < 1}>
      <div className="loader__content">
        <div className="loader__logo">
          <span className="loader__logo-mark">TTW</span>
          <span className="loader__logo-text">Tandil Tech Week</span>
        </div>
        
        <div className="loader__progress" role="progressbar" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100}>
          <div className="loader__bar" style={{ width: `${progress * 100}%` }} />
        </div>
        
        <p className="loader__text">Cargando experiencia 3D… <span>{Math.round(progress * 100)}%</span></p>
      </div>
    </div>
  );
}