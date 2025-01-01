'use client'

import React, { useState, useEffect } from 'react';

interface Props {
  message: string;
}

const Notification: React.FC<Props> = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    setOpacity(1);

    const timer = setTimeout(() => {
      setOpacity(0);
    }, 3000);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3300);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [message]);

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      className="mt-4 p-4 bg-foreground/10 text-red-600 text-center rounded-md"
      style={{
        transition: 'opacity 300ms ease-in-out',
        opacity: opacity
      }}
    >
      {message}
    </div>
  );
};

export default Notification;

