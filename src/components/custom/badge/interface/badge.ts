import { BadgeProps } from '@chakra-ui/react/badge';
import React from 'react';
import { variantColorType } from '_components/custom/button';

type BadgeType = 'booking' | 'cars' | 'maintenance' | 'common' | 'department';
type StatusType = 'success' | 'warning' | 'danger' | 'primary' | undefined;

interface Props extends BadgeProps {
  label?: string;
  color?: variantColorType;
  status?: StatusType | undefined | string;
  type?: BadgeType;
  variant?: 'outline' | 'solid' | 'subtle' | 'surface' | 'plain' | undefined;
  children?: React.ReactNode;
}

export type { Props };
