'use client';

import withAuth from '@/components/auth/withAuth';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function SignInPage() {
  const { t } = useTranslation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('login with', username, password);
  };
  const handleForget = () => {
    console.log('forget password');
  };
  const handleSignUp = () => {
    console.log('handleSignUp');
  };

  const CSS_BUTTON =
    'bg-default-interactive rounded-md w-xl h-sm border-3 border-dark-purple text-dark-purple font-bold text-h2 text-center font-jeonju cursor-pointer transition-all duration-300 hover:shadow-custom hover:-translate-y-[0.148rem] flex justify-center items-center';

  const CSS_INPUT = 'border-2 border-dark-purple rounded-md p-sm w-xl';

  return (
    <div className="flex flex-row w-[inherit] h-[100%]">
      <div className="w-2xl h-[500px] m-auto">
        <div className="w-full h-full bg-light-background rounded-lg flex flex-col gap-lg justify-center items-center p-xl">
          {/* 🏓 Title */}
          <p className="text-dark-purple text-h2 font-taebaek">
            {t('signin.title')}
          </p>

          {/* 🔐 Form */}
          <div className="flex flex-col gap-md w-full items-center">
            <input
              className={CSS_INPUT}
              placeholder={t('signin.username')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              className={CSS_INPUT}
              placeholder={t('signin.password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className={CSS_BUTTON} onClick={handleLogin}>
              {t('signin.login')}
            </button>
          </div>
          <div className="flex flex-row gap-sm">
            <button
              onClick={handleForget}
              className="text-sm text-dark-purple underline mt-md"
            >
              {t('signin.forgotPassword')}
            </button>
            <a
              href="/sign-up"
              className="text-sm text-dark-purple underline mt-md"
            >
              {t('signin.signUp')}
            </a>
          </div>

          {/* 🌐 SSO login */}
          <div className="flex flex-col gap-md mt-lg">
            <a href="/api/auth/42" className={CSS_BUTTON}>
              {t('signin.login42')}
            </a>

            <a href="/api/auth/google" className={CSS_BUTTON}>
              {t('signin.loginGoogle')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(SignInPage, 'signIn');
