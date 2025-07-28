'use client';

import {
  BaseButton,
  BaseText,
  CheckboxForm,
  FloatSwitchColorMode,
  FormTextInput,
  TextVariant,
  TextWeight,
} from '_components/custom';
import { APP_ROUTES } from '_config/routes';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Flex, HStack, Image, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '_hooks/useAuth';
import { LinkFooter } from '../../layout/footer';
import { Formik, FormikValues } from 'formik';
import { VariablesColors } from '_theme/variables';
import { VALIDATION } from '_types/index';
import { useEffect, useState } from 'react';
import { StorageKey } from '_constants/StorageKeys';

export const SignIn = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const callbackUrl = useSearchParams()?.get('callbackUrl') || APP_ROUTES.HOME;
  const { login } = useAuth();
  const [initialValues, setInitialValues] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isRemember = localStorage.getItem(StorageKey.REMEMBER_ME);

      console.log('isRemember', isRemember);
      if (isRemember) {
        setInitialValues({
          email: localStorage.getItem(StorageKey.EMAIL) || '',
          password: localStorage.getItem(StorageKey.PASSWORD) || '',
          rememberMe: isRemember === 'true',
        });
      }
    }
  }, []);

  const handleSubmit = async (values: FormikValues) => {
    if (values.rememberMe) {
      localStorage.setItem(StorageKey.REMEMBER_ME, 'true');
      localStorage.setItem(StorageKey.EMAIL, values.email);
      localStorage.setItem(StorageKey.PASSWORD, values.password);
    } else {
      localStorage.removeItem(StorageKey.REMEMBER_ME);
      localStorage.removeItem(StorageKey.EMAIL);
      localStorage.removeItem(StorageKey.PASSWORD);
    }

    await login({
      email: values.email,
      password: values.password,
      callbackUrl,
    });
  };

  return (
    <Flex
      flexDirection={{ base: 'column', md: 'row' }}
      height="100vh"
      width="100%"
    >
      <Box
        w={{ base: '0', md: '50%' }}
        h={'100vh'}
        display={{ base: 'none', md: 'block' }}
      >
        <Image
          src="/assets/images/collaborate.jpg"
          alt="collaborate"
          objectFit="cover"
          width="100%"
          height="100vh"
        />
      </Box>

      <Flex
        w={{ base: '100%', md: '50%' }}
        px={{ base: 4, sm: 6, lg: 12 }}
        py={{ base: 6, md: 8 }}
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box>
          <Image
            src="/assets/images/hibly-logo.png"
            alt="logo-app"
            boxSize="80px"
            objectFit="cover"
            mb={4}
          />

          <VStack width="full" gap={3}>
            <BaseText
              textAlign="center"
              variant={TextVariant.L}
              weight={TextWeight.Black}
            >
              👋 {t('SIGN_IN_TITLE')}
            </BaseText>
            <BaseText textAlign="center">{t('SIGN_IN_DESC')}</BaseText>

            <Formik
              initialValues={initialValues}
              enableReinitialize
              onSubmit={async (values, actions) => {
                await handleSubmit(values);
                actions.resetForm();
              }}
              validationSchema={VALIDATION.AUTH.loginValidationSchema}
            >
              {({ values, handleSubmit }) => (
                <VStack gap={3} mt={4} mb={2} w="full">
                  <FormTextInput
                    name="email"
                    required
                    label={t('PROFILE.EMAIL')}
                    placeholder={t('PROFILE.EMAIL')}
                    value={values.email}
                  />
                  <FormTextInput
                    name="password"
                    required
                    type="password"
                    label={t('FORM.PASSWORD')}
                    placeholder={t('FORM.PASSWORD_PLACEHOLDER')}
                    value={values.password}
                  />

                  <HStack
                    width="full"
                    alignItems="center"
                    mt={2}
                    mb={2}
                    justifyContent="space-between"
                  >
                    <CheckboxForm
                      name="rememberMe"
                      size="md"
                      label={t('FORM.REMEMBER_ME')}
                    />
                    <Flex justifyContent={'flex-end'} width={'full'}>
                      <BaseText
                        textDecoration="underline"
                        cursor="pointer"
                        onClick={() =>
                          router.push(APP_ROUTES.AUTH.RESET_PASSWORD)
                        }
                      >
                        {t('FORM.FORGOT_PASSWORD')}
                      </BaseText>
                    </Flex>
                  </HStack>

                  <BaseButton
                    withGradient
                    width="full"
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    {t('COMMON.LOGIN')}
                  </BaseButton>
                </VStack>
              )}
            </Formik>

            <BaseText textAlign="center" mb={2}>
              {t('FORM.DONT_HAVE_AN_ACCOUNT')}{' '}
              <span
                style={{
                  color: VariablesColors.primary,
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
                onClick={() => router.push(APP_ROUTES.AUTH.SIGN_UP)}
              >
                {t('FORM.SIGN_UP')}
              </span>
            </BaseText>
          </VStack>
        </Box>

        <LinkFooter alignItems="flex-end" justifyContent="flex-end" mt={2} />
      </Flex>

      <FloatSwitchColorMode />
    </Flex>
  );
};
