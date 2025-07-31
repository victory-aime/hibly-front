'use client';

import { BaseContainer, BaseText } from '_components/custom';
import { BaseAgenda } from '_components/custom/agenda/FullCalendar';

export default function TeamTimeOffPage() {
  const event: Event[] = [];
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
      <BaseAgenda events={event}></BaseAgenda>
    </BaseContainer>
  );
}
