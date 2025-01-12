
// app/api/verifyCaptcha.ts

import LRUCache from 'lru-cache';

import type { NextApiRequest, NextApiResponse } from 'next';



const captchaCache = new LRUCache<string, string>({

  max: 1000,

  ttl: 1000 * 60 * 5, // 5分钟过期

});



export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'POST') {

    const { key, answer } = req.body;

    const correctAnswer = captchaCache.get(key);



    if (correctAnswer && correctAnswer === answer) {

      res.status(200).json({ valid: true });

    } else {

      res.status(200).json({ valid: false });

    }



    // 无论验证结果如何，都删除缓存中的验证码答案

    captchaCache.del(key);

  } else {

    res.setHeader('Allow', ['POST']);

    res.status(405).end(`Method ${req.method} Not Allowed`);

  }

}
