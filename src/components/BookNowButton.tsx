'use client'

import React, { useEffect, useState } from 'react';

const BookNowButton = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-0 w-full flex justify-center p-4 ${
        isVisible ? '' : 'invisible'
      }`}
    >
      <button className="w-11/12 h-14 rounded-2xl bg-p-blue text-white text-lg">
        Book Now
      </button>
    </div>
  );
};

export default BookNowButton;
