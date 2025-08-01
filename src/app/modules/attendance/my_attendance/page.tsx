'use client';

import { BaseContainer, DataTableContainer } from '_components/custom';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { columns, mockEmployees } from '_utils/data/employee';
import { Flex } from '@chakra-ui/react';
import { FilterEmployees } from '../../components/FilterEmployees';

export default function MyAttendancePage() {
  const { t } = useTranslation();
  const [toggleFilter, setToggleFilter] = useState<boolean>(false);

  return (
    <BaseContainer
      title={'DASHBOARD.ATTENDANCE.MY_ATTENDANCE.TITLE'}
      description={'DASHBOARD.ATTENDANCE.MY_ATTENDANCE.DESCRIPTION'}
      border={'none'}
    >
      <Flex gap={4} width={'full'} overflowX={'auto'}>
        <BaseContainer
          title={'DASHBOARD.ATTENDANCE.MY_ATTENDANCE.WORK_SCHEDULE'}
          description={t('COMMON.HOURS', { count: 48 })}
          tooltip={'annual'}
        />

        <BaseContainer
          title={'DASHBOARD.ATTENDANCE.MY_ATTENDANCE.LOGGED_TIME'}
          description={t('COMMON.HOURS', { count: 30 })}
          tooltip={'Engagement'}
        />

        <BaseContainer
          title={'DASHBOARD.ATTENDANCE.MY_ATTENDANCE.PAID_TIME'}
          description={t('COMMON.HOURS', { count: 29 })}
          tooltip={'sick'}
        />

        <BaseContainer
          title={'DASHBOARD.ATTENDANCE.MY_ATTENDANCE.OVERTIME'}
          description={t('COMMON.HOURS', { count: 1 })}
          tooltip={'mariage'}
        />
      </Flex>
      <BaseContainer
        border={'none'}
        isFilterActive={toggleFilter}
        onToggleFilter={() => setToggleFilter(!toggleFilter)}
        withActionButtons
        actionsButtonProps={{
          isLoading: false,
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
