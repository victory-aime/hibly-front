'use client';

import { BaseContainer, DataTableContainer } from '_components/custom';
import React, { useState } from 'react';
import { columns, mockEmployees } from '_utils/data/employee';
import { Flex } from '@chakra-ui/react';
import { FilterEmployees } from '../../components/FilterEmployees';

export default function MyTimeOffPage() {
  const [toggleFilter, setToggleFilter] = useState<boolean>(false);

  return (
    <BaseContainer border={'none'}>
      <Flex gap={4} width={'full'} overflowX={'auto'}>
        <BaseContainer
          title={'Annual'}
          description={'3 Days'}
          tooltip={'annual'}
        />

        <BaseContainer
          title={'Engagement'}
          description={'3 Days'}
          tooltip={'Engagement'}
        />

        <BaseContainer
          title={'Sick leave'}
          description={'1 Day'}
          tooltip={'sick'}
        />

        <BaseContainer
          title={'Weeding'}
          description={'3 Days'}
          tooltip={'mariage'}
        />
      </Flex>
      <BaseContainer
        title={'DASHBOARD.TIME_OFF.REQUEST_TIME_LIST'}
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
