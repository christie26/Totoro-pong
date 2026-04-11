'use client';
import withAuth from '@/components/auth/withAuth';

import { ApiContext } from '@/app/_internal/provider/ApiContext';
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
    <div className="min-h-screen flex items-center justify-center">
      <SignUpForm form={form} setForm={setForm} onSubmit={handleSubmit} />
    </div>
  );
}

export default withAuth(SignUpPage, 'signUp');
