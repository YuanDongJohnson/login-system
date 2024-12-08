import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const cookieStore = cookies()
const supabase = createClient(cookieStore)

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('Error signing out:', error)
    return NextResponse.json({ error: 'An error occurred while signing out' }, { status: 500 })
  }

  return NextResponse.json({ message: 'Signed out successfully' })
}

