export const APP_ROUTES = {
  HOME: '/modules/redirect',
  AUTH: {
    SIGN_IN: '/auth/signin',
    SIGN_UP: '/auth/signup',
    RESET_PASSWORD: '/auth/reset-password',
    RESET_PASSWORD_OTP: '/auth/reset-password-otp',
  },
  LEGAL_MENTIONS: '/mentions-legales',
  SECURITY: '/security',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_OF_USE: '/terms-and-conditions',
};

export const SIDE_BAR_ROUTES = {
  DASHBOARD: '/modules/dashboard',
  EMPLOYEE: '/modules/employees',
  PROFILE: '/modules/profile',
  TEAM: '/modules/team',

  //time_off routes
  MY_TIME_OFF: '/modules/time_off/my_time_off',
  TEAM_TIME_OFF: '/modules/time_off/team_time_off',
  EMPLOYEE_TIME_OFF: '/modules/time_off/employee_time_off',

  //attendance routes
  MY_ATTENDANCE: '/modules/attendance/my_attendance',
  TEAM_ATTENDANCE: '/modules/attendance/team_attendance',
  EMPLOYEE_ATTENDANCE: '/modules/attendance/employee_attendance',
};
