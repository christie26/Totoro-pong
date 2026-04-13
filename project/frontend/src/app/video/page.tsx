'use client';
import withAuth from '@/components/auth/withAuth';
import { useState } from 'react';

function VideoPage() {
  const [activeScreen, setActiveScreen] = useState('friend');

  const changeScreen = (screenName: string) => {
    setActiveScreen(screenName);
  };

  function className(isActive: boolean): string {
    return (
      'w-[120px] h-[50px] border-3 rounded-md text-h2 hover:bg-light-background hover:border-dark-gray font-taebaek' +
      (isActive
        ? ' bg-default border-dark-purple text-dark-purple'
        : ' bg-light-gray border-gray text-gray')
    );
  }

  return <div className="flex flex-row w-[100%] h-[100%]">video!!</div>;
}

export default withAuth(VideoPage, 'video');
