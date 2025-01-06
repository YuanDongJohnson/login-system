import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createClient();
    try {
      // Exchange the auth code for a session
      await supabase.auth.exchangeCodeForSession(code);
    } catch (error) {
      console.error("Error exchanging code for session:", error);
      // Return an error response instead of throwing
      return NextResponse.json({ error: "Authentication failed" }, { status: 400 });
    }
  }

  // After the sign in process completes, redirect to /text
  return NextResponse.redirect(`${requestUrl.origin}/text`);
}
