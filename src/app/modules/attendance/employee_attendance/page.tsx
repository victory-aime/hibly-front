'use client';

import { BaseContainer, DataTableContainer } from '_components/custom';
import React, { useState } from 'react';
import { columns, mockEmployees } from '_utils/data/employee';
import { FilterEmployees } from '../../components/FilterEmployees';

export default function EmployeeAttendancePage() {
  const [toggleFilter, setToggleFilter] = useState<boolean>(false);

  return (
    <BaseContainer
      title={'DASHBOARD.ATTENDANCE.EMPLOYEE_ATTENDANCE.TITLE'}
      description={'DASHBOARD.ATTENDANCE.EMPLOYEE_ATTENDANCE.DESCRIPTION'}
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
  );
}
