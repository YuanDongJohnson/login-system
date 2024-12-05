import { NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/text' // 默认重定向到text页面

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`origin{next}`) // 重定向到text页面
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://forwardedHost{next}`) // 重定向到text页面
      } else {
        return NextResponse.redirect(`origin{next}`) // 重定向到text页面
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`KaTeX parse error: Expected 'EOF', got '}' at position 33: …h-code-error`)
}̲
