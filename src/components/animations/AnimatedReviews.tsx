'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, StarHalf } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { reviews } from '@/constants/reviewsData';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type ReviewBoxProps = {
  review: any;
};

function BluredBox() {
  return (
    <div className="absolute right-0 top-0 overflow-hidden h-full w-full pointer-events-none">
      <div className="bg-own-primary-3 blur-3xl opacity-70 absolute top-2 right-2 h-[100px] w-[100px] z-[1]" />
      <div className="bg-own-primary-1 blur-3xl opacity-90 absolute bottom-2 left-2 h-[100px] w-[100px] z-[1]" />
    </div>
  );
}

function ReviewBox({ review }: ReviewBoxProps) {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        // Full star
        stars.push(<Star key={i} stroke="none" fill="#DDA909" className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />);
      } else if (i === fullStars && hasHalfStar) {
        // Half star
        stars.push(<StarHalf key={i} stroke="none" fill="#DDA909" className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />);
      }
    }

    return stars;
  };

  return (
    <div className="bg-black border min-w-[200px] sm:min-w-[280px] md:min-w-[460px] lg:min-w-[560px] h-[180px] sm:h-[220px] md:h-[280px] p-2 sm:p-4 md:p-6 shadow-lg transition-all duration-300 relative will-change-transform rounded-xl overflow-hidden">
      <BluredBox />

      <div className="flex flex-col gap-1 sm:gap-2 w-full relative z-10">
        {/* Stars and numeric rating */}
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="flex gap-1 md:gap-2">{renderStars(review.rating)}</div>
          <p className="text-white text-xs sm:text-sm md:text-base">{review.rating}</p>
        </div>

        {/* Comment text */}
        <p className="text-white/80 mb-1 sm:mb-2 md:mb-4 line-clamp-2 sm:line-clamp-3 md:line-clamp-4 text-xs sm:text-sm md:text-base">
          {review.comment.substring(0, 150)}
        </p>

        {/* Name and profile image */}
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
            <Image
              src={`/reviews-profiles/${review.image}`}
              height={40}
              width={40}
              alt="Profile Image"
              className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 rounded-full"
            />
            <h3 className="text-xs sm:text-sm md:text-base font-medium text-white">{review.name}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function AnimatedReviews() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowsContainerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [randomizedReviews] = useState(() => shuffleArray(reviews));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isVisible || !rowsRef.current.length) return;

    rowsRef.current.forEach((row, index) => {
      const initialOffset = index % 2 === 0 ? '5%' : '-5%';
      gsap.set(row, { x: initialOffset });
    });

    const animations = rowsRef.current.map((row, index) => {
      const direction = index % 2 === 0 ? 1 : -1;

      return gsap.to(row, {
        x: `-=${direction * 15}%`,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
          fastScrollEnd: true,
          preventOverlaps: true,
        },
      });
    });

    return () => {
      animations.forEach((anim) => {
        if (anim.scrollTrigger) {
          anim.scrollTrigger.kill();
        }
        anim.kill();
      });
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isVisible]);

  const addRowRef = (el: HTMLDivElement | null, index: number) => {
    if (el && !rowsRef.current[index]) {
      rowsRef.current[index] = el;
    }
  };

  const getReviewsPerRow = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 480) return 3;
      if (window.innerWidth < 640) return 4;
      if (window.innerWidth < 1024) return 5;
      return 6;
    }
    return 5;
  };

  const [reviewsPerRow, setReviewsPerRow] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      setReviewsPerRow(getReviewsPerRow());
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderReviewRow = (startIndex: number, rowIndex: number) => (
    <div
      ref={(el) => addRowRef(el, rowIndex)}
      className={`review-row flex gap-2 md:gap-3 will-change-transform ${rowIndex % 2 === 0 ? '' : 'flex-row-reverse'}`}
    >
      {randomizedReviews.slice(startIndex, startIndex + reviewsPerRow).map((review, index) => (
        <ReviewBox key={index} review={review} />
      ))}
    </div>
  );

  return (
    <div ref={containerRef} className="bg-own-primary-5 overflow-hidden">
      {isVisible && (
        <div className="h-[600px] sm:h-[700px] md:h-[800px] rotate-[-5deg]">
          <div ref={rowsContainerRef} className="rotate-[-5deg] relative transform-gpu -mt-10 md:-mt-20">
            <div className="space-y-2 md:space-y-3">
              {renderReviewRow(0, 0)}
              {renderReviewRow(5, 1)}
              {renderReviewRow(10, 2)}
              {renderReviewRow(15, 3)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
