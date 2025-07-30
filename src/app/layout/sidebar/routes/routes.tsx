import { GroupIcon, HomeIcon, TeamIcon } from '_assets/svg';
import { ILink } from '../types';
import { FaCalendarAlt, FaCog, FaRegClock, FaUserCog } from 'react-icons/fa';
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
      menuKey: 'time',
      path: '',
      label: 'SIDE_BAR.TIME_OFF',
      icon: FaRegClock,
      subItems: [
        {
          path: SIDE_BAR_ROUTES.MY_TIME_OFF,
          label: 'SIDE_BAR.MY_TIME_OFF',
        },
        {
          path: SIDE_BAR_ROUTES.TEAM_TIME_OFF,
          label: 'SIDE_BAR.TEAM_TIME_OFF',
        },
        {
          path: SIDE_BAR_ROUTES.EMPLOYEE_TIME_OFF,
          label: 'SIDE_BAR.EMPLOYEE_TIME_OFF',
        },
      ],
    },
    {
      menuKey: 'attendance',
      path: '',
      label: 'SIDE_BAR.ATTENDANCE',
      icon: FaCalendarAlt,
      subItems: [
        {
          path: SIDE_BAR_ROUTES.MY_ATTENDANCE,
          label: 'SIDE_BAR.MY_ATTENDANCE',
        },
        {
          path: SIDE_BAR_ROUTES.TEAM_ATTENDANCE,
          label: 'SIDE_BAR.TEAM_ATTENDANCE',
        },
        {
          path: SIDE_BAR_ROUTES.EMPLOYEE_ATTENDANCE,
          label: 'SIDE_BAR.EMPLOYEE_ATTENDANCE',
        },
      ],
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
