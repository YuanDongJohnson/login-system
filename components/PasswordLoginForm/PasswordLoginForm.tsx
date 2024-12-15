// components/PasswordLoginForm/PasswordLoginForm.tsx
import { useState } from 'react';
import Link from 'next/link';
import styles from './PasswordLoginForm.module.css';
import { supabase } from '@/utils/supabase/client'; // 确保路径正确

interface SearchParams {
  message: string;
}

interface PasswordLoginFormProps {
  searchParams: SearchParams;
}

export function PasswordLoginForm({ searchParams }: PasswordLoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | undefined>(undefined);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        setMessage(error.message);
      } else {
        // 登录成功，重定向到 '/text'
        window.location.href = '/text';
      }
    } catch (error) {
      console.error('登录请求失败:', error);
      setMessage(error.message || '登录请求失败');
    }
  };

  return (
    <form className={styles.passwordLoginFormContainer} onSubmit={handleLogin}>
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
      <div className={styles.forgotPasswordContainer}>
        <Link href="/forgot-password">
          <a className={styles.forgotPasswordLink}>忘记密码？</a>
        </Link>
      </div>
    </form>
  );
}
