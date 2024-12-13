// app/PhoneLoginForm.tsx
import { useState } from 'react';

interface PhoneLoginFormProps {
  getQRcode: () => Promise<void>;
  signIn: (event: React.FormEvent) => Promise<void>;
  phone: string;
  setPhone: (phone: string) => void;
  verificationCode: string;
  setVerificationCode: (verificationCode: string) => void;
}

export function PhoneLoginForm({
  getQRcode,
  signIn,
  phone,
  setPhone,
  verificationCode,
  setVerificationCode,
}: PhoneLoginFormProps) {
  return (
    <form onSubmit={signIn} className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
      <div className="mb-4">
        <input
          className="rounded-md px-4 py-2 bg-inherit border w-full"
          type="tel"
          placeholder="手机号"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div className="flex gap-2 mb-4">
        <input
          className="rounded-md px-4 py-2 bg-inherit border flex-1"
          type="text"
          placeholder="验证码"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={getQRcode}
          className="py-2 px-4 rounded-md bg-btn-background hover:bg-btn-background-hover"
        >
          获取验证码
        </button>
      </div>
      <button className="bg-indigo-700 rounded-md px-4 py-2 text-foreground mb-2" type="submit">
        登录/注册
      </button>
    </form>
  );
}
