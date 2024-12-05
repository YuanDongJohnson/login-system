import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    if (code) {
      const supabase = createClient()
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (error) {
        console.error('Error exchanging code for session:', error)
        throw error
      }
    }

    // URL to redirect to after sign in process completes
    return NextResponse.redirect(requestUrl.origin)
  } catch (error) {
    console.error('Error in auth callback:', error)
    // TODO: Add a more specific error page
    return NextResponse.redirect(`${requestUrl.origin}/auth/auth-code-error`)
  }
}

