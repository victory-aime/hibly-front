'use client';

import {
  BaseBadge,
  BaseContainer,
  BaseText,
  ColumnsDataTable,
  DataTableContainer,
  FormSelect,
  TextVariant,
  TextWeight,
} from '_components/custom';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import {
  jobCollection,
  mockEmployees,
  officesCollection,
  stats,
} from '_utils/data/employee';
import { Formik, FormikValues } from 'formik';
import { Flex } from '@chakra-ui/react';

export default function MyTimeOffPage() {
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
        withActionButtons
        actionsButtonProps={{
          isLoading: false,
          validateTitle: 'COMMON.ADD',
          onDownload() {
            console.log('download');
          },
        }}
      >
        <Formik initialValues={{ search: '' }} onSubmit={handleSearch}>
          {({ values, setFieldValue }) => (
            <Flex
              flexDirection={{ base: 'column', lg: 'row' }}
              alignItems={{ base: 'stretch', lg: 'center' }}
              justifyContent="space-between"
              width={'full'}
              mb={'30px'}
              gap={4}
            >
              <Flex
                width={'full'}
                flexDirection={{ base: 'column', sm: 'row' }}
                justifyContent={{ lg: 'flex-end' }}
                gap={3}
              >
                <FormSelect
                  name="offices"
                  listItems={officesCollection}
                  setFieldValue={setFieldValue}
                  placeholder={t('FORM.SELECT_OFFICES')}
                />
                <FormSelect
                  name="languages"
                  listItems={jobCollection}
                  setFieldValue={setFieldValue}
                  placeholder={t('FORM.SELECT_JOB')}
                />
                <FormSelect
                  name="languages"
                  listItems={jobCollection}
                  setFieldValue={setFieldValue}
                  placeholder={t('FORM.SELECT_JOB')}
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
