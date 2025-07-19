import {
  ApiActionProps,
  APIObjectType,
  createApiAction,
} from 'rise-core-frontend';

export const APIS = (baseUrl?: string) => {
  const api = (args: Omit<ApiActionProps, 'baseUrl'>): APIObjectType =>
    createApiAction({ ...args, baseUrl });

  return {
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
  };
};
