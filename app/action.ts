import { createClient } from '@/utils/supabase/server';

export async function signIn(formData: FormData) {
  'use server'

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: '无法验证的用户' };
  }

  redirect('/text');
}

