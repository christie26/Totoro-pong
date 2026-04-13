'use client';

import { ApiContext } from '@/app/_internal/provider/ApiContext';
import { avatarToUrl } from '@/app/_internal/util/avatarToUrl';
import withAuth from '@/components/auth/withAuth';
import { Button } from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import { useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

const avatars = [
  '/avatar/avatar-blue.svg',
  '/avatar/avatar-black.svg',
  '/avatar/avatar-big.svg',
  '/avatar/avatar-small.svg',
];

function OnboardingPage() {
  const { t } = useTranslation();
  const { api } = useContext(ApiContext);
  const router = useRouter();

  const [nickname, setNickname] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const isValid = nickname !== '' && imageUrl !== '';

  const handleSubmitClick = useCallback(async () => {
    if (!nickname || !imageUrl) {
      alert('no nickname or image url');
      console.error('no nickname or image url');
      return;
    }
    try {
      await api.authControllerRegister({ nickname, imageUrl });
      router.push('/');
    } catch (error: any) {
      error?.error?.message && alert(`${error?.error?.message}`);
      console.error('error', error);
    }
  }, [api, imageUrl, nickname, router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-light-background p-xl rounded-lg flex flex-col gap-lg w-[400px]">
        <h2>{t('onboarding.title')}</h2>

        <input
          placeholder={t('onboarding.nickname')}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="border p-sm"
        />

        <div className="flex gap-md">
          {avatars.map((a) => (
            <img
              key={a}
              src={avatarToUrl(a)}
              className={`cursor-pointer ${
                imageUrl === a ? 'border-2 border-purple' : ''
              }`}
              width={60}
              onClick={() => setImageUrl(a)}
            />
          ))}
        </div>

        <Button disabled={!isValid} onClick={handleSubmitClick}>
          {t('onboarding.submit')}
        </Button>
      </div>
    </div>
  );
}

export default withAuth(OnboardingPage, 'onboarding');
