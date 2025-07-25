import { Badge } from '@chakra-ui/react';
import React, { FC } from 'react';
import { Props } from './interface/badge';
import { BaseText, TextVariant } from '../base-text';
import { variantColorType, getVariantStyles } from '../button';
import { useTranslation } from 'react-i18next';

const getBadgeContent = (
  status?: string,
  type?: string,
  t?: (key: string) => string,
): { variant: variantColorType; label: string } => {
  if (!t) return { variant: 'info', label: 'Inconnu' };

  if (type==='common'){
    switch (status) {
      case 'active':
        return { variant: 'success', label: t('COMMON.STATUS.ACTIVE') };
      case 'inactive':
        return { variant: 'danger', label: t('COMMON.STATUS.INACTIVE') };
      default:
        return { variant: 'success', label: t('inconnu') };
    }
  }

  else if (type==='department'){
    switch (status) {
      case 'IT':
        return { variant: 'success', label: 'IT' };
      case 'HR':
        return { variant: 'danger', label: 'HR' };
      default:
        return { variant: 'success', label: t('inconnu') };
    }
  }

  switch (status) {
    case 'success':
      return { variant: 'success', label: t('inconnu') };
    default:
      return { variant: 'success', label: t('inconnu') };
  }
};

export const BaseBadge: FC<Props> = ({
  children,
  variant = 'solid',
  label: customLabel,
  color,
  type = 'cars',
  status,
  ...props
}) => {
  const { t } = useTranslation();
  const { variant: resolvedVariant, label: resolvedLabel } = getBadgeContent(
    status,
    type,
    t,
  );
  const { bg, gradient, hover, textColor } = getVariantStyles(resolvedVariant);

  return (
    <Badge
      {...props}
      variant={variant}
      size="lg"
      borderRadius="7px"
      p={props.p ?? 2}
      bg={gradient ?? bg ?? 'none'}
      color={color || textColor}
      _hover={{ background: hover ?? `${bg}CC` }}
      _active={{ background: hover ?? `${bg}AA` }}
      _disabled={{ background: 'gray.300', cursor: 'not-allowed' }}
    >
      <BaseText variant={TextVariant.XS} textTransform="capitalize">
        {customLabel ?? resolvedLabel}
      </BaseText>
    </Badge>
  );
};
