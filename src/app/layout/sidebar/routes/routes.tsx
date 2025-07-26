import { GroupIcon, HomeIcon } from '_assets/svg';
import { ILink } from '../types';
import { FaUserCog, FaCog } from 'react-icons/fa';
import { SIDE_BAR_ROUTES } from '_config/routes';

export const MENU_BY_ROLE: Record<string, ILink[]> = {
  DRH: [
    {
      path: SIDE_BAR_ROUTES.DASHBOARD,
      label: 'SIDE_BAR.DASHBOARD',
      icon: HomeIcon,
    },
    {
      path: SIDE_BAR_ROUTES.EMPLOYEE,
      label: 'SIDE_BAR.EMPLOYEE',
      icon: GroupIcon,
    },
    {
      menuKey: 'settings',
      path: '',
      label: 'SIDE_BAR.SETTINGS',
      icon: FaCog,
      subItems: [
        {
          path: SIDE_BAR_ROUTES.PROFILE,
          label: 'SIDE_BAR.PROFILE',
          icon: FaUserCog,
        },
      ],
    },
  ],
  ADMIN: [
    {
      path: 'test',
      label: 'Test route',
      icon: HomeIcon,
    },
  ],
};
