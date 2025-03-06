'use client';

import Lottie from 'lottie-react';

import animationData from '@/public/lottieFiles/matrix.json'; // Update the path based on your project

export default function HeroLottieFile() {
  return (
    <div className="w-full h-full absolute top-0 left-0 z-[1] opacity-50">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
}
