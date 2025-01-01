import Header from '@/components/Header/Header';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { SignupForm } from '@/components/SignupForm';

export default async function Signup() {
const supabase = createClient();

const {
data: { session },
} = await supabase.auth.getSession();

if (session) {
return redirect('/text');
}

const signUp = async (formData: FormData) => {
'use server';

const origin = headers().get('origin');
const email = formData.get('email') as string;
const password = formData.get('password') as string;
const supabase = createClient();

// 检查邮箱是否已注册
const { data: existingUser } = await supabase
.from('users')
.select('id')
.eq('email', email)
.single();

if (existingUser) {
return { error: '该电子邮箱已被注册' };
}

const { error } = await supabase.auth.signUp({
email,
password,
options: {
emailRedirectTo: `${origin}/auth/callback`,
},
});

if (error) {
return { error: '无法注册用户' };
}

return { error: null };
};

return (
<div>
<Header />

<Link
href="/"
className="py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover text-sm m-4"
>
回首页
</Link>

<div className="w-full px-8 sm:max-w-md mx-auto mt-4">
<SignupForm signUp={signUp} />
</div>
</div>
);
}
