'use client';

import React, { useRef, useEffect, useState } from 'react';

interface CaptchaProps {
  onRefresh: () => void;
  onCaptchaChange: (captcha: string) => void;
}

export function Captcha({ onRefresh, onCaptchaChange }: CaptchaProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [captchaText, setCaptchaText] = useState('');

  const generateCaptcha = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let captcha = '';
    for (let i = 0; i < 4; i++) {
      captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptchaText(captcha);
    onCaptchaChange(captcha);

    ctx.font = 'bold 30px Arial';
    ctx.fillStyle = '#333';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    for (let i = 0; i < captcha.length; i++) {
      const x = 50 + i * 40;
      const y = canvas.height / 2 + (Math.random() - 0.5) * 10;
      ctx.fillText(captcha[i], x, y);
    }

    // Add some noise
    for (let i = 0; i < 50; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.strokeStyle = '#777';
      ctx.stroke();
    }
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleRefresh = () => {
    generateCaptcha();
    onRefresh();
  };

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} width="200" height="50" className="border border-gray-300" />
      <button
        type="button"
        onClick={handleRefresh}
        className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
      >
        刷新验证码
      </button>
    </div>
  );
}

export function validateCaptcha(input: string, captchaText: string): boolean {
  return input.toLowerCase() === captchaText.toLowerCase();
}

