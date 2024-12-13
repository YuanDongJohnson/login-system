import { createBrowserClient, createServerClient } from "@supabase/ssr";

export function createClient() {
  if (typeof window === 'undefined') {
    // 在服务器端
    return createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVER_KEY!, // 服务器端密钥不应该暴露给客户端
    );
  } else {
    // 在客户端
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
  }
}
