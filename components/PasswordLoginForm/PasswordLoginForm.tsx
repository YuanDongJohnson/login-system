// components/PasswordLoginForm/PasswordLoginForm.tsx
import { useState } from 'react';
import Link from 'next/link';
import styles from './PasswordLoginForm.module.css'; // 引入样式文件

export function PasswordLoginForm({ searchParams }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // 处理登录成功的情况，比如重定向到主页
        window.location.href = '/text';
      } else {
        // 处理登录失败的情况
        const data = await response.json();
        setMessage(data.message || '登录失败');
      }
    } catch (error) {
      console.error('登录请求失败:', error);
      setMessage('登录请求失败');
    }
  };

  return (
    <form
      className={styles.passwordLoginFormContainer}
      onSubmit={handleLogin}
    >
      <input
        className={styles.inputField}
        type="email"
        name="email"
        placeholder="邮箱"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className={styles.inputField}
        type="password"
        name="password"
        placeholder="密码"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className={styles.loginButton} type="submit">
        登录/注册
      </button>
      {message && (
        <p className={styles.errorMessage}>{message}</p>
      )}
      <Link href="/forgot-password">
        <a className={styles.forgotPasswordLink}>忘记密码</a>
      </Link>
    </form>
  );
}
