'use client';

import { BaseContainer, DataTableContainer } from '_components/custom';
import React, { useState } from 'react';
import { columns, mockEmployees } from '_utils/data/employee';
import { FilterEmployees } from '_modules/components/FilterEmployees';

export default function TeamAttendancePage() {
  const [toggleFilter, setToggleFilter] = useState<boolean>(false);

  return (
    <BaseContainer
      title={'DASHBOARD.ATTENDANCE.TEAM_ATTENDANCE.TITLE'}
      description={'DASHBOARD.ATTENDANCE.TEAM_ATTENDANCE.DESCRIPTION'}
      border={'none'}
      isFilterActive={toggleFilter}
      onToggleFilter={() => setToggleFilter(!toggleFilter)}
      withActionButtons
      actionsButtonProps={{
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
