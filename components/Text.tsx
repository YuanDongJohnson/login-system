'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export const Text = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [dateTime, setDateTime] = useState('');
  const [pageViews, setPageViews] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 6);
    }, 8000);

    return () => clearInterval(intervalId);
  }, []);

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

    const intervalId = setInterval(updateDateTime, 1000);
    updateDateTime();

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const storedViews = localStorage.getItem('pageViews');
    const initialViews = storedViews ? parseInt(storedViews, 10) : 0;
    setPageViews(initialViews + 1);
    localStorage.setItem('pageViews', (initialViews + 1).toString());
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <style jsx global>{`
        body, html {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-image: url('https://img.picgo.net/2024/08/09/100001016678588bce22cf558f.md.png');
          background-repeat: repeat;
          background-position: 0 0;
          text-align: center;
          overflow-x: hidden;
        }
        .carousel {
          position: relative;
          width: 220px;
          height: 180px;
          margin: 10px auto;
          border: 2px solid #000;
          overflow: hidden;
        }
        .carousel img {
          width: 220px;
          height: 180px;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }
        .carousel img.active {
          opacity: 1;
          animation: scaleUp 0.5s ease-in-out;
        }
        @keyframes scaleUp {
          from { transform: scale(0.5); }
          to { transform: scale(1); }
        }
        .date-time {
          position: fixed;
          top: 50%;
          right: 20px;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #89f7fe, #66a6ff);
          color: #003c82;
          padding: 10px;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          writing-mode: vertical-rl;
          text-align: center;
          font-size: 16px;
          line-height: 1.5;
          z-index: 1000;
        }
      `}</style>

      {/* 固定高度的页眉空白区块 */}
      <header className="h-16 bg-white shadow-md fixed top-0 left-0 right-0 z-50"></header>

      {/* 主要内容区域 */}
      <main className="flex-grow pt-16 pb-8">
        {/* 固定的标题区块 */}
        <div className="sticky top-16 bg-[#fff0f7] p-4 shadow-sm z-40">
          <h1 className="text-2xl font-bold text-black">老吳動物模型手工坊</h1>
          <h2 className="text-xl text-black">正宗純手工制造</h2>
        </div>

        <div className="date-time">
          <span>今天是</span>
          <span>{dateTime}</span>
        </div>

        <div className="center-content mt-8">
          <div className="carousel">
            {[
              "https://ossk.cc/file/2a4dbce26a0a292ec7b9e.jpg",
              "https://ossk.cc/file/a549d6369564d95293ec4.jpg",
              "https://ossk.cc/file/e6cf2f8f673b22749c289.jpg",
              "https://ossk.cc/file/4d5f87eb47bbbaab727e5.jpg",
              "https://ossk.cc/file/34b9971cb2ee5a952e708.jpg",
              "https://ossk.cc/file/be42fb1e0b378ea613071.jpg"
            ].map((src, index) => (
              <img
                key={src}
                src={src}
                alt={`Image ${index + 1}`}
                className={index === currentImageIndex ? 'active' : ''}
              />
            ))}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-black mt-8 mb-4">制作視頻</h2>
        <div style={{ position: 'relative', width: 'auto', height: '0px', paddingBottom: '100.000%' }}>
          <iframe
            src="https://streamable.com/e/fzzvlw?autoplay=1"
            allow="fullscreen;autoplay"
            allowFullScreen
            style={{ border: 'none', width: '100%', height: '100%', position: 'absolute', left: '0px', top: '0px', overflow: 'hidden' }}
          />
        </div>

        <div className="text-black mt-4">
          當前瀏覽量: <span>{pageViews}</span>
        </div>
      </main>

      {/* 页脚联系信息 */}
      <footer className="w-full bg-gray-800 text-white py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-2">聯繫方式</h2>
          <h3 className="text-lg mb-1">老吳</h3>
          <p><strong>Line:</strong> <a href="https://line.me/ti/p/5001120" className="hover:underline">5001120</a></p>
        </div>
      </footer>
    </div>
  );
};

