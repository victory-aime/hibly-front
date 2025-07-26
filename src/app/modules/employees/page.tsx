'use client'

import {
  BaseBadge, BaseButton,
  BaseText,
  ColumnsDataTable,
  DataTableContainer, FormSelect,
  FormTextInput,
  TextVariant,
  TextWeight,
} from '_components/custom';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, FormikValues } from 'formik';
import { Box, createListCollection, Flex } from '@chakra-ui/react';
import { CiSearch } from 'react-icons/ci';
import { IoMdAdd } from 'react-icons/io';
import { IoDocumentTextOutline } from 'react-icons/io5';

interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

const mockEmployees: Employee[] = [
  { id: 1, name: 'John Doe', role: 'Developer', department: 'IT', status: 'active', joinDate: '2023-01-15' },
  { id: 2, name: 'Jane Smith', role: 'Designer', department: 'HR', status: 'active', joinDate: '2023-02-20' },
  { id: 3, name: 'Mike Johnson', role: 'Manager', department: 'HR', status: 'active', joinDate: '2023-03-10' },
  { id: 4, name: 'Sarah Wilson', role: 'HR Specialist', department: 'HR', status: 'inactive', joinDate: '2022-12-05' },
];

const jobData = [
  { id: '1', label: 'Designer', value: 'DS' },
  { id: '2', label: 'Developper', value: 'DEV' },
  { id: '3', label: 'Manager', value: 'MN' },
  { id: '4', label: 'HR', value: 'HR' },
];

const officesData = [
  { id: '1', label: 'Unpixel', value: 'UP' },
  { id: '2', label: 'Horizon', value: 'HZ' },
  { id: '3', label: 'BVG', value: 'BVG' },
  { id: '4', label: 'AlkaaTech', value: 'AAT' },
];

const officesCollection = createListCollection({
  items: officesData,
});

const jobCollection = createListCollection({
  items: jobData,
});

export default function EmployeePage() {

  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<Employee[]>([]);

  const filteredEmployees = mockEmployees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: ColumnsDataTable[] = [
    { accessor: 'select', header: '' },
    {
      accessor: 'name',
      header: ('DASHBOARD.TABLE_COLUMN.NAME'),
      cell: (value: string) => (
        <BaseText variant={TextVariant.M} weight={TextWeight.Medium}>
          {value}
        </BaseText>
      )
    },
    {
      accessor: 'role',
      header: ('DASHBOARD.TABLE_COLUMN.ROLE'),
      cell: (value: string) => (
        <BaseText variant={TextVariant.S} color="gray.600">
          {value}
        </BaseText>
      )
    },
    {
      accessor: 'department',
      header: ('DASHBOARD.TABLE_COLUMN.DEPARTMENT'),
      cell: (value: string) => (
        <BaseBadge
          status={value}
          type={'department'}
        />
      )
    },
    {
      accessor: 'status',
      header: ('DASHBOARD.TABLE_COLUMN.STATUS'),
      cell: (value: string) => (
        <BaseBadge
          status={value}
          type={'common'}
        />
      )
    },
    {
      accessor: 'actions',
      header: 'Actions',
      actions: [
        {
          name: 'view',
          handleClick: (data: Employee) => console.log('View', data),
        },
        {
          name: 'edit',
          handleClick: (data: Employee) => console.log('Edit', data),
        },
        {
          name: 'delete',
          handleClick: (data: Employee) => console.log('Delete', data),
        }
      ]
    }
  ];

  const handleSearch = (values: FormikValues) => {
    setSearchTerm(values.search || '');
  };

  const handleRowSelection = (rows: Employee[]) => {
    setSelectedRows(rows);
  };

  const handleDeleteSelected = () => {

  };

  const handleShareSelected = () => {

  };

  return (
    <Flex flexDirection="column" gap={8}>

      <Flex
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ base: "flex-start", md: "center" }}
        gap={{ base: 4, md: 0 }}
      >
        <Box>
          <BaseText variant={TextVariant.H1}>
            {t("DASHBOARD.EMPLOYEE.TITLE")}
          </BaseText>

          <BaseText variant={TextVariant.M} weight={TextWeight.Medium}>
            {t("DASHBOARD.EMPLOYEE.MANAGE")}
          </BaseText>
        </Box>

        <Flex
          gap={4}
          flexDirection={{ base: "column", sm: "row" }}
          width={{ base: "full", md: "auto" }}
        >
          <BaseButton
            withGradient={true}
            colorType={'secondary'}
            leftIcon={<IoDocumentTextOutline />}
          >
            {t('COMMON.DOWNLOAD')}
          </BaseButton>

          <BaseButton
            withGradient={true}
            colorType={'primary'}
            leftIcon={<IoMdAdd />}
          >
            {t('COMMON.ADD')}
          </BaseButton>
        </Flex>
      </Flex>


      <Formik
        initialValues={{ search: '' }}
        onSubmit={handleSearch}
      >
        {({ values, handleChange, handleSubmit, setFieldValue }) => (
          <Flex
            flexDirection={{ base: "column", lg: "row" }}
            alignItems={{ base: "stretch", lg: "center" }}
            justifyContent="space-between"
            width={'full'}
            mb={"30px"}
            gap={{ base: 4, lg: 0 }}
          >

            <Flex width={{ base: 'full', lg: '1/2' }} justifyContent={'flex-start'}>
              <FormTextInput
                name="search"
                placeholder={t('DASHBOARD.EMPLOYEE.SEARCH')}
                rightAccessory={<CiSearch size={20} />}
                value={values.search}
              />
            </Flex>


            <Flex
              flexDirection={{ base: "column", sm: "row" }}
              justifyContent={{ lg: "flex-end" }}
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

      {/* Data Table */}
      <DataTableContainer
        data={filteredEmployees}
        columns={columns}
        handleRowSelection={handleRowSelection}
        handleDeleteActionBar={handleDeleteSelected}
        handleShareActionBar={handleShareSelected}
        totalItems={filteredEmployees.length}
        pageSize={10}
      />

    </Flex>
  )
}