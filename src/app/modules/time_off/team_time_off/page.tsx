'use client';

import { BaseContainer } from '_components/custom';
import { BaseAgenda } from '_components/custom/agenda/FullCalendar';

export default function TeamTimeOffPage() {
  return (
    <BaseContainer
      title={'DASHBOARD.TIME_OFF.TEAM_TIME_OFF'}
      withActionButtons
      actionsButtonProps={{
        isLoading: false,
        validateTitle: 'COMMON.DOWNLOAD',
        onDownload() {
          console.log('download');
        },
      }}
    >
      <BaseAgenda events={[]}></BaseAgenda>
    </BaseContainer>
  );
}
