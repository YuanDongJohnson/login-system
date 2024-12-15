module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', // Next.js 页面
    './components/**/*.{js,ts,jsx,tsx}', // 组件
    './app/**/*.{js,ts,jsx,tsx}', // Next.js app 目录
    './layout/**/*.{js,ts,jsx,tsx}', // Next.js layout 目录（如果有）
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          'background-hover': "hsl(var(--btn-background-hover))",
        },
      },
    },
  },
  plugins: [],
};
