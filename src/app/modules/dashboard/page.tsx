'use client';

import { Box, Flex, For } from '@chakra-ui/react';
import {
  BaseContainer,
  BaseStats,
  BaseText,
  DataTableContainer,
  TextVariant,
  TextWeight,
} from '_components/custom';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { columns, mockEmployees, stats } from '_utils/data/employee';
import { FilterEmployees } from '_modules/components/FilterEmployees';

export default function Dashboard() {
  const { t } = useTranslation();
  const [toggleFilter, setToggleFilter] = useState<boolean>(false);

  return (
    <BaseContainer border={'none'}>
      <Box>
        <BaseText variant={TextVariant.H1} weight={TextWeight.Bold} mb={2}>
          {t('WELCOME', { username: 'Victory' })}
        </BaseText>
        <BaseText variant={TextVariant.M} color="gray.600">
          {t('DASHBOARD.DESCRIPTION')}
        </BaseText>
      </Box>

      <Flex gap={4} width={'full'} overflowX={'auto'} mt={'20px'}>
        <For each={stats}>
          {(item, index) => <BaseStats key={index} {...item} />}
        </For>
      </Flex>
      <BaseContainer
        mt={'30px'}
        border={'none'}
        isFilterActive={toggleFilter}
        onToggleFilter={() => setToggleFilter(!toggleFilter)}
        withActionButtons
        actionsButtonProps={{
          isLoading: false,
          validateTitle: 'COMMON.ADD',
          onDownload() {
            console.log('download');
          },
          onToggleFilter() {
            setToggleFilter(!toggleFilter);
          },
        }}
        filterComponent={<FilterEmployees />}
      >
        <DataTableContainer
          data={mockEmployees}
          columns={columns}
          hidePagination
        />
      </BaseContainer>
    </BaseContainer>
  );
}
