import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useScrollFadeIn = (delay = 0, y = 20) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y },
        { opacity: 1, y: 0, duration: 0.6, delay, ease: 'power2.out' }
      );
    }
  }, [delay, y]);

  return ref;
};
