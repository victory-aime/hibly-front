import { Formik } from 'formik';
import {
  BaseButton,
  BaseText,
  FormOtpInput,
  ModalComponent,
  ModalOpenProps,
  TextVariant,
  TextWeight,
} from '_components/custom';
import { TbLockPassword } from 'react-icons/tb';
import { FC } from 'react';
import { maskValue } from '_components/custom/form/utils/maskValue';
import { Box, Center, VStack, Image } from '@chakra-ui/react';
import { VariablesColors } from '_theme/variables';
import { useTranslation } from 'react-i18next';
import { useCountdown } from '_hooks/remainingTime';
import { RenderOtpTimeHelper } from './utils/RenderOtpTimeHelper';
import { LinkFooter } from '../layout/footer';

export interface IOTPModal extends ModalOpenProps {
  renewOtpCallback?: (values?: any, helpers?: any) => void;
  blockedTimeLeft?: number;
  closeButton?: boolean;
  isModal?: boolean;
  goBackCallback?: () => void;
}

export const OtpChallengeHandler: FC<IOTPModal> = ({
  isOpen,
  isLoading,
  callback = () => {},
  onChange,
  data,
  renewOtpCallback,
  blockedTimeLeft = 0,
  closeButton = true,
  isModal = true,
  goBackCallback,
}) => {
  const { t } = useTranslation();
  const { remainingTime: blockRemaining, formatted: blockFormatted } =
    useCountdown(blockedTimeLeft ?? 0);
  const { remainingTime: otpRemaining, formatted: otpFormatted } = useCountdown(
    data?.expiresIn ?? 0,
  );

  const renderMaskEmail = (value: string) => {
    if (!value) return '';
    return maskValue(value, 5);
  };

  return (
    <Formik
      initialValues={{ otpCode: '' }}
      onReset={onChange}
      onSubmit={(values, helpers) => callback(values, helpers)}
    >
      {({ handleSubmit, resetForm }) =>
        isModal ? (
          <ModalComponent
            iconBackgroundColor={'primary.800'}
            icon={<TbLockPassword size={18} />}
            title={'PROFILE.OTP_CHECK_TITLE'}
            closeOnInteractOutside={false}
            closeOnEscape={false}
            isOpen={isOpen}
            onChange={() => {
              onChange(!isOpen);
              resetForm();
            }}
            onClick={handleSubmit}
            isLoading={isLoading}
            disabled={blockRemaining > 0}
            ignoreFooter={false}
            showCloseButton={closeButton}
            buttonCancelTitle={''}
          >
            <VStack gap={3} mb={5}>
              <BaseText variant={TextVariant.L} weight={TextWeight.Black}>
                {t('FORM.RESET_PASSWORD')}
              </BaseText>
              <BaseText
                variant={TextVariant.S}
                lineHeight={'1.5'}
                textAlign={'justify'}
              >
                {t('FORM.RESET_PASSWORD_OTP_DESC', {
                  email: renderMaskEmail(data?.email ?? data?.user?.email),
                })}
              </BaseText>
              <BaseText variant={TextVariant.S} textAlign={'justify'}>
                {t('FORM.RESET_PASSWORD_OTP_WARNING')}
              </BaseText>
            </VStack>
            <VStack gap={4}>
              <FormOtpInput name="otpCode" isDisabled={blockRemaining > 0} />

              <RenderOtpTimeHelper
                blockRemaining={blockRemaining}
                otpRemaining={otpRemaining}
                blockFormatted={blockFormatted}
                otpFormatted={otpFormatted}
              />

              {blockRemaining <= 0 && renewOtpCallback && (
                <BaseText>
                  {t('PROFILE.OTP_RETRY')}{' '}
                  <span
                    style={{
                      color: VariablesColors.primary,
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                    onClick={renewOtpCallback}
                  >
                    {t('PROFILE.OTP_RESEND')}
                  </span>
                </BaseText>
              )}
            </VStack>
          </ModalComponent>
        ) : (
          <Box width={'full'} p={{ base: 6, lg: 8 }}>
            <Image
              src={'/assets/images/hibly-logo.png'}
              alt={'logo'}
              width={'120px'}
              height={'120px'}
            />
            <Center flexDir={'column'} height={'full'}>
              <Box
                animation="fade"
                p={10}
                maxW="600px"
                w="full"
                textAlign="center"
              >
                <VStack gap={2} width={'full'}>
                  <BaseText variant={TextVariant.L} weight={TextWeight.Black}>
                    {t('FORM.RESET_PASSWORD')}
                  </BaseText>

                  <BaseText
                    variant={TextVariant.S}
                    lineHeight={'1.5'}
                    textAlign={'justify'}
                  >
                    {t('FORM.RESET_PASSWORD_OTP_DESC', {
                      email: renderMaskEmail(data?.email ?? data?.user?.email),
                    })}
                  </BaseText>
                  <BaseText variant={TextVariant.S} textAlign={'justify'}>
                    {t('FORM.RESET_PASSWORD_OTP_WARNING')}
                  </BaseText>
                </VStack>
                <VStack gap={4} mt={5}>
                  <FormOtpInput
                    name="otpCode"
                    isDisabled={blockRemaining > 0}
                  />

                  <RenderOtpTimeHelper
                    blockRemaining={blockRemaining}
                    otpRemaining={otpRemaining}
                    blockFormatted={blockFormatted}
                    otpFormatted={otpFormatted}
                  />

                  {blockRemaining <= 0 && renewOtpCallback && (
                    <BaseText>
                      {t('PROFILE.OTP_RETRY')}{' '}
                      <span
                        style={{
                          color: VariablesColors.primary,
                          cursor: 'pointer',
                          textDecoration: 'underline',
                        }}
                        onClick={renewOtpCallback}
                      >
                        {t('PROFILE.OTP_RESEND')}
                      </span>
                    </BaseText>
                  )}
                </VStack>

                <VStack gap={3} mt={10} width={'full'}>
                  <BaseButton
                    withGradient
                    width={'full'}
                    colorType={'primary'}
                    onClick={() => handleSubmit()}
                    isLoading={isLoading}
                    disabled={blockRemaining > 0}
                  >
                    {t('COMMON.VALIDATE')}
                  </BaseButton>
                  <BaseButton
                    withGradient
                    width={'full'}
                    colorType={'info'}
                    onClick={goBackCallback}
                  >
                    {t('COMMON.BACK')}
                  </BaseButton>
                </VStack>
              </Box>
              <LinkFooter />
            </Center>
          </Box>
        )
      }
    </Formik>
  );
};
