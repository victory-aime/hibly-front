'use client';

import React, { useState } from 'react';

import {
  BaseContainer,
  ColumnsDataTable,
  DataTableContainer,
} from '_components/custom';
import { formatCreatedAt } from 'rise-core-frontend';
import { BaseDrawer } from '_components/custom/drawer/BaseDrawer';

export default function TeamPage() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const fakeData = [
    {
      id: '1',
      name: 'Team Alpha',
      description: 'This is team alpha',
      members: ['Alice', 'Bob'],
      companyId: 'company1',
      managerTeamId: 'manager1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Team Beta',
      description: 'This is team beta',
      members: ['Charlie', 'David'],
      companyId: 'company2',
      managerTeamId: 'manager2',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      name: 'Team Omega',
      description: 'This is team Omega',
      members: ['Charlie', 'David'],
      companyId: 'company3',
      managerTeamId: 'manager3',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
      name: 'Team Omega',
      description: 'This is team Omega',
      members: ['Charlie', 'David'],
      companyId: 'company4',
      managerTeamId: 'manager4',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  const columns: ColumnsDataTable[] = [
    {
      header: '',
      accessor: 'select',
    },
    {
      header: 'Name',
      accessor: 'name',
    },
    {
      header: 'Description',
      accessor: 'description',
    },
    {
      header: 'Members',
      accessor: 'members',
    },
    {
      header: 'Manager',
      accessor: 'managerTeamId',
    },
    {
      header: 'Created At',
      accessor: 'createdAt',
      cell: (value) => formatCreatedAt(value),
    },
  ];
  return (
    <BaseContainer
      title={'Team page'}
      description={'Gerer vos equipes'}
      withActionButtons
      actionsButtonProps={{
        isLoading: false,
        onClick() {
          setOpenDrawer(true);
        },
        onDownload: () => console.log('Download clicked'),
        onReload: () => console.log('Refresh clicked'),
        validateTitle: 'COMMON.ADD',
      }}
    >
      <DataTableContainer data={fakeData} columns={columns} hidePagination />

      <BaseDrawer
        title={'Test'}
        onChange={() => setOpenDrawer(false)}
        isOpen={openDrawer}
      >
        Salem
      </BaseDrawer>
    </BaseContainer>
  );
}
