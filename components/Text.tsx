'use client'
import React, { useEffect, useState } from 'react';
import { init } from '@waline/client';
import '@waline/client/dist/waline.css';

export const Text = () => {
  const [dateTime, setDateTime] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "https://ossk.cc/file/2a4dbce26a0a292ec7b9e.jpg",
    "https://ossk.cc/file/a549d6369564d95293ec4.jpg",
    "https://ossk.cc/file/e6cf2f8f673b22749c289.jpg",
    "https://ossk.cc/file/4d5f87eb47bbbaab727e5.jpg",
    "https://ossk.cc/file/34b9971cb2ee5a952e708.jpg",
    "https://ossk.cc/file/be42fb1e0b378ea613071.jpg"
  ];

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedDate = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setDateTime(formattedDate);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    init({
      el: '#waline',
      serverURL: 'https://message-eight-gules.vercel.app',
      lang: 'zh-TW',
      meta: ['nick'],
      requiredMeta: ['nick'],
      login: 'disable',
      copyright: false,
      pageview: true,
      comment: true,
    });
  }, []);

  return (
    <div className="relative isolate px-6 lg:px-8 min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <div className="header bg-[#fff0f7] py-5">
        <h1 className="text-2xl font-bold">老吳動物模型手工坊</h1>
        <h2 className="text-xl">正宗純手工制造</h2>
      </div>

      <div className="fixed top-1/2 right-5 transform -translate-y-1/2 flex flex-col items-center justify-center bg-gradient-to-br from-[#89f7fe] to-[#66a6ff] text-[#003c82] p-2 rounded shadow-md writing-vertical-rl text-center text-sm leading-normal z-50">
        <span>今天是</span>
        <span>{dateTime}</span>
      </div>

      <div className="mx-auto max-w-2xl pt-20">
        <div className="text-center">
          {/* Content removed as per request */}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <div className="carousel relative w-56 h-44 border-2 border-black overflow-hidden">
          {images.map((src, index) => (
            <img
              key={src}
              src={src}
              alt={`Image ${index + 1}`}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">制作視頻</h2>
        <div className="video-container relative w-full pb-[100%]">
          <iframe
            src="https://streamable.com/e/fzzvlw?autoplay=1"
            allow="fullscreen;autoplay"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full border-none"
          ></iframe>
        </div>
      </div>

      <div id="waline" className="mt-8"></div>

      <div id="article-info" className="mt-4 text-center">
        當前瀏覽量: <span className="waline-pageview-count" />
      </div>

      <div className="contact-info bg-[#343a40] text-white p-5 text-center mt-8 shadow-md">
        <h2 className="text-xl font-bold mb-2">聯繫方式</h2>
        <h2 className="text-lg mb-2">老吳</h2>
        <p>
          <strong>Line:</strong>{' '}
          <a href="https://line.me/ti/p/5001120" className="text-white no-underline">
            5001120
          </a>
        </p>
      </div>
    </div>
  );
};

