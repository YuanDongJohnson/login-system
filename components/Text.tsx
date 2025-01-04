'use client'
import React, { useEffect, useState } from 'react';

export const Text = () => {
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setDateTime(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    const images = document.querySelectorAll('.carousel img');
    
    const cycle = () => {
      const current = document.querySelector('.carousel img.active');
      if (current) current.classList.remove('active');
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.add('active');
    };

    const intervalId = setInterval(cycle, 8000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // 动态添加 Waline 的 CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/@waline/client@v3/dist/waline.css';
    document.head.appendChild(link);

    // 动态添加 Waline 的 JavaScript
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@waline/client@v3/dist/waline.js';
    script.onload = () => {
      // @ts-ignore
      Waline.init({
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
    };
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <style jsx>{`
        .writing-vertical-rl {
          writing-mode: vertical-rl;
        }
        .carousel img {
          display: none;
        }
        .carousel img.active {
          display: block;
          animation: scaleUp 0.5s ease-in-out;
        }
        @keyframes scaleUp {
          from { transform: scale(0.5); }
          to { transform: scale(1); }
        }
      `}</style>

      <div className="header bg-[#fff0f7] py-5 text-center">
        <h1 className="text-2xl font-bold">老吳動物模型手工坊</h1>
        <h2 className="text-xl">正宗純手工制造</h2>
      </div>

      <div className="fixed top-1/2 right-5 transform -translate-y-1/2 flex flex-col items-center justify-center bg-gradient-to-br from-[#89f7fe] to-[#66a6ff] text-[#003c82] p-2 rounded shadow-md writing-vertical-rl text-center text-sm leading-normal z-50">
        <span>今天是</span>
        <span>{dateTime}</span>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center">
          <div className="carousel relative w-56 h-44 border-2 border-black overflow-hidden mb-8">
            <img src="https://ossk.cc/file/2a4dbce26a0a292ec7b9e.jpg" alt="Image 1" className="active" />
            <img src="https://ossk.cc/file/a549d6369564d95293ec4.jpg" alt="Image 2" />
            <img src="https://ossk.cc/file/e6cf2f8f673b22749c289.jpg" alt="Image 3" />
            <img src="https://ossk.cc/file/4d5f87eb47bbbaab727e5.jpg" alt="Image 4" />
            <img src="https://ossk.cc/file/34b9971cb2ee5a952e708.jpg" alt="Image 5" />
            <img src="https://ossk.cc/file/be42fb1e0b378ea613071.jpg" alt="Image 6" />
          </div>

          <h2 className="text-xl font-bold mb-4">制作視頻</h2>
          <div className="video-container relative w-full max-w-2xl aspect-square mb-8">
            <iframe
              src="https://streamable.com/e/fzzvlw?autoplay=1"
              allow="fullscreen;autoplay"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full border-none"
            ></iframe>
          </div>

          <div id="waline" className="w-full max-w-2xl mb-8"></div>

          <div id="article-info" className="text-center mb-8">
            當前瀏覽量: <span className="waline-pageview-count" />
          </div>

          <div className="contact-info bg-[#343a40] text-white p-5 text-center rounded-lg shadow-md w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-2">聯繫方式</h2>
            <h2 className="text-lg mb-2">老吳</h2>
            <p>
              <strong>Line:</strong>{' '}
              <a href="https://line.me/ti/p/5001120" className="text-white hover:underline">
                5001120
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

