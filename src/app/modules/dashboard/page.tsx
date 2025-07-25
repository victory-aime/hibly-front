'use client';

import { Box, Flex, For } from '@chakra-ui/react';
import {
  BaseBadge,
  BaseContainer,
  BaseStats,
  BaseStatsProps,
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
import { FiUsers, FiTrendingUp } from 'react-icons/fi';
import { IoIosRemove, IoMdAdd } from 'react-icons/io';
import { ENUM } from '_types/index';

interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

const mockEmployees: Employee[] = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Developer',
    department: 'IT',
    status: 'active',
    joinDate: '2023-01-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Designer',
    department: 'HR',
    status: 'active',
    joinDate: '2023-02-20',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    role: 'Manager',
    department: 'HR',
    status: 'active',
    joinDate: '2023-03-10',
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    role: 'HR Specialist',
    department: 'HR',
    status: 'inactive',
    joinDate: '2022-12-05',
  },
];

const stats: BaseStatsProps[] = [
  {
    icon: <FiUsers size={16} color="white" />,
    title: 'Total Employees',
    color: 'red',
    percent: -0.1,
    isNumber: true,
    currency: ENUM.COMMON.Currency.XAF,
    value: 2500000000,
  },
  {
    icon: <FiTrendingUp size={16} color="white" />,
    title: 'Job Applicants',
    color: 'info.500',
    percent: 0.4,
    value: 1150,
  },
  {
    icon: <IoMdAdd size={16} color="white" />,
    title: 'New Employees',
    color: 'tertiary.500',
    percent: 0.1,
    value: 80,
  },
  {
    icon: <IoIosRemove size={16} color="white" />,
    title: 'Resigned Employees',
    color: 'red',
    percent: 0.5,
    value: 50,
  },
];

export default function Dashboard() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<Employee[]>([]);

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
          handleClick: (data: Employee) => console.log('View', data),
        },
        {
          name: 'edit',
          handleClick: (data: Employee) => console.log('Edit', data),
        },
        {
          name: 'delete',
          handleClick: (data: Employee) => console.log('Delete', data),
        },
      ],
    },
  ];

  const handleSearch = (values: FormikValues) => {
    setSearchTerm(values.search || '');
  };

  const handleRowSelection = (rows: Employee[]) => {
    console.log('Selected rows:', rows);
  };

  const handleDeleteSelected = () => {
  };

  const handleShareSelected = () => {

  };

  return (
    <Flex width="100%" flexDirection="column" gap={6}>
      {/* En-tête du dashboard */}
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

      {/* Section Employés */}
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
          handleRowSelection={handleRowSelection}
          handleDeleteActionBar={handleDeleteSelected}
          handleShareActionBar={handleShareSelected}
          totalItems={filteredEmployees.length}
          pageSize={10}
        />
      </BaseContainer>
    </Flex>
  );
}
