import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Define an interface for the animation config
interface GsapAnimationConfig {
  scrollTrigger?: {
    [key: string]: any;
  };
  [key: string]: any;
}

export function useGsapAnimation(animationConfig: GsapAnimationConfig) {
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const animation = gsap.to(elementRef.current, {
      ...animationConfig,
      scrollTrigger: {
        trigger: elementRef.current,
        ...(animationConfig.scrollTrigger || {}),
        fastScrollEnd: true,
        preventOverlaps: true,
      },
    });

    return () => {
      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
      animation.kill();
    };
  }, [animationConfig]);

  return elementRef;
}
