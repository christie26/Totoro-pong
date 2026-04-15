'use client';
import { ApiContext } from '@/app/_internal/provider/ApiContext';
import { Lang, languageMap } from '@/app/_internal/provider/I18nProvider';
import i18n from '@/i18n';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './Button';
import Logo from './Logo';
import NavIcon from './NavIcon';

const Navbar = () => {
  const router = useRouter();
  const { api } = useContext(ApiContext);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { t } = useTranslation();
  const lang = i18n.language as Lang;
  const path = usePathname();
  const isAuthPage = path === '/sign-in' || path === '/sign-up';

  const toggleLangMenu = () => setIsLangOpen((prev) => !prev);
  const handleLanguageChange = (selected: Lang) => {
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

  return (
    <>
      <nav
        className={
          'flex flex-col min-w-[80px] min-h-[750px] h-[inherit] bg-default items-center'
        }
      >
        <Logo />
        <NavIcon type="video" isAuthPage={isAuthPage} />
        <NavIcon type="friend" isAuthPage={isAuthPage} />
        <NavIcon type="setting" isAuthPage={isAuthPage} />
        <div className="mt-auto mb-xl flex flex-col gap-lg">
          <div className="relative mt-auto">
            <Button onClick={toggleLangMenu}>
              {' '}
              {t('common.language')} {languageMap[lang].icon}
            </Button>
            {isLangOpen && (
              <div className="absolute left-[90px] bottom-0 bg-white border border-gray-300 rounded-md shadow-md p-sm">
                {(
                  Object.entries(languageMap) as [
                    Lang,
                    (typeof languageMap)[Lang],
                  ][]
                ).map(([code, value]) => (
                  <button
                    key={code}
                    onClick={() => handleLanguageChange(code)}
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left whitespace-nowrap"
                  >
                    {value.icon} {value.text}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Button onClick={handleLogout} disabled={isAuthPage}>
            {t('common.logout')}
          </Button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
