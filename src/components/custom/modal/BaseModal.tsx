import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogRoot,
} from '_components/ui/dialog';
import { Flex, Image } from '@chakra-ui/react';
import React from 'react';
import { BaseButton } from '../button';
import { variantColorType } from '_components/custom/button';
import { ModalProps } from './interface/modal';
import { BaseIcon } from '../base-icon';
import { useTranslation } from 'react-i18next';
import { BaseText, TextVariant } from '_components/custom';

const BaseModal = ({
  isOpen = false,
  ignoreFooter = false,
  onChange,
  title = 'Modal Title',
  colorSaveButton = 'primary',
  buttonSaveTitle = 'COMMON.VALIDATE',
  buttonCancelTitle = 'COMMON.CANCEL',
  showCloseButton = true,
  isLoading,
  onClick,
  isFull,
  modalType,
  icon,
  iconBackgroundColor = 'primary.500',
  children,
  disabled,
  logoSrc = '/assets/images/hibly-logo.png',
  ref,
  ...rest
}: ModalProps) => {
  const { t } = useTranslation();

  return (
    <DialogRoot
      open={isOpen}
      lazyMount
      onOpenChange={(e) => onChange?.(e?.open)}
      placement={'center'}
      role={modalType}
      size={isFull ? 'full' : 'lg'}
      motionPreset="slide-in-top"
      boxShadow={'md'}
      {...rest}
    >
      <DialogContent width={'full'} bgColor={'gray.200'} p={4}>
        <Flex alignItems={'center'} gap={4} mb={4}>
          {icon && (
            <BaseIcon borderRadius={'7px'} color={iconBackgroundColor}>
              {icon}
            </BaseIcon>
          )}
          <BaseText variant={TextVariant.S}>{t(title)}</BaseText>

          {showCloseButton && <DialogCloseTrigger />}
        </Flex>

        <DialogBody
          autoFocus={false}
          mt={4}
          ref={ref}
          p={4}
          bgColor={'white'}
          borderRadius={'7px'}
        >
          {children}
          {!ignoreFooter ? (
            <DialogFooter
              mt={8}
              alignItems={'center'}
              justifyContent={'center'}
              gap={4}
            >
              {isLoading ? (
                <BaseButton isLoading />
              ) : (
                <>
                  {buttonCancelTitle && (
                    <DialogActionTrigger asChild>
                      <BaseButton
                        disabled={disabled}
                        withGradient
                        onClick={onChange}
                        variant="outline"
                        colorType={'secondary'}
                      >
                        {t(buttonCancelTitle)}
                      </BaseButton>
                    </DialogActionTrigger>
                  )}
                  <BaseButton
                    disabled={disabled}
                    withGradient
                    onClick={() => onClick?.()}
                    colorType={
                      modalType === 'alertdialog'
                        ? 'danger'
                        : (colorSaveButton as variantColorType)
                    }
                  >
                    {t(buttonSaveTitle)}
                  </BaseButton>
                </>
              )}
            </DialogFooter>
          ) : null}
        </DialogBody>
        <Flex aliIgnItems={'flex-end'} justifyContent={'flex-end'}>
          <Image
            src={logoSrc}
            alt={'logo'}
            width={'60px'}
            opacity={'0.6'}
            transition={'filter 0.5s ease, opacity 0.5s ease'}
          />
        </Flex>
      </DialogContent>
    </DialogRoot>
  );
};

export default BaseModal;
