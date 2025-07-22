'use client';

import { FormikHelpers, FormikValues } from 'formik';
import { ModalOpenProps } from '_components/custom';
import { maskValue } from '_components/custom/form/utils/maskValue';
import { useTranslation } from 'react-i18next';
import { OtpChallengeHandler } from '../../challenge-handler/OtpChallengeHandler';
import { extractOtp } from '../../challenge-handler/utils/extract-otp';
import { useOtpStorage } from '_hooks/useOtpStorage';
import { CommonModule } from '_store/state-management';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

export interface IOTPModal extends ModalOpenProps {
  renewOtpCallback?: (values?: any, helpers?: any) => void;
  blockedTimeLeft?: number;
  closeButton?: boolean;
  isModal?: boolean;
}

export const ResetPasswordOtp = ({}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    email,
    otpRemaining: expiresIn,
    blockRemaining,
    saveOtpData,
    clearOtpData,
  } = useOtpStorage();

  const { mutateAsync: generateOtp, isPending: generateOtpPending } =
    CommonModule.OtpModule.generateOtpMutation({
      mutationOptions: {
        onSuccess: (data) => {
          saveOtpData(data.email, data.expiresIn, 0);
        },
        onError: (error: AxiosError<unknown, any>, _variables, _context) => {
          const data = error?.response?.data as
            | { message?: string; retryAfter?: string }
            | undefined;
          const retryAfter = Number(data?.retryAfter || 0);
          const targetEmail = email || '';
          if (retryAfter && targetEmail) {
            saveOtpData(targetEmail, 0, retryAfter);
          }
        },
      },
    });

  const {
    mutateAsync: validateOtp,
    isPending: validateAccountPending,
    isSuccess: validateAccountSuccess,
  } = CommonModule.OtpModule.validateOtpMutation({});

  const handleGenerateOrRenewOtp = async (
    values: FormikValues,
    formikHelpers: any,
  ) => {
    try {
      await generateOtp({ payload: values?.email ?? email });
    } catch (error) {
      const axiosError = error as AxiosError<{
        message?: string;
        retryAfter?: string;
      }>;
      const serverMessage =
        axiosError?.response?.data?.message ||
        t('PROFILE.OTP_MAX_SEND_ATTEMPTS');
      formikHelpers.setFieldError('email', serverMessage);
    }
  };

  const handleValidateOtp = async (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>,
  ) => {
    const otpString = extractOtp(values?.otpCode);
    try {
      await validateOtp({
        payload: {
          otp: otpString,
          email: email ?? '',
        },
      });
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const serverMessage =
        axiosError?.response?.data?.message || t('COMMON.SERVER_ERROR');
      formikHelpers?.setFieldError('otpCode', serverMessage);
    }
  };

  return validateAccountSuccess ? (
    <>Form de réinitialisation de mot de passe</>
  ) : (
    <OtpChallengeHandler
      isModal={false}
      isOpen={false}
      onChange={() => {}}
      blockedTimeLeft={blockRemaining}
      data={{ expiresIn, email }}
      callback={handleValidateOtp}
      isLoading={validateAccountPending || generateOtpPending}
      renewOtpCallback={handleGenerateOrRenewOtp}
      goBackCallback={() => router.back()}
    />
  );
};
