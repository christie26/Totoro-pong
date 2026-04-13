'use client';

import { ApiContext } from '@/app/_internal/provider/ApiContext';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../common/Button';
import { Loading } from '../common/Loading';

type UserProfile = {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
};

export function ProfileBox() {
  const { api } = useContext(ApiContext);

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(null);

  const [form, setForm] = useState<UserProfile>({
    email: 'yoonseo@naver.com',
    username: 'christie',
    firstName: 'yoonseo',
    lastName: 'lee',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [editing, setEditing] = useState(false);
  const { t } = useTranslation();

  // 🔹 Fetch user data (you will replace API)
  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);

      // TODO: replace with your API
      // const res = await api.usersControllerMyProfile();
      // const data = await res.json();

      // const userData = {
      //   email: data.email,
      //   username: data.username,
      //   firstName: data.firstName,
      //   lastName: data.lastName,
      // };
      const userData = {
        email: 'yoonseo@naver.com',
        username: 'christie',
        firstName: 'Yoonseo',
        lastName: 'LEE',
      };

      setUser(userData);
      setForm(userData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // 🔹 Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Update profile info
  const handleSaveProfile = async () => {
    try {
      console.log('call update profile with ', form);
      // TODO: replace with your API
      // await api.usersControllerUpdateProfile(form);

      setEditing(false);
      fetchUser();
    } catch (err) {
      console.error(err);
      alert('Failed to update profile');
    }
  };

  // 🔹 Change password (with current password check)
  const handleChangePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    try {
      // TODO: replace with your API
      // await api.usersControllerChangePassword({
      //   currentPassword: passwordForm.currentPassword,
      //   newPassword: passwordForm.newPassword,
      // });

      alert('Password updated!');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (err) {
      console.error(err);
      alert('Failed to change password');
    }
  };

  if (loading) return <Loading width={200} />;
  if (!user) return <p>Failed to load user data</p>;

  return (
    <div className="w-[800px] p-xl bg-light-background rounded-lg flex flex-col gap-lg">
      <h2 className="text-xl font-bold">{t('setting.account-setting')}</h2>

      {/* 🔹 Profile Info */}
      <div className="flex flex-col gap-md">
        <Input
          label={t('user.email')}
          name="email"
          value={form.email}
          onChange={handleChange}
          disabled={!editing}
        />
        <Input
          label={t('user.username')}
          name="username"
          value={form.username}
          onChange={handleChange}
          disabled={!editing}
        />
        <Input
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          disabled={!editing}
          label={t('user.first-name')}
        />
        <Input
          label={t('user.last-name')}
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          disabled={!editing}
        />
      </div>

      {/* 🔹 Buttons */}
      <div className="flex gap-md">
        {editing ? (
          <>
            <Button onClick={handleSaveProfile}>{t('setting.save')}</Button>
            <Button onClick={() => setEditing(false)}>
              {t('setting.cancel')}
            </Button>
          </>
        ) : (
          <Button onClick={() => setEditing(true)}>
            {t('setting.edit-profile')}
          </Button>
        )}
      </div>

      {/* 🔹 Password Section */}
      <div className="mt-lg border-t pt-md flex flex-col gap-md">
        <h3 className="font-semibold">{t('setting.update-password')}</h3>

        <Input
          label={t('setting.current-password')}
          name="currentPassword"
          type="password"
          value={passwordForm.currentPassword}
          onChange={handlePasswordChange}
        />
        <Input
          label={t('setting.new-password')}
          name="newPassword"
          type="password"
          value={passwordForm.newPassword}
          onChange={handlePasswordChange}
        />
        <Input
          label={t('setting.confirm-new-password')}
          name="confirmPassword"
          type="password"
          value={passwordForm.confirmPassword}
          onChange={handlePasswordChange}
        />
        <div className="flex gap-md">
          <Button onClick={handleChangePassword}>
            {t('setting.update-password')}
          </Button>
        </div>
      </div>
    </div>
  );
}

// 🔹 Reusable Input component
function Input({
  label,
  ...props
}: {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-xs h-sm">
      <label className="text-sm">{label}</label>
      <input
        {...props}
        className="p-sm rounded border bg-default h-[35px] text-sm"
      />
    </div>
  );
}
