import { StatRootProps } from '@chakra-ui/react';
import { ENUM } from '_types/index';
import React from 'react';

export interface BaseStatsProps extends StatRootProps {
  icon: React.ReactNode;
  color: string;
  title: string;
  value: number;
  isNumber?: boolean;
  message?: string;
  percent?: number;
  currency?: ENUM.COMMON.Currency;
}
