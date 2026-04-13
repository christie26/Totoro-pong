'use client';

import withAuth from '@/components/auth/withAuth';
import Navbar from '@/components/common/Navbar';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Page() {
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
      <Navbar />
      main page where we will see Thumbnails
    </div>
  );
}

export default withAuth(Page, 'root');
