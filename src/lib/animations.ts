import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Define interfaces for the options
interface ScrollTriggerOptions {
  scrollTrigger?: {
    [key: string]: any;
  };
  [key: string]: any;
}

export const setupScrollAnimation = (element: HTMLElement | string, options: ScrollTriggerOptions = {}) => {
  const animation = gsap.to(element, {
    ...options,
    scrollTrigger: {
      ...(options.scrollTrigger || {}),
      fastScrollEnd: true,
      preventOverlaps: true,
    },
  });

  return animation;
};

export const setupScrollTimeline = (options: ScrollTriggerOptions = {}) => {
  const timeline = gsap.timeline({
    scrollTrigger: {
      ...(options.scrollTrigger || {}),
      fastScrollEnd: true,
      preventOverlaps: true,
    },
  });

  return timeline;
};
