'use client';

import { Box, Center, VStack, HStack, Flex, Image } from '@chakra-ui/react';
import {
  BaseText,
  TextVariant,
  TextWeight,
  FormTextInput,
  CheckboxForm,
  BaseButton,
  FloatSwitchColorMode,
} from '_components/custom';
import { APP_ROUTES } from '_config/routes';
import { VariablesColors } from '_theme/variables';
import { Formik, FormikHelpers, FormikValues } from 'formik';
import { t } from 'i18next';
import React from 'react';
import { LinkFooter } from '../../layout/footer';
import { useRouter } from 'next/navigation';
import { useOtpStorage } from '_hooks/useOtpStorage';
import { useCountdown } from '_hooks/remainingTime';
import { CommonModule } from '_store/state-management';
import { AxiosError } from 'axios';
import { RenderOtpTimeHelper } from '../../challenge-handler/utils/RenderOtpTimeHelper';

export const ResetPassword = () => {
  const router = useRouter();
  const {
    email,
    otpRemaining: expiresIn,
    blockRemaining,
    saveOtpData,
    clearOtpData,
  } = useOtpStorage();

  const { remainingTime, formatted: blockFormatted } = useCountdown(
    Number(blockRemaining) ?? 0,
  );
  const { remainingTime: otpRemaining, formatted: otpFormatted } = useCountdown(
    Number(expiresIn) ?? 0,
  );

  const { mutateAsync: generateOtp, isPending } =
    CommonModule.OtpModule.generateOtpMutation({
      mutationOptions: {
        onSuccess: (data) => {
          saveOtpData(data.email, data.expiresIn, 0);
          router.push(APP_ROUTES.AUTH.RESET_PASSWORD_OTP);
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

  return (
    <Box width={'full'} p={{ base: 6, lg: 8 }}>
      <Image
        src={'/assets/images/hibly-logo.png'}
        alt={'logo'}
        width={'120px'}
        height={'120px'}
      />

      <Formik
        initialValues={{ email: '' }}
        onSubmit={(values, helpers) =>
          // handleGenerateOrRenewOtp(values, helpers)
          router.push(APP_ROUTES.AUTH.RESET_PASSWORD_OTP)
        }
      >
        {({ values, handleChange, handleSubmit }) => (
          <Center flexDir={'column'}>
            <Box
              animation="fade"
              p={10}
              maxW="550px"
              w="full"
              textAlign="center"
            >
              <VStack gap={2} width={'full'}>
                <BaseText variant={TextVariant.L} weight={TextWeight.Black}>
                  {t('FORM.RESET_PASSWORD')}
                </BaseText>
                <BaseText textAlign={'center'}>
                  {t('FORM.RESET_PASSWORD_DESC')}
                </BaseText>
              </VStack>

              <VStack gap={3} mt={10} width={'full'}>
                <FormTextInput
                  name={'email'}
                  required
                  label={t('FORM.EMAIL')}
                  placeholder={t('FORM.EMAIL_PLACEHOLDER')}
                  value={values.email}
                  onChange={handleChange}
                />

                <RenderOtpTimeHelper
                  blockRemaining={remainingTime}
                  otpRemaining={otpRemaining}
                  blockFormatted={blockFormatted}
                  otpFormatted={otpFormatted}
                />

                <BaseButton
                  withGradient
                  width={'full'}
                  onClick={() => handleSubmit()}
                  isLoading={isPending}
                  disabled={remainingTime > 0 || otpRemaining > 0}
                >
                  {t('COMMON.VALIDATE')}
                </BaseButton>
                <BaseButton
                  withGradient
                  width={'full'}
                  colorType={'info'}
                  onClick={() => router.back()}
                >
                  {t('COMMON.BACK')}
                </BaseButton>
              </VStack>
            </Box>
            <LinkFooter />
          </Center>
        )}
      </Formik>
      <FloatSwitchColorMode />
    </Box>
  );
};
