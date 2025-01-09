'use client'

import { useEffect, useState, useRef } from 'react';

export default function ClientContent() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [dateTime, setDateTime] = useState('');
  const [pageViews, setPageViews] = useState(0);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const images = [
    "https://ossk.cc/file/2a4dbce26a0a292ec7b9e.jpg",
    "https://ossk.cc/file/a549d6369564d95293ec4.jpg",
    "https://ossk.cc/file/e6cf2f8f673b22749c289.jpg",
    "https://ossk.cc/file/4d5f87eb47bbbaab727e5.jpg",
    "https://ossk.cc/file/34b9971cb2ee5a952e708.jpg",
    "https://ossk.cc/file/be42fb1e0b378ea613071.jpg"
  ];

  useEffect(() => {
    let mounted = true;
    const intervalId = setInterval(() => {
      if (mounted) {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }, 5000);

    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, [images.length]);

  useEffect(() => {
    let mounted = true;
    const updateDateTime = () => {
      if (!mounted) return;
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

    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const storedViews = localStorage.getItem('pageViews');
        const initialViews = storedViews ? parseInt(storedViews, 10) : 0;
        setPageViews(initialViews + 1);
        localStorage.setItem('pageViews', (initialViews + 1).toString());
      }
    } catch (error) {
      console.error('Error updating page views:', error);
    }
  }, []);

  const handleImageClick = () => {
    setEnlargedImage(images[currentImageIndex]);
  };

  const handleCloseEnlarged = () => {
    setEnlargedImage(null);
  };

  return (
    <div className="relative isolate px-6 lg:px-8 pb-32">
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
          cursor: pointer;
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
        .enlarged-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1001;
        }
        .enlarged-image {
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
        }
        #waline {
          width: auto;
          height: auto;
          margin: 20px auto;
        }
        #waline:hover {
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
      `}</style>

      <div className="mx-auto max-w-2xl">
        <div className="date-time">
          <span>今天是</span>
          <span>{dateTime}</span>
        </div>

        <div className="center-content">
          <div className="carousel" ref={carouselRef} onClick={handleImageClick}>
            {images.map((src, index) => (
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

        <div className="text-black mt-4 mb-8">
          當前瀏覽量: <span>{pageViews}</span>
        </div>

        <div id="waline" className="mt-8 mb-16"><span className="text-black">留言區域</span></div>

      </div>

      {enlargedImage && (
        <div className="enlarged-overlay" onClick={handleCloseEnlarged}>
          <img src={enlargedImage} alt="Enlarged" className="enlarged-image" />
        </div>
      )}

      <footer className="fixed bottom-0 left-0 right-0 w-full bg-gray-800 text-white py-4 px-2 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-semibold mb-2">聯繫方式</h2>
          <h3 className="text-base mb-1">老吳</h3>
          <p><strong>Line:</strong> <a href="https://line.me/ti/p/5001120" className="hover:underline">5001120</a></p>
        </div>
      </footer>

      <link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
      <script type="module" dangerouslySetInnerHTML={{
        __html: `
          import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';
          init({
            el: '#waline',
            serverURL: 'https://laowuspeaker.newteam.7749.org/',
            lang: 'zh-TW',
            meta: ['nick'],
            requiredMeta: ['nick'],
            login: 'disable',
            copyright: false,
            pageview: true,
            comment: true,
          });
        `
      }} />
    </div>
  );
}

