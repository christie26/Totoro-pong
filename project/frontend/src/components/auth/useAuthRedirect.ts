import { ApiContext } from '@/app/_internal/provider/ApiContext'; // API 컨텍스트 (예시 경로)
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { useQuery } from 'react-query';

enum RedirectPaths {
  Root = '/',
  SignIn = '/sign-in',
  SignUp = '/sign-up',
  Onboarding = '/onboarding',
}

export type PageType = 'root' | 'signIn' | 'signUp' | 'profile' | '';

export const LocalStorageMeKey = 'me';

const getRedirecPath = (page: PageType, phase: string) => {
  let redirectPath = '';
  switch (page) {
    case 'root':
      if (phase === 'register') redirectPath = RedirectPaths.Onboarding;
      else if (phase !== 'complete') redirectPath = RedirectPaths.SignIn;
      break;
    case 'signUp':
      if (phase === 'complete') redirectPath = RedirectPaths.Root;
      break;
    case 'signIn':
      if (phase === 'complete') redirectPath = RedirectPaths.Root;
      else if (phase === 'register') redirectPath = RedirectPaths.Onboarding;
      break;
    default:
      if (phase === 'register') redirectPath = RedirectPaths.Onboarding;
      else if (phase !== 'complete') redirectPath = RedirectPaths.SignIn;
      break;
  }
  return redirectPath;
};

const useAuthRedirect = (pageType: PageType) => {
  const router = useRouter();
  const { api } = useContext(ApiContext);

  const { isLoading } = useQuery('auth', api.usersControllerMyProfile, {
    onSuccess: (data) => {
      const { id, phase, me } = data.data;
      if (phase === 'complete' && me !== undefined) {
        localStorage.setItem(LocalStorageMeKey, JSON.stringify(me));
      } else {
        localStorage.removeItem(LocalStorageMeKey);
      }
      const redirectPath = getRedirecPath(pageType, phase);
      if (redirectPath) {
        router.replace(redirectPath);
      }
    },
    onError: (_err) => {
      localStorage.removeItem(LocalStorageMeKey);
      if (pageType === 'signIn' || pageType === 'signUp') {
        return;
      }
      api
        .authControllerLogout()
        .then(() => {})
        .catch((error) => {
          console.error('Logout error:', error);
        })
        .finally(() => {
          router.replace(RedirectPaths.SignIn);
        });
    },
    retry: false,
  });

  return { isLoading };
};

export default useAuthRedirect;
