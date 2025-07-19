import { Flex, Link, Separator } from '@chakra-ui/react';
import { BaseText, TextVariant } from '_components/custom';
import { APP_ROUTES } from '_config/routes';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const LinkFooter = () => {
  const navigate = useRouter();
  const { t } = useTranslation();
  return (
    <Flex
      position="absolute"
      bottom={4}
      right={4}
      gap={4}
      fontSize="sm"
      zIndex={1}
    >
      <Link href={APP_ROUTES.LEGAL_MENTIONS} variant="plain" color="white">
        {t('COMMON.LEGAL_MENTIONS')}
      </Link>
      <Separator orientation="vertical" height="4" />
      <Link href={APP_ROUTES.SECURITY} variant="plain" color="white">
        {t('COMMON.SECURITY')}
      </Link>
      <Separator orientation="vertical" height="4" />
      <Link href={APP_ROUTES.PRIVACY_POLICY} variant="plain" color="white">
        {t('COMMON.PRIVACY_POLICY')}
      </Link>
      <Separator orientation="vertical" height="4" />
      <Link href={APP_ROUTES.TERMS_OF_USE} variant="plain" color="white">
        {t('COMMON.TERMS_OF_USE')}
      </Link>
      <Separator orientation="vertical" height="4" />
      <BaseText
        variant={TextVariant.S}
        cursor="pointer"
        _hover={{ textDecoration: 'underline' }}
        color="white"
        onClick={() => console.log('Contact Us')}
      >
        {t('COMMON.CONTACT_US')}
      </BaseText>
    </Flex>
  );
};
