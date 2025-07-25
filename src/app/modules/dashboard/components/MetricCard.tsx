import React from 'react';
import { BaseContainer, BaseText, BoxIcon, TextVariant, TextWeight } from '_components/custom';
import { Box, Flex } from '@chakra-ui/react';

export const MetricCard = ({
                      title,
                      value,
                      icon,
                      color,
                      trend
                    }: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  trend?: string;
}) => (
  <BaseContainer>
    <Flex alignItems="center" justifyContent="space-between">
      <Box>
        <BaseText variant={TextVariant.S} color="gray.500">
          {title}
        </BaseText>
        <BaseText variant={TextVariant.H2} weight={TextWeight.Bold} mt={2}>
          {value}
        </BaseText>
        {trend && (
          <BaseText variant={TextVariant.XS} color="green.500" mt={1}>
            {trend}
          </BaseText>
        )}
      </Box>
      <BoxIcon bgColor={color}>
        {icon}
      </BoxIcon>
    </Flex>
  </BaseContainer>
);