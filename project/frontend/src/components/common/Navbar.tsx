'use client';
import { ApiContext } from '@/app/_internal/provider/ApiContext';
import i18n from '@/i18n';
import { useRouter } from 'next/navigation';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './Button';
import Logo from './Logo';
import NavIcon from './NavIcon';
import useToast from './useToast';

const Navbar = () => {
  const [errorMessage, setErrorMessage] = useState(() => '');
  const router = useRouter();
  const { message, closeMessage } = useToast();
  const { api } = useContext(ApiContext);
  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => closeMessage(), 2000);
  }, [message, closeMessage]);

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');

  const toggleLangMenu = () => setIsLangOpen((prev) => !prev);
  const handleLanguageChange = (selected: string) => {
    setLang(selected);
    i18n.changeLanguage(selected);
    localStorage.setItem('lang', selected);
    setIsLangOpen(false);
  };
  const handleLogout = useCallback(async () => {
    console.log('log out!');
    try {
      const result = await api.authControllerLogout();
      if (!result.ok) {
        console.error({ result });
      } else {
        router.push('/');
        localStorage.removeItem('me');
      }
    } catch (error) {
      alert('알 수 없는 오류입니다!');
      console.error('Error during logout:', error);
    }
  }, [api, router]);

  const css =
    'fixed w-[300px] h-[100px] left-1/2 p-sm transform -translate-x-1/2 translate-y-1/2 flex justify-center items-center bg-default border-3 border-dark-purple text-dark-purple rounded-md z-50 text-h3';
  return (
    <>
      {message && <div className={css}>{message}</div>}
      {errorMessage && <div className={css}>{errorMessage}</div>}

      <nav
        className={
          'flex flex-col w-[80px] min-h-[750px] h-[inherit] bg-default items-center'
        }
      >
        <Logo />
        <NavIcon type="friend" />
        <NavIcon type="video" />
        <NavIcon type="profile" />
        <div className="mt-auto mb-xl flex flex-col gap-lg">
          <div className="relative mt-auto">
            <Button onClick={toggleLangMenu}>{t('common.language')}</Button>
            {isLangOpen && (
              <div className="absolute left-[90px] top-0 bg-white border border-gray-300 rounded-md shadow-md p-sm">
                {[
                  { code: 'en', label: '🇬🇧 English' },
                  { code: 'ko', label: '🇰🇷 한국어' },
                  // { code: 'es', label: '🇪🇸 Español' },
                  // { code: 'fr', label: '🇫🇷 Français' },
                ].map((item) => (
                  <button
                    key={item.code}
                    onClick={() => handleLanguageChange(item.code)}
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left whitespace-nowrap"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Button onClick={handleLogout}>{t('common.logout')}</Button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
