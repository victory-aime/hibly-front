import { Box, Flex, Image, Separator } from '@chakra-ui/react';
import { ListMenu, LogOutIcon } from '_assets/svg';
import { SideBarProps } from '../sidebar/types';
import {
  BaseText,
  CustomSkeletonLoader,
  TextVariant,
} from '_components/custom';
import { useTranslation } from 'react-i18next';
import { StorageKey } from '_constants/StorageKeys';
import { SelectLanguages } from '_component/SelectLanguages';
import React, { useState } from 'react';
import { FlagImagesIcon } from '_component/flag/FlagImages';
import { FlagKeys } from '_assets/images/flag';
import { VariablesColors } from '_theme/variables';
import { useAuth } from '_hooks/useAuth';

export const Header = ({ onShowSidebar, session }: SideBarProps) => {
  const { t } = useTranslation();
  const getPreferredLanguage = localStorage.getItem(StorageKey.LANGUAGE);
  const { logout } = useAuth();
  const [openSelectLanguage, setOpenSelectLanguage] = useState<boolean>(false);

  return (
    <Flex
      p={4}
      justify={'space-between'}
      alignItems="center"
      h={{ base: '100px', md: 'auto' }}
    >
      {false ? (
        <CustomSkeletonLoader
          numberOfLines={1}
          type="TEXT_IMAGE"
          height={'45px'}
          width={'200px'}
          direction={{ base: 'row-reverse', md: 'row' } as any}
        />
      ) : (
        <Flex width={'full'} gap={5}>
          <Box
            ms={'2px'}
            display="flex"
            alignItems="center"
            onClick={onShowSidebar}
            cursor="pointer"
          >
            <ListMenu width={18} height={18} />
          </Box>
          <Flex alignItems={'center'} justifyContent={'center'} gap={3}>
            <Image
              draggable="false"
              src={'https://avatar.iran.liara.run/public'}
              borderRadius={'7px'}
              boxSize={'30px'}
              fit="cover"
              objectPosition="center"
              alt="user-picture"
            />
            <BaseText variant={TextVariant.S}>
              {t('WELCOME', { username: 'victory' })}{' '}
            </BaseText>
          </Flex>
        </Flex>
      )}

      <Flex gap={3} alignItems={'center'}>
        <FlagImagesIcon
          countryImage={getPreferredLanguage?.toUpperCase() as FlagKeys}
          boxSize={'20px'}
          onClick={() => setOpenSelectLanguage(true)}
        />
        <Separator orientation={'vertical'} size={'lg'} colorPalette={'red'} />
        <LogOutIcon
          width={24}
          height={24}
          onClick={() => {
            logout();
          }}
          cursor={'pointer'}
          fill={VariablesColors.red}
        />
      </Flex>

      <SelectLanguages
        isOpen={openSelectLanguage}
        onChange={() => setOpenSelectLanguage(false)}
        language={'en'}
      />
    </Flex>
  );
};
