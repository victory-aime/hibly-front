import {
  ApiActionProps,
  APIObjectType,
  createApiAction,
} from 'rise-core-frontend';

export const APIS = (baseUrl?: string) => {
  const api = (args: Omit<ApiActionProps, 'baseUrl'>): APIObjectType =>
    createApiAction({ ...args, baseUrl });

  return {
    AUTH: {
      LOGIN: api({
        path: '/auth/login',
        method: 'POST',
        pathBase: 'UNSECURED_API',
        showResponse: false,
      }),
      REFRESH: api({
        path: '/auth/refresh-token',
        method: 'POST',
        pathBase: 'UNSECURED_API',
        showResponse: false,
      }),
      LOGOUT: api({
        path: '/auth/logout',
        method: 'POST',
        pathBase: 'UNSECURED_API',
        showResponse: false,
      }),
    },
    OTP: {
      GENERATE: api({
        path: '/otp/generate',
        method: 'POST',
        pathBase: 'UNSECURED_API',
      }),
      VALIDATE: api({
        path: '/otp/validate',
        method: 'POST',
        pathBase: 'UNSECURED_API',
        handleErrorManually: false,
      }),
    },
    TEAM: {
      GET_ALL: api({
        path: '/team',
        method: 'GET',
        pathBase: 'SECURED_API',
        showResponse: false,
      }),
      CREATE: api({
        path: '/team/create',
        method: 'POST',
        pathBase: 'SECURED_API',
      }),
    },
  };
};
