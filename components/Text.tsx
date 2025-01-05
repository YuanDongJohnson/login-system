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
    // Simulate page view count
    const storedViews = localStorage.getItem('pageViews');
    const initialViews = storedViews ? parseInt(storedViews, 10) : 0;
    setPageViews(initialViews + 1);
    localStorage.setItem('pageViews', (initialViews + 1).toString());
  }, []);

  return (
    <div className="relative isolate">
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
          color: black;
        }
        .header {
          position: relative;
          padding: 20px 0;
          background: #fff0f7;
          margin-bottom: 20px;
        }
        .header h1, .header h2 {
          margin: 0;
          color: black;
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
        }
        .contact-info {
          background: #343a40;
          color: #fff;
          padding: 20px;
          text-align: center;
          margin-top: 30px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .contact-info h2 {
          margin-bottom: 10px;
          color: white;
        }
        .contact-info p {
          margin: 5px 0;
          color: white;
        }
        .contact-info a {
          color: white;
          text-decoration: none;
        }
        .video-container {
          position: relative;
          width: auto;
          padding-bottom: 56.25%;
          margin: auto;
        }
        .video-container iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
        }
      `}</style>

      {/* 顶部预留的div区块 */}
      <div className="w-full h-14 bg-background border-b border-foreground/20"></div>

      <div className="header">
        <h1>老吳動物模型手工坊</h1>
        <h2>正宗純手工制造</h2>
      </div>

      <div className="date-time">
        <span>今天是</span>
        <span>{dateTime}</span>
      </div>

      <div className="mx-auto max-w-2xl pt-20 px-6 lg:px-8">
        <div className="center-content">
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

        <h2 style={{color: 'black'}}>制作視頻</h2>
        <div className="video-container">
          <iframe
            src="https://streamable.com/e/fzzvlw?autoplay=1"
            allow="fullscreen;autoplay"
            allowFullScreen
          />
        </div>

        <div id="article-info" style={{color: 'black', marginTop: '20px'}}>
          當前瀏覽量: <span>{pageViews}</span>
        </div>

        <div className="contact-info">
          <h2>聯繫方式</h2>
          <h2>老吳</h2>
          <p><strong>Line:</strong> <a href="https://line.me/ti/p/5001120">5001120</a></p>
        </div>
      </div>
    </div>
  );
};

