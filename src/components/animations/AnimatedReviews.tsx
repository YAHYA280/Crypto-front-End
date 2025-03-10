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
  // Helper function to render stars based on rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating); // number of full stars
    const hasHalfStar = rating - fullStars >= 0.5; // check if there's a half star
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        // Full star
        stars.push(<Star key={i} stroke="none" fill="#DDA909" className="h-5 w-5" />);
      } else if (i === fullStars && hasHalfStar) {
        // Half star
        stars.push(<StarHalf key={i} stroke="none" fill="#DDA909" className=" h-5 w-5" />);
      }
      //  else {
      //   // Empty or inactive star
      //   stars.push(<Star key={i} stroke="none" fill="#FFFF" className="h-5 w-5" />);
      // }
    }

    return stars;
  };

  return (
    <div className="bg-black border min-w-[560px] h-[280px] p-6 shadow-lg transition-all duration-300 relative will-change-transform rounded-xl overflow-hidden">
      <BluredBox />

      <div className="flex flex-col gap-2 w-[200px] sm:w-[500px] relative z-10">
        {/* Stars and numeric rating */}
        <div className="flex items-center gap-2">
          <div className="flex gap-2">{renderStars(review.rating)}</div>
          <p className="text-white">{review.rating}</p>
        </div>

        {/* Comment text */}
        <p className="text-white/80 mb-4 line-clamp-4">{review.comment.substring(0, 250)}</p>

        {/* Name and profile image */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image
              src={`/reviews-profiles/${review.image}`}
              height={40}
              width={40}
              alt="Profile Image"
              className="h-10 w-10 rounded-full"
            />
            <h3 className="text-base font-medium text-white mb-2">{review.name}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AnimatedReviews() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowsContainerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement[]>([]);
  // Use state to control rendering for better performance
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set up IntersectionObserver to detect when reviews are in view
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

  // Set up GSAP animations after component is visible
  useEffect(() => {
    if (!isVisible || !rowsRef.current.length) return;

    // First, ensure each row has a different starting position
    rowsRef.current.forEach((row, index) => {
      // Alternating starting positions for each row
      const initialOffset = index % 2 === 0 ? '5%' : '-5%';
      gsap.set(row, { x: initialOffset });
    });

    // Create optimized animations for each row
    const animations = rowsRef.current.map((row, index) => {
      const direction = index % 2 === 0 ? 1 : -1;

      return gsap.to(row, {
        x: `-=${direction * 15}%`, // Use relative value with -= or += to ensure proper movement
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5, // Smoother scrubbing
          fastScrollEnd: true,
          preventOverlaps: true,
        },
      });
    });

    return () => {
      // Clean up animations
      animations.forEach((anim) => {
        if (anim.scrollTrigger) {
          anim.scrollTrigger.kill();
        }
        anim.kill();
      });
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isVisible]);

  // Add a row to the refs
  const addRowRef = (el: HTMLDivElement | null, index: number) => {
    if (el && !rowsRef.current[index]) {
      rowsRef.current[index] = el;
    }
  };

  const renderReviewRow = (startIndex: number, rowIndex: number) => (
    <div
      ref={(el) => addRowRef(el, rowIndex)}
      className={`review-row flex gap-3 will-change-transform ${rowIndex % 2 === 0 ? '' : 'flex-row-reverse'}`}
    >
      {reviews.slice(startIndex, startIndex + 5).map((review, index) => (
        <ReviewBox key={index} review={review} />
      ))}
    </div>
  );

  return (
    <div ref={containerRef} className="bg-own-primary-5  overflow-hidden">
      {isVisible && (
        <div className=" h-[800px] rotate-[-5deg]">
          {/* Apply transform-gpu for GPU acceleration and rotate-[-6deg] for the tilt to the left */}
          <div ref={rowsContainerRef} className="rotate-[-5deg] relative  transform-gpu -mt-20">
            <div className="space-y-3">
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
