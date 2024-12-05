import Link from 'next/link'

export default function AuthCodeError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">认证错误</h1>
      <p className="mb-4">登录过程中发生错误。请稍后再试。</p>
      <Link href="/login" className="text-blue-500 hover:underline">
        返回登录页面
      </Link>
    </div>
  )
}

