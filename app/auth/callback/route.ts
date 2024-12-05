import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  try {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/text'

    if (code) {
      const supabase = await createClient()
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (error) {
        console.error('Error exchanging code for session:', error)
        throw error
      }
      return NextResponse.redirect(`${origin}${next}`)
    }

    console.error('No code provided in the callback')
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
  } catch (error) {
    console.error('Error in auth callback:', error)
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
  }
}

