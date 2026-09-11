import gsap from 'gsap';

export const fadeInUp = (element, delay = 0, duration = 0.6) => {
  if (!element) return;
  return gsap.fromTo(
    element,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration, delay, ease: 'power3.out' }
  );
};

export const staggerFadeIn = (elements, stagger = 0.1, delay = 0.2) => {
  if (!elements || elements.length === 0) return;
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 25 },
    { opacity: 1, y: 0, duration: 0.6, stagger, delay, ease: 'power2.out' }
  );
};

export const pulseHighlight = (element) => {
  if (!element) return;
  return gsap.fromTo(
    element,
    { scale: 0.98 },
    { scale: 1, duration: 0.3, ease: 'back.out(1.7)' }
  );
};
