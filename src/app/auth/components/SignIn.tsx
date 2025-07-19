'use client';

import { BaseButton, BaseText } from '_components/custom';
import { APP_ROUTES } from '_config/routes';
import { useSearchParams } from 'next/navigation';
import { Box, Center } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useOtpStorage } from '_hooks/useOtpStorage';
import { useAuth } from '_hooks/useAuth';
import { LinkFooter } from '../../layout/footer';

export const SignIn = () => {
  const { t } = useTranslation();
  const callbackUrl = useSearchParams()?.get('callbackUrl') || APP_ROUTES.HOME;
  const { login } = useAuth();
  const {
    email,
    otpRemaining: expiresIn,
    blockRemaining,
    saveOtpData,
    clearOtpData,
  } = useOtpStorage();

  return (
    <Box
      minH="100vh"
      backgroundSize="cover"
      backgroundPosition="center"
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        bg="blackAlpha.700"
        zIndex={0}
      />

      <Center h="100vh" zIndex={1} position="relative" px={4}>
        <BaseText>Hello le login</BaseText>
      </Center>

      <LinkFooter />
    </Box>
  );
};
