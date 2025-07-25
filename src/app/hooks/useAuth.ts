import { useRouter } from 'next/navigation';
import { signIn, signOut } from 'next-auth/react';
import { APP_ROUTES } from '_config/routes';
import { sessionLogout } from '_hooks/logout';
import { useGlobalLoader } from '_context/loaderContext';
import { StorageKey } from '_constants/StorageKeys';
import { ZUSTAND } from 'rise-core-frontend';
import { handleApiError } from '_utils/handleApiError';
import { handleApiSuccess } from '_utils/handleApiSuccess';

export const useAuth = () => {
  const router = useRouter();
  const { showLoader, hideLoader, isLoading } = useGlobalLoader();

  const logout = async () => {
    try {
      showLoader();
      const store = ZUSTAND.useZustandCacheStore();
      localStorage.removeItem(StorageKey.OTP_REQUIRED);
      localStorage.removeItem(StorageKey.CACHE);

      setTimeout(() => {
        store.getState().clearAll();
      }, 10);

      await sessionLogout().then(() => store.getState().clearAll());

      await signOut({ redirect: false });

      router.replace(APP_ROUTES.AUTH.SIGN_IN);
    } finally {
      hideLoader();
    }
  };

  const login = async ({
    email,
    password,
    callbackUrl,
    otpRequired = false,
  }: {
    email: string;
    password: string;
    callbackUrl?: string;
    otpRequired?: boolean;
  }) => {
    try {
      showLoader();

      if (otpRequired) {
        localStorage.setItem(StorageKey.OTP_REQUIRED, 'true');
      }

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: callbackUrl ?? APP_ROUTES.HOME,
      });

      if (result?.error) {
        handleApiError({
          status: result.status,
          message:
            result.error === 'CredentialsSignin'
              ? 'Email ou mot de passe invalide'
              : result.error,
        });
        return;
      }

      if (result?.ok && result.url) {
        handleApiSuccess({ status: 200, message: 'Connexion réussie' });
        router.replace(result.url);
      }
    } finally {
      hideLoader();
    }
  };

  return { logout, login, isLoading };
};
