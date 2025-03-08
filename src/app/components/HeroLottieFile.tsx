'use client';

import Lottie from 'lottie-react';
import { useEffect, useRef, useState } from 'react';

import animationData from '@/public/lottieFiles/matrix.json';

export default function HeroLottieFile() {
  const lottieRef = useRef(null);
  const [qualityLevel, setQualityLevel] = useState('high');

  useEffect(() => {
    // Detect mobile or low-end devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile/i.test(navigator.userAgent);
    const isLowPower = window.navigator.hardwareConcurrency && window.navigator.hardwareConcurrency < 4;

    if (isMobile || isLowPower) {
      setQualityLevel('low');
    }
  }, []);

  return (
    <div className="w-full h-full absolute top-0 left-0 z-[1]">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={true}
        className={qualityLevel === 'low' ? 'opacity-30' : 'opacity-50'}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid slice',
          progressiveLoad: true,
          hideOnTransparent: true,
        }}
      />
    </div>
  );
}
