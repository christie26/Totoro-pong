'use client';

import { useTranslation } from 'react-i18next';

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

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev: any) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  return (
    <div className="flex flex-col gap-md">
      <Input
        label={t('signup.username')}
        value={form.username}
        onChange={handleChange('username')}
        placeholder={t('signup.usernamePlaceholder')}
      />

      <Input
        label={t('signup.email')}
        value={form.email}
        onChange={handleChange('email')}
        placeholder={t('signup.emailPlaceholder')}
      />

      <Input
        label={t('signup.firstName')}
        value={form.firstName}
        onChange={handleChange('firstName')}
        placeholder={t('signup.firstNamePlaceholder')}
      />

      <Input
        label={t('signup.lastName')}
        value={form.lastName}
        onChange={handleChange('lastName')}
        placeholder={t('signup.lastNamePlaceholder')}
      />

      <button
        onClick={onSubmit}
        className="mt-lg bg-black text-white p-md rounded"
      >
        {t('signup.submit')}
      </button>
    </div>
  );
}

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
