'use client';

import { Box, Flex, For } from '@chakra-ui/react';
import {
  BaseBadge,
  BaseContainer,
  BaseStats,
  BaseText,
  ColumnsDataTable,
  DataTableContainer,
  FormTextInput,
  TextVariant,
  TextWeight,
} from '_components/custom';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, FormikValues } from 'formik';
import { CiSearch } from 'react-icons/ci';
import { mockEmployees, stats } from '_utils/data/employee';

export default function Dashboard() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = mockEmployees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const columns: ColumnsDataTable[] = [
    { accessor: 'select', header: '' },
    {
      accessor: 'name',
      header: 'DASHBOARD.TABLE_COLUMN.NAME',
      cell: (value: string) => (
        <BaseText variant={TextVariant.M} weight={TextWeight.Medium}>
          {value}
        </BaseText>
      ),
    },
    {
      accessor: 'role',
      header: 'DASHBOARD.TABLE_COLUMN.ROLE',
      cell: (value: string) => (
        <BaseText variant={TextVariant.S} color="gray.600">
          {value}
        </BaseText>
      ),
    },
    {
      accessor: 'department',
      header: 'DASHBOARD.TABLE_COLUMN.DEPARTMENT',
      cell: (value: string) => <BaseBadge status={value} type={'department'} />,
    },
    {
      accessor: 'status',
      header: 'DASHBOARD.TABLE_COLUMN.STATUS',
      cell: (value: string) => <BaseBadge status={value} type={'common'} />,
    },
    {
      accessor: 'actions',
      header: 'Actions',
      actions: [
        {
          name: 'view',
          handleClick: (data) => console.log('View', data),
        },
        {
          name: 'edit',
          handleClick: (data) => console.log('Edit', data),
        },
        {
          name: 'delete',
          handleClick: (data) => console.log('Delete', data),
        },
      ],
    },
  ];

  const handleSearch = (values: FormikValues) => {
    setSearchTerm(values.search || '');
  };

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

      <Flex gap={4} width={'full'} overflowX={'auto'}>
        <For each={stats}>
          {(item, index) => <BaseStats key={index} {...item} />}
        </For>
      </Flex>
      <BaseContainer>
        <Formik initialValues={{ search: '' }} onSubmit={handleSearch}>
          {({ values }) => (
            <Flex
              alignItems="center"
              justifyContent="space-between"
              width={'full'}
              mb={'30px'}
            >
              <Flex>
                <BaseText variant={TextVariant.H3}>
                  {t('DASHBOARD.EMPLOYEE.TITLE')}
                </BaseText>
              </Flex>

              <Flex
                width={{ base: 'full', lg: '1/2' }}
                justifyContent={'flex-end'}
              >
                <FormTextInput
                  name="search"
                  placeholder={t('DASHBOARD.EMPLOYEE.SEARCH')}
                  rightAccessory={<CiSearch size={20} />}
                  value={values.search}
                />
              </Flex>
            </Flex>
          )}
        </Formik>
        <DataTableContainer
          data={filteredEmployees}
          columns={columns}
          totalItems={filteredEmployees.length}
          pageSize={10}
        />
      </BaseContainer>
    </BaseContainer>
  );
}
