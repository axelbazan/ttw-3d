import { useEffect, useState, useCallback } from 'react';
import Lenis from 'lenis';
import { getCurrentSection, type ScrollProgress, type ScrollSectionId } from '../utils/math';
import { scrollSections } from '../content/event';

let lenisInstance: Lenis | null = null;

export function useScrollProgress(): ScrollProgress & { 
  scrollTo: (sectionId: ScrollSectionId) => void;
  direction: 'up' | 'down';
  isInitialized: boolean;
} {
  const [progress, setProgress] = useState<ScrollProgress>({
    t: 0,
    section: 'home',
    sectionProgress: 0,
  });
  const [direction, setDirection] = useState<'up' | 'down'>('down');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    let lastT = 0;
    
    function raf(time: number) {
      lenisInstance?.raf(time);
      
      const t = lenisInstance?.scroll || 0;
      const maxScroll = lenisInstance?.limit || 1;
      const normalizedT = maxScroll > 0 ? Math.min(1, t / maxScroll) : 0;
      
      if (normalizedT > lastT) setDirection('down');
      else if (normalizedT < lastT) setDirection('up');
      lastT = normalizedT;
      
      const current = getCurrentSection(normalizedT);
      setProgress({ ...current, direction });
      
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
    setIsInitialized(true);

    return () => {
      lenisInstance?.destroy();
      lenisInstance = null;
    };
  }, []);

  const scrollTo = useCallback((sectionId: ScrollSectionId) => {
    if (!lenisInstance) return;
    
    const section = scrollSections.find(s => s.id === sectionId);
    if (!section) return;
    
    const targetScroll = section.range[0] * (lenisInstance.limit || 1);
    lenisInstance.scrollTo(targetScroll, { duration: 1.5 });
  }, []);

  return { ...progress, direction, scrollTo, isInitialized };
}

export function getLenisInstance() {
  return lenisInstance;
}