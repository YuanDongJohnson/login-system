// components/PasswordLoginForm/PasswordLoginForm.tsx
import { useState } from 'react';
import Link from 'next/link'; // 导入Link组件
import styles from './PasswordLoginForm.module.css'; // 导入CSS模块

export function PasswordLoginForm({ searchParams }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    // 这里应该是你的登录逻辑，可能是调用一个API或者服务器端的登录函数
    // 由于你使用的是SSR，确保这部分逻辑在服务器端执行或者通过getServerSideProps/getInitialProps等方法处理
    try {
      // 假设登录成功
      // 这里替换为你的实际登录逻辑，例如API调用
      // const response = await yourLoginFunction(email, password);
      // if (response.success) {
      //   重定向到/text页面
      window.location.href = '/text';
      // } else {
      //   setMessage(response.message);
      // }
    } catch (error) {
      console.error('登录请求失败:', error);
      setMessage('登录请求失败');
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
      {/* 使用Link组件创建“忘记密码？”链接 */}
      <div className={styles.forgotPasswordLink}>
        <Link href="/forgot-password">
          <a>忘记密码？</a>
        </Link>
      </div>
    </form>
  );
}
