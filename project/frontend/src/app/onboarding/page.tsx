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

  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');

  const isValid = username !== '' && avatar !== '';

  const handleSubmit = useCallback(async () => {
    if (!isValid) return;

    try {
      await api.authControllerRegister({
        nickname: username,
        imageUrl: avatar,
      });
      router.push('/friend');
    } catch (e) {
      console.error(e);
    }
  }, [api, username, avatar, router, isValid]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-light-background p-xl rounded-lg flex flex-col gap-lg w-[400px]">
        <h2>{t('onboarding.title')}</h2>

        <input
          placeholder={t('onboarding.username')}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-sm"
        />

        <div className="flex gap-md">
          {avatars.map((a) => (
            <img
              key={a}
              src={avatarToUrl(a)}
              className={`cursor-pointer ${
                avatar === a ? 'border-2 border-purple' : ''
              }`}
              width={60}
              onClick={() => setAvatar(a)}
            />
          ))}
        </div>

        <Button disabled={!isValid} onClick={handleSubmit}>
          {t('onboarding.submit')}
        </Button>
      </div>
    </div>
  );
}

export default withAuth(OnboardingPage, '');
