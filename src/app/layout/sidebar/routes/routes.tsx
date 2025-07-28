import { GroupIcon, HomeIcon, TeamIcon } from '_assets/svg';
import { ILink } from '../types';
import { FaCog, FaUserCog } from 'react-icons/fa';
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
      path: SIDE_BAR_ROUTES.TEAM,
      label: 'Teams',
      icon: TeamIcon,
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
