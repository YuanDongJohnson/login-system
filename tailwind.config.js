/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // 包括 app 目录下的所有文件
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    
    // 包括 components 目录下的所有文件
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
      },
      // 你可以根据需要在这里扩展其他的样式规则
    },
  },
  plugins: [
    // 如果你有使用任何 Tailwind CSS 插件，可以在这里引入
  ],
  purge: {
    layers: ['base', 'components', 'utilities'],
    // 包括所有使用 Tailwind 的 CSS 文件
    content: [
      './app/**/*.{js,ts,jsx,tsx}', // app 目录下的所有文件
      './components/**/*.{js,ts,jsx,tsx}', // components 目录下的所有文件
      './pages/**/*.{js,ts,jsx,tsx}', // pages 目录下的所有文件
      './layout/**/*.{js,ts,jsx,tsx}', // layout 目录下的所有文件（如果有）
      './public/**/*.html', // 公共目录下的 HTML 文件
    ],
  },
  // 其他 Tailwind CSS 配置选项...
};
