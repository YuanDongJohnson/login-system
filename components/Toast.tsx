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
    <div style={{ opacity: opacity, transition: 'opacity 0.3s ease-in-out' }}>
      {message}
    </div>
  );
};

export default Notification;

