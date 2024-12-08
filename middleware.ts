import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // 如果用户已登录并尝试访问登录或重置密码页面，则重定向到主页
  if (session && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/reset-password')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // 对于其他路由，继续正常处理
  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}

