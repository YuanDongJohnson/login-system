
// app/api/captcha.js

import { createCanvas } from 'canvas';

import LRUCache from 'lru-cache';



const captchaCache = new LRUCache({

  max: 1000,

  ttl: 1000 * 60 * 5, // 5分钟过期

});



export default async function handler(req, res) {

  if (req.method === 'GET') {

    const canvas = createCanvas(120, 30);

    const context = canvas.getContext('2d');



    // 生成随机验证码

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let captcha = '';

    for (let i = 0; i < 6; i++) {

      captcha += chars.charAt(Math.floor(Math.random() * chars.length));

    }



    // 绘制验证码

    context.font = '20px Arial';

    context.fillStyle = '#000000';

    context.fillText(captcha, 10, 20);



    // 添加干扰线

    for (let i = 0; i < 5; i++) {

      context.beginPath();

      context.moveTo(Math.random() * 120, Math.random() * 30);

      context.lineTo(Math.random() * 120, Math.random() * 30);

      context.strokeStyle = '#cccccc';

      context.stroke();

    }



    // 将验证码答案存储在缓存中

    const key = `captcha:
{Date.now()}`;

    captchaCache.set(key, captcha);



    // 返回验证码图片

    const buffer = canvas.toBuffer('image/png');

    res.setHeader('Content-Type', 'image/png');

    res.setHeader('Cache-Control', 'no-store');

    res.send(buffer);



    // 返回验证码答案的键，用于前端验证

    res.json({ key });

  } else {

    res.setHeader('Allow', ['GET']);

    res.status(405).end(`Method 
{req.method} Not Allowed`);

  }

}
