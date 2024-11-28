'use client';
import React, { useEffect, useState } from 'react';
import PencilWrite from '../lottie/PencilWrite';

function ScrollToTopButton() {
  const [isView, setIsView] = useState(false);
  const handleTopToScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsView(true);
      } else {
        setIsView(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      onClick={handleTopToScroll}
      className={`
        flex items-center justify-center
      scroll-btn
      ${isView ? 'go-Up-view' : 'go_Down-hide'}
      `}
      aria-label="scroll to top"
    >
      <PencilWrite />
    </div>
  );
}

export default ScrollToTopButton;
