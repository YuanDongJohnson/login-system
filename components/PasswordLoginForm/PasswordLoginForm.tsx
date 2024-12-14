import { useState } from 'react';
import Link from 'next/link';
import styles from './PasswordLoginForm.module.css'; // 假设你有一个CSS模块

export function PasswordLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // 处理登录成功的情况，比如重定向到主页
        window.location.href = '/';
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
      className={styles.form}
      onSubmit={handleLogin}
    >
      <input
        className={styles.input}
        type="email"
        name="email"
        placeholder="邮箱"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className={styles.input}
        type="password"
        name="password"
        placeholder="密码"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className={styles.button} type="submit">
        登录/注册
      </button>
      {message && (
        <p className={styles.message}>{message}</p>
      )}
      <Link href="/forgot-password">
        <a className={styles.forgotPassword}>忘记密码</a>
      </Link>
    </form>
  );
}
