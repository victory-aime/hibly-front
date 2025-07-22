'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SIDE_BAR_ROUTES } from '_config/routes';
import { GlobalLoader } from '_components/custom/loader/Loader';

const roleToDashboardMap: Record<string, string> = {
  DRH: SIDE_BAR_ROUTES.DASHBOARD,
  ADMIN: '/admin/dashboard',
};

export default function RedirectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    const role = session?.roles;

    if (role && roleToDashboardMap[role]) {
      router.replace(roleToDashboardMap[role]);
    } else {
      router.replace('/unauthorized');
    }
  }, [session, status, router]);

  return <GlobalLoader loader />;
}
