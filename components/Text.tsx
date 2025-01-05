'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export const Text = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [dateTime, setDateTime] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
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
      setDateTime(now.toLocaleString('zh-TW', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      }));
    };

    const intervalId = setInterval(updateDateTime, 1000);
    updateDateTime();

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // 模拟页面浏览量增加
    setPageViews(prev => prev + 1);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages(prev => [...prev, message]);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-btn-background text-foreground animate-in">
      {/* Reserved div for header */}
      <div className="w-full h-14 bg-background border-b border-foreground/20"></div>

      <main className="container mx-auto px-4 py-8">
        <div className="fixed top-1/2 right-4 transform -translate-y-1/2 bg-gradient-to-r from-btn-background to-btn-background-hover text-foreground p-4 rounded-md shadow-lg writing-vertical-rl z-50">
          <span>今天是</span>
          <span>{dateTime}</span>
        </div>

        <div className="my-8">
          <h1 className="text-3xl font-bold mb-4">老吳動物模型手工坊</h1>
          <h2 className="text-xl mb-8">正宗純手工制造</h2>
          <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg shadow-lg">
            {[
              "https://ossk.cc/file/2a4dbce26a0a292ec7b9e.jpg",
              "https://ossk.cc/file/a549d6369564d95293ec4.jpg",
              "https://ossk.cc/file/e6cf2f8f673b22749c289.jpg",
              "https://ossk.cc/file/4d5f87eb47bbbaab727e5.jpg",
              "https://ossk.cc/file/34b9971cb2ee5a952e708.jpg",
              "https://ossk.cc/file/be42fb1e0b378ea613071.jpg"
            ].map((src, index) => (
              <Image
                key={src}
                src={src}
                alt={`Image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className={`transition-opacity duration-1000 ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">制作視頻</h2>
        <div className="relative w-full pb-[56.25%] rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://streamable.com/e/fzzvlw?autoplay=1"
            allow="fullscreen;autoplay"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full border-0"
          />
        </div>

        <div className="my-8">
          <h2 className="text-2xl font-bold mb-4">留言板</h2>
          <form onSubmit={handleSubmit} className="mb-4">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border rounded"
              rows={4}
              placeholder="请留下您的留言..."
            />
            <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              提交留言
            </button>
          </form>
          <div className="space-y-2">
            {messages.map((msg, index) => (
              <div key={index} className="p-2 bg-gray-100 rounded">
                {msg}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center my-4">
          當前瀏覽量: <span>{pageViews}</span>
        </div>

        <div className="bg-btn-background text-foreground p-6 rounded-lg shadow-lg mt-8">
          <h2 className="text-2xl font-bold mb-4">聯繫方式</h2>
          <h3 className="text-xl mb-2">老吳</h3>
          <p><strong>Line:</strong> <a href="https://line.me/ti/p/5001120" className="text-blue-500 hover:underline">5001120</a></p>
        </div>
      </main>
    </div>
  );
};

