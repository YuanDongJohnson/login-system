
import { createClient } from "@/utils/supabase/server";

import { NextResponse } from "next/server";



export async function GET(request: Request) {

  // The `/auth/callback` route is required for the server-side auth flow implemented

  // by the SSR package. It exchanges an auth code for the user's session.

  const requestUrl = new URL(request.url);

  const code = requestUrl.searchParams.get("code");



  if (code) {

    const supabase = createClient();

    // Exchange the auth code for a session

    await supabase.auth.exchangeCodeForSession(code);

  }



  // After the sign in process completes, redirect to /text

  // We assume that if we have a code, the authentication was successful

  return NextResponse.redirect(`${requestUrl.origin}/text`);

}
