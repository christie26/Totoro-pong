'use client';

import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ChooseAvatar from './ChooseAvatar';

type Props = {
  form: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  setForm: React.Dispatch<React.SetStateAction<any>>;
  onSubmit: () => void;
};

export default function SignUpForm({ form, setForm, onSubmit }: Props) {
  const { t } = useTranslation();
  const [avatar, setAvatar] = useState(() => '');

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev: any) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };
  const handleChooseClick = useCallback(
    (selectedAvatar: string) => {
      setAvatar(selectedAvatar);
    },
    [setAvatar],
  );
  return (
    <div className="flex flex-col gap-md">
      <Input
        label={t('signup.username')}
        value={form.username}
        onChange={handleChange('username')}
        placeholder={t('signup.usernamePlaceholder')}
      />

      <Input
        label={t('user.email')}
        value={form.email}
        onChange={handleChange('email')}
        placeholder={t('user.emailPlaceholder')}
      />

      <Input
        label={t('user.first-name')}
        value={form.firstName}
        onChange={handleChange('firstName')}
        placeholder={t('user.first-namePlaceholder')}
      />

      <Input
        label={t('user.last-name')}
        value={form.lastName}
        onChange={handleChange('lastName')}
        placeholder={t('user.last-namePlaceholder')}
      />
      <ChooseAvatar avatars={avatars} onChooseClick={handleChooseClick} />
      <button
        onClick={onSubmit}
        className="mt-lg bg-black text-white p-md rounded"
      >
        {t('signup.submit')}
      </button>
    </div>
  );
}

const avatars: string[] = [
  '/avatar/avatar-black.svg',
  '/avatar/avatar-big.svg',
  '/avatar/avatar-small.svg',
];

/* reusable input */
function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm mb-xs">{label}</label>
      <input
        className="border p-sm rounded"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
