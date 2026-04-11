'use client';

import { ApiContext } from '@/app/_internal/provider/ApiContext';
import withAuth from '@/components/auth/withAuth';
import SignUpForm from '@/components/sign-up/SignUpForm';
import { useRouter } from 'next/navigation';
import { useCallback, useContext, useState } from 'react';

function SignUpPage() {
  const { api } = useContext(ApiContext);
  const router = useRouter();

  const [form, setForm] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    avatar: '',
  });

  const handleSubmit = useCallback(async () => {
    console.log('submit signup with ', form);

    try {
      if (!form.username || !form.avatar) {
        alert('Missing required fields');
        return;
      }

      await api.authControllerRegister({
        nickname: form.username,
        imageUrl: form.avatar,
      });

      router.push('/friend');
    } catch (error: any) {
      console.error(error);
      alert(error?.error?.message ?? 'Sign up failed');
    }
  }, [api, form, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-light-background">
      <div className="w-[420px] bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-2xl border border-gray-200">
        {/* 🧾 Title */}
        <h1 className="text-2xl font-bold text-dark-purple text-center mb-xl">
          Create your account
        </h1>

        {/* 📝 Form */}
        <SignUpForm form={form} setForm={setForm} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default withAuth(SignUpPage, 'signUp');
