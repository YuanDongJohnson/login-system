// app/actions.ts
'use server'

import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';

export async function signIn(formData: FormData) {
const email = formData.get('email') as string;
const password = formData.get('password') as string;
const supabase = createClient();

const { error } = await supabase.auth.signInWithPassword({
email,
password,
});

if (error) {
throw new Error('无法验证的用户');
}

return redirect('/text');
}
