'use client';

import {
  BaseButton,
  BaseText,
  FloatSwitchColorMode,
  FormTextInput,
  TextVariant,
  TextWeight,
  CheckboxForm,
} from '_components/custom';
import { APP_ROUTES } from '_config/routes';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Center, Flex, HStack, Image, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '_hooks/useAuth';
import { LinkFooter } from '../../layout/footer';
import { Formik } from 'formik';
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
  const rememberMe = localStorage.getItem(StorageKey.REMEMBER_ME);

  const handleSubmit = async (values: any) => {
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

  useEffect(() => {
    if (rememberMe) {
      setInitialValues({
        email: localStorage.getItem(StorageKey.EMAIL) || '',
        password: localStorage.getItem(StorageKey.PASSWORD) || '',
        rememberMe: rememberMe === 'true',
      });
    }
  }, [rememberMe]);

  return (
    <Flex width={'full'} height={'100vh'}>
      <Flex width={'full'} display={{ base: 'none', md: 'block' }}>
        <Image
          src={'/assets/images/collaborate.jpg'}
          alt={'collaborate'}
          width={'full'}
          height={'full'}
          objectFit={'cover'}
        />
      </Flex>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={VALIDATION.AUTH.loginValidationSchema}
      >
        {({ values, handleSubmit }) => (
          <Box width={'full'} p={{ base: 6, lg: 8 }}>
            <Image
              src={'/assets/images/hibly-logo.png'}
              alt={'logo'}
              width={'120px'}
              height={'120px'}
            />

            <Center width={'full'} flexDirection={'column'}>
              <VStack gap={2} width={{ base: 'full', lg: '10/12' }}>
                <BaseText variant={TextVariant.L} weight={TextWeight.Black}>
                  👋{t('SIGN_IN_TITLE')}
                </BaseText>
                <BaseText textAlign={'center'}>{t('SIGN_IN_DESC')}</BaseText>
              </VStack>

              <VStack gap={3} mt={10} width={{ base: 'full', lg: '10/12' }}>
                <FormTextInput
                  name={'email'}
                  required
                  label={t('PROFILE.EMAIL')}
                  placeholder={t('PROFILE.EMAIL')}
                  value={values.email}
                />
                <FormTextInput
                  name={'password'}
                  required
                  type={'password'}
                  label={t('FORM.PASSWORD')}
                  placeholder={t('FORM.PASSWORD_PLACEHOLDER')}
                  value={values.password}
                />

                <HStack
                  width={'full'}
                  alignItems={'center'}
                  mt={3}
                  justifyContent={'space-between'}
                >
                  <CheckboxForm
                    name={'rememberMe'}
                    size={'md'}
                    label={t('FORM.REMEMBER_ME')}
                  />
                  <Flex width={'full'} justifyContent={'flex-end'}>
                    <BaseText
                      textDecoration={'underline'}
                      cursor={'pointer'}
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
                  width={'full'}
                  onClick={() => {
                    handleSubmit();
                    console.log('values', values);
                  }}
                >
                  {t('COMMON.LOGIN')}
                </BaseButton>
              </VStack>

              <BaseText textAlign={'center'} mt={10}>
                {t('FORM.DONT_HAVE_AN_ACCOUNT')}{' '}
                <span
                  style={{
                    color: VariablesColors.primary,
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  {t('FORM.SIGN_UP')}
                </span>
              </BaseText>

              <LinkFooter />
            </Center>
          </Box>
        )}
      </Formik>
      <FloatSwitchColorMode />
    </Flex>
  );
};
