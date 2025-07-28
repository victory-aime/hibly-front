import { applicationInstance } from 'rise-core-frontend';
import { TeamModule } from '_store/services';

export const teamServiceInstance = () => {
  const context = applicationInstance.getContext();
  if (!context) {
    throw new Error('[TeamService] No context found.');
  }
  return new TeamModule.TeamService(context);
};
