import { Stat, HStack } from '@chakra-ui/react';
import { FC } from 'react';
import { BaseStatsProps } from './interface/stats';
import { BaseIcon } from '../base-icon';
import { BaseFormatNumber } from '../format-number';
import { BaseBadge } from '../badge';
import { StatDownIndicator, StatUpIndicator } from '@chakra-ui/react';
import { boxStyle } from '../container/style';
import { ENUM } from '_types/index';

export const BaseStats: FC<BaseStatsProps> = ({
  color = 'primary',
  icon,
  message,
  title,
  value = 0,
  percent = 0.25,
  isNumber = false,
  currency = ENUM.COMMON.Currency.USD,
  ...rest
}) => {
  const isPositive = percent >= 0;

  return (
    <Stat.Root p={0} gap={4} {...boxStyle} {...rest}>
      {icon && <BaseIcon bgColor={color}>{icon}</BaseIcon>}

      {title && <Stat.Label fontSize={'md'}>{title}</Stat.Label>}

      <HStack
        width="full"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Stat.ValueText alignItems="center" gap={2} fontSize={'xl'}>
          {value && isNumber ? (
            <BaseFormatNumber
              value={value}
              notation="compact"
              currencyCode={currency}
            />
          ) : (
            value
          )}
        </Stat.ValueText>

        <BaseBadge
          type="percent"
          size={'sm'}
          color={isPositive ? 'success' : 'danger'}
          borderRadius="full"
          variant="subtle"
        >
          <HStack gap="1" color={'white'} fontWeight={'bold'}>
            {isPositive ? (
              <StatUpIndicator color="primary.500" />
            ) : (
              <StatDownIndicator color="red.500" />
            )}
            <BaseFormatNumber style="percent" value={percent} />
          </HStack>
        </BaseBadge>
      </HStack>
      {message && <Stat.HelpText>{message}</Stat.HelpText>}
    </Stat.Root>
  );
};
