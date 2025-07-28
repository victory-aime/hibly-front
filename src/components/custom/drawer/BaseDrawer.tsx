import {
  BaseButton,
  BaseIcon,
  BaseText,
  ModalOpenProps,
  ModalProps,
  TextVariant,
} from '_components/custom';
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
} from '_components/ui/drawer';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { Flex } from '@chakra-ui/react';
import { DialogActionTrigger } from '_components/ui/dialog';

export interface DrawerProps extends ModalProps, ModalOpenProps {
  title: string;
  placement?: 'start' | 'end' | 'top' | 'bottom';
  drawerContentColor?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const BaseDrawer: React.FC<DrawerProps> = ({
  isOpen,
  onChange,
  placement = 'end',
  size = 'sm',
  title = 'Title Drawer',
  callback,
  isLoading = false,
  isFull,
  children,
  disabled,
  modalType,
  showCloseButton = true,
  ignoreFooter = false,
  icon,
  colorSaveButton = 'primary',
  buttonSaveTitle = 'COMMON.VALIDATE',
  buttonCancelTitle = 'COMMON.CANCEL',
  iconBackgroundColor = 'primary.500',
  drawerContentColor = 'white',
}) => {
  const { t } = useTranslation();
  return (
    <DrawerRoot
      open={isOpen}
      onOpenChange={onChange}
      placement={placement}
      size={isFull ? 'full' : size}
      boxShadow={'md'}
      closeOnEscape
      lazyMount
    >
      <DrawerBackdrop />
      <DrawerContent height={'full'} bgColor={drawerContentColor}>
        <DrawerHeader
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          p={5}
        >
          <Flex alignItems={'center'} gap={4} mb={4}>
            {icon && (
              <BaseIcon borderRadius={'7px'} color={iconBackgroundColor}>
                {icon}
              </BaseIcon>
            )}
            <BaseText
              variant={TextVariant.S}
              color={drawerContentColor !== 'white' ? 'white' : null}
            >
              {t(title)}
            </BaseText>

            {showCloseButton && (
              <DrawerCloseTrigger
                color={drawerContentColor !== 'white' ? 'white' : null}
              />
            )}
          </Flex>
        </DrawerHeader>
        <DrawerBody width={'full'} height={'full'}>
          {children}
        </DrawerBody>

        {!ignoreFooter ? (
          <DrawerFooter alignItems={'center'} justifyContent={'center'}>
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
                      colorType={'danger'}
                    >
                      {t(buttonCancelTitle)}
                    </BaseButton>
                  </DialogActionTrigger>
                )}
                <BaseButton
                  disabled={disabled}
                  withGradient
                  onClick={() => callback?.()}
                  colorType={
                    modalType === 'alertdialog' ? 'danger' : colorSaveButton
                  }
                >
                  {t(buttonSaveTitle)}
                </BaseButton>
              </>
            )}
          </DrawerFooter>
        ) : null}
      </DrawerContent>
    </DrawerRoot>
  );
};
