// components/PasswordLoginForm/PasswordLoginForm.tsx
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client'; // 确保这个路径是正确的
import styles from './PasswordLoginForm.module.css';

export function PasswordLoginForm({ searchParams }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const supabase = createClient(); // 在组件内部创建 Supabase 客户端

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      });
      if (error) {
        throw error; // 抛出错误以便下面的 catch 块可以捕获
      }
      // 登录成功后的逻辑
      window.location.href = '/text'; // 重定向到成功页面或其他逻辑
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
      <a href="/forgot-password" className={styles.forgotPasswordLink}>
        忘记密码？
      </a>
    </form>
  );
}
