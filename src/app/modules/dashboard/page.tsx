'use client';

import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import {
  BaseContainer,
  BaseText, ColumnsDataTable,
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
import { MetricCard } from '_modules/dashboard/components/MetricCard';
import { IoIosRemove, IoMdAdd } from 'react-icons/io';

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
  { id: 2, name: 'Jane Smith', role: 'Designer', department: 'Design', status: 'active', joinDate: '2023-02-20' },
  { id: 3, name: 'Mike Johnson', role: 'Manager', department: 'Sales', status: 'active', joinDate: '2023-03-10' },
  { id: 4, name: 'Sarah Wilson', role: 'HR Specialist', department: 'HR', status: 'inactive', joinDate: '2022-12-05' },
];

export default function Dashboard() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<Employee[]>([]);

  const filteredEmployees = mockEmployees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ColumnsDataTable = [
    { accessor: 'select' as const, header: '' },
    {
      accessor: 'name' as const,
      header: ('DASHBOARD.TABLE_COLUMN.NAME'),
      cell: (value: string) => (
        <BaseText variant={TextVariant.M} weight={TextWeight.Medium}>
          {value}
        </BaseText>
      )
    },
    {
      accessor: 'role' as const,
      header: ('DASHBOARD.TABLE_COLUMN.ROLE'),
      cell: (value: string) => (
        <BaseText variant={TextVariant.S} color="gray.600">
          {value}
        </BaseText>
      )
    },
    {
      accessor: 'department' as const,
      header: ('DASHBOARD.TABLE_COLUMN.DEPARTMENT'),
      cell: (value: string) => (
        <Box
          px={2}
          py={1}
          borderRadius="md"
          bg={value === 'IT' ? 'blue.100' : value === 'Design' ? 'purple.100' : 'gray.100'}
          display="inline-block"
        >
          <BaseText variant={TextVariant.XS} weight={TextWeight.Medium}>
            {value}
          </BaseText>
        </Box>
      )
    },
    {
      accessor: 'status' as const,
      header: ('DASHBOARD.TABLE_COLUMN.STATUS'),
      cell: (value: string) => (
        <Box
          px={2}
          py={1}
          borderRadius="md"
          bg={value === 'active' ? 'green.100' : 'red.100'}
          color={value === 'active' ? 'green.800' : 'red.800'}
          display="inline-block"
        >
          <BaseText variant={TextVariant.XS} weight={TextWeight.Medium}>
            {value === 'active' ? 'Actif' : 'Inactif'}
          </BaseText>
        </Box>
      )
    },
    {
      accessor: 'actions' as const,
      header: ('DASHBOARD.TABLE_COLUMN.ACTIONS'),
      actions: [
        {
          name: 'view',
          title: 'Voir les détails',
          handleClick: (data: Employee) => console.log('View', data),
          isShown: true
        },
        {
          name: 'edit',
          title: 'Modifier',
          handleClick: (data: Employee) => console.log('Edit', data),
          isShown: true
        },
        {
          name: 'delete',
          title: 'Supprimer',
          handleClick: (data: Employee) => console.log('Delete', data),
          isShown: true
        }
      ]
    }
  ];

  const handleSearch = (values: FormikValues) => {
    setSearchTerm(values.search || '');
  };

  const handleRowSelection = (rows: Employee[]) => {
    setSelectedRows(rows);
    console.log('Selected rows:', rows);
  };

  const handleDeleteSelected = () => {
    console.log('Delete selected employees:', selectedRows);
    // Logique de suppression
  };

  const handleShareSelected = () => {
    console.log('Share selected employees:', selectedRows);
    // Logique de partage
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


      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
        <GridItem>
          <MetricCard
            title="Total Employés"
            value="3540"
            icon={<FiUsers size={24} color="white" />}
            color="blue.500"
            trend="+25,5%"
          />
        </GridItem>
        <GridItem>
          <MetricCard
            title="Job Applicants"
            value="1150"
            icon={<FiTrendingUp size={24} color="white" />}
            color="green.500"
            trend="+4,10% "
          />
        </GridItem>
        <GridItem>
          <MetricCard
            title="New Employees"
            value="15"
            icon={<IoMdAdd size={24} color="white" />}
            color="orange.500"
            trend="+5,1%"
          />
        </GridItem>
        <GridItem>
          <MetricCard
            title="Resigned Employees"
            value="23"
            icon={<IoIosRemove size={24} color="white" />}
            color="purple.500"
            trend="+5.2%"
          />
        </GridItem>
      </Grid>

      {/* Section Employés */}
      <BaseContainer
        title={t("DASHBOARD.EMPLOYEE.TITLE")}
      >
        <Formik
          initialValues={{ search: '' }}
          onSubmit={handleSearch}
        >
          {({ values, handleChange, handleSubmit, setFieldValue }) => (
            <>
              <Flex mb={5} gap={4} alignItems="center" justifyContent="space-between" flexWrap="wrap">
                <FormTextInput
                  name="search"
                  placeholder={t('DASHBOARD.EMPLOYEE.SEARCH')}
                  rightAccessory={<CiSearch size={20} />}
                  value={values.search}
                  onChange={(e) => {
                    handleChange(e);
                    setSearchTerm(e.target.value);
                  }}
                  maxW={{ base: "100%", md: "400px" }}
                />
                <BaseText variant={TextVariant.S} color="gray.500">
                  {filteredEmployees.length} {t('DASHBOARD.EMPLOYEE.NUMBER_FOUND')}
                </BaseText>
              </Flex>

              <DataTableContainer
                data={filteredEmployees}
                columns={ColumnsDataTable}
                handleRowSelection={handleRowSelection}
                handleDeleteActionBar={handleDeleteSelected}
                handleShareActionBar={handleShareSelected}
                totalItems={filteredEmployees.length}
                pageSize={10}
                minH="400px"
              />
            </>
          )}
        </Formik>
      </BaseContainer>
    </Flex>
  );
}